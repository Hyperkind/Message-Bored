// creation uses a 2nd array argument to import dependencies
angular.module('myApp', ['ngRoute']);

// retrieval has only one argument
var myApp = angular.module('myApp');

myApp
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'HomeController'
  })
  .when('/users', {
    templateUrl: 'users.html',
    controller: 'UsersController'
    //how does it know what UsersController is?????????
    //what does this do?? is it saying when routed to /users,
    //we're going to pull in whatever's in users.html into wherever ng-view
    //is on index.html? or home.html??? and that is the same div that then
    //will have UsersController apply to it?
  })
  .when('/users/:id', {
    templateUrl: 'user.html',
    controller: 'UserController'
  })
  .when('/topics/:id', {
    templateUrl: 'topic.html',
    controller: 'TopicController'
  })
  .when('/latest', {
    templateUrl: 'latestMsgs.html',
    controller: 'LatestMessagesController'
  })
  .when('/register', {
    templateUrl: 'register.html',
    controller: 'RegisterController'
  })
  .when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginController'
  })
  .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);
}])
.run([function(){
     // initialize
    console.log('running');

}]);