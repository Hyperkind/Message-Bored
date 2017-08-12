
//do all our services go in this file???

angular.module('myApp')
.service('UsersService', ['$http', function($http) {


  getUsers = function(){
    return $http.get('/api/users')
    .then(users => {
      return users.data;
    });
  }

  getUser = function(id){
    return $http.get(`/api/users/${id}`)
    .then(user => {
      return user.data;
    });
  }

  addUser = function(user){
    console.log('running addUser method in service');
    console.log('this is the object we are sending to POST', user);
    return $http.post('/register', user)
    .then(user => {
      console.log('THIS IS THE USER THAT COMES BACK ON POST to register', user.data);
      return user.data;
    })
  }

  loginUser = function(user){
    console.log('loginUser method on service running');
    return $http.post('/login', user)
    .then(user => {
      console.log('USER.DATA BACK FROM POST TO /LOGIN', user.data);

    //   if (typeof user.data !== 'object'){
    //     return null;
    //   }
      return user.data;
    })
  }

  logoutUser = function(){
    console.log('logoutUser method running');
    return $http.get('/logout')
    .then(result => {
      console.log('inside UserService returning from logout', result.data);
      return result.data;
    });
  }

  return {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    loginUser: loginUser,
    logoutUser: logoutUser
  }

}])
.service('TopicsService', ['$http', function($http){
  getTopics = function(){
    return $http.get('/api/topics')
    .then(topics => {
      return topics.data;
    });
  }

  getTopic = function(id){
    return $http.get(`/api/topics/${id}`)
    .then(topic => {
      return topic.data;
    });
  }

  addTopic = function(newTopic){
    return $http.post('/api/topics/', newTopic)
    .then(newTopic => {
      return newTopic.data;
    });
  }

  return {
    getTopics: getTopics,
    getTopic: getTopic,
    addTopic: addTopic
  }
}])
.service('MessagesService', ['$http', function($http){

  getMessages = function(){
    return $http.get('/api/messages')
    .then(messages => {
      return messages.data;
    });
  }

  addMessage = function(message){
    return $http.post('/api/messages', message)
    .then(newMessage => {
      return newMessage.data;
    });
  }

  updateMessage = function(id, editedMessage){
    console.log('running the updateMessage method');
    return $http.put(`/api/messages/${id}`, editedMessage)
    .then(updatedMessage => {
      console.log('WHAT updateMessage method on service receives back from db', updatedMessage);
      return updatedMessage.data;
    });
  }

  deleteMessage = function(id) {
    console.log('running the delete message method on service');
    return $http.delete(`/api/messages/${id}`)
    .then(ripMessage => {
      console.log('what comes back to service on delete', ripMessage.data);
      return ripMessage.data;
    })
  }

  return {
    getMessages: getMessages,
    addMessage: addMessage,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage
  }
}]);