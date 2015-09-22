'use strict';

angular.module('timeshareApp')
.controller('labSurplussesCtrl', function($scope, $meteor) {
	$scope.viewName = 'Lab-Surplusses';
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.sort = {name_sort : 1};
    $scope.orderProperty = '1';

    $scope.surplusses = $scope.$meteorCollection(function () {
    	return Surplusses.find({}, {sort:$scope.getReactively('sort')});
    });

    $meteor.autorun($scope, function() {
    	$scope.$meteorSubscribe('surplusses', {
      		limit: parseInt($scope.getReactively('perPage')),
      		skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      		sort: $scope.getReactively('sort')
    	}, 	$scope.getReactively('search')).then(function() {
      		$scope.thingsCount = $scope.$meteorObject(Counts, 'numberOfSurplusses', false);
    	});
    });

    $meteor.session('surplussCounter').bind($scope, 'page');
    $scope.save = function() {
    	if($scope.form.$valid) {
      		$scope.surplusses.save($scope.newSurpluss);
    	  	$scope.newSurpluss = undefined;

    	  	// console.log($scope)
	    }
	  };
      
  	$scope.remove = function(surpluss) {
  	   $scope.surplusses.remove(surpluss);
  	};
  	   
  	$scope.pageChanged = function(newPage) {
  	   $scope.page = newPage;
  	};
  	   
  	$scope.$watch('orderProperty', function() {
  	   if($scope.orderProperty) {
  	     $scope.sort = {name_sort: parseInt($scope.orderProperty)};
  	}
  	$scope.greeting = 'SURPLUSSI MUTHA'	
  	});
});