

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
  insert: function(userId,doc) { 
    if (!userId) {
        return true;
    }
    return false;
  }, 
  update: function() { 
    return false; 
  }, 
  remove: function() { 
    return true; 
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
    'update': function () {
        
      return userId === doc.created_by;
    }
  
  });