

Images.allow({
    insert: function (userId, file) {
            if(userId == "gHneSfdpCecvmwhBu"){
                return false;
            }
            return true;
    },
    download: function (userId, file) {
        return true;
    },
    update: function(userId, file) {
      return false;
    },
    remove: function(userId, file) { 
        return false; 
    }
});

Images.deny({
    insert: function (userId, file) {
        // if (Meteor.users.findOne({"_id":this.userId}).emails[0].verified) {
            if(!userId){
                return true;
            }
            return false;     
         },
    download: function (userId, file) {
        return false;
    },
    update: function(userId, file) {
      return false;
    },
    remove: function(userId, file) { 
        return true; 
    },
});