function homeCtrl ($scope, socket) {
	$scope.$parent.mainBackground = 'home-background';
	var self = this;
	socket.on('counter', function(data){
		self.counter = data;
	});
}

angular
	.module('Site')
	.controller('HomeController', ['$scope','socket', homeCtrl]);
