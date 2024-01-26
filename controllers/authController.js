const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const jwtKey = "loginKye";
const saltRounds = 10;
//const salt = '$2b$10$dUsCq5kmu2z9SFZawy56ie'
const dataBase = './db/users.json';

createUser = async (req, res) => {
	let dataNew = req.reqM;	
	if(!dataNew.length) dataNew.length = 0;
	++dataNew.length;
	dataNew[req.body.username] = {
		id: dataNew.length - 1,
		createTime: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
		...req.body
	}	
    const salt = bcrypt.genSaltSync(saltRounds);
	const hashPassword = bcrypt.hashSync(req.body.password, salt);
	dataNew[req.body.username].password = hashPassword;
	delete dataNew[req.body.username].username;
	fs.writeFileSync(dataBase, JSON.stringify(dataNew));
	res.status(200).render('login.hbs', { 
		trtrotituy: 22,
		title: `Ползователь ${req.body.name} создан`,
		text: `Процесс создания ползователя ${req.body.name} прошел успешно`,
		email: req.body.email,
		phone: req.body.phone
	});
	//res.status(200).send('');
};

login = async (req, res) => {
	let dataNew = req.reqM;		
	const token = jwt.sign({
		id: dataNew[req.body.username].id,
		username: req.body.username,
		name: dataNew[req.body.username].name
	}, jwtKey, {
		expiresIn: "36000"
	});
	res.cookie('token', token);
	res.status(200).json({status: 1, token});	
};


module.exports = {
    createUser,
    login
}