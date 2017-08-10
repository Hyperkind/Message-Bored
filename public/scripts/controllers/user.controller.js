angular.module('myApp')
.controller('UserController', ['$scope', '$routeParams', 'UsersService', function($scope, $routeParams, Users) {

  let userId = $routeParams.id;
  console.log('this is our route params id', userId);

  Users.getUser(userId)
  .then(user => {
    $scope.user = user;
    console.log('scope single user', user);
  });

}]);

