function ContactCtrl ($scope) {
  $scope.$parent.mainBackground = ''; 
  $scope.enviar = function() {
    var nombre = $scope.name;
    var email = $scope.email;
    var contenido = $scope.content;
    
    $scope.name = '';
    $scope.email = '';
    $scope.content = '';
  }
}

angular
    .module('Site')
    .controller('ContactController', ['$scope', ContactCtrl]);
