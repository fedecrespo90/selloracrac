var File = require('../models/files');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

getDirectories = function(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

exports.upload = function(req, res){
  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    //saveName(req, res, file.name);
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    console.log("New file was uploaded!");
  });

  // parse the incoming request containing the form data
 form.parse(req);
};

saveName = function(req, res, name) {
  var thisName = name;
  if ((thisName === '')) {
    console.log('ERROR: Campos vacios');
    return res.send('Hay campos vacíos, revisar');
  }
  var thisFile = new File({
      name : name
  });
  thisFile.save(onSaved);
  function onSaved (err, doc) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.end(String(req.get('host'))+'/file/'+String(doc._id));
  }
};



exports.item = function(req, res, next) {
  var filePath = path.join(__dirname, '../uploads/');
  res.sendFile(filePath+req.params.name);

  // fs.readdir(filePath, function(err, filenames) {
  //   if (err) {
  //     throw err;
  //     return;
  //   }
  //   //res.sendFile(filePath+filenames[randomInt(0,filenames.length)]);
  // });
  //Store
  // File.findById(req.params.id, gotFile);
  // function gotFile (err, thisF) {
  //   if (err) {
  //     console.log(err)
  //     return next(err)
  //   }
  //   res.sendFile(path.join(__dirname, '../uploads/'+thisF.name));
  // }
};

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

exports.list = function(req, res) {
  var list = [];
  var filePath = path.join(__dirname, '../uploads/');
  fs.readdir(filePath, function(err, filenames) {
    for (var i = 0; i < filenames.length; i++) {
      if(path.extname(filenames[i]) == '.mp3') {
        list[i] = filenames[i];
      }
    }
    if (err) {
      throw err;
      return;
    }
    res.json(shuffle(list));
  });
};
