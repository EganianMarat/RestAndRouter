const express = require('express');
const fs = require("fs");
const dataBase = './db/auth.json';
const app = express();
const {createUser, login} = require("./../controllers/authController");
const {registrationValidator, loginValidator} = require("./../validation/authValidate")

const router = express.Router();


router.post("/registration", registrationValidator, createUser)
router.post("/login", loginValidator, login)

module.exports = router;
