function addInput($compile){
  return{
    restrict: 'A',
    link: function(scope , element){
      element.bind("click", function(e){
        var childNode = $compile('<input class="form-control link-input" type="text" name="name" placeholder="Nombre del Link. Ej: Youtube, Facebook, Bandcamp, etc." ng-model="name"><input class="form-control link-input" type="text" name="name" placeholder="Link" ng-model="name">')(scope)
        element.parent().append(childNode);
      });
    scope.doStuff = function(){
      // do stuff
    }
   }
  }
}
angular
  .module('Site')
  .directive("addInput", addInput);
