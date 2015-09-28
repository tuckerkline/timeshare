'use strict';

angular.module('timeshareApp')
.controller('listServCtrl', function($scope, $meteor)  {
	$scope.viewName = "ListServ-Emails"
	$scope.page = 1;
	$scope.perPage = 10;
	$scope.sort = {name_sort : 1};
	$scope.orderProperty = '1';

	// $scope.emails = $meteor.collection(Emails)
    //     return Emails.find({}, {sort:$scope.getReactively('sort')});
    // });

    //  $meteor.autorun($scope, function() {
    //  $scope.$meteorSubscribe('emails', {
    //      limit: parseInt($scope.getReactively('perPage')),
    //      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
    //      sort: $scope.getReactively('sort')
    //  },  $scope.getReactively('search')).then(function() {
    //      $scope.emailsCount = $scope.$meteorObject(Counts, 'numberOfEmails', false);
    //  });
    // });

    // $meteor.session('emailsCounter').bind($scope, 'page');


 	$scope.emails = []
    $scope.save = function() {
      if($scope.form.$valid) {
        $scope.emails.push($scope.newEmail)
        $scope.newEmail = undefined;
      }
    };
    $scope.remove = function(index) {
    	$scope.emails.splice(index, 1);
    }

    $scope.pageChanged = function(newPage) {
  	   $scope.page = newPage;
  	};

    $scope.$watch('orderProperty', function() {
      if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
      }
    });
});