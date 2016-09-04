var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
//var banda  = require('./routes/banda');
var email = require('./routes/email');

var app = express();
var http = require('http').Server(app);

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

var api = require('./routes/banda')(app,express);
app.use('/api', api);

// ROUTES //
app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.post('/send-mail', function(req, res){
	console.log(req.body.name);
	email.sendNow(req, res);
});
//app.get('/api', banda.index);
////app.get('/api/banda/:id', banda.show_edit);
////app.post('/api/up/:id', banda.update);
////app.get('/api/rm/:id', banda.remove);
////app.post('/api/new', banda.create);
//app.post('/api/signup', banda.signup);
//app.get('/api/users', banda.users);
//app.post('/api/login', banda.login);
//app.use(banda.auth);

// ERRORS //
///app.use(banda.err404);
///app.use(banda.err500);

http.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log('API is running on port '+config.port+'!');
	}
});
