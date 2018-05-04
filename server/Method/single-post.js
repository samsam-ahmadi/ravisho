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
    
  }
});
