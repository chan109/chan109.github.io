const User = require('../models/user');
const Class = require('../models/class');

module.exports = {
	index (req, res) {
		User.find({}).populate('classes').then(users => {
			res.send(users);
		})
		.catch(err => {
			res.status(400);
			res.send('error retrieving user information.');
		});
	}, 

	new (req, res) {
		res.send('<h1 style="text-align:center; margin-top:300px">user_controller@new</h1>');
	}, 

	create (req, res) {
		res.send('<h1 style="text-align:center; margin-top:300px">user_controller@create</h1>');
	}, 

	show (req, res) {
		User.findById(req.params.id).populate('classes').then(foundUser => {
			res.send(foundUser);
		}).catch(err => {
			res.status(400);
			res.send('error retrieving user information.');
		});
	}, 

	edit (req, res) {
		res.send('<h1 style="text-align:center; margin-top:300px">user_controller@edit</h1>');
	}, 

	update (req, res) {
		res.send('<h1 style="text-align:center; margin-top:300px">user_controller@update</h1>');
	}, 

	delete (req, res) {
		User.findByIdAndRemove(req.params.id).then((deletedUser) => {
			res.send(deletedUser);
		}).catch(err => {
			res.status(400);
			res.send('error deleting user.');
		});
	} 
};