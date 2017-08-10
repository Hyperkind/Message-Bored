angular.module('myApp')
.controller('LoginController', ['$scope', '$rootScope', 'UsersService', '$window', function($scope, $rootScope, UsersService, $window){

  $scope.username = '';

  $scope.loginUser = function () {
    console.log('login function on controller running');

    UsersService.loginUser($scope.username)
    .then(user => {
      console.log('came back to controller from loginUser method', user);
      if(!user) {$scope.feedback = 'Not a valid user'}
      else {
        $rootScope.loggedInUserId = user.id;
        $window.location.href='/users';
      }
    console.log('this is the user id', $rootScope.loggedInUserId);
    });


  }



}])