const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AccountController = require('../controllers/Login');
router.use(bodyParser.json());

const mongoClient = new MongoClient("mongodb+srv://ambit:f1jepKOsQbpv6tBv@cluster0.uryu669.mongodb.net");
const ENCRYPTIONKEY = "C*F-JaNdRgUkXp2s58x/A?D(G+KbPeSh";

const accountController = new AccountController(mongoClient, ENCRYPTIONKEY);

router.post('/account/availability', (req, res) => {
    const { newuser } = req.body;
    const result = accountController.accountExists(newuser);
    res.status(result.error ? 409 : 200).json(result);
});

router.post('/account/create', (req, res) => {
    const { username, password } = req.body;
    const result = accountController.createAccount(username, password, req.ip);
    res.status(result.error ? 500 : result.msg ? 200 : 409).json(result);
});

router.post('/account/login', (req, res) => {
    const { useroremail, password } = req.body;
    const result = accountController.login(useroremail, password);
    res.status(result.error ? 500 : result.msg ? 200 : 404).json(result);
});

router.post('/account/sanitycheck', (req, res) => {
    const { token } = req.body;
    const reqip = req.ip;
    const result = accountController.sanityCheck(token, reqip);
    res.status(result.error ? 500 : result.msg ? 200 : 404).json(result);
});

module.exports = router;