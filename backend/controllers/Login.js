const { hashSync, compareSync, compare } = require('bcrypt');
const ENCRYPTIONKEY = "C*F-JaNdRgUkXp2s58x/A?D(G+KbPeSh";
const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

class AccountController {
    constructor(mongoClient, ENCRYPTIONKEY) {
        this.mongoClient = mongoClient;
        this.ENCRYPTIONKEY = ENCRYPTIONKEY;
    }

    async accountExists(newuser) {
        try {
            const accountLogins = mongoClient.db("accounts").collection('login');

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
            const accountLogins = await mongoClient.db("accounts").collection('login');

            const existingUser = await accountLogins.findOne({ username });
            if (existingUser) return res.status(409).json({ msg: "Account with username already exists" });

            const result = await accountLogins.insertOne({ username, hashedPassword, ip: `${ip}` });
            if (result.insertedCount === 1) return { msg: "Account has been created" }

            throw new Error('Internal server error: could not create account');
        } catch (err) {
            console.error(err);
            return { msg: "Internal server error" };
        }
    }

    async login(useroremail, password) {
        const accountData = await mongoClient.db("accounts").collection('login').findOne({ username: useroremail });
        const sessionCol = mongoClient.db("accounts").collection('sessions');

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
            const tokenIsValid = await saneToken(token, reqip);
            return tokenIsValid ? { msg: "authentication token sanity check succeeded" } : { msg: "authentication token sanity check failed" };
        } catch (err) {
            return { error: err.message };
        }
    }
}

module.exports = AccountController;