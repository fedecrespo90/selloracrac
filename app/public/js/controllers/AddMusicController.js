AddMusicController = function(musica, Auth, $location) {
  if(!Auth.isLoggedIn()) {
    $location.path('/');
  } else {
    var self = this;
    musica.success(function(data){
      self.files = data;
    });
  }

}
angular
    .module('Site')
    .controller('AddMusicController', ['musica', 'Auth', '$location', AddMusicController]);
  //'musica'
