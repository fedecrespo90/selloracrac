angular.module('Site')
    .controller('ContactController', ['$scope', function($scope) {
        $scope.$parent.mainBackground = 'contact-background';         
        $scope.enviar = function() {
            var nombre = $scope.name;
            var email = $scope.email;
            var contenido = $scope.content;
            //enviar mail

            //Limpio el form
            $scope.name = '';
            $scope.email = '';
            $scope.content = '';
        }
    }]);
