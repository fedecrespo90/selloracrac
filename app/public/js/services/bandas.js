app.factory('bandas', ['$http', function($http) {
  return $http.get('http://localhost:3000/api')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
