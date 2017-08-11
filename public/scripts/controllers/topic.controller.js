angular.module('myApp')
.controller('TopicController', ['$scope', '$routeParams', 'TopicsService', 'MessagesService', function($scope, $routeParams, TopicsService, MessagesService) {
    // $scope.editEnabled = false;
    let topicId = $routeParams.id;

    function loadTopic(topicId){
      return TopicsService.getTopic(topicId)
      .then(topic => {

        topic.messages.forEach(message => {
          console.log('owner?', (message.msgAuthorId.toString() === localStorage.loggedInUserId));
          message.editable = (message.msgAuthorId.toString() === localStorage.loggedInUserId);
          message.editOn = false;
        });

        $scope.topic = topic;
        console.log('RESULTING TOPIC', $scope.topic);
      });
    }

    loadTopic(topicId);

    $scope.addComment = function(){
      let newComment = {
        topic_id: $scope.topic.topicId,
        author_id: localStorage.loggedInUserId,
        body: $scope.commentBox
      }

      MessagesService.addMessage(newComment)
      .then(newComment => {
        console.log('coming back from the server', newComment);
        loadTopic(topicId);
      });

    }

    $scope.editComment = function(index) {
      console.log('our param', index);
      console.log($scope.topic.messages[index]);
      $scope.topic.messages[index].editOn = true;
        //Turn the comment into input
        //Save button appears
        //input has value of old comment
        //save button has its own functionality\
        //cancel button appears and has its own func
    }

    $scope.cancelEdit = function(index){
      $scope.topic.messages[index].editOn = false;
    }

    $scope.saveEdit = function(){
      //on save, we want to do a put to that message
      //we need to pass in the id so we can locate the record
      //the only other thing we're passing in to update is the body of the message
    }

}])