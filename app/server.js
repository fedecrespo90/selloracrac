var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var stats  = require('./routes/stats');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var counter = 0;
//Connect to mongo
mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}else{
		console.log('Connected to the database');
	}
});

io.sockets.on('connection', function(socket){
	console.log('--------------- user connected --------------------');
	counter++;
	io.emit('counter', counter);
  socket.on('disconnect', function(){
		console.log('--------------- user disconnected --------------------');
		counter--;
		io.emit('counter', counter);
  });
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //false por default
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/favicon.ico', function(req, res){
	//stats.saveVisitor(req, res, counter);
	res.send(200);
});
var api = require('./routes/banda')(app,express);
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
