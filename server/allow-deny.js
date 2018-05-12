

Images.allow({
    insert: function (userId, file) {
        if (userId == "gHneSfdpCecvmwhBu") {
            return false;
        }
        return true;
    },
    download: function (userId, file) {
        return true;
    },
    update: function (userId, file) {
        return false;
    },
    remove: function (userId, file) {
        return false;
    }
});

Images.deny({
    insert: function (userId, file) {
        // if (Meteor.users.findOne({"_id":this.userId}).emails[0].verified) {
        if (!userId) {
            return true;
        }
        return false;
    },
    download: function (userId, file) {
        return false;
    },
    update: function (userId, file) {
        return false;
    },
    remove: function (userId, file) {
        return true;
    },
});

ProfileImages.allow({
    'insert': function (userId, project) {
        if (userId == "gHneSfdpCecvmwhBu") {
            return false;
        }
        return true;
    },
    'remove': function (userId, project) {
        return false;
    },
    'download': function (userId, project) {
        return true;
    },
    'update': function (userId, project) {
        return false;
    }

});

ProfileImages.deny({
    insert: function (userId,file) {
        if (!userId) {
            return true;
        }
        return false;
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    download:function(){
        return false;
    }
});



// tags 

Tags.deny({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });

  Tags.allow({ 
      insert: function() { 
          return false; 
      }, 
      update: function() { 
          return false; 
      }, 
      remove: function() { 
          return false; 
      } 
  });
  



//   stories 


Stories.deny({ 
  insert: function(userId) { 
    if (!userId) {
        return true;
    }
    return false;
  }, 
  update: function(userId,doc) { 
      return true;
  }, 
//   update: function(userId,doc) { 
//       if(userId == doc.created_by){
//           return false; 
//       }else{
//           return true;
//       }
//   }, 
  remove: function(userId,doc) { 
    if(userId == doc.created_by){
        return false; 
    }else{
        return true;
    } 
  } 
});

Stories.allow({
    'insert': function (userId,doc) {
        if (!userId) {
            return false;
        }
        return true;
    },
    'remove': function (userId,doc) {
      return userId === doc.created_by;
    },
    // 'update': function (userId,doc, fields, modifier) {
    //     if(userId !== doc.created_by){
    //         return false;
    //     }
    //     var willModify = function (field) {
    //         return _.contains(fields, field);
    //       }
    //     // if(arrayEq(fields, ['created_by', 'email_user_story', 'show_manager'])){
    //     //     return false;
    //     // }
    //     if(willModify("draft")){
    //         return false
    //     }

    //   return userId === doc.created_by;
    // },
    'update': function (userId,doc, fields, modifier) {
       return false;
    }
  
  });