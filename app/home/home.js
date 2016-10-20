'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$location','CommonProp','$timeout' ,function($scope,$location,CommonProp,$timeout) {
  
  $scope.user = {};
  var login={};
if(CommonProp.getUser()){
        CommonProp.changeLocation('/welcome');
}
$scope.test = function(){
	login.loading = true;
}

$scope.login=login;
  $scope.SignIn = function(e) {
    login.loading = true;
    e.preventDefault();
    var username = $scope.user.email;
    var password = $scope.user.password;
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function(user) {
            //Success callback
		login.loading = false;
            console.log('Authentication successful');
	    CommonProp.setUser(user);
        CommonProp.changeLocation('/welcome');
        }, function(error) {
            //Failure callback
		login.loading = false;
            console.log('Authentication failure');
        });
}
}])


.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // if true show loading indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
]);
