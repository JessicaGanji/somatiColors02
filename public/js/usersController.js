angular.module('SomatiColors')
	.controller('UsersController', UsersController)

UsersController.$inject = ['$state', 'authFactory', 'usersFactory', '$rootScope', '$window', '$http', '$location', '$scope', '$stateParams']

function UsersController($state, authFactory, usersFactory, $rootScope, $window, $http, $location, $scope, $stateParams) {
	var vm = this;
    vm.params = $stateParams.user_id;
 
    // Sign up and login one user
	vm.user = {};
	vm.loggedIn = authFactory.isLoggedIn();
	vm.signup = signup;
	vm.login = login;
	vm.logout = logout;
	vm.getUser = getUser;
	vm.error = null;

	$rootScope.$on('$stateChangeStart', function() {
		vm.loggedIn = authFactory.isLoggedIn();	
		vm.getUser();
		vm.error = null;
	});	

	function logout() {
		$state.go('loggedOut')
		authFactory.logout();
        console.log("logging out!");
        vm.loggedIn = authFactory.isLoggedIn();
	};

    // Find the user that's logged in
	function getUser() {
		authFactory.getUser()
		.then(function(response) {
			vm.user = response.data;
            vm.user_id = response.data.user_id;
            getUserAPI(vm.user_id);
		});
	};
    
    getUser();

	function signup() {
		authFactory.signup(vm.user.username, vm.user.password)
		.then(function(response) {
			if(response.data.success) {
				vm.login();
			} else {
				vm.error = response.data.message;
			};
		});
	};

	function login() {
		authFactory.login(vm.user.username, vm.user.password)
		.then(function(response) {
			if(response.data.success) {
				$state.go("landing")
			} else {
				vm.error = response.data.message;
			};
		});
	};
    
    
    // Get One User's Info from API and show on front end using a Factory
    vm.info = {};
    vm.updatedInfo = {};
    vm.getUserAPI = getUserAPI;
    
    function getUserAPI(user_id) {
        usersFactory.showUser(user_id)
        .then(function(response) {
            vm.info = response.data;
            vm.updatedInfo = response.data;
        });
    };
    
    // Update One User's Info from front end to API using a Factory
    vm.editing = false;
    vm.putUserAPI = putUserAPI;
    
    function putUserAPI(user_id) {
        usersFactory.putUser(user_id, vm.updatedInfo)
        .then(function(response) {
            vm.info = response.data;
            vm.updatedInfo = response.data;
            vm.editing = false;
        });
    };
 
    // Delete One User from the front end to the API using a Factory 
    vm.deleteUserApi = deleteUserApi;
    
    function deleteUserApi(user_id) {
        if (window.confirm("Are you sure?") ) {
        usersFactory.removeUser(user_id)
            .then(function(response) {
                logout();
                $location.path('/');
            });
        } else {
            console.log("not deleting user!")
        };
    };
};