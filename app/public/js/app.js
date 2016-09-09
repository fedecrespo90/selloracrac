angular
	.module('Site', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService','signCtrl', 'angular-loading-bar'])
  .config(function($httpProvider){
  	$httpProvider.interceptors.push('AuthInterceptor');
  });
