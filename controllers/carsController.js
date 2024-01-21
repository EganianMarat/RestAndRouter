const fs = require("fs");
const dataBase = './src/db/bikes.json';
const carController = {}

carController.createCar = (req, res) => {
	let dataNew = [];
	if(fs.existsSync(dataBase)) dataNew = JSON.parse(fs.readFileSync(dataBase));	
	let maxId = 0;
	for(let r in dataNew) {
		if(maxId < ( dataNew[r].id * 1 ) ) maxId = dataNew[r].id * 1;
	}			
	dataNew.push({
		id: maxId + 1,
		...req.body
	})
	fs.writeFileSync(dataBase, JSON.stringify(dataNew));
	res.send(`bike ${req.body.name} is create`);	
};

carController.getCars = (req, res) => {
	if(fs.existsSync(dataBase)) {	
		let dataOld = JSON.parse(fs.readFileSync(dataBase));
		res.send(`Thise is ${JSON.stringify(dataOld[urlParams[2]])} all cars data`);
	}
	else {
		res.send(`We have no cars`);
	}
};
	
carController.updateCar = (req, res) => {
	if(fs.existsSync(dataBase) && req.params.id) {
		let dataNew = [];
		dataNew = JSON.parse(fs.readFileSync(dataBase));
		let key = -1;
		for(let k in dataNew) {
			if(dataNew[k]['id'] == req.params.id) key = k;
		}	
		if(key > -1) {
			for(let k in req.body) {				
				dataNew[key][k] = req.body[k];
			}
			fs.writeFileSync(dataBase, JSON.stringify(dataNew));
			res.send(`Car updated`);
		}
		else {
			res.status(404).send(`We have no sach car`);
		}
	}
	else {	
		res.status(404).send(`Invalid request`);
	}	
};

carController.deleteCar = (req, res) => {
	if(fs.existsSync(dataBase) && req.params.id) {
		let dataNew = [];
		dataNew = JSON.parse(fs.readFileSync(dataBase));
		let key = -1;
		for(let k in dataNew) {
			if(dataNew[k]['id'] == req.params.id) key = k;
		}	
		if(key > -1) {
			delete(dataNew[key]);
			fs.writeFileSync(dataBase, JSON.stringify(dataNew));
			res.send(`Car deleted`);
		}
		else {
			res.status(404).send(`We have no this cars`);
		}
	}
	else {	
		res.status(404).send(`Invalid request`);
	}
};

module.exports = carController;