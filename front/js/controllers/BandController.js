app.controller('BandController', ['$scope', 'bandas', function($scope, bandas) {
  bandas.success(function(data){
    $scope.bandas = data;
  });
}]);
