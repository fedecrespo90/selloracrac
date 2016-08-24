function homeCtrl ($scope) {
	$scope.$parent.mainBackground = 'home-background';
}

angular
	.module('Site')
	.controller('HomeController', homeCtrl);
