function bandas ($scope, bandas) {
	$scope.$parent.mainBackground = '';	
  bandas.success(function(data){
    $scope.bandas = data;
  });
}

angular.module('Site')
	.controller('BandController', ['$scope', 'bandas', bandas]);
