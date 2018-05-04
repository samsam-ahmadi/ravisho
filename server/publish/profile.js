Meteor.publish("ProfilePageSub", function(argument){
  let id  = this.userId;
  // return Meteor.users.find({_id:id},{
  //   fields:{
  //
  //   }
  // })
});


Meteor.publish("ProfileImage", function(id){
  return ProfileImages.find({'_id':id});
});
