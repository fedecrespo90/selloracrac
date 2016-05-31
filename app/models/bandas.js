var Schema = require('mongoose').Schema

var banda_schema = new Schema({
  name        :   String,
  bio         :   String,
  thumbnail   :   String,
  cover       :   String,
  records     :   [{
      name  : String,
      cover : String,
      tracks: [{
        name  :  String,
        num   :  Number,
        file  :  String
        }]
  }],
  video : String,
  links : [{
    name : String,
    url  : String
  }],
  ciudad : String
});

module.exports = banda_schema;
