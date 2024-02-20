import bcrypt from "bcrypt";
import fs from "fs";
import mongoose from 'mongoose';
import User from './../models/usersSchema.js';

const registrationValidator = async (req, res, next) => {	
	try {
		User.findOne({username: req.body.username}).then((user) => {
			let mist = '';
			if(user) mist = `Username ${req.body.username} is taken`;	
			if(!mist) {	
				next();
			}
			else {
				res.status(401).send(mist);
			}
		});
		
	}
	catch (error) {
      console.log(error);
    }
}
const loginValidator = (req, res, next) => {
	try {
		User.findOne({username: req.body.username}).then((user) => {
			let mist = '';
			if(!user) mist = `There is no ${req.body.username} user`;
			else if(!bcrypt.compareSync(req.body.password, user.password)) mist = `There is wrong password`;
			if(!mist) {		
				req.reqM = user; 
				next();
			}
			else {
				res.status(401).send(mist);
			}
		});
		
	}
	catch (error) {
      console.log(error);
    }
}
export {registrationValidator, loginValidator};