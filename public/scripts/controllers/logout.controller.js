angular.module('myApp')
.controller('LogoutController', ['$scope', '$window', function($scope, $window){
  $scope.logout = function (){
    localStorage.loggedInUserId = null;
    console.log('logging out', localStorage.loggedInUserId);
    $window.location.href="/login";
  }
}]);