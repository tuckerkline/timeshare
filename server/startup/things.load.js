Meteor.startup(function() {
  if(Things.find().count() === 0) {
    var things = [
      'Data on the Wire',
      'One Language',
      'Database Everywhere',
      'Latency Compensation',
      'Full Stack Reactivity',
      'Embrace the Ecosystem',
      'Simplicity Equals Productivity'
    ];
    things.forEach(function(thing) {
      Things.insert({
        name: thing,
        name_sort: thing.toLowerCase(),
        createdAt: new Date()
      });
    });
  }

  if(Surplusses.find().count() === 0) {
    var surplusses = [];
    
    surplusses.forEach(function(surpluss) {
      Surplusses.insert({
      name: surpluss,
      name_sort: surpluss.toLowerCase(),
      createdAt: new Date()
      })
    })
  }
})