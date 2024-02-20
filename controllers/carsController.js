import fs from "fs";
import  mongoose from 'mongoose';
import  moment from "moment";
import Car from './../models/carsSchema.js';


const checkSlat = async (slat, collection, s) => {
	try {
		let slatVrem = slat + (typeof s !== 'undefined' ? s : '');
		if(!s)	s = 0;
			
		if(typeof collection == 'string') collection = await Car.find().select({
			slat: 1,
			_id: 0
		});
		for (let i = 0; i < collection.length; i++) {
			if(collection[i].slat === slatVrem) {
				return await checkSlat(slat, collection, s+1);
				break;
			}				
		}
		console.log('ready', slatVrem);
		return slatVrem;
	}
	catch (error) {
      console.log(error);
    }
}



const createCar = async (req, res) => {
	req.body.createTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
	req.body.user = req.decode.id;
	req.body.slat = await checkSlat(req.body.slat, 'car');
	const car = await Car.create(req.body);
	car.save();
	if (car) res.send(`Car ${req.body.name} is create`);
};

const createForm = async (req, res) => {
	res.status(200).render('createElement.hbs', {
		element: 'cars',
		title: `Создание машины`,
		text: `Заполните все поля формы`,
		elements: ['slat']
	});
};
const getCars = async (req, res) => {
	try {
		let filter = false;
		if(req.query.length > 0) {
			let temp = {};
			for(let h in req.query) {
				if (h !== 'type' && h !== 'price') temp[h] = arr ? { $in: req.query[h] } : req.query[h];
				else if (h === 'price') temp[h] = { "$gte": req.query.price };
				
			}
			if(req.query.type === 'or')  {
				filter = {
					$or: [temp]
				};
			}
			else {
				filter = {
					$and: [temp]
				};
			}
		}
		

        console.log('filter: ', filter);

        const cars = await Car.find(filter)
        .populate({
            path: "user",
            model: Users
        })
		let mist = '';
		if(cars.length > 0) {	
			mist = `Thise is `;
			for (let i = 0; i< cars.length; i++ ) mist += `${cars[i]}`;
			mist += ` all cars data`;
		}			
		if(!mist) res.status(401).send(`We have no cars`);
		else res.status(200).send(mist);		
	}
	catch (error) {
      console.log(error);
    }
};
	
const updateCar = async (req, res) => {
	try {
		const car = await Car.findOneAndUpdate({slat: req.body.slat}, { $set: req.body}, { returnDocument: "after" });
		let mist = '';
		if(car) mist = `Car ${car.name} updated`;			
		if(!mist) {	
			res.status(401).send(`We have no sach car`);
		}
		else {
			res.status(200).send(mist);
		}
		
	}
	catch (error) {
      console.log(error);
    }	
};

const deleteCar = async (req, res) => {
	try {
		car = await Car.findOneAndDelete({slat: req.params.slat});
		let mist = '';
		if(car) mist = `Car ${car.name} is deleted`;			
		if(!mist) {	
			res.status(401).send(`We have no sach car`);
		}
		else {
			res.status(200).send(mist);
		}		
	}
	catch (error) {
      console.log(error);
    }	
};
const carController = {createCar, createForm, getCars, updateCar, deleteCar};
export default carController;