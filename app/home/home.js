'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$timeout', function ($scope, $location, CommonProp, $timeout) {
    var _self = $scope;
    $scope.user = {};
    var login = {};
    if (CommonProp.getUser()) {
        CommonProp.changeLocation('/welcome');
    }
    
    $scope.login = login;

    $scope.SignIn = function (e) {
        login.loading = true;
        $scope.errorInLogin = false;
        e.preventDefault();
        var username = $scope.user.email;
        var password = $scope.user.password;
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(function (user) {
                //Success callback
                login.loading = false;

                CommonProp.setUser(user);
                //CommonProp.changeLocation('/welcome');
                _self.$digest();
            }, function (error) {
                //Failure callback
                login.loading = false;
                _self.errorInLogin = true;
                _self.errorMsg = error.code === "auth/user-not-found" ? "Incorrect username or password":error.message;
                _self.$digest();
            });
    }
}])


.directive('laddaLoading', [
    function () {
        return {
            link: function (scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                // Watching login.loading for change
                scope.$watch(attrs.laddaLoading, function (newVal, oldVal) {
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