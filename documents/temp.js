var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    //console.log(filenames[0]);
    console.log(filenames[req.params.num]);
    // filenames.forEach(function(filename) {
    //   fs.readFile(dirname + filename, 'utf-8', function(err, content) {
    //     if (err) {
    //       onError(err);
    //       return;
    //     }
    //     onFileContent(filename, content);
    //   });
    // });
  });
}

var data = {};
readFiles(__dirname+'/uploads/', function(filename, content) {
  //data[filename] = content;

}, function(err) {
  throw err;
});
