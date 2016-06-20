var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var banda  = require('./routes/banda');

//Connect to mongo
mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Connected to the database');
	}
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //false por default
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// ROUTES //
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/api', banda.index);
app.get('/api/banda/:id', banda.show_edit);
app.post('/api/up/:id', banda.update);
app.get('/api/rm/:id', banda.remove);
app.post('/api/new', banda.create);
app.post('/api/signup', banda.signup);
app.get('/api/users', banda.users);
app.post('/api/login', banda.login);
app.use(banda.auth);

app.get('/api/me', function(req,res){
	res.json(req.decoded);
});


// ERRORS //
app.use(banda.err404);
app.use(banda.err500);

app.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log('API is running on port '+config.port+'!');
	}
});
