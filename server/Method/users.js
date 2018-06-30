Meteor.methods({ 
    bannedUser: function(data) { 
        if(Roles.userIsInRole(this.userId, ['admin'])){
            console.log("data.canCreateStories",data.canCreateStories)
            if(data.canCreateStories){
                Meteor.users.update({"_id":data._id},{$set:{canCreateStories:false}})
                Roles.setUserRoles(data._id, 'ban');
                return "کاربر مورد نظر بن شد"
            }else{
                Meteor.users.update({"_id":data._id},{$set:{canCreateStories:true}})
                Roles.setUserRoles(data._id, 'default');
                return "کاربر مورد نظر میتواند داستان بنویسد"
            }
        }else{
            return Meteor.throw("asdlkjasd")
        } 

    },
    changeRolesUser :function(data){
        if(Roles.userIsInRole(this.userId, ['admin'])){
             Roles.setUserRoles(data.user, data.roles);
             return true;
        }else{
            return false
        }
    }
});