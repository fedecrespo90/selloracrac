
var Stats = require('../models/stats');
var iplocation = require('iplocation');

exports.list = function(req, res) {
  Stats.find(gotStats);
  function gotStats (err, stats) {
    if (err) {
      console.log(err);
      return next();
    }
    return res.json(stats);
  }
};

exports.saveVisitor = function(req, res) {
  console.log(req.connection.remoteAddress);
  iplocation('181.231.47.251', function (error, data) {
    if(error) {
      throw error;
    } else {
      var thisVisitor = new Stats({
        ip : data.ip,
        country_code : data.country_code,
        country_name : data.country_name,
        region_code : data.region_code,
        region_name : data.region_name,
        city : data.city,
        zip_code : data.zip_code,
        time_zone : data.time_zone,
        latitude : data.latitude,
        longitude : data.longitude
      });
      thisVisitor.save(onSaved);
      function onSaved (err, doc) {
        if (err) {
          console.log(err);
          return next(err);
        }
      }
    }
  });
};
