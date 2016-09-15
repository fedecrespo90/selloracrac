var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var stats  = require('./routes/stats');

var app = express();
var http = require('http').Server(app);

var count = 0;
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

app.get('/favicon.ico', function(req, res) {
		count++;
		stats.saveVisitor(req, res, count);
    res.send(200);
});
app.use('/api', api);

// ROUTES //
app.get('*', function(req, res){

	res.sendFile(__dirname + '/public/index.html');
});


http.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log('API is running on port '+config.port+'!');
	}
});
