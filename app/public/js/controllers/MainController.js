function MainCtrl ($rootScope, $location, Auth, $scope, $route) {
	$scope.$route = $route;
	$scope.$parent.mainBackground = '';
	$scope.error = false;		
	var vm = this;
	vm.loggedIn = Auth.isLoggedIn();
	$rootScope.$on('$routeChangeStart', function(){
		vm.loggedIn = Auth.isLoggedIn();
		Auth.getUser()
			.then(function(data){
				vm.user = data.data;
			});
	});
	vm.doLogin = function(){
		vm.processing = true;
		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data){
				vm.processing = false;
				Auth.getUser()
					.then(function(data){
						vm.user = data.data;
					});
				if(data.success)
					$location.path('/');
				else
					$scope.error = true;
				  console.log('error');
			});
	}
	vm.doLogout = function(){
		Auth.logout();
		$location.path('/logout');
	}
}

angular
	.module('mainCtrl',[])
	.controller('MainController', MainCtrl);
