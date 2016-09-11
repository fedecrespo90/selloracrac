function PlayerController ($scope, ngAudio, musica) {
  var url = [];
  var j = 0;
  $scope.toggle = true;
  $scope.toggleText = 'Play';
  musica.success(function(data){
    $scope.temas = data;
    for (var i = 0; i < $scope.temas.length; i++) {
      url[i] = 'api/musica/'+$scope.temas[i];
    }
    $scope.audio = ngAudio.load(url[j]);
    $scope.evaluate = function() {
      if($scope.audio.paused) {
        $scope.audio.play();
        $scope.toggleText = 'Pause';
      } else {
        $scope.audio.pause();
        $scope.toggleText = 'Play';
      }
    }
    $scope.$watch('audio.progress', function(){
      console.log($scope.audio.progress);
      if($scope.audio.progress === 1) {
        j++;
        if(j === $scope.temas.length) {
          j = 0;
        }
        $scope.audio = ngAudio.load(url[j]);
        $scope.audio.play();
      }
    })
  });
}

angular
    .module('Site')
    .controller('PlayerController', ['$scope', 'ngAudio', 'musica', PlayerController]);
