angular.module('myApp')
.controller('RegisterController', ['$scope', 'UsersService', function($scope, UsersService){

  $scope.newUser = {
    username: ''};

  $scope.addUser = function () {
    let ourNewUser = {
      username: $scope.newUser.username
    };

    console.log('OUR NEW USER', ourNewUser);

    UsersService.addUser(ourNewUser)
    .then(user => {
      console.log('came back to controller', user);
      $scope.newUser.username = '';
      $scope.successMsg = 'Registered!';
    });


  }



}])