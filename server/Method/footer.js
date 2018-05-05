Meteor.methods({ 
    getPostCount: function() { 
         return Stories.find({"published":true}).count()
    } 
});