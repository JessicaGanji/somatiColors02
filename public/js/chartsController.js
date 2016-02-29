angular.module('SomatiColors')
  .controller('PieController', PieController)

PieController.$inject = ['eventsFactory', '$rootScope']

function PieController(eventsFactory, $rootScope) {
  var vm = this
  var newArr = []
  vm.api = eventsFactory
  vm.events = []
  vm.labels = ["Joy", "Acceptance", "Fear", "Surprise", "Sadness", "Disgust", "Anger", "Anticipation"]
  vm.data = []
  vm.type = 'Doughnut'
  vm.myEmotion = new String()

  vm.getEvents = function() {
    vm.api.list()
      .then(function(response){
        console.log('success back',response)
        response = response.data
        for(var i = 0; i < response.length; i++){
          response[i].emotion = new String(response[i].emotion)
        }
        vm.events = response
        vm.data = vm.getData(vm.events)
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
      
        if (arr[j].category == "Joy"){
          joy += arr[j].emotion
        } else if (arr[j].category == "Acceptance"){
          acc += arr[j].emotion
        } else if (arr[j].category == "Fear"){
          fea += arr[j].emotion
        } else if (arr[j].category == "Surprise"){
          sur += arr[j].emotion
        } else if (arr[j].category == "Sadness"){
          sad += arr[j].emotion
        } else if (arr[j].category == "Disgust"){
          dis += arr[j].emotion
        } else if (arr[j].category == "Anger"){
          ang += arr[j].emotion
        } else if (arr[j].category == "Anticipation"){
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