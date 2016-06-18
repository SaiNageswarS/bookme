angular.module('bookme')
.factory('StateMachine', function() {
    var stateMachine = function (userId, appId, input_type_cb) {
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
                current_state_obj = snapshot.val() || {state: 'welcome_state', sent: false}; 
                current_state = state_machine[current_state_obj.state];
                
                if (input_type_cb) {
                    input_type_cb(current_state.input_type, current_state.inputs);
                }
                if (!current_state_obj.sent) {
                    var message = {
                        sender: appId,
                        sentOn: (new Date()).getTime(),
                        type: 'text',
                        content: current_state.message
                    };
                    var newMessageRef = chatRef.push();
                    newMessageRef.set(message);
                    current_state_obj.sent = true;
                    user_current_state_ref.set(current_state_obj);
                }
            });
            
            // transit state on user input
            self.transitToTargetState = function (userInput) {
                var target_state = 
                    current_state.transitions[userInput] || 
                    current_state.transitions['any'];
                var target_state_obj = {
                    state: target_state,
                    sent: false
                }
                user_current_state_ref.set(target_state_obj);
            };
        });
    } 
    
    return stateMachine;
});