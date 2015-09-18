Things = new Mongo.Collection('things');

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


//to make it so don't need to be logged in change all three returns to 'true'
//to make permissions needed: return userId && thing.owner === userId;