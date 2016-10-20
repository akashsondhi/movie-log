'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])

.controller('AddPostCtrl', ['$scope', '$location', 'CommonProp', function ($scope,  $location, CommonProp) {
    var login = {};
    if(!CommonProp.getUser()){
        CommonProp.changeLocation('/home');
    }
    $scope.login = login;
    $scope.username = CommonProp.getUser().email;
    $scope.AddPost = function () {
        login.loading = true;
        var movieObj = {
        name:$scope.movie.name,
        theatre:$scope.movie.theatre,
        peopleCount: $scope.movie.peopleCount,
         date : $scope.movie.date,
         tktCost : $scope.movie.tktCost
        };
       
        var userId = CommonProp.getUser().uid;
        firebase.database().ref('users/' + userId + '/posts').push(movieObj).then(function (ref) {
            login.loading = false;
            console.log("Added the post successfully");
            CommonProp.changeLocation('/welcome');
        }, function (error) {
            login.loading = false;
            console.log("Error:", error);
        });


    }
}]);