Meteor.publish("stories_manager", function(argument){
  if(Roles.userIsInRole(this.userId, ['admin','management'])){
    let self = this;

    let handle = Stories.find({show_manager:true,draft:false,published:false},{
              sort: { created_at : -1},
              fields: {
                  '_id':1,
                  'category_stories':1,
                  'title':1,
                  'pictures':1,
                  'created_by':1,
                  'stories':1,
                  'count_likes':1,
                  'unknown':1
              }
          }).observeChanges({
      added: function(id, fields) {
        self.added("stories", id, filterField(fields));
      },
      changed: function(id, fields) {
        self.changed("stories", id, filterField(fields));
      },
      removed: function(id) {
        self.removed("stories", id);
      }
    });
  
    self.ready();
  
    self.onStop(function() {
      handle.stop();
    });


  }
});
let filterField = function(fields) {
    fields.unknown ? delete fields.created_by : delete fields.unknown
     return fields;
   }
   

Meteor.publish("images_manage", function(arrId){
  return Images.find({"_id":{$in:arrId} });
});
