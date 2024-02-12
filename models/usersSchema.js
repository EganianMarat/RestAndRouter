import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema ({
		username : {type:String, required:true},
		password : {type:String, required:true},
		name : {type:String, required:true},
		sname : {type:String},
		email : {type:String, required:true},
		phone : {type:String, required:true},
		createTime : {type:String, required:true},
		price: {type : Number},
		currency: {type:String}
	}, 
	{ versionKey: false }, 
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User