'use strict';

angular.
  module('httpExample').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/demo', {
          template: '<http-demo></http-demo>'
        }).
        otherwise('/demo');
    }
  ]);
