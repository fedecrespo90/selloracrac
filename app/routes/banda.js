var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/sello'
  , db              = mongoose.createConnection(db_lnk);

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
