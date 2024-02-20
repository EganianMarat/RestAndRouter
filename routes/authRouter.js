import {Router} from 'express';
import fs from "fs";
import {createUser, login, loginForm} from "./../controllers/authController.js";
import  {registrationValidator, loginValidator} from "./../validation/authValidate.js"
const router = Router();



router.post("/registration", registrationValidator, createUser)
router.post("/login", loginValidator, login)
router.get("/login", loginForm)

export default router;
