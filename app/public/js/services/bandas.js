angular
	.module('Site')
	.factory('bandas', ['$http', function($http) {
	  return $http.get('/api/all')
	         .success(function(data) {
	           return data;
	         })
	         .error(function(data) {
	           return data;
	         });
	}]);
