'use strict';

angular.module('timeshareApp')
.config(function($stateProvider) {
  $stateProvider
  .state('lab-needs', {
    url: '/lab-needs',
    templateUrl: 'client/lab-needs/lab-needs.view.ng.html',
    controller: 'lab-needsCtrl'
  });
});