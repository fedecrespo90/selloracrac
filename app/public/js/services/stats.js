StatsService = function($http) {
  return $http.get('/api/stats')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}
angular
	.module('Site')
	.factory('stats', ['$http', StatsService]);
