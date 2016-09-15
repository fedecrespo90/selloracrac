var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stats_schema = new Schema({
  ip : String,
  country_code : String,
  country_name : String,
  region_code : String,
  region_name : String,
  city : String,
  zip_code : String,
  time_zone : String,
  latitude : String,
  longitude : String,
  visit_number: Number
});

module.exports = mongoose.model('Stats', stats_schema);
