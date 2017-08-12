angular.module('myApp')
.controller('NavMenuController', ['$scope', function($scope) {
  console.log('nav controller is running');
  $scope.loggedIn = localStorage.loggedIn;
  console.log('this is our loggedin', $scope.loggedIn);
}]);