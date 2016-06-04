'use strict';

angular.module('bookme.chatBot', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chatBot', {
    templateUrl: 'app/chatBot/chatBot.html',
    controller: 'chatBotCtrl'
  });
}])

.controller('chatBotCtrl', [function() {

}]);