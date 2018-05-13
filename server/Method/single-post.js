Meteor.methods({
  increaseLikes:function(data){
    // Stories.update({"_id":"WzzcteYeLrrmgyfAh"},{$set:{stories:"نتسایبنتسابیساشکباقخشاشگمشسیاب مسنشیتبشمسیاب سیمنشیباشسنتبا سنتیبا"}})
    if(!data.likes){
      return Stories.update({_id:data._id} , {$push:{'likes':{'NumberLikes':1,"userId":this.userId}},$inc:{count_likes:1} })
    }else if(data.likes[0].NumberLikes <5 && data.likes[0].NumberLikes >=0){
      return Stories.update({_id:data._id,"likes.userId":this.userId} , {$inc:{'likes.$.NumberLikes':1,count_likes:1} })
    }else{
      return false;
    }
    
  },
  deleteStory(id){
    console.log(id);
    check(id, String);
    
    let data = Stories.findOne({'_id':id});
    if(data._id == this.userId || Roles.userIsInRole(Meteor.userId(), ['admin'])){
      Meteor.users.update({ _id: data.created_by }, { $inc: { countStories: -1 } })
      return Stories.remove({"_id":id});

    }else{
      return false
    }
  }
});
