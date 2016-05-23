
var Schema = require('mongoose').Schema
 
var banda_schema = new Schema({
  name        :   String,
  link        :   String
});

module.exports = banda_schema;