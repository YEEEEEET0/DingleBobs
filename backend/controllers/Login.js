const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');
const { hashSync, compareSync } = require('bcrypt');
let GLOCAL_MONGO = null;
const ENCRYPTION_KEY = "C*F-JaNdRgUkXp2s58x/A?D(G+KbPeSh"; //breh

class TokenManager {
    constructor() {
    }

    static async isTokenValid(token, initializationVector, authTag, loginData, hashedPass, reqip) {
        const decipher = createDecipheriv('aes-256-gcm', ENCRYPTION_KEY, initializationVector);
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
        let decrypted = decipher.update(token, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        const [username, storedHashedPass, ip] = decrypted.split('>');
        const userAuth = await loginData.findOne({ username });

        return userAuth && hashedPass === storedHashedPass// && (ip === reqip);
    }

    static async createToken(username, hashedPassword, ip) {
        const initializationVector = randomBytes(32).toString('hex');
        const cipher = createCipheriv("aes-256-gcm", ENCRYPTION_KEY, initializationVector);
        const encryptedToken = Buffer.concat([cipher.update(`${username}>${hashedPassword}>${ip}`, 'utf8'), cipher.final()]);
        const authToken = encryptedToken.toString('hex');
        const creationDate = new Date().toLocaleDateString("en-GB");

        return { token: authToken, initializationVector, creationDate, authTag: cipher.getAuthTag().toString("hex") };
    }

    static async getTokenData(token) {
        if (!token || !GLOCAL_MONGO) return "Token or database not available";

        return GLOCAL_MONGO.db("accounts").collection('sessions').findOne({ token })
            .then(sessionData => {
                if (!sessionData) return "Session data not found for the token";

                const { initializationVector, authTag, token: encryptedToken } = sessionData;
                const decipher = createDecipheriv('aes-256-gcm', ENCRYPTION_KEY, initializationVector);
                decipher.setAuthTag(Buffer.from(authTag, 'hex'));

                const decrypted = decipher.update(encryptedToken, 'hex', 'utf-8') + decipher.final('utf-8');
                const [username, hashedpass, ip] = decrypted.split('>');

                return { username, hashedpass, ip };
            })
            .catch(error => {
                return "Error getting token data: " + error.message;
            });
    }

    static async getTokenDocument(token) {
        if (!token || !GLOCAL_MONGO) return "Token or database not available";

        return TokenManager.getTokenData(token)
            .then(({ username }) => {
                if (!username) return "Username not found for the token";

                return GLOCAL_MONGO
                    .db("accounts")
                    .collection('login')
                    .findOne({ username });
            })
            .then(userDocument => {
                return userDocument || "User document not found";
            })
            .catch(error => {
                return "Error getting token document: " + error.message;
            });
    }
}

class AccountController {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
        GLOCAL_MONGO = mongoClient;
    }

    async accountExists(newuser) {
        const accountLogins = this.mongoClient.db("accounts").collection('login');
        const projection = { username: 1, email: 1, _id: 0 };
        const query = { $or: [{ username: newuser }, { email: newuser }] };

        return accountLogins.findOne(query, { projection })
            .then(existingUser => existingUser ? { error: "Account with username or email already exists" } : { available: true })
            .catch(err => {
                console.error(err);
                return { error: "Internal server error" };
            });
    }

    async createAccount(username, password, ip) {
        const hashedPassword = await hashSync(password, 10);
        const accountLogins = this.mongoClient.db("accounts").collection('login');

        return accountLogins.findOne({ username })
            .then(existingUser => {
                if (existingUser) return { msg: "Account with username already exists" };

                return accountLogins.insertOne({ username, hashedPassword, ip: `${ip}` })
                    .then(result => result.insertedId ? { msg: "Account has been created" } : { error: 'Internal server error: could not create account' });
            })
            .catch(err => {
                console.error(err);
                return { msg: "Internal server error" };
            });
    }

    async login(useroremail, password) {
        const accountData = await this.mongoClient.db("accounts").collection('login').findOne({ username: useroremail });
        const sessionCol = this.mongoClient.db("accounts").collection('sessions');

        if (!accountData) return { msg: "User not found" };

        const { username, hashedPassword, ip } = accountData;
        const match = await compareSync(password, hashedPassword);

        if (match) {


            return sessionCol.insertOne({ token: authToken, initializationVector, creationDate, authTag: cipher.getAuthTag().toString("hex") })
                .then(() => ({ msg: "Login successful", authToken }))
                .catch(err => {
                    console.error(err);
                    return { msg: "Internal server error" };
                });
        } else {
            return { msg: "User not found" };
        }
    }

    static async sanityCheck(token, reqip) {
        const sessionCol = GLOCAL_MONGO.db("accounts").collection('sessions');
        const loginData = GLOCAL_MONGO.db("accounts").collection('login');
    
        return sessionCol.findOne({ token })
            .then(sessionData => {
                if (!sessionData) return { msg: "Session data not found" };
    
                const { token: authToken, initializationVector, authTag } = sessionData;
                return TokenManager.getTokenData(token)
                    .then(({ username, hashedPassword }) => TokenManager.isTokenValid(authToken, initializationVector, authTag, loginData, hashedPassword, reqip))
                    .then(tokenIsValid => tokenIsValid ? { msg: "Authentication token sanity check succeeded" } : { msg: "Authentication token sanity check failed" })
                    .catch(err => {
                        console.error(err);
                        return { error: "Internal server error" };
                    });
            })
            .catch(err => {
                console.error(err);
                return { error: "Internal server error" };
            });
    }

    async close() {
        try {
            this.mongoClient.close();
            GLOCAL_MONGO = null;
            return { msg: "Connection closed successfully" };
        } catch (err) {
            console.error(err);
            return { error: "Internal server error" };
        }
    }
}

module.exports = { AccountController, TokenManager };