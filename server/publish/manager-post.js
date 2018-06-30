Meteor.publish("managerPostPageSub", function(id){

  // if user published unknown stories send subscribe unknown
  if(Roles.userIsInRole(this.userId, ['admin','management'])){
    let data = Stories.findOne({"_id":id})
    if(data.unknown){
      
      return  Stories.find({_id : id},
        {
          fields: {
            '_id':1,
            'category_stories':1,
            'title':1,
            'unknown':1,
            'created_at':1,
            'pictures':1,
            'stories':1,
            'tags':1,
            'content_problems':1
          }
        })
  
    }else{
      return  Stories.find({_id : id},
        {
          fields: {
            '_id':1,
            'category_stories':1,
            'title':1,
            'created_by':1,
            'created_at':1,
            'pictures':1,
            'stories':1,
            'tags':1,
            'content_problems':1,
          }
        })
    } // end if

  }else{
    return ;
  }

});

Meteor.publish("managerImagePageSub", function(id){
  return Images.find({_id: id })
});
Meteor.publish("Tags", function(id){
  return Tags.find()
});
Meteor.publish("managerUserPageSub", function(id){
  return Meteor.users.find({_id:id},{
    fields:{
      'countStories':1,
      'profile':1,
      'username':1,
      'email':1
    }
  })
});
