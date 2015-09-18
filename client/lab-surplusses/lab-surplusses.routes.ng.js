'use strict';

angular.module('timeshareApp')
.config(function($stateProvider) {
  $stateProvider
  .state('lab-surplusses', {
    url: '/lab-surplusses',
    templateUrl: 'client/lab-surplusses/lab-surplusses.view.ng.html',
    controller: 'labSurplussesCtrl'
  });
});