var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var banda_schema = new Schema({
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
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
  ciudad : String,
  created: {type: Date, defauly: Date.now}
});

module.exports = mongoose.model('Banda',banda_schema);
