var app = angular.module('Site', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService'])
  .config(function($httpProvider){
  	$httpProvider.interceptors.push('AuthInterceptor');
  });
