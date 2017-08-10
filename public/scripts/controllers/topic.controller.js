angular.module('myApp')
.controller('TopicController', ['$scope', '$routeParams', 'TopicsService', function($scope, $routeParams, TopicsService) {
  let topicId = $routeParams.id;

  TopicsService.getTopic(topicId)
  .then(topic => {
    console.log('THIS IS OUR TOPIC', topic);
    $scope.topic = topic;
  });

}])