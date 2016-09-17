function Stats (stats) {
  var socket = io.connect();
  var self = this;
  self.stats = {};
  stats.success(function(data){
    self.stats = data;
  });
  socket.on('counter', function(data){
    self.counter = data;
  })
}
angular
	.module('Site')
	.controller('StatsController', ['stats', Stats]);
