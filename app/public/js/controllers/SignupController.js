angular.module('signCtrl',[])
.controller('SignupController', function($rootScope, $location, Auth){
	var vm = this;
	vm.loggedIn = Auth.isLoggedIn();
  if(!Auth.isLoggedIn()) {
    $location.path('/');
  }
});
