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


    var needs = []
    var needsOwner = []
    for (var i = 0; i < $scope.things.length; i++) {
        needs.push($scope.things[i].labNeeds)
    }
    console.log(needs)

    $scope.match = false
    var matcher = function(input) {
        var haves = []
        haves.push(input.skills)
        // console.log(haves)
        
        for (var x = 0; x < haves.length; x++) {
            for (var y = 0; y < needs.length; y++) {
                if (haves[x].toLowerCase() == needs[y].toLowerCase()) {
                    console.log('you have a match')
                    $scope.match = true
                }
            }
        }
    }

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
            matcher($scope.newSurpluss)
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
});


    // var currentUser = Meteor.userId()

    // var owner = $scope.newSurpluss.owner



// Attach empoloyee's resume here:<input type="file"  ng-model="newSurpluss.resume" class="form-control ng-pristine ng-valid ng-touched" name=" file"> 
// <button ng-click="addResume()">add</button>