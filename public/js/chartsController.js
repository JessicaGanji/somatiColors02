angular.module('SomatiColors')
  .controller('PieController', PieController)

PieController.$inject = ['eventsFactory', 'usersFactory', '$rootScope', '$stateParams']

function PieController(eventsFactory, usersFactory, $rootScope, $stateParams) {
  var vm = this
  var newArr = []
  vm.api = eventsFactory
  vm.params = $stateParams.user_id;
  vm.events = []
  vm.labels = ["Joyful", "Accepted", "Fearful", "Surprised", "Sad", "Disgusted", "Angry", "Anticipation"]
  vm.data = []
  vm.type = 'Doughnut'
  vm.getUserEventAPI = getUserEventAPI;
  vm.userInfo = {}

//   this grabs the events and the user's emotion colors and sets them
  vm.getEvents = function() {
    getUserEventAPI(vm.params);
    eventsFactory.showEvents(vm.params)
      .then(function(response){
        console.log('success back',response)
        response = response.data
        vm.events = response
        vm.data = vm.getData(vm.events)
        function getColour() {
            console.log(vm.userInfo.joy)
            var joy = vm.userInfo.joy
            var acc = vm.userInfo.acceptance
            var fea = vm.userInfo.fear
            var sur = vm.userInfo.surprise
            var sad = vm.userInfo.sadness
            var dis = vm.userInfo.disgust
            var ang = vm.userInfo.anger
            var ant = vm.userInfo.anticipation
            vm.chartParams = {
                colours: [joy, acc, fea, sur, sad, dis, ang, ant]
            }
        }
        getColour()
    })  
  }
  
  vm.getEvents()
  
// this grabs the user emotion colors
  function getUserEventAPI(user_id) {
        usersFactory.showUser(user_id)
        .then(function(response){
            vm.userInfo = response.data;
            console.log(vm.userInfo);
        });
    };
  
//   this finds the number of times an emotion is in the events for that user and adds it to the chart
  vm.getData = function(arr) {
    var joy = 0
    var acc = 0
    var fea = 0
    var sur = 0
    var sad = 0
    var dis = 0
    var ang = 0
    var ant = 0
    newArr = []

    for(var i = 0; i < arr.events.length; i++) {
        if (arr.events[i].emotion == "joyful") {
          joy = joy + 1
        } else if (arr.events[i].emotion == "accepted") {
          acc = acc + 1
        } else if (arr.events[i].emotion == "fearful") {
          fea = fea + 1
        } else if (arr.events[i].emotion == "surprised") {
          sur = sur + 1
        } else if (arr.events[i].emotion == "sad") {
          sad = sad + 1
        } else if (arr.events[i].emotion == "disgusted") {
          dis = dis + 1
        } else if (arr.events[i].emotion == "angry") {
          ang = ang + 1
        } else if (arr.events[i].emotion == "anticipation") {
          ant = ant + 1
        }
    }
    newArr.push(joy, acc, fea, sur, sad, dis, ang, ant)
    console.log(newArr)
    return newArr
  }

// this reloads the chart when a new event is added
  $rootScope.$on('addEventAPI', function() {
    vm.getEvents()
  })
 
}