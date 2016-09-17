function Stats (stats, socket) {
  var self = this;
  self.stats = {};
  stats.success(function(data){
    self.stats = data;
  });
  socket.on('counter', function(data){
    self.counter = data;
  });
}
angular
	.module('Site')
	.controller('StatsController', ['stats', 'socket', Stats]);
