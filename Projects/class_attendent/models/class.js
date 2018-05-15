const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const ClassSchema = new Schema({
	name: {
		type: String, 
		required: true 
	}, 
	instructor: {
		type: Schema.Types.ObjectId, 
		ref: 'user' 
	}, 
	course_length: {
		type: Number
	}, 
	class_size: {
		type: Number 
	}, 
	img_src: {
		type: String 
	}, 
	tag: [{
		type: String 
	}], 
	ta: [{
		type: Schema.Types.ObjectId, 
		ref: 'user' 
	}], 
	start_date: {
		type: Date, 
		default: Date.now 
	}, 
	end_date: {
		type: Date, 
		default: Date.now 
	}, 
	students: [{
		type: Schema.Types.ObjectId, 
		ref: 'user' 
	}], 
	days: [{
		attended: [{
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		}], 
		absent: [{
			type: Schema.Types.ObjectId, 
			ref: 'user' 
		}] 
	}] 
});

const Class = mongoose.model('class', ClassSchema);
module.exports = Class;