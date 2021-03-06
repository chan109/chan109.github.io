var express = require('express');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var app = express();
var passport = require('passport');
var Account = require('./models/account');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors')


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('/statics'));
app.use(cors())
app.use(require('express-session')({
    secret: 'abc123',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect('mongodb://localhost/webdxd');

var studentSchema = {
    firstName: String,
    lastName: String,
    age: Number,
    email: String
};

// var Student = mongoose.model('Student', studentSchema, 'students');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.ejs');
});

app.get('/api/students', function (req, res) {
    Student.find().exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
            // res.render('index', { title: 'WebDxD Students', students: doc});
        }
    });
});

app.delete('/api/student/:id', function(req, res) {
    var studentId = req.params.id;
    Student.findOneAndRemove({_id: studentId}, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

app.get('/api/student/:id', function(req, res) {
    var studentId = req.params.id;
    Student.findById(studentId, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.send(doc);
        }
    });
});

app.get('/student', function (req, res) {
   res.send('Student List!');
});

app.get('/student/:id' ,function (req, res) {
    var studentId = req.params.id;
    Student.findById(studentId, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            res.render('student',{ student: doc});
        }
    });
});

app.post('/student', function(req, res) {
    var updateStudent = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email
    };
    Student.findOneAndUpdate({_id: req.body.id}, updateStudent, {new: true}, function(err, doc){
       res.send(doc);
    });
});

app.post('/api/student/new', function(req, res) {
    if (req.body._id) {
        // Update student
        Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, function (err, doc) {
           res.send(doc);
        });

    } else {
        // Create new student
        var newStudent = new Student(req.body);
        newStudent.save(function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        });
    }
});

app.get('/chat', function(req, res) {
    res.render('chat', {});
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', "Hello Baby");
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

app.get('/login', function(req, res) {
   res.render('login', {});
});

app.get('/signup', function(req, res) {
   res.render('signup', {});
});

app.get('/test', function(req, res) {
    res.send("Hello world")
})


app.post('/signup', function(req, res) {

    Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {

        if (err) {
            res.render('signup', {message: err});
        } else {
            console.log(account);
            res.redirect('/');
        }

    });

});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

http.listen(3000, function(){
    console.log('Server listening on *:3000');
});