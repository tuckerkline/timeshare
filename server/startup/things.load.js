Meteor.startup(function() {
  if(Things.find().count() === 0) {
    var things = []
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

  if(Emails.find().count() === 0) {
    var emails = [];
    
    emails.forEach(function(email) {
      Emails.insert({
      name: email,
      name_sort: email.toLowerCase(),
      createdAt: new Date()
      })
    })
  }
})