const { hashSync, compareSync, compare } = require('bcrypt');
const ENCRYPTIONKEY = "C*F-JaNdRgUkXp2s58x/A?D(G+KbPeSh";
const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');
let globalMongo = null;

class AccountController {
    constructor(mongoClient, ENCRYPTIONKEY) {
        this.mongoClient = mongoClient;
        this.ENCRYPTIONKEY = ENCRYPTIONKEY;
        globalMongo = mongoClient;
    }

    static async saneToken(token, reqip) {
        if (!token || !reqip) 
            return false;
        

        const loginData = globalMongo.db("accounts").collection('login');
        const sessionData = await globalMongo.db("accounts").collection('sessions').findOne({ token });

        if (!sessionData)
            return false;
    
        const isValidToken = await AccountController.isTokenValid(sessionData.token, sessionData.initializationVector, sessionData.authTag, loginData, reqip);

        return isValidToken;
    }

   static async isTokenValid(token, initializationVector, authTag, loginData, reqip) {
        const decipher = createDecipheriv('aes-256-gcm', ENCRYPTIONKEY, initializationVector);
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
        let decrypted = decipher.update(token, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        const [username, hashedpass, ip] = decrypted.split('>');
        const userAuth = await loginData.findOne({ username });

        if (!userAuth || hashedpass !== userAuth.hashedPassword)
            return false;


        //if (ip !== reqip)
          //  return false;


        return true;
    }

    async getTokenData(token) {
        if (!token) {
            return null;
        }

        const sessionData = await this.mongoClient.db("accounts").collection('sessions').findOne({ token });

        if (!sessionData) 
            throw new Error("Internal server error, can't get collection");
        

        const decipher = createDecipheriv('aes-256-gcm', ENCRYPTIONKEY, sessionData.initializationVector);
        decipher.setAuthTag(Buffer.from(sessionData.authTag, 'hex'));
        let decrypted = decipher.update(sessionData.token, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        const [username, hashedpass, ip] = decrypted.split('>');

        return {
            username,
            hashedpass,
            ip
        };
    }

    async accountExists(newuser) {
        try {
            const accountLogins = this.mongoClient.db("accounts").collection('login');

            const projection = { username: 1, email: 1, _id: 0 };
            const query = { $or: [{ username: newuser }, { email: newuser }] };
            const existingUser = await accountLogins.findOne(query, { projection });

            if (existingUser) 
                return { error: "Account with username or email already exists" };
            

            return { available: true };
        } catch (err) {
            console.error(err);
            return { error: "Internal server error" };
        }
    }

    async createAccount(username, password, ip) {
        try {
            const hashedPassword = await hashSync(password, 10);
            const accountLogins = await this.mongoClient.db("accounts").collection('login');

            const existingUser = await accountLogins.findOne({ username });
            if (existingUser) return { msg: "Account with username already exists" };

            const result = await accountLogins.insertOne({ username, hashedPassword, ip: `${ip}` });
            if (result.insertedId) return { msg: "Account has been created" }

            throw new Error('Internal server error: could not create account');
        } catch (err) {
            console.error(err);
            return { msg: "Internal server error" };
        }
    }

    async login(useroremail, password) {
        const accountData = await this.mongoClient.db("accounts").collection('login').findOne({ username: useroremail });
        const sessionCol = this.mongoClient.db("accounts").collection('sessions');

        if (!accountData)
            return { msg: "User not found" };


        try {
            const { username, hashedPassword, ip } = accountData;
            const match = await compareSync(password, hashedPassword);

            if (match) {
                const initializationVector = randomBytes(32).toString('hex');
                const cipher = createCipheriv("aes-256-gcm", ENCRYPTIONKEY, initializationVector);
                const encryptedToken = Buffer.concat([cipher.update(`${username}>${hashedPassword}>${ip}`, 'utf8'), cipher.final()]);
                const authToken = encryptedToken.toString('hex');
                const creationDate = new Date().toLocaleDateString("en-GB");

                await sessionCol.insertOne({ token: authToken, initializationVector, creationDate, authTag: cipher.getAuthTag().toString("hex") });

                return { msg: "Login successful", authToken };
            } else {
                return { msg: "User not found" };
            }
        } catch (err) {
            console.error(err);
            return { msg: "Internal server error" };
        }
    }

    async sanityCheck(token, reqip) {
        try {
            const tokenIsValid = await AccountController.saneToken(token, reqip);
            return tokenIsValid ? { msg: "authentication token sanity check succeeded" } : { msg: "authentication token sanity check failed" };
        } catch (err) {
            return { error: err.message };
        }
    }

    async close() {
        this.mongoClient.close();
    }
}

module.exports = AccountController;