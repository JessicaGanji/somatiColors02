angular.module('SomatiColors')
	.factory('eventsFactory', eventsFactory)

eventsFactory.$inject = ['$http', '$stateParams']

function eventsFactory($http, $stateParams) {
	var eventsUrl = "https://somaticolors.herokuapp.com/api/users/"
	var events = {};

    events.showEvents = function(user_id) {
		return $http.get(eventsUrl + user_id + '/events')
	}
    
    events.showEvent = function(user_id, event_id) {
		return $http.get(eventsUrl + user_id + '/events/' + event_id)
	}
    
    events.postEvent = function(user_id, data) {
		return $http.post(eventsUrl + user_id + '/events', data)
	}

    events.putEvent = function(user_id, event_id, data) {
		return $http.put(eventsUrl + user_id + '/events/' + event_id, data)
	}

	events.removeEvent = function(user_id, event_id) {
		return $http.delete(eventsUrl + user_id + '/events/' + event_id)
	}

	return events;
};
