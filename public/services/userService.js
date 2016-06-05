angular.module('bookme')
.factory('UserService', function($q) {
    return {
        login: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            var deferred = $q.defer();            
            var currentUser = firebase.auth().currentUser;
            
            if (currentUser) {
                deferred.resolve(currentUser);
            }
            else {
                firebase.auth().signInWithRedirect(provider)
                .then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    currentUser = result.user;
                    deferred.resolve(currentUser);
                }).catch(function(error) {
                    console.log(error);
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }
    };
});