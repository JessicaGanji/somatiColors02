angular.module('SomatiColors')
  .controller('PieController', PieController)

PieController.$inject = ['eventsFactory', '$rootScope', '$stateParams']

function PieController(eventsFactory, $rootScope, $stateParams) {
  var vm = this
  var newArr = []
  vm.api = eventsFactory
  vm.events = []
  vm.labels = ["Joyful", "Accepted", "Fearful", "Surprised", "Sad", "Disgusted", "Angry", "Anticipation"]
  vm.data = []
  vm.type = 'Doughnut'
//   vm.myEmotion = new String()
  vm.params = $stateParams.user_id;

  vm.getEvents = function() {
    eventsFactory.showEvents(vm.params)
      .then(function(response){
        console.log('success back',response)
        response = response.data
        // for(var i = 0; i < response.events.length; i++){
        //   response.events[i].emotion = new Array(response.events[i].emotion)
        //   console.log(response.events[i].emotion)
        // }
        vm.events = response
        vm.data = vm.getData(vm.events)
        // // console.log(response.events[i].emotion)
        
        // console.log(response)
        // console.log(vm.data)
    })  
  }
  vm.getEvents()
  
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

    for(var j = 0; j < arr.events.length; j++){
      
        if (arr.events[j].emotion == "joyful"){
          joy = joy + 1
        } else if (arr.events[j].emotion == "accepted"){
          acc = acc + 1
        } else if (arr.events[j].emotion == "fearful"){
          fea = fea + 1
        } else if (arr.events[j].emotion == "surprised"){
          sur = sur + 1
        } else if (arr.events[j].emotion == "sad"){
          sad = sad + 1
        } else if (arr.events[j].emotion == "disgusted"){
          dis = dis + 1
        } else if (arr.events[j].emotion == "angry"){
          ang = ang + 1
        } else if (arr.events[j].emotion == "anticipation"){
          ant = ant + 1
        }
    }
    newArr.push(joy, acc, fea, sur, sad, dis, ang, ant)
    console.log(newArr)
    return newArr
  }

  vm.toggle = function() {
    vm.type = vm.type === 'Doughnut' ? 'PolarArea' : 'Doughnut';
  }

  vm.chartParams = {
    colours: ["#14cfd9", "#00D39E", "#02ff13", "#232527", "#ff4949", "#62686D"]
  }

  $rootScope.$on('addEvent', function() {
    vm.getEvents()
  })
  $rootScope.$on('deleteEvent', function() {
    vm.getEvents()
  })
}