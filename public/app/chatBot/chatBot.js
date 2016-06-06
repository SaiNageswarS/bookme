'use strict';

// Todo: remove it as constant
var appId = "a48475b7-7eb3-4b02-841e-280d50c1a0da";

angular.module('bookme')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chatBot', {
    templateUrl: 'app/chatBot/chatBot.html',
    controller: 'chatBotCtrl'
  });
}])

.controller('chatBotCtrl', function($scope, UserService, ChatService) { 
    var refreshUI = function() {
        window.setTimeout(function() {
           var contentView = document.getElementById('chat-view');
           var height = contentView.scrollHeight;
           contentView.scrollTop = height;
        }, 300)  
    };
   
    UserService.login()
      .then(function(currentUser) {
        console.log(currentUser);
        $scope.currentUser = currentUser;
        
        var chatInstance = ChatService.getInstance($scope.currentUser.uid, appId);
        
        $scope.sendMessage = function() {
          var text = document.getElementById("chatTextContent").textContent;
          chatInstance.sendMessage(text);
          document.getElementById("chatTextContent").innerHTML = "";
        };
        
        $scope.messages = [];
        chatInstance.receiveMessages(function(chat) {
            $scope.messages.push(chat);
            try { $scope.$apply(); } catch(err) {}
            // scroll chat to bottom
            refreshUI();
        });
      })
      .catch(function(err) {
        console.log(err);
      });
});