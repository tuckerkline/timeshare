'use strict'

Meteor.publish('things', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfThings', Things.find(where), {noReady: true});
  return Things.find(where, options);
});


Meteor.publish('surplusses', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfSurplusses', Surplusses.find(where), {noReady: true});
  return Surplusses.find(where, options);
});


Meteor.publish('emails', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfEmails', Emails.find(where), {noReady: true});
  return Emails.find(where, options);
});