var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var banda  = require('./routes/banda');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
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

app.listen(3000, function () {
  console.log('API is running on port 3000!');
});
