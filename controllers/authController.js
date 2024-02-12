import  bcrypt from "bcrypt";
import  fs from "fs";
import  jwt from "jsonwebtoken";
import  moment from "moment";
const jwtKey = "loginKye";
const saltRounds = 10;
//const salt = '$2b$10$dUsCq5kmu2z9SFZawy56ie'
import  mongoose from 'mongoose';
import User from './../models/usersSchema.js';

const createUser = async (req, res) => {
    const salt = bcrypt.genSaltSync(saltRounds);
	const hashPassword = bcrypt.hashSync(req.body.password, salt);
	req.body.password = hashPassword;
	req.body.createTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
	const user = await User.create(req.body);
	user.save();
	res.status(200).render('login.hbs', { 
		trtrotituy: 22,
		title: `Ползователь ${req.body.name} создан`,
		text: `Процесс создания ползователя ${req.body.name} прошел успешно`,
		email: req.body.email,
		phone: req.body.phone
	});
};

const login = async (req, res) => {
	let dataNew = req.reqM;		
	const token = jwt.sign({
		id: dataNew.id,
		username: req.body.username,
		name: dataNew.name
	}, jwtKey, {
		expiresIn: 36000
	});
	res.cookie('token', token);
	res.status(200).json({status: 1, token});	
};


export {createUser, login}