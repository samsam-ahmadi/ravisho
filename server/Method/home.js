Meteor.methods({ 
    getProfileImg: function(id) { 
         check(id, String);

         let profilePic = Meteor.users.findOne({"_id":id}).profile.picture
         console.log("profilePic",profilePic)
         if(profilePic){
             console.log("as;djasd",ProfileImages.findOne({"_id":profilePic}).url )
            return ProfileImages.find({"_id":profilePic}).url
         }else{
             return ""
         }
    } 
});