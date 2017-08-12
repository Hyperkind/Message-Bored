angular.module('myApp')
.controller('LogoutController', ['$scope', 'UsersService', '$window', function($scope, UsersService, $window){
  $scope.logout = function (){
    console.log('triggering logout button functionality');
    UsersService.logoutUser()
    .then(result => {
      console.log('coming back from controller', result);
      localStorage.loggedInUserId = null;

      console.log('logging out', localStorage.loggedInUserId);

      $window.location.href="/login";
    });




  }
}]);