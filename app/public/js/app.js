var app = angular.module('Site', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'js/views/home.html'
    })
  .when('/bandas', {
      controller: 'BandController',
      templateUrl: 'js/views/bandas.html'
    })
  .when('/contacto', {
      controller: 'ContactController',
      templateUrl: 'js/views/contacto.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
