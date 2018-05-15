Meteor.publish('listStoryUserPageSub', function(username) {
        return Stories.find({
            "created_by":this.userId
        },{
            sort:{created_at: -1},
            fields:{
                '_id':1,
                'category_stories':1,
                'title':1,
                'created_by':1,
                'created_at':1,
                'pictures':1,
                'stories':1,
                'best_stories':1,
                'count_likes': 1,
                'published':1,
                'draft':1,
                'content_problems':1,
                'unknown':1

            }
        })
});

Meteor.publish('subscibeListStoriesImagesUser', function(arrId) {
    return Images.find({"_id":{$in:arrId}})
});



// publish users 
Meteor.publish('subscibeListStoriesUser', function(id) {
    return Meteor.users.find({"_id":id},{
        fields:{
            profile:1,
            username:1
        }
    })
});