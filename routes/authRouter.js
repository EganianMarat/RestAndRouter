const express = require('express');
const app = express();
const {createUser, login} = require("./../controllers/authController");

const router = express.Router();



router.post("/registration", createUser)
router.post("/login", login)

module.exports = router;
