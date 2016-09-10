angular
	.module('Site', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService','signCtrl', 'angular-loading-bar', 'fileUpload'])
  .config(function($httpProvider){
  	$httpProvider.interceptors.push('AuthInterceptor');
  });
