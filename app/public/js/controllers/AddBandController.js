function AddBandController ($scope, Auth, $location) {
  var self = this;
  if(!Auth.isLoggedIn()) {
    $location.path('/');
  } else {
    $scope.$parent.mainBackground = 'contact-background';
  }
}

angular
    .module('Site')
    .controller('AddBandController', ['$scope', 'Auth', '$location', AddBandController]);
