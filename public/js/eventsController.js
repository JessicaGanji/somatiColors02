angular.module('SomatiColors')
	.controller('EventsController', EventsController)

EventsController.$inject=['eventsFactory', 'usersFactory', '$stateParams','$location', '$http', '$window']

function EventsController(eventsFactory, usersFactory, $stateParams, $location, $http, $window) {
	var vm = this;
    vm.params = $stateParams.user_id;
    vm.user_emotion = $stateParams.user_id._id;
    vm.events = [];
    vm.getEventsAPI = getEventsAPI;
    vm.getEventAPI = getEventAPI;
    vm.addEventAPI = addEventAPI;
    vm.deleteEventAPI = deleteEventAPI;
    
    vm.userInfo = {};
    vm.updatedUserInfo = {};
    vm.getUserEventAPI = getUserEventAPI;
    // vm.myEmotion = new String()
    vm.showMore = false;

    // Get the list of all events for that user from the API
    function getEventsAPI(user_id) {
       getUserEventAPI(user_id);
       eventsFactory.showEvents(user_id)
        .then(function(response) {
        //   for(var i = 0; i < response.length; i++){
        //     response[i].emotion = new String(response[i].emotion)
        //   }
           vm.events = response.data.events;
           vm.showMore = false;
           
       });
   };
   
   // Call the function of getting the events for that particular user
   getEventsAPI(vm.params);
   
   // Add one event for that user
   vm.addEventInfo = {};
   vm.newEvent = false;
   

   function addEventAPI(user_id) {
       eventsFactory.postEvent(user_id, vm.addEventInfo)
        .then(function(response) {
            vm.addEventInfo = response.data.event;
            // response.data.event.emotion = new String(response.data.event.emotion);
            vm.editing = false;
            getEventsAPI(vm.params);
            vm.newEvent = false;
        });
    };
   
   // Get one event from that user
    vm.eventInfo = {};
    vm.updatedEventInfo = {};
    vm.userInfo = {};
    
    function getUserEventAPI(user_id) {
        usersFactory.showUser(user_id)
        .then(function(response){
            response.emotion = new String(response.date)
            vm.userInfo = response.data;
            vm.updatedUserInfo = response.data;
            console.log(response.data);
        });
    };
     
    function getEventAPI(user_id, event_id) {  
       eventsFactory.showEvent(user_id, event_id)
        .then(function(response) {
            vm.eventInfo = response.data.event;
            vm.updatedEventInfo = response.data.event;
        }); 
    };
    
    // Update one event for that user
    vm.editing = false;
    vm.putEventAPI = putEventAPI;
    vm.editingEventId = null;
    vm.editEventId = editEventId;
    
    function putEventAPI(user_id, event_id) {
        eventsFactory.putEvent(user_id, event_id, vm.updatedEventInfo)
        .then(function(response){
            vm.updatedEventInfo = response.data.data;
            vm.editing = false;
            vm.editingEventId = null;
            getEventsAPI(vm.params)
        });
    };
    
    function editEventId(event_id) {
        vm.editingEventId = event_id
    }
      
     // Delete One Event from the front end to the API using a Factory
    function deleteEventAPI(user_id, event_id) {
        if (window.confirm("Are you sure?") ) {
            eventsFactory.removeEvent(user_id, event_id)
            .then(function(response) {
                $location.path("/user/" + vm.params + "/events")
                $window.location.reload()
            });
        } else {
            console.log("not deleting event!")
        };
    };  
};