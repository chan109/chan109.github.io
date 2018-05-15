/**********************************************************************
 *		authentication and authorization middlewares
***********************************************************************/

module.exports = {
	isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			console.log('user not logged in');
			res.status(403);
			res.redirdct('back');
		}
	}, 

	checkAdmin (req, res, next) {
		if (req.isAuthenticated()) {
			if (req.user && req.user.isAdmin) {
				next();
			} else {
				console.log('user is not admin');
				res.status(403);
				res.redirdct('back');
			}
		} else {
			console.log('user not logged in');
			res.status(403);
			res.redirdct('back');
		}
	} 
};