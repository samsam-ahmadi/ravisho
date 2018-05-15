Meteor.methods({
  //submit story
  submitStory: function (data) {
    check(data,
      {
        _id: Match.Optional(String),
        category_stories: Match.Optional(String),
        tags: Match.Optional(Array),
        content_problems: Match.Optional(String),
        title: Match.Optional(String),
        pictures: Match.Optional(String),
        created_by: Match.Optional(String),
        unknown: Match.Optional(Boolean),
      }
    )

    if (Roles.userIsInRole(this.userId, ['admin', 'management'])) {
      try {
        let tagsArr = data.tags;
        //added tagts to tags collections
        console.log("test2");

        for (let i = 0; i < tagsArr.length; i++) {
          if (Tags.find({ name: tagsArr[i] }).count() > 0) {
            //check if idstory is exist just update count_tag
            if (Tags.find({ id_stories: data._id }).count() > 0) {
              // Tags.update({name:tagsArr[i]},{$inc:{count_tag:1}})
            } else {
              //else update count tags and push idstory to collections              
              Tags.update({ name: tagsArr[i] }, { $inc: { uses: 1 }, $push: { id_stories: data._id } })
            }

          } else {
            //if dosnt exist tags in collection insert that
            Tags.insert({ name: tagsArr[i], id_stories: [data._id] })
          }
        }
        try {
          let result = Stories.update({ _id: data._id }, { $set: { published: true, show_manager: false, best_stories: false, content_problems: "",created_at:new Date } })
          if (result) {
            Meteor.users.update({ _id: data.created_by }, { $inc: { countStories: 1 } })
            return result;
          } else {
            return result;
          }
        } catch (error) {
          return error
        }
      } catch (e) {
        return e;
      }
    } else {
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))");
    }
  },
  submitBestStory: function (data) {


    console.log('data: ', data);

    check(data,
      {
        _id: Match.Optional(String),
        category_stories: Match.Optional(String),
        tags: Match.Optional(Array),
        content_problems: Match.Optional(String),
        title: Match.Optional(String),
        pictures: Match.Optional(String),
        created_by: Match.Optional(String),
      }
    )
    if (Roles.userIsInRole(this.userId, ['admin', 'management'])) {
      try {
        let tagsArr = data.tags;
        //added tagts to tags collections
        for (let i = 0; i < tagsArr.length; i++) {
          if (Tags.find({ name: tagsArr[i] }).count() > 0) {
            //check if idstory is exist just update count_tag
            if (Tags.find({ id_stories: data._id }).count() > 0) {
              // Tags.update({name:tagsArr[i]},{$inc:{uses:1}})
            } else {
              //else update count tags and push idstory to collections
              Tags.update({ name: tagsArr[i] }, { $inc: { uses: 1 }, $push: { id_stories: data._id } })
            }

          } else {
            //if dosnt exist tags in collection insert that
            Tags.insert({ name: tagsArr[i], id_stories: [data._id] })
          }
        }
        // and finaly update story for published

        let result = Stories.update({ _id: data._id }, { $set: { published: true, show_manager: false, best_stories: true, content_problems: '',created_at:new Date } })
        if (result) {
          Meteor.users.update({ _id: data.created_by }, { $inc: { countStories: 1 } })
          return result;
        } else {
          return result;
        }
      } catch (e) {
        return e;
      }
    } else {
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))")
    }
  },
  submitCurrectedStory: function (data) {
    if (Roles.userIsInRole(this.userId, ['admin', 'management'])) {
      try {
        // and finaly update story for published
        return Stories.update({ _id: data._id }, { $set: { content_problems: data.txtcorrected, show_manager: false } })
      } catch (e) {
        return e;
      }
    } else {
      throw new Meteor.Error("دسترسی امکان پذیر نیست :))")
    }
  }
});
