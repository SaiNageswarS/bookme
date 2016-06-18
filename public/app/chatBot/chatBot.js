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

.controller('chatBotCtrl', function($scope, UserService, ChatService, StateMachine) { 
    var refreshUI = function() {
        window.setTimeout(function() {
           var contentView = document.getElementById('chat-view');
           var height = contentView.scrollHeight;
           contentView.scrollTop = height;
        }, 300)  
    };
    
    $scope.input_type = 'text';
    $scope.data = {};
   
    UserService.login()
      .then(function(currentUser) {
        console.log(currentUser);
        $scope.currentUser = currentUser;
        
        var chatInstance = ChatService.getInstance($scope.currentUser.uid, appId);
        var stateMachine = 
            new StateMachine(
              $scope.currentUser.uid, 
              appId,
              function(input_type, data) {
                $scope.input_type = input_type;
                $scope.data = data;
                try { $scope.$apply(); } catch(err) {}
              });
        
        $scope.sendMessage = function() {
            if ($scope.input_type === 'text') {
              var text = document.getElementById("chatTextContent").textContent;
              chatInstance.sendMessage(text);
              stateMachine.transitToTargetState(text);
              document.getElementById("chatTextContent").innerHTML = "";
            }
            else if ($scope.input_type === 'list') {
              chatInstance.sendMessage($scope.selected_key);
              stateMachine.transitToTargetState($scope.selected_key);
              $scope.selected_key = '';
            }
        };
        
        $scope.setSelectedInput = function(data_key) {
          $scope.selected_key = data_key;
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