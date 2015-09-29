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


    $scope.needs = []
    for (var i = 0; i < $scope.things.length; i++) {
        var needsObject = {}
        needsObject.labNeeds = $scope.things[i].labNeeds
        needsObject.contactInfo = $scope.things[i].contactInfo
        $scope.needs.push(needsObject)
    }

    console.log($scope.needs)

    $scope.match = false
    var matcher = function(input) {
        var haves = []
        haves.push(input.skills)
        // console.log(haves)
        
        for (var x = 0; x < haves.length; x++) {
            for (var y = 0; y < $scope.needs.length; y++) {
                if (haves[x].toLowerCase() == $scope.needs[y].labNeeds.toLowerCase()) {
                    console.log('you have a match')
                    $scope.greeting = $scope.needs[y].contactInfo
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
    $scope.close = function () {
        $scope.match = false
    }
});


    // var currentUser = Meteor.userId()

    // var owner = $scope.newSurpluss.owner



// Attach empoloyee's resume here:<input type="file"  ng-model="newSurpluss.resume" class="form-control ng-pristine ng-valid ng-touched" name=" file"> 
// <button ng-click="addResume()">add</button>