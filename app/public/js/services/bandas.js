app.factory('bandas', ['$http', function($http) {
  return $http.get('/api')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
