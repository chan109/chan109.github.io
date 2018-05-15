const Class = require('../models/class');
const User = require('../models/user');

module.exports = {
	index (req, res) {
		Class.find({}).populate('students').populate('days.attended').populate('days.absent')
		.then(classes => {
			res.send(classes);
		})
		.catch(err => {
			res.status(400);
			res.send('error retrieving class information.');
		});
	}, 

	new (req, res) {
		res.send('<h1 style="text-align:center; margin-top:300px">class_controller@new</h1>');
	},

	create (req, res) {
		const name = req.body.name.trim();
		const instructor = req.body.instructor;
		const start_date = new Date(req.body.start_date);
		const end_date = new Date(req.body.end_date);
		const new_class = new Class({
			name: name, 
			instructor: instructor, 
			start_date: start_date, 
			end_date: end_date, 
			days: [] 
		});
		Class.create(new_class).then(createdClass => {
			res.send(createdClass);
		}).catch(err => {
			res.status(400);
			res.send('error creating new class');
		});
	}, 

	show (req, res) {
		Class.findById(req.params.id).populate('students').populate('days.attended').populate('days.absent')
		.then(classes => {
			res.send(classes);
		})
		.catch(err => {
			res.status(400);
			res.send('error retrieving class information.');
		});
	}, 

	edit (req, res) {
		res.send('<h1 style="text-align:center; margin-top:300px">class_controller@edit</h1>');
	}, 

	update (req, res) {
		const class_id = req.params.id;
		const class_props = req.body;
		Class.findByIdAndUpdate(class_id, class_props, {new: true}).then(updatedClass => {
			res.send(updatedClass);
		}).catch(err => {
			res.status(400);
			res.send('error updating class information.');
		});
	}, 

	delete (req, res) {
		Class.findByIdAndRemove(req.params.id).then(deletedClass => {
			res.send(deletedClass);
		}).catch(err => {
			res.status(400);
			res.send('error deleting class.');
		});
	}, 

	add_student (req, res) {
		const class_id = req.params.id;
		const student_id = req.body.student_id;
		User.findById(student_id).then(foundStudent => {
			Class.findById(class_id).then(foundClass => {
				if (foundClass.students.indexOf(student_id) < 0) {
					foundClass.students.push(foundStudent._id);
					foundClass.save()
					.then(updatedClass => {
						res.send(updatedClass);
						return ;
					})
					.catch(err => {
						console.log(err);
						res.status(400);
						res.send('error updating class.');
					});
				} else {
					res.send(foundClass);
					return ;
				} 
			}).catch(err => {
				console.log(err);
				res.status(400);
				res.send('invalid class id');
			});
		}).catch(err => {
			res.status(400);
			res.send('invalid student id');
		});
	}, 

	add_attendent (req, res) {
		const class_id = req.params.id;
		const day_index = parseInt(req.body.day_index);
		const student_id = req.body.student_id;

		Class.findById(class_id).then(foundClass => {
			if (day_index === foundClass.days.length) {
				foundClass.days.push({
					attended: [], 
					absent: foundClass.students 
				});
			} else if (day_index > foundClass.days.length) {
				res.status(400);
				res.send('invalid day number.');
				return ;
			}
			User.findById(student_id)
			.then(foundUser => {
				console.log(foundUser);
				if (foundClass.days[day_index].attended.indexOf(foundUser._id) < 0) {
					foundClass.days[day_index].attended.push(foundUser._id);
					foundClass.days[day_index].absent.remove(foundUser._id);
					foundClass.save().then(updatedClass => {
						res.send(updatedClass);
					}).catch(err => {
						res.status(400);
						res.send('error updating class information.');
						return ;
					});
				} else {
					res.send(foundClass);
					return ;
				}
			}).catch(err => {
				res.status(400);
				res.send('error retrieving student information.');
				return ;
			});
		}).catch(err => {
			res.status(400);
			res.send('error retrieving class information.');
			return ;
		});
	}, 

	remove_attendent (req, res) {
		const class_id = req.params.id;
		const day_index = parseInt(req.body.day_index);
		const student_id = req.body.student_id;

		Class.findById(class_id).then(foundClass => {
			if (day_index >= foundClass.days.length) {
				res.status(400);
				res.send('invalid day number.');
				return ;
			}
			User.findById(student_id)
			.then(foundUser => {
				console.log(foundUser);
				if (foundClass.days[day_index].attended.indexOf(foundUser._id) >= 0) {
					foundClass.days[day_index].attended.remove(foundUser._id);
					foundClass.days[day_index].absent.push(foundUser._id);
					foundClass.save().then(updatedClass => {
						res.send(updatedClass);
					}).catch(err => {
						res.status(400);
						res.send('error updating class information.');
						return ;
					});
				} else {
					res.send(foundClass);
					return ;
				}
			}).catch(err => {
				res.status(400);
				res.send('error retrieving student information.');
				return ;
			});
		}).catch(err => {
			console.log(err);
			res.status(400);
			res.send('error retrieving class information.');
			return ;
		});
	}
};