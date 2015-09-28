'use strict';


angular.module('timeshareApp')
.controller('labSurplussesCtrl', function($scope, $meteor, dataFactory) {
	$scope.viewName = 'Lab-Surplusses';
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.sort = {name_sort : 1};
    $scope.orderProperty = '1';

    $scope.surplusses = $scope.$meteorCollection(function () {
    	return Surplusses.find({}, {sort:$scope.getReactively('sort')});
    });

    $scope.things = $scope.$meteorCollection(function() {
      return Things.find({}, {sort:$scope.getReactively('sort')})
    })


    var test = []
    for (var i = 0; i < $scope.things.length; i++) {
      for (var key in $scope.things[i]) {
        if (key == 'name') {
          test.push(key)
        }
      }
    }

    console.log(test)
    // console.log($scope.things)

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
  	});

    // console.log(dataFactory)

     


});



// Attach empoloyee's resume here:<input type="file"  ng-model="newSurpluss.resume" class="form-control ng-pristine ng-valid ng-touched" name=" file"> 
// <button ng-click="addResume()">add</button>