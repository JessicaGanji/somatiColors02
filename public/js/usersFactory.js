angular.module('SomatiColors')
	.factory('usersFactory', usersFactory)

usersFactory.$inject = ['$http', '$stateParams']

function usersFactory($http, $stateParams){
	var usersUrl = "https://somaticolors.herokuapp.com/api/"
    
	var users = {};

    users.showUser = function(user_id) {
		return $http.get(usersUrl + 'users/' + user_id);
	};

    users.postUser = function(user_id, data) {
		return $http.post(usersUrl + 'users/' + user_id);
	};

    users.putUser = function(user_id, data) {
		return $http.put(usersUrl + 'users/' + user_id, data);
	};

	users.removeUser = function(user_id) {
		return $http.delete(usersUrl + 'users/' + user_id);
	};

	return users;
};