// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/sello'
  , db              = mongoose.createConnection(db_lnk);

// Creación de variables para cargar el modelo
var banda_schema = require('../models/bandas')
  , Banda = db.model('Banda', banda_schema);

// INDEX //
exports.index = function (req, res, next) {
  Banda.find(gotBands);
  function gotBands (err, bandas) {
    if (err) {
      console.log(err);
      return next();
    }
    return res.json(bandas);
  }
}

// SHOW_EDIT //
exports.show_edit = function (req, res, next) {
  // Obtención del parámetro id desde la url
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
  // Validemos que name  o descripcion no vengan vacíos
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
      // Tenemos el banda, eliminemoslo
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
    // Obtenemos las variables y las validamos
    var name = req.body.name || '';
    var bio  = req.body.bio  || '';
    // Validemos que name o bio no vengan vacíos
    if ((name=== '') || (bio === '')) {
      console.log('ERROR: Campos vacios');
      return res.send('Hay campos vacíos, revisar');
    }
    // Creamos el documento y lo guardamos
    var banda = new Banda({
        name  : name,
        bio   : bio
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
