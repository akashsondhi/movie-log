'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', 'CommonProp','$timeout', function($scope,$location,$firebaseAuth,CommonProp, $timeout) {
 	var _self = $scope;
 	if(CommonProp.getUser()){
        CommonProp.changeLocation('/welcome');
}

 var login={};
$scope.login=login;

        $scope.signUp = function() {
    if (!$scope.regForm.$invalid) {
        var email = $scope.user.email;
        var password = $scope.user.password;
        if (email && password) {
	       login.loading = true;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function() {
                    // do things if success
                login.loading = false;
                 _self.regSuccessMessage = "Registered successfully. Proceeding to Sign In now"
                 _self.regError = false;
                $timeout(function(){CommonProp.changeLocation('/home');  }, 1000);  
                _self.$digest();
                }, function(error) {
                    // do things if failure
                    console.log(error);
                login.loading = false;
                    _self.regError = true;
                    _self.regErrorMessage = error.message;
                _self.$digest();
                });
        }
    }
};
}]);
