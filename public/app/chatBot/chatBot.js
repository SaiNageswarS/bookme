'use strict';

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chatBot', {
    templateUrl: 'app/chatBot/chatBot.html',
    controller: 'chatBotCtrl'
  });
}])

.controller('chatBotCtrl', function($scope, UserService) {  
    UserService.login()
      .then(function(currentUser) {
        console.log(currentUser);
        $scope.currentUser = currentUser;
      })
      .catch(function(err) {
        console.log(err);
      });
});