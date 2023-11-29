const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {AccountController} = require('../controllers/Login');
const { MongoClient } = require('mongodb')

router.use(bodyParser.json());

const mongoClient = new MongoClient("mongodb+srv://ambit:f1jepKOsQbpv6tBv@cluster0.uryu669.mongodb.net");
const ENCRYPTIONKEY = "C*F-JaNdRgUkXp2s58x/A?D(G+KbPeSh";

const accountController = new AccountController(mongoClient, ENCRYPTIONKEY);

router.post('/availability', async (req, res) => {
    const { newuser } = req.body;
    const result = await accountController.accountExists(newuser);
    res.status(result.error ? 409 : 200).json(result);
});

router.post('/create', async (req, res) => {
    const { username, password } = req.body;
    const result = await accountController.createAccount(username, password, req.ip);
    res.status(result.error ? 500 : result.msg ? 200 : 409).json(result);
});

router.post('/login', async (req, res) => {
    const { useroremail, password } = req.body;
    const result = await accountController.login(useroremail, password);
    res.status(result.error ? 500 : result.msg ? 200 : 404).json(result);
});

router.post('/sanitycheck', async (req, res) => {
    const { token } = req.body;
    const reqip = req.ip;
    const result = await accountController.sanityCheck(token, reqip);
    res.status(result.error ? 500 : result.msg ? 200 : 404).json(result);
});

router.post('/tokendata', async (req, res) => {
    const { token } = req.body;

    try {
        const tokenData = await AccountController.getTokenData(token);

        if (tokenData) {
            res.status(200).json(tokenData);
        } else {
            res.status(404).json({ message: 'Token data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;