import  fs from "fs";

import  mongoose from 'mongoose';
import  moment from "moment";
import Bike from './../models/bikesSchema.js';

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


const createBike = async (req, res) => {
	req.body.createTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
	console.log(req.decode);
	req.body.user = req.decode.id;
	req.body.slat = await checkSlat(req.body.slat, 'bike');
	const bike = await Bike.create(req.body);	
	bike.save();
	if(bike) res.send(`Bike ${req.body.name} is create`);
};

const getBikes = async (req, res) => {
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

        const bikes = await Bike.find(filter)
        .populate({
            path: "user",
            model: Users
        })
		let mist = '';
		if(bikes.length > 0) {	
			mist = `Thise is `;
			for (let i = 0; i< bikes.length; i++ ) mist += `${bikes[i]}`;
			mist += ` all bikes data`;
		}			
		if(!mist) res.status(401).send(`We have no bikes`);
		else res.status(200).send(mist);
		
	}
	catch (error) {
      console.log(error);
    }
};
	
const updateBike = async (req, res) => {
	try {
		const bike = await Bike.findOneAndUpdate({slat: req.body.slat}, { $set: req.body}, { returnDocument: "after" })
		let mist = '';
		if(bike) mist = `Bike ${bike.name} updated`;			
		if(!mist) {	
			res.status(401).send(`We have no sach bike`);
		}
		else {
			res.status(200).send(mist);
		}
		
	}
	catch (error) {
      console.log(error);
    }	
};

const deleteBike = async (req, res) => {
	try {
		const bike = await Bike.findOneAndDelete({slat: req.params.slat});
		let mist = '';
		if(bike) mist = `Bike ${bike.name} is deleted`;			
		if(!mist) {	
			res.status(401).send(`We have no sach bike`);
		}
		else {
			res.status(200).send(mist);
		}
	}
	catch (error) {
      console.log(error);
    }	
};
const bikeController = {createBike, getBikes, updateBike, deleteBike};
export default bikeController;