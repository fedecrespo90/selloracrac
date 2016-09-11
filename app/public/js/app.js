angular
	.module('Site', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService','signCtrl', 'angular-loading-bar', 'fileUpload', 'ngAudio'])
  .config(function($httpProvider){
  	$httpProvider.interceptors.push('AuthInterceptor');
  });
