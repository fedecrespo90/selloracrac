function router ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'js/views/home.html',
      controller: 'HomeController',
    })
    .when('/bandas', {
      templateUrl: 'js/views/bandas.html',
      controller: 'BandController',
      activetab: 'bandas'
    })
    .when('/contacto', {
      controller: 'ContactController',
      templateUrl: 'js/views/contacto.html',
      activetab: 'contacto'
    })
    .when('/agregar', {
      controller: 'AddController',
      templateUrl: 'js/views/agregar.html',
      activetab: 'agregar'
    })
    .when('/login', {
      templateUrl: 'js/views/login.html'
    })
    .when('/signup', {
      templateUrl: 'js/views/signup.html',
      controller: 'SignupController'
    })
    .when("/bandas/:name", {
        templateUrl: 'js/views/bandprofile.html',
        controller: 'BandProfileController'
    })    
    .otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}

angular
  .module('appRoutes', ['ngRoute'])
  .config(router);
