musica = function($http) {
  return $http.get('/api/musica')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}
angular
	.module('Site')
	.factory('musica', ['$http', musica]);
