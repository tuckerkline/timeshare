'use strict';

angular.module('timeshareApp')
.config(function($stateProvider) {
  $stateProvider
  .state('listserv', {
    url: '/listserv',
    templateUrl: 'client/listserv/listerv.view.ng.html',
    controller: 'listServCtrl'
  });
});