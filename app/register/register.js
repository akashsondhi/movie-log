'use strict';

angular.module('myApp.register', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope','$location','$firebaseAuth', 'CommonProp', function($scope,$location,$firebaseAuth,CommonProp) {
 	$scope.mesg = 'Hello';
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
                    console.log('User creation success');
                    CommonProp.changeLocation('/home');    
                
                }, function(error) {
                    // do things if failure
                    console.log(error);
                    $scope.regError = true;
                    $scope.regErrorMessage = error.message;
                });
        }
    }
};
}]);
