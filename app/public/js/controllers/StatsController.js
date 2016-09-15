function Stats (stats) {
  self = this;
  self.stats = {};
  stats.success(function(data){
    self.stats = data;
  });
}

angular
	.module('Site')
	.controller('StatsController', ['stats', Stats]);
