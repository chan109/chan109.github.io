/**********************************************************************
 *      import libraries
***********************************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");
const cors = require('cors');
const LocalStrategy = require("passport-local");
const User = require('./models/user');
const methodOverride = require('method-override');
const seed_db = require('./seed_db');

/**********************************************************************
 *      setup mongoose 
***********************************************************************/

mongoose.Promise = global.Promise;
const db_url = 'mongodb://patches:pirate@ds149603.mlab.com:49603/class_attendant';
//const db_url = 'mongodb://localhost/class_attendant';
mongoose.connect(db_url);

/**********************************************************************
 *      setup express app
***********************************************************************/

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

/**********************************************************************
 *		passport setup
***********************************************************************/

app.use(require('express-session')({
	secret: 'There is no cute dogs in the world, cats are the best!', 
	resave: false, 
	saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

/**********************************************************************
 *		seed databse
***********************************************************************/
//seed_db.reset_db();

/**********************************************************************
 *      setup routes
***********************************************************************/

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const classRoutes = require('./routes/class');

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/class', classRoutes);

app.all('*', (req, res) => {
	res.status(404);
	res.send('<h1 style="text-align:center; margin-top:300px">404 page not found</h1>');
});

/**********************************************************************
 *      start express app
***********************************************************************/

app.listen(process.env.PORT || 3000, () => {
	console.log(' ');
	if (process.env.PORT) {
        console.log('\x1b[32m%s\x1b[0m', 'Class Attendent app starts serving on port ' + process.env.PORT + ' ...');
      } else {
      	console.log('\x1b[32m%s\x1b[0m', 'Class Attendent app starts serving on port 3000 ...');
      }
      console.log(' ');
});