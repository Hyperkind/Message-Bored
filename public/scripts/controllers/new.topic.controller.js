angular.module('myApp')
.controller('NewTopicController', ['TopicsService', '$rootScope', '$window', '$scope', function(TopicsService, $rootScope, $window, $scope){

  console.log('logged in user id', localStorage.loggedInUserId);

  $scope.newTopic = {
    name: '',
    created_by: localStorage.loggedInUserId
  };




  $scope.addTopic = function(){
    TopicsService.addTopic($scope.newTopic)
    .then(newTopic => {
      console.log('coming back to controller from TopicsService addTopic method', newTopic);
      $window.location.href=`/topics/${newTopic.id}`;

    });
  }


}]);