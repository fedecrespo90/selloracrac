function Stats (stats) {
  self = this;
  self.stats = {};
  setInterval(function(){
    stats.success(function(data){
      self.stats = data;
    });
  },1000);
}

angular
	.module('Site')
	.controller('StatsController', ['stats', Stats]);
