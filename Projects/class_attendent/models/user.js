const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
	username: {
		type: String 
	}, 
	password: {
		type: String 
	}, 
	email: {
		type: String 
	}, 
	role: {
		type: String 
	}, 
	hobbies: [{
		type: String
	}], 
	phone: {
		type: String 
	}, 
	register_date: {
		type: Date, 
		default: Date.now 
	}, 
	isAdmin: {
		type: Boolean, 
		default: false 
	}, 
	classes: [{
		type: Schema.Types.ObjectId, 
		ref: 'class' 
	}] 
});

UserSchema.plugin(passportLocalMongoose, {
	usernameField: 'username', 
	passwordField: 'password' 
});

const User = mongoose.model('user', UserSchema);
module.exports = User;