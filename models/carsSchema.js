import mongoose from 'mongoose';
const CarSchema = new mongoose.Schema ({
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

const Car = mongoose.model('Car', CarSchema);

export default Car