Meteor.publish("stories_home", function (data) {
  // check data 
  if (data) {
    check(data,
      {
        limitStories: Match.Optional(Number),
        sortLikes: Match.Optional(Number),
        unknown: Match.Optional(String),
        searchText: Match.Optional(String),
        categoryStories: Match.Optional(String),
        created_at: Match.Optional(Number),
        sortType: Match.Optional(String),
      }
    )
  }

  let sortObj = { created_at: data.created_at };
  // if user sort likes
  if (data.sortLikes == 1 || data.sortLikes == -1) {
    sortObj.count_likes = data.sortLikes
    // check user if not sort remove sort
  } else if ('count_likes' in sortObj) {
    delete sortObj.count_likes;
  }
  // if user sort unknown


  let dataCheck = {
    limitStories: data.limitStories,
    searchText: data.searchText,
    categoryStories: data.categoryStories,
  }
  // let query = {};
  let query = { published: true };
  // category filter
  if (data.categoryStories !== "همه" && data.categoryStories.length > 2) {
    query.category_stories = data.categoryStories
  } else {
    delete query.category_stories;
  }

  // if user filter unknown
  if (data.unknown == '1' || data.unknown == '2' || data.unknown == '-1') {
    switch (data.unknown) {
      case '-1':
        dataCheck.unknown = true;
        query.unknown = dataCheck.unknown

        break;
      case '1':
        dataCheck.unknown = false;
        query.unknown = dataCheck.unknown

        break;
      case '2':
        delete dataCheck.unknown
        query.best_stories = true
        break;
      default: ''
    }
  } else if ('unknown' in dataCheck) {
    delete dataCheck.unknown
    delete dataCheck.best_stories
  }

  // filter search user
  if (dataCheck.searchText.length > 0) {
    let regex = new RegExp(dataCheck.searchText, 'i');
    query['$or'] = [
      { title: regex },
      { tags: regex },
      { stories: regex },
    ]

  }
  if (data.sortType == "date") {
    delete sortObj.count_likes
  } else if (data.sortType == "like") {
    delete sortObj.created_at
  } else {
    delete sortObj.count_likes
  }
  console.log("sortObj", query)

  // pubslish and return stories

  let self = this;

  let handle = Stories.find(query, {
    sort: sortObj,
    limit: dataCheck.limitStories,
    fields: {
      '_id': 1,
      'category_stories': 1,
      'title': 1,
      'created_by': 1,
      'created_at': 1,
      'pictures': 1,
      'stories': 1,
      'best_stories': 1,
      'count_likes': 1,
      'unknown': 1,
    }
  }).observeChanges({
    added: function (id, fields) {
      self.added("stories", id, filterField(fields));
    },
    changed: function (id, fields) {
      self.changed("stories", id, filterField(fields));
    },
    removed: function (id) {
      self.removed("stories", id);
    }
  });

  self.ready();

  self.onStop(function () {
    handle.stop();
  });

  // end  publish 


});

// filter  function unknown story 

let filterField = function (fields) {
  fields.unknown ? delete fields.created_by : delete fields.unknown
  return fields;
}

// stories imaages  publish  by arr list of pictures story 

Meteor.publish("images_home", function (arr) {
  if (Meteor.users.find().fetch().length < 2) {

    console.log('Creating users: ');

    var users = [
      { name: "Normal User", username: "normal", email: "normal@example.com", profile: { phone: "93931162876" }, roles: ['default'] },
      { name: "Manager-stories User", username: "manager", email: "manage@example.com", profile: { phone: "95656454" }, roles: ['management'] },
      { name: "Admin User", username: "admin", email: "admin@admin.com", profile: { phone: "9645645" }, roles: ['admin'] },
      { name: "baned", username: "banned", email: "banned@user.com", profile: { phone: "9645645" }, roles: ['banned'] }
    ];

    _.each(users, function (userData) {
      var id,
        user;

      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        username: userData.username,
        password: "123456",
        profile: { name: userData.name }
      });

      // email verification
      Meteor.users.update({ _id: id }, { $set: { 'emails.0.verified': true } });

      Roles.addUsersToRoles(id, userData.roles);

    });
  }






  return Images.find({ "_id": { $in: arr } });
});

// send profile picture story to page by arr of created By story 

Meteor.publish('getusersImageHome', function (arr) {
  return Meteor.users.find({ "_id": { $in: arr } }, { fields: { username: 1, profile: 1 } })
});
