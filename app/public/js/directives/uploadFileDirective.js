function uploadFile($compile){
  return{
    restrict: 'A',
    link: clickInput
  }
};
function clickInput(scope , element, attributes){
  element.bind("click", function(e){
    document.getElementById(attributes["uploadFile"]).click();
  });
};
angular
  .module('Site')
  .directive("uploadFile", uploadFile);
