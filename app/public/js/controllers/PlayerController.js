function PlayerController ($scope, ngAudio, musica) {
  var vm = this;
  vm.audioTrack = '';
  vm.url = [];
  vm.temas = [];
  vm.tema = '';
  var j = 0;
  vm.toggle = true;
  vm.toggleText = 'play_arrow';
  musica.success(function(data) {
    vm.temas = data;
    for (var i = 0; i < vm.temas.length; i++) {
      vm.url[i] = 'api/musica/'+vm.temas[i];
    }
    vm.audio = ngAudio.load(vm.url[j]);
    vm.evaluate = function() {
      if(vm.audio.paused) {
        vm.tema = vm.temas[j];
        vm.audio.play();
        vm.toggleText = 'pause';
      } else {
        vm.audio.pause();
        vm.toggleText = 'play_arrow';
      }
    }
    $scope.$watch(
      function() {
        return vm.audio.progress;
      },
      function() {
        if(vm.audio.progress === 1) {
          j++;
          vm.tema = vm.temas[j];
          if(j === vm.temas.length) {
            j = 0;
            vm.tema = vm.temas[j];
          }
          vm.audio = ngAudio.load(vm.url[j]);
          vm.audio.play();
        }
      }
    );
  });
}

angular
    .module('Site')
    .controller('PlayerController', ['$scope', 'ngAudio', 'musica', PlayerController]);
