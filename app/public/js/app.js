angular
	.module('Site', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService','signCtrl'])
  .config(function($httpProvider){
  	$httpProvider.interceptors.push('AuthInterceptor');
  });
