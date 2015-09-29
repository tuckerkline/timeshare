Emails = new Mongo.Collection('emails');
Things = new Mongo.Collection('things');
Surplusses = new Mongo.Collection('surplusses');








Things.allow({
  insert: function(userId, thing) {
    thing.createdAt = new Date();
    thing.name_sort = thing.name.toLowerCase();
    return userId && thing.owner === userId;
  },
  update: function(userId, thing, fields, modifier) {
    thing.createdAt = new Date();
    thing.name_sort = thing.name.toLowerCase();
    return userId && thing.owner === userId ;
  },
  remove: function(userId, thing) {
    return userId && thing.owner === userId;
  }
});

Surplusses.allow({
  insert: function(userId, surpluss) {
    console.log(surpluss)
    surpluss.createdAt = new Date();
    surpluss.name_sort = surpluss.name.toLowerCase();
    return userId && surpluss.owner === userId;
    

  },
  update: function(userId, surpluss, fields, modifier) {
    surpluss.createdAt = new Date();
    surpluss.name_sort = surpluss.name.toLowerCase();
    return userId && surpluss.owner === userId ;
    
  },
  remove: function(userId, surpluss) {
    return userId && surpluss.owner === userId;
    
  }
});


Emails.allow({
  insert: function(userId, email) {
    console.log(email)
    email.createdAt = new Date();
    email.name_sort = email.name.toLowerCase();
    return userId && email.owner === userId;
    

  },
  update: function(userId, email, fields, modifier) {
    email.createdAt = new Date();
    email.name_sort = email.name.toLowerCase();
    return userId && email.owner === userId;
    
  },
  remove: function(userId, email) {
    return userId && email.owner === userId;
    
  }
});




//to make it so don't need to be logged in change all three returns to 'true'
//to make permissions needed: return userId && thing.owner === userId;