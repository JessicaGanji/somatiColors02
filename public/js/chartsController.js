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
//   vm.joy = vm.userInfo.joy

  
  vm.getEvents = function() {
    getUserEventAPI(vm.params);
    eventsFactory.showEvents(vm.params)
      .then(function(response){
        console.log('success back',response)
        response = response.data
        vm.events = response
        vm.data = vm.getData(vm.events) 
        console.log(vm.userInfo.joy)
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
        console.log(vm.chartParams.colours)
    })  
  }
  
  vm.getEvents()
  
  function getUserEventAPI(user_id) {
        usersFactory.showUser(user_id)
        .then(function(response){
            vm.userInfo = response.data;
            console.log(vm.userInfo);
        });
    };
  
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

//   vm.toggle = function() {
//     vm.type = vm.type === 'Doughnut' ? 'PolarArea' : 'Doughnut';
//   }
  
//   function getColour(){
//     //   getUserEventAPI(vm.params)
//       console.log(vm.joy)

//   }
  
//   getColour()
  
  

  $rootScope.$on('addEvent', function() {
    vm.getEvents()
  })
  $rootScope.$on('deleteEvent', function() {
    vm.getEvents()
  })
}