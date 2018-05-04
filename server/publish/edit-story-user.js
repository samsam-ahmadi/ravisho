Meteor.publish('editPostPageSub', function(id) {
    let story = Stories.findOne({"_id":id});
    console.log('story1: ', story.created_by);
    if(story.created_by == this.userId || Roles.userIsInRole(this.userId, ['admin'])) {
        return Stories.find({"_id":id});
    }else{
        return [];
    }
});

Meteor.publish('editImagePageSub', function(id) {
    let story = Stories.findOne({"_id":id});
     return Images.find({"_id":story.pictures});
});