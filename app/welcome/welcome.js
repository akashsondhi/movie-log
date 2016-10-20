'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope', '$timeout', 'CommonProp', function ($scope, $timeout, CommonProp) {
    if(!CommonProp.getUser()){
        CommonProp.changeLocation('/home');
    }
    $scope.username = CommonProp.getUser().email;
    var controllerScope = $scope;
    $scope.articlesLoaded = false;
        var userId = CommonProp.getUser().uid;
        firebase.database().ref('users/' + userId + '/posts').on('value', function (sync) {
        controllerScope.articles = [];
        var itemList = sync.val();
        if (itemList) {
            angular.forEach(Object.keys(itemList), function (itemKey) {
                itemList[itemKey].$id = itemKey;
                controllerScope.articles.push(itemList[itemKey]);
            });
        }
        $timeout(function () {
            controllerScope.$digest();
             controllerScope.articlesLoaded = true;
        });

    });    
    
    

    $scope.editPost = function (id) {
        console.log(id);
        $scope.editLog = angular.copy($scope.articles[id]);
        $('#editModal').modal();
    }

    $scope.update = function () {
        var userId = CommonProp.getUserId();
        firebase.database().ref('users/' + userId + '/posts/' + $scope.editLog.$id).update({
            theatre: $scope.editLog.theatre,
            peopleCount: $scope.editLog.peopleCount,
            date: $scope.editLog.date,
            tktCost: $scope.editLog.tktCost
        }).then(function (ref) {
            $('#editModal').modal('hide');
        }, function (error) {
            console.log("Error:", error);
        });

    }


    $scope.confirmDelete = function (id) {
        controllerScope.postToDelete = angular.copy($scope.articles[id]);
        $('#deleteModal').modal();
    }

    $scope.deletePost = function () {
        var userId = CommonProp.getUserId();
        firebase.database().ref('users/' + userId + '/posts/' + $scope.postToDelete.$id).remove().then(function (ref) {
            $timeout(function () {
                $('#deleteModal').modal('hide');
            });
        }, function (error) {
            console.log("Error:", error);
        });
    }




}]);