angular.module('myApp')
.controller('UsersController', ['$scope', '$routeParams', 'UsersService', function($scope, $routeParams, Users) {

  Users.getUsers()
  .then((users) => {
    $scope.users = users;
    console.log('this is many users', users);
  });

}]);

