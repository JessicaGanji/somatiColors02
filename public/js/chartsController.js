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
  vm.myEmotion = new String()
  vm.params = $stateParams.user_id;

  vm.getEvents = function() {
    eventsFactory.showEvents(vm.params)
      .then(function(response){
        console.log('success back',response)
        response = response.data
        for(var i = 0; i < response.length; i++){
          response[i].events.emotion = new String(response[i].events.emotion)
          console.log(response[i].events.emotion)
        }
        vm.events = response
        vm.data = vm.getData(vm.events)
        console.log(response.events.emotion)
        console.log(String(response.events.emotion))
        console.log(response)
        console.log(vm.data)
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

    for(var j = 0; j < arr.length; j++){
      
        if (arr[j].emotion == "joyful"){
          joy += arr[j].emotion
        } else if (arr[j].category == "accepted"){
          acc += arr[j].emotion
        } else if (arr[j].category == "fearful"){
          fea += arr[j].emotion
        } else if (arr[j].category == "surprised"){
          sur += arr[j].emotion
        } else if (arr[j].category == "sad"){
          sad += arr[j].emotion
        } else if (arr[j].category == "disgusted"){
          dis += arr[j].emotion
        } else if (arr[j].category == "angry"){
          ang += arr[j].emotion
        } else if (arr[j].category == "anticipation"){
          ant += arr[j].emotion
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