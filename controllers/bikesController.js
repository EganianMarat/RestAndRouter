const fs = require("fs");
const dataBase = './src/db/bikes.json';
const bikeController = {}

bikeController.createCar = (req, res) => {
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

bikeController.getCars = (req, res) => {
	if(fs.existsSync(dataBase)) {	
		let dataOld = JSON.parse(fs.readFileSync(dataBase));
		res.send(`Thise is ${JSON.stringify(dataOld[urlParams[2]])} all bikes data`);
	}
	else {
		res.send(`We have no bikes`);
	}
};
	
bikeController.updateCar = (req, res) => {
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
			res.send(`Bike updated`);
		}
		else {
			res.status(404).send(`We have no this bikes`);
		}
	}
	else {	
		res.status(404).send(`Invalid request`);
	}	
};

bikeController.deleteCar = (req, res) => {
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
			res.send(`Bike deleted`);
		}
		else {
			res.status(404).send(`We have no this bikes`);
		}
	}
	else {	
		res.status(404).send(`Invalid request`);
	}
};

module.exports = bikeController;