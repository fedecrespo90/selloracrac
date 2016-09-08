angular
	.module('Site', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService','signCtrl', 'angular-loading-bar', 'ngAnimate'])
  .config(function($httpProvider){
  	$httpProvider.interceptors.push('AuthInterceptor');
  });
