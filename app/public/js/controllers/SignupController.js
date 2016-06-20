angular.module('signCtrl',[])
.controller('SignupController', function($rootScope, $location, Auth){
  if(!Auth.isLoggedIn()) {
    $location.path('/');
  }
});
