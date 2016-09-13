function bandas ($scope, bandas) {
	var selectedBand = $scope.$route.current.pathParams.slug;
	$scope.$parent.mainBackground = '';
  bandas.success(function(data){
    $scope.bandas = data;
    $scope.banda = $scope.bandas.filter(function(el) {
    	return el.slug === selectedBand;
    });
    $scope.banda = $scope.banda[0];
    $scope.bandcampSrc = $sce.trustAsResourceUrl($scope.banda.bandcamp.src);   
  });
}

angular
	.module('Site')
	.controller('BandProfileController', ['$scope', 'bandas', '$sce', bandas]);
