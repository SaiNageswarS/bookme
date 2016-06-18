angular.module('bookme')
.factory('StateMachine', function() {
    var stateMachine = function (userId, appId) {
        var self = this;
        var rootRef = firebase.database();
    
        var init_state = 'welcome_state';
        var user_current_state_ref = rootRef.ref('current_state/' + appId + "/" + userId);
        var chatRef = rootRef.ref('messages/' + appId + "/" + userId);
        var state_machine_ref = rootRef.ref('state_machine/' + appId);
        
        state_machine_ref.once('value', function (state_machine_snapshot) {
            var state_machine = state_machine_snapshot.val();
            var current_state = '';
            
            // listener to handle state change
            user_current_state_ref.on('value', function (snapshot) {
                current_state = snapshot.val() || 'welcome_state'; 
                
                var message = {
                    sender: appId,
                    sentOn: (new Date()).getTime(),
                    type: 'text',
                    content: state_machine[current_state].message
                };
                var newMessageRef = chatRef.push();
                newMessageRef.set(message);
            });
            
            // transit state on user input
            self.transitToTargetState = function (userInput) {
                var target_state = 
                    state_machine[current_state].transitions[userInput] || 
                    state_machine[current_state].transitions['any'];
                user_current_state_ref.set(target_state);
            };
        });
    } 
    
    return stateMachine;
});