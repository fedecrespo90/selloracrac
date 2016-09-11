function bandas ($scope, bandas) {
	var selectedBand = $scope.$route.current.pathParams.slug;
	$scope.$parent.mainBackground = '';
  bandas.success(function(data){
    $scope.bandas = data;
    $scope.banda = $scope.bandas.filter(function(el) {
    	return el.name === selectedBand;
    });
    $scope.banda = $scope.banda[0];
  });
}

angular
	.module('Site')
	.controller('BandProfileController', ['$scope', 'bandas', bandas]);
