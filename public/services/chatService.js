angular.module('bookme')
.factory('ChatService', function() {
    var rootRef = firebase.database();
    
    var FirebaseChatInstance = function (userId, appId) {
        var self = this;
        self.userId = userId;
        self.appId = appId;
        
        var chatRef = rootRef.ref('messages/' + self.appId + "/" + self.userId);
        
        self.sendMessage = function (text) {
            if (!text || text.length === 0) {
                return;
            }
            var message = {
                sender: self.userId,
                sentOn: (new Date()).getTime(),
                type: 'text',
                content: text
            };
            
            var newMessageRef = chatRef.push();
            newMessageRef.set(message);
        };
        
        self.receiveMessages = function(cb) {
          chatRef.orderByChild("sentOn").limitToLast(20)
            .on("child_added", function(snapshot) {
                    var chat = snapshot.val();
                    cb(chat);       
                });  
        };
        
    };
    
    return {
        getInstance: function(userId, appId) {
            return new FirebaseChatInstance(userId, appId);
        }
    };
});