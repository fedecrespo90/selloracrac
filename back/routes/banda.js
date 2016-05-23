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
    return res.send({bandas: bandas});
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
    return res.send({banda:banda});
  }
}

// UPDATE // (WITHOUT TEST)
exports.update = function (req, res, next) {
  var id = req.params.id;
  var name = req.body.name || '';
  var link = req.body.link || '';
  // Validemos que nombre o descripcion no vengan vacíos
  if ((nombre=== '') || (descripcion === '')) {
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
      banda.link   = link;
      banda.save(onSaved);
    }
  }
  function onSaved (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect('/banda/' + id)
  }
}

// REMOVE //  (INCOMPLETO)
exports.remove = function (req, res, next) {
  var id = req.params.id

  Producto.findById(id, gotProduct)

  function gotProduct (err, producto) {
    if (err) {
      console.log(err)
      return next(err)
    }

    if (!producto) {
      return res.send('Invalid ID. (De algún otro lado la sacaste tú...)')
    }

    // Tenemos el producto, eliminemoslo
    producto.remove(onRemoved)
  }

  function onRemoved (err) {
    if (err) {
      console.log(err)
      return next(err)
    }

    return res.redirect('/')
  }
}

// CREATE // (INCOMPLETO) 
exports.create = function (req, res, next) {
  if (req.method === 'GET') {
    return res.render('show_edit', {title: 'Nuevo Producto', producto: {}})
  } else if (req.method === 'POST') {
    // Obtenemos las variables y las validamos
    var nombre      = req.body.nombre       || ''
    var descripcion = req.body.descripcion  || ''
    var precio      = req.body.precio       || ''

    // Validemos que nombre o descripcion no vengan vacíos
    if ((nombre=== '') || (descripcion === '')) {
      console.log('ERROR: Campos vacios')
      return res.send('Hay campos vacíos, revisar')
    }

    // Validemos que el precio sea número
    if (isNaN(precio)) {
      console.log('ERROR: Precio no es número')
      return res.send('Precio no es un número !!!!!')
    }

    // Creamos el documento y lo guardamos
    var producto = new Producto({
        nombre        : nombre
      , descripcion   : descripcion
      , precio        : precio
    })

    producto.save(onSaved)

    function onSaved (err) {
      if (err) {
        console.log(err)
        return next(err)
      }

      return res.redirect('/')
    }
  }  
}