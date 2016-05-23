app.factory('bandas', ['$http', function($http) {
  return $http.get('./json/bandas.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
