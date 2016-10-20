'use strict';

angular.module('myApp.logout', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/logout', {
        template : '',
      controller: 'LogoutCtrl'
  });
}])

.controller('LogoutCtrl', ['$window','CommonProp' ,function($window,CommonProp) {
            delete($window.localStorage['currentUser']);
            CommonProp.changeLocation('/home');
     
}]);