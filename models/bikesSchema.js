import mongoose from 'mongoose';
const BikeSchema = new mongoose.Schema ({
		name : {type:String, required:true},	
		user: {
			type: mongoose.ObjectId,
			ref: "User",
		},
		slat : {type:String, required:true},
		model : {type:String},
		year : {type:String, required:true},
		createTime : {type:String, required:true},
		price: {type : Number},
		currency: {type:String}
	}, 
	{ versionKey: false }, 
	{ timestamps: true }
);

const Bike = mongoose.model('Bike', BikeSchema);

export default Bike