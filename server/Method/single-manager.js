Meteor.methods({
  //submit story
  submitStory:function(data){
    if(Roles.userIsInRole(this.userId, ['admin','management'])){
      try {
        let tagsArr = data.tags.split(',');
        //added tagts to tags collections
        for (let i=0 ; i < tagsArr.length ; i++){
          if(Tags.find({name:tagsArr[i]}).count() >0){
            //check if idstory is exist just update count_tag
            if(Tags.find({id_stories:data._id}).count() >0){
              Tags.update({name:tagsArr[i]},{$inc:{count_tag:1}})
            }else{
              //else update count tags and push idstory to collections
              Tags.update({name:tagsArr[i]},{$inc:{count_tag:1},$push:{id_stories:data._id}})
            }

          } else{
            //if dosnt exist tags in collection insert that
            Tags.insert({name:tagsArr[i],id_stories:[data._id]})
          }
        }
          console.log("data",data)
          // and finaly update story for published
          Meteor.users.update({_id:data.created_by},{$inc:{countStories:1}})
          return Stories.update({_id:data._id},{$set:{published:true,show_manager:false,best_stories:''}})

      } catch (e) {
        return e;
      }
    }else{
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))");
    }
  },
  submitBestStory:function(data){
    if(Roles.userIsInRole(this.userId, ['admin','management'])){
      try {
        let tagsArr = data.tags.split(',');
        //added tagts to tags collections
        for (let i=0 ; i < tagsArr.length ; i++){
          if(Tags.find({name:tagsArr[i]}).count() >0){
            //check if idstory is exist just update count_tag
            if(Tags.find({id_stories:data._id}).count() >0){
              Tags.update({name:tagsArr[i]},{$inc:{count_tag:1}})
            }else{
              //else update count tags and push idstory to collections
              Tags.update({name:tagsArr[i]},{$inc:{count_tag:1},$push:{id_stories:data._id}})
            }

          } else{
            //if dosnt exist tags in collection insert that
            Tags.insert({name:tagsArr[i],id_stories:[data._id]})
          }
        }
        // and finaly update story for published
          Meteor.users.update({_id:data.created_by},{$inc:{countStories:1}})
          return Stories.update({_id:data._id},{$set:{published:true,show_manager:false,best_stories:true}})

      } catch (e) {
        return e;
      }
    }else{
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))")
    }
  },
  submitCurrectedStory:function(data){
    if(Roles.userIsInRole(this.userId, ['admin','management'])){
      try {
        // and finaly update story for published
          return Stories.update({_id:data._id},{$set:{content_problems:data.txtcorrected,show_manager:false}})
      } catch (e) {
        return e;
      }
    }else{
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))")
    }
  }
});
