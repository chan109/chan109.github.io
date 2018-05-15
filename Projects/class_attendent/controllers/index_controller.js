const User = require('../models/user');
const Class = require('../models/class');
const passport = require("passport");

module.exports = {
	home (req, res) {
		User.find({}).then(users => {
			Class.find({}).then(classes => {
				res.render('index', {
					users: users, 
					classes: classes 
				});
			});
		})
		.catch(err => {
			console.log('\x1b[31m%s\x1b[0m', err.body.message);
			res.redirect('back');
			return ;
		});
	}, 

	register_form (req, res) {
		res.render('register');
	}, 

	register (req, res) {
		var name = req.body.username.trim();
		var email = req.body.email.trim();
		var password = req.body.password.trim();

		if (!(name && email && password)) {
			console.log('\x1b[33m%s\x1b[0m', 'Error creating new user: required field missing.');
			res.redirect('back');
			return ;
		}
		if (name.toLowerCase() === 'admin' || name.toLowerCase() === 'root') {
			console.log('\x1b[33m%s\x1b[0m', 'Error creating new user: invalid username.');
			res.redirect('back');
			return ;
		}

		User.count({username: name, email: email}).then(count => {
			if (count !== 0) {
				console.log('\x1b[33m%s\x1b[0m', 'Error creating new user: duplicate user name email pair.');
				res.redirect('back');
			} else {
				const user = new User({
					username: name, 
					email: email 
				});
				User.register(user, password, (err, newUser) => {
					if (err) {
						console.log(err);
						console.log('\x1b[31m%s\x1b[0m', 'Error registering new user: ');
						res.redirect('back');
					} else {
						passport.authenticate('local')(req, res, () => {
							res.redirect('/');
						});
					}
				});
			}
		}).catch(err => {
			res.status(400);
			console.log('\x1b[31m%s\x1b[0m', 'error registering new user');
			res.redirect('back');
		});
	}, 

	login_form (req, res) {
		res.render('login');
	}, 

	login (req, res, next) {
		passport.authenticate('local', {
			successRedirect: '/', 
			failureRedirect: '/login' 
		})(req, res, next);
	}, 

	logout (req, res) {
		req.logout();
		res.redirect('/');
	} 
};