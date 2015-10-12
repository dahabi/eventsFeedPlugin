'use strict';

(function (angular, buildfire) {
  angular.module('eventsFeedPluginWidget', ['ngRoute', 'ngTouch', 'infinite-scroll', 'ui.bootstrap'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/feed', {
          templateUrl: 'templates/home.html',
          controllerAs: 'WidgetFeed',
          controller: 'WidgetFeedCtrl'
        })
        .when('/event/:eventIndex', {
          templateUrl: 'templates/eventDetails.html',
          controller: 'WidgetEventCtrl',
          controllerAs: 'WidgetEvent'
        })
        .otherwise('/feed');
    }])
    .filter('getDateFromTimestamp', function () {
      return function (input) {
        return new Date(input).getDate();
      };
    })
    .filter('getMonthFromTimestamp', function () {
      var monthsObj = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return function (input) {
        return monthsObj[new Date(input).getMonth()];
      };
    })
    .filter('getTimeZone', function () {

      return function (input) {
        input = new Date(input);
        var result = input.toString().match(/\((.+)\)/i);
        if (result.length)
          return result[1];
        else return "";
      };
    })
      .run(['Location', '$location', function (Location, $location) {
        buildfire.navigation.onBackButtonClick = function(){
           if($location.path()!= "/feed"){
              Location.goTo('#/feed');
          };
        };
      }]);
})(window.angular, window.buildfire);
