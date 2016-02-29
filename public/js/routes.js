angular.module('SomatiColors')
    .config(MainRouter)
    .config(interceptor)

function interceptor($httpProvider) {
 $httpProvider.interceptors.push('authInterceptorFactory')
};
        
function MainRouter ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/')  
    
    $stateProvider    
        .state('landing', {
            url: '/',
            templateUrl: '../partials/landing.html'
        })
        
        .state('about', {
            url: '/about',
            templateUrl: '../partials/about.html'
        })

        .state('login', {
            url: '/login',
            templateUrl: '../partials/login.html',
            controller: 'UsersController as usersCtrl'
        })

        .state("signup", {
            url: '/signup',
            templateUrl: '../partials/signup.html',
            controller: "UsersController as usersCtrl"
        })

         .state('loggedOut', {
            url: '/loggedOut',
            templateUrl: '../partials/landing.html',
            controller: "UsersController as usersCtrl"
        })

        .state('user', {
            url: '/user/:user_id',
            templateUrl: '../partials/user.html',
            controller: 'UsersController as usersCtrl'
        })
        
        .state('events', {
            url: '/user/:user_id/events',
            templateUrl: '../partials/events.html',
            controller: 'EventsController as eventsCtrl'
        })
};