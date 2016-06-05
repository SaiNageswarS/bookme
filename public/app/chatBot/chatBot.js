'use strict';

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chatBot', {
    templateUrl: 'app/chatBot/chatBot.html',
    controller: 'chatBotCtrl'
  });
}])

.controller('chatBotCtrl', function(UserService) {  
    UserService.login()
      .then(function(currentUser) {
        console.log(currentUser);
      })
      .catch(function(err) {
        console.log(err);
      });
});