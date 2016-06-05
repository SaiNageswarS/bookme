angular.module('bookme')
.factory('UserService', function($q) {
    return {
        login: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            var deferred = $q.defer();  
            
            firebase.auth().getRedirectResult().then(function(result) {
                if (result.credential) {
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    deferred.resolve(user);
                } else {
                    firebase.auth().signInWithRedirect(provider);                    
                }
               
            }).catch(function(error) {
                deferred.reject(error);
            });          
            
            return deferred.promise;
        }
    };
});