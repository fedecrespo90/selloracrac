function SignupCtrl ($rootScope, $location, Auth) {
  if(!Auth.isLoggedIn()) {
    $location.path('/');
  }
}

angular
	.module('signCtrl',[])
	.controller('SignupController', SignupCtrl);
