function UserCreatCtrl(User, $location, $window) {
	var vm = this;
	vm.signupUser = function() {
		vm.message = '';
		User.create(vm.userData)
			.then(function(response){
				vm.userData = {};
				vm.message = response.data.message;
				$window.localStorage.setItem('token', response.data.token);
				$location.path('/');
			});
	}
}

function UserCtrl(User) {
	var vm = this;
	User.all()
		.success(function(data){
			vm.users = data;
		})
}

angular
	.module('userCtrl', ['userService'])
	.controller('UserController', UserCtrl)
	.controller('UserCreateController', UserCreatCtrl);
