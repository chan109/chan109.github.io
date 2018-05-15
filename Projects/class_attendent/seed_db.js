const User = require('./models/user');
const Class = require('./models/class');

module.exports = {
	reset_db () {
		User.remove({}).then(() => {
			console.log('\x1b[34m%s\x1b[0m', 'user collection has been droped.');
			Class.remove({}).then(() => {
				console.log('\x1b[34m%s\x1b[0m', 'class collection has been droped.');
				const user = new User({
					username: 'admin', 
					role: 'admin', 
					isAdmin: true 
				});
				User.register(user, 'admin', (err, newUser) => {
					if (err) {
						console.log('\x1b[33m%s\x1b[0m', 'error creating admin user.');
						console.log('\x1b[33m%s\x1b[0m', err);
						return ;
					} else {
						console.log('\x1b[34m%s\x1b[0m', 'admin user created.');
					}
				});
			});
		})
		.catch(err => {
			console.log('\x1b[33m%s\x1b[0m', err);
		});
	} 
};