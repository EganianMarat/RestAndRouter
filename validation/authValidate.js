const bcrypt = require("bcrypt");
const fs = require("fs");
const dataBase = './db/users.json';

const registrationValidator = (req, res, next) => {	
	const LoginHTML = 'login';
	let dataNew = {};
	if(fs.existsSync(dataBase)) dataNew = JSON.parse(fs.readFileSync(dataBase));
	let mist = '';
	if(dataNew[req.body.username]) mist = `Username ${req.body.username} is taken`;	
	if(!mist) {		
		req.reqM = dataNew; 
		next();
	}
	else {
		res.status(401).send(mist);
	}
}
const loginValidator = (req, res, next) => {
	if(fs.existsSync(dataBase)) {
		dataNew = JSON.parse(fs.readFileSync(dataBase));
	}
	else {
		res.status(401).send("There is not so user");
	}
	if(dataNew[req.body.username]) {		
		if(bcrypt.compareSync(req.body.password, dataNew[req.body.username]['password'])) {	
			req.reqM = dataNew; 
			next();
		}
		else {
			res.status(401).send("Invalide user or password");
		}
	}
	else {
		res.status(401).send("There is not so user");
	}
}
module.exports = {registrationValidator, loginValidator};