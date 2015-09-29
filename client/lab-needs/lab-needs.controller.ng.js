'use strict';

angular.module('timeshareApp')
.controller('lab-needsCtrl', function($scope, $meteor) {
  $scope.viewName = 'Lab-Needs';
  $scope.page = 1;
  $scope.perPage = 10;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';
  
  $scope.things = $scope.$meteorCollection(function() {
    return Things.find({}, {sort:$scope.getReactively('sort')});
  });

  $scope.surplusses = $scope.$meteorCollection(function () {
     return Surplusses.find({}, {sort:$scope.getReactively('sort')});
  });


  $scope.haves = []
  for (var i = 0; i < $scope.surplusses.length; i++) {
    var havesObject = []
    havesObject.skills = $scope.surplusses[i].skills
    havesObject.contactInfo = $scope.surplusses[i].contactInfo
    $scope.haves.push(havesObject)
  }


  $scope.match2 = false
  var matcher = function(input) {
    var needs = []
    needs.push(input.labNeeds)
    for (var x = 0; x < needs.length; x++) {
      for (var y = 0; y < $scope.haves.length; y++) {
        if (needs[x].toLowerCase() == $scope.haves[y].skills.toLowerCase()) {
          console.log('a match is made')
          $scope.match2 = true
          $scope.matchMessage = $scope.haves[y].contactInfo
        }
      }
    }
  }



  $meteor.autorun($scope, function() {
    $scope.$meteorSubscribe('things', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function() {
      $scope.thingsCount = $scope.$meteorObject(Counts, 'numberOfThings', false);
    });
  });

  $meteor.session('thingsCounter').bind($scope, 'page');
    
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.things.save($scope.newThing);
      matcher($scope.newThing)
      $scope.newThing = undefined;
    }
  };
      
  $scope.remove = function(thing) {
    $scope.things.remove(thing);
  };
    
  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };
  $scope.close2 = function() {
    $scope.match2 = false
  }
    
  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });
});