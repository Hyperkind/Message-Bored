angular.module('myApp')
.controller('LoginController', ['$scope', '$rootScope', 'UsersService', '$window', function($scope, $rootScope, UsersService, $window){

  $scope.user = {
    username: '',
    password: ''
  };


  $scope.feedback = '';

  $scope.loginUser = function () {
    console.log('login function on controller running');
    console.log('this is the user we send', $scope.user);

    //any issues here with passing data securely?
    UsersService.loginUser($scope.user)
    .then(user => {
      console.log('came back to controller from loginUser method', user);
      if(!user) {$scope.feedback = 'Not a valid user'}
      else {
        localStorage.loggedInUserId = user.id;
        $window.location.href='/users/' + user.id;
      }

    });

    console.log()


  }



}])