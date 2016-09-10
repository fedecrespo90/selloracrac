var User = require('../models/users');
var Banda = require('../models/bandas');
var fileRoute = require('./file');
var config = require('../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		username: user.username
	},secretKey, {
		expiresIn: 86400//1440
	});

	return token;
}

module.exports = function(app, express) {
	var api = express.Router();

	// ALL //
	api.get('/all', function(req, res, next){
		Banda.find(gotBands);
		function gotBands (err, bandas) {
			if (err) {
				console.log(err);
				return next();
			}
			return res.json(bandas);
		}
	});

	// SIGNUP //
	api.post('/signup', function(req, res) {
		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});
		var token = createToken(user);

		user.save(function(err){
			if (err) {
				res.send(err);
				return;
			}
			res.json({
				success: true,
				token: token,
				message: 'User has been created!'
			});
		});
	});

	// USERS //
	api.get('/users', function(req, res) {
		User.find({}, function(err, users){
			if(err){
				res.send(err);
				return;
			}else{
				res.json(users);
			}
		});
	});

	// LOGIN  //
	api.post('/login', function(req, res) {
		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.send({message: "User doesnt exist"});
			}else if(user){
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.send({message: "Invalid Password!"})
				}else{
					/////token
					var token = createToken(user);
					res.json({
						success: true,
						message: "Successfuly login!",
						token: token
					});
				}
			}
		});
	});

	// LOGIN  //
	api.post('/upload', fileRoute.upload);

	api.use(function(req, res, next) {
		console.log("Somebody just came to our app!");
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		// check if token exist
		if (token){
			jsonwebtoken.verify(token, secretKey,function(err,decoded){
				if(err){
					res.status(403).send({success: false, message: "Failed to authenticate user"});
					console.log("La sesión venció. Problema de autenticación.");
				}else{
					//
					req.decoded = decoded;
					next();
				}
			});
		}else{
			res.status(403).send({success: false, message: "No token provided"});
			console.log("La sesión venció. Problema con el token.");
		}
	});

	// // ULTIMO //
	// api.get('/me', function(req,res){
	// 	res.json(req.decoded);
	// });
	return api;
}



// SHOW_EDIT //
exports.show_edit = function (req, res, next) {
  var id = req.params.id;
  Banda.findById(id, gotBand);
  function gotBand (err, banda) {
    if (err) {
      console.log(err)
      return next(err)
    }
    return res.json(banda);
  }
}

// UPDATE //
exports.update = function (req, res, next) {
  var id = req.params.id;
  var name = req.body.name || '';
  var bio = req.body.bio || '';
  var thumbnail  = req.body.thumbnail  || '';
  var cover  = req.body.cover  || '';
  var records  = req.body.records  || '';
  var video  = req.body.video  || '';
  var links  = req.body.links  || '';
  var ciudad  = req.body.ciudad  || '';

  if ((name === '') || (bio === '')) {
    console.log('ERROR: Campos vacios');
    return res.send('Hay campos vacíos, revisar');
  }
  Banda.findById(id, gotBand);
  function gotBand (err, banda) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!banda) {
      console.log('ERROR: ID no existe');
      return res.send('ID Inválida!');
    } else {
      banda.name   = name;
      banda.bio    = bio;
      banda.records = records;
      banda.thumbnail  = thumbnail;
      banda.cover  = cover;
      banda.records  = records;
      banda.video  = video;
      banda.links  = links;
      banda.ciudad  = ciudad;
      banda.save(onSaved);
    }
  }
  function onSaved (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect('/');
  }
}

// REMOVE //
exports.remove = function (req, res, next) {
  var id = req.params.id;
  Banda.findById(id, gotBand);
  function gotBand (err, banda) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!banda == true) {
      return next('Invalid ID.');
    } else {
      banda.remove(onRemoved);
      return next('Band was removed!');
    }
  }
  function onRemoved (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    //return res.redirect('/');
  }
}

// CREATE //
exports.create = function (req, res, next) {
  if (req.method === 'GET') {
    //return res.render('show_edit', {title: 'Nuevo Producto', banda: {}});
  } else if (req.method === 'POST') {
    var name = req.body.name || '';
    var bio  = req.body.bio  || '';
    var records  = req.body.records  || '';
    var thumbnail  = req.body.thumbnail  || '';
    var cover  = req.body.cover  || '';
    var records  = req.body.records  || '';
    var video  = req.body.video  || '';
    var links  = req.body.links  || '';
    var ciudad  = req.body.ciudad  || '';

    if ((name=== '') || (bio === '')) {
      console.log('ERROR: Campos vacios');
      return res.send('Hay campos vacíos, revisar');
    }
    var banda = new Banda({
				creator: req.decoded.id,
        name : name,
        bio : bio,
        records : records,
        thumbnail : thumbnail,
        cover : cover,
        video : video,
        links : links,
        ciudad : ciudad
    });
    banda.save(onSaved);
    function onSaved (err) {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.redirect('/');
    }
  }
}

// ERR 404
exports.err404 = function(req, res, next) {
	res.status(404);
	res.json({msg: "Wrong URL."});
}

// ERR 500
exports.err500 = function (req, res, next) {
	res.status(500);
	res.json({msg: "Server error."})
}
