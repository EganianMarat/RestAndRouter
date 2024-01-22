const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwtKey = "admin";
//const saltRounds = 10;
const salt = '$2b$10$dUsCq5kmu2z9SFZawy56ie'
const dataBase = './db/users.json';

createUser = async (req, res) => {
	let dataNew = [];
	let id = 1;
	let mist = '';
    //const salt = bcrypt.genSaltSync(saltRounds);
    console.log("salt: ", salt);
	const hashPassword = bcrypt.hashSync(req.body.password, salt);	
	if(fs.existsSync(dataBase)) dataNew = JSON.parse(fs.readFileSync(dataBase));
	for(let k in dataNew) {
		if(dataNew[k]['id'] >= req.body.username) id = dataNew[k]['id'] + 1;
		if(req.body.username == dataNew[k]['username']) mist = `Username ${req.body.username} is taken`;
	}
	/* dataNew = {
		id: id,
		name: req.body.name,
		username: req.body.username,
        password: hashPassword
	}*/
	if(!mist) {
		let dataKey = dataNew.length;
		dataNew[dataKey] = {
			id: id,
			...req.body
		}
		dataNew[dataKey].password = hashPassword;
		fs.writeFileSync(dataBase, JSON.stringify(dataNew));
		res.status(200).send("User is ready");
	}
	else {
		res.status(401).send(mist);
	}
};

login = async (req, res) => {
	let key = -1;
	if(fs.existsSync(dataBase)) {
		dataNew = JSON.parse(fs.readFileSync(dataBase));
	}
	else {
		res.status(401).send("There is not so user");
	}
	for(let k in dataNew) {
		if(dataNew[k]['username'] == req.body.username) key = k;
	}
	const token = jwt.sign({
        id: dataNew[key].id,
        username: dataNew[key].username,
        name: dataNew[key].name
    }, jwtKey, {
        expiresIn: "36000"
    });
	if(key > 0) {
		if(bcrypt.compareSync(req.body.password, dataNew[key]['password'])) {
			res.status(200).json({status: 1, token});// .send(`Welcome ${req.body.name}`)
		}
		else {
			res.status(401).send("Invalide user or password");
		}
	}
	else {
		res.status(401).send("There is not so user");
	}
};


module.exports = {
    createUser,
    login
}