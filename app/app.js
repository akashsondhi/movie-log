'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.register',
  'myApp.welcome',
  'myApp.addPost',
    'myApp.logout'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.service('CommonProp', function($location, $timeout, $window) {
    return {
        getUser: function() {
            return JSON.parse($window.localStorage.getItem("currentUser"));
        },
        setUser: function(value) {
            $window.localStorage.setItem("currentUser", angular.toJson(value));
        },
        
        changeLocation : function(nextLocation){
            $timeout(function(){
                $location.path(nextLocation);
            });
        }
       
    };
})
.directive('movieLogFooter', function(){
    return{
        templateUrl: 'common-templates/footer.html',
        restrict :  'EA'
    };
})


;
