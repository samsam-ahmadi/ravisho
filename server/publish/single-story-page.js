Meteor.publish("singlePostPageSub", function(id){
  check(id,String);
  let that = this
  let story = Stories.findOne({"_id":id});
  // just user can see unpublished and drafts stories  
  if(story.draft == true && story.created_by !=this.userId){
    return false;
  }

  if(story.published ==false && story.created_by != this.userId){
    return false;    
  }
  // if user published unknown stories send subscribe unknown
  if(story.created_by ==this.userId){
    // if unknown
    if(Stories.findOne({"_id":id}).unknown){
      return  Stories.find({_id : id},
        {
          fields: {
            likes : {$elemMatch : {userId :this.userId}},
            '_id':1,
            'category_stories':1,
            'title':1,
            'created_at':1,
            'pictures':1,
            'stories':1,
            'created_by':1,
            'tags':1,
            'count_likes':1,
            'content_problems':1,
            'published':1
          }
        })
  
    }else{
      return  Stories.find({_id : id},
        {
          
          fields: {
            likes : {$elemMatch : {userId :this.userId}},
            '_id':1,
            'category_stories':1,
            'title':1,
            'created_by':1,
            'created_at':1,
            'pictures':1,
            'stories':1,
            'tags':1,
            'count_likes':1,
            'content_problems':1,
            'unknown':1,
            'published':1            
          }
        })
  
  
    }//else


  }else{

    if(Stories.findOne({"_id":id}).unknown){
      return  Stories.find({_id : id},
        {
          fields: {
            likes : {$elemMatch : {userId :this.userId}},
            '_id':1,
            'category_stories':1,
            'title':1,
            'created_at':1,
            'pictures':1,
            'stories':1,
            'unknown':1,
            'tags':1,
            'count_likes':1,
            'content_problems':1,
            'published':1            
            
          }
        })
  
    }else{
      return  Stories.find({_id : id},
        {
          
          fields: {
            likes : {$elemMatch : {userId :this.userId}},
            '_id':1,
            'category_stories':1,
            'title':1,
            'created_by':1,
            'created_at':1,
            'pictures':1,
            'stories':1,
            'tags':1,
            'count_likes':1,
            'content_problems':1,
            'published':1            
            
            
          }
        })
  
  
    }//else

  }
});
Meteor.publish("singleImagePageSub", function(id){
  return Images.find({_id: id })
});
Meteor.publish("singleUserPageSub", function(id){
  return Meteor.users.find({_id:id},
  {
    fields:{
      'profile': 1,
      'username': 1
    }
  });
});


//
// Meteor.publish("getUserStoriCount", function(argument){
//   return Meteor.users.findOne({_id:argument});
// });
