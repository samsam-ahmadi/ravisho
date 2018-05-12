Meteor.methods({ 
    editStory: function(data) { 
        //  console.log("data",data)
         delete data.$set.count_likes;
         delete data.$set.likes;
         delete data.$set.created_at;
         delete data.$set.email_user_story;
         delete data.$set.content_problems;
         data.$set.best_stories =false;
         data.$set.show_manager =true;
         data.$set.published =false;
         let id = data.$set.id;
         let idUser = data.$set.created_by;
         delete data.$set.created_by;
         delete data.$set.id;
         
         
         
         
         
         check(data.$set,
            {
                title: Match.Optional(String),
                category_stories: Match.Optional(String),
                tags: Match.Optional(String),
                unknown: Match.Optional(Boolean),
                show_manager: Match.Optional(Boolean),
                published: Match.Optional(Boolean),
                best_stories: Match.Optional(Boolean),
                draft: Match.Optional(Boolean),
                tags: Match.Optional(String),
                pictures: Match.Optional(String),
                stories: Match.Optional(String),
            }
        )
        let updateCount = Meteor.users.update({_id:idUser},{$inc:{countStories:-1}})
         
         return   Stories.update({"_id":id},data);
    } 
});