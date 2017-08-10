angular.module('myApp')
.controller('LatestMessagesController', ['$scope', 'MessagesService', function($scope, MessagesService) {

  MessagesService.getMessages()
  .then(messages => {
    $scope.messages = messages;
    console.log('THESE ARE OUR MESSAGES', messages);
  });

}]);