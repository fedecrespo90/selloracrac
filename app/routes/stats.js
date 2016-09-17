
var Stats = require('../models/stats');
var iplocation = require('iplocation');

exports.list = function(req, res) {
  Stats.find({}, null, {sort: {_id: -1 }}, gotStats);
  function gotStats (err, data) {
    if (err) {
      console.log(err);
      return next();
    }
    return res.json(data);
  }
};

exports.saveVisitor = function(req, res, count) {
  iplocation(req.connection.remoteAddress, function (error, data) {
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
        longitude : data.longitude,
        visit_number: count
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

exports.drop = function(req, res) {
  Stats.remove({}, function(err) {
     res.send('collection removed')
  });
};
