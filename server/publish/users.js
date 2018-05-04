Meteor.publish("userList", function (userSearch) {
    console.log("userSearch",userSearch.userSearch)


    // filter search user
    let query = {};
    console.log('userSearch.length >0: ', userSearch.userSearch.length >0);
    if (userSearch.userSearch.length >0) {
        let regex = new RegExp(userSearch.userSearch, 'i');
         query['$or']= [
            {username: regex},
            // {name: regex},
            // {'profile.&.emails': regex},
          ]
      }





      console.log('query: ', query);
    if(Roles.userIsInRole(this.userId, ['admin'])){
        return Meteor.users.find(query, {fields: {emails: 1, profile: 1, roles: 1,username:1,countStories:1,canCreateStories:1}});
    } else{
        Meteor.Error(403, 'عدم وجود دسترسی');
    }
});


