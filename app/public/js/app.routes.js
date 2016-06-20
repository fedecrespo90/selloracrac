angular.module('appRoutes', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/views/home.html'
      })
      .when('/bandas', {
        templateUrl: 'js/views/bandas.html',
        controller: 'BandController'
      })
      .when('/contacto', {
        controller: 'ContactController',
        templateUrl: 'js/views/contacto.html'
      })
      .when('/login', {
        templateUrl: 'js/views/login.html'
      })
      .when('/signup', {
        templateUrl: 'js/views/signup.html'
      })
      .otherwise({
        redirectTo: '/'
      });
      // $locationProvider.html5Mode({
      //   enabled: true,
      //   requireBase: false
      // });
  });
