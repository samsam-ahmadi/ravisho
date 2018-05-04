import moment from 'moment-jalaali'
Template.mainIndex.helpers({
  listStories: function () {
    moment.locale('fa');

    // sort  data 
    let sortObj = { created_at: -1 }
    let sortType = Session.get('sortType');
    if (sortType == "date") {
      delete sortObj.count_likes
      sortObj.created_at = Session.get('created_at');
    } else if (sortType == "like") {
      delete sortObj.created_at
      sortObj.count_likes = Session.get('sortLikes');
    } else {
      delete sortObj.count_likes
      sortObj.created_at = Session.get('created_at');
    }
    // end sort data 
    return Stories.find({}, { sort: sortObj });
  },
  ImageId() {
    findIdImage = Stories.findOne({ _id: Template.parentData(0)._id });
    return Images.findOne({ _id: findIdImage.pictures });
  },
  getDescription(description) {
    if (FlowRouter.subsReady()) {
      return description.replace(/<(.|\n)*?>/g, ' ').substring(0, 170) + '   ...';
    }
  },
  jalali(date) {
    moment.loadPersian({ dialect: 'persian-modern' })
    return moment(date).format('jD-jMMMM')
  },
  bestStory(options) {
    if (options) {
      return 'best-story'
    }
  },
  search() {
    Session.set("searching", false);
    return Session.get("searching");

  },
  profilePic(id) {
    if (FlowRouter.subsReady()) {

      if (id != undefined) {


        let newarr = []
        let arr = Stories.find().map((item) => {
          if (item.created_by != undefined) {
            newarr.push(item.created_by)
          }
        })
        let subUsers = Meteor.subscribe("getusersImageHome", newarr);
        if (subUsers.ready()) {
          return Meteor.users.findOne({ "_id": id }).profile.picture
        }
      } else {
        return "/images/logo.svg"
      }
    }
  },
  category() {
    return [
      {
        label: 'خانواده',
        value: 'خانواده',
      },
      {
        label: 'روزمرگی',
        value: 'روزمرگی',
      },
      {
        label: 'کودکانه',
        value: 'کودکانه',
      },
      {
        label: 'ترسناک',
        value: 'ترسناک',
      },
      {
        label: 'مسافرت',
        value: 'مسافرت',
      },
      {
        label: 'طنز',
        value: 'طنز',
      },
      {
        label: 'کسب و کار',
        value: 'کسب و کار',
      },
      {
        label: 'سبک زندگی',
        value: 'سبک زندگی',
      },
      {
        label: 'زندگی نامه و خاطرات',
        value: 'زندگی نامه و خاطرات',
      },
      {
        label: 'سایر',
        value: 'سایر',
      },
    ]
  }
});



Template.mainIndex.events({
  // searching
  "keyup #js-search-stories-home": function (event, template) {
    let value = event.currentTarget.value;
    // if(value.length > 2 && event.keyCode == 13){
    if (value.length > 2) {
      if (value !== '') {
        Session.set('searchText', value);
        Session.set('searching', true);
      }
    }
    if (value === '') {
      Session.set("searchText", '');
    }
  },
  "click .js-sort-created-on"(event, template) {
    $('.js-sort-created-on').toggleClass('active');
    Session.set('sortType', 'date');

    if (Session.get("created_at") > 0) {
      Session.set("created_at", -1);
      $(".js-sort-created-on a").html(`  <i class="material-icons">keyboard_arrow_down</i>
        قدیمی‌ها`)
    } else {
      $(".js-sort-created-on a").html(`  <i class="material-icons">keyboard_arrow_down</i>
      جدید‌تر‌ها`)
      Session.set("created_at", +1);

    }
  },
  "click .js-category-change-home li a"(events, template) {
    let category = events.currentTarget.textContent
    Session.set("category", category);
  },
  'click .js-sort-likes-home'(events, template) {
    $('.js-sort-likes-home').toggleClass('active');
    Session.set('sortType', 'like');
    if (Session.get('sortLikes') > 0) {
      Session.set("sortLikes", -1);

    } else {
      Session.set("sortLikes", +1);
    }
  },
  'click .js-unknown-change-home li a'(events, template) {
    switch (events.currentTarget.textContent) {
      case 'شناس':
        Session.set("unknownHome", "1");
        break;
      case 'ناشناس':
        Session.set("unknownHome", "-1");
        break;
      case 'داستان برتر':
        Session.set("unknownHome", "2");
        break;
      default:
        Session.set("unknownHome", "");
    }
    console.log("Session.get",Session.get("unknownHome"));
  }
  // filter
});

Template.mainIndex.onCreated(function () {
  let template = Template.instance();
  $(".dropdown-button").dropdown();
  Session.set("limitStories", 8);
  Session.set("category", '');
  Session.set("sortLikes", 0);
  Session.set("unknownHome", "");
  Session.set("searchText", '');
  Session.set("created_at", -1);
  Session.set("sortType", 'date');


  this.autorun(() => {
    let sub = Meteor.subscribe("stories_home", {
      limitStories: Session.get("limitStories"),
      categoryStories: Session.get("category"),
      sortLikes: Session.get("sortLikes"),
      unknown: Session.get("unknownHome"),
      searchText: Session.get("searchText"),
      created_at: Session.get("created_at"),
      sortType: Session.get('sortType')
    }, () => {
      setTimeout(function () {
        Session.set("Searching", false);
      }, 300);
    });

    if (sub.ready) {

      let arrUsers = []
      let arrImage = []
      Stories.find().map((item) => {
        if (item.created_by != undefined) {
          arrUsers.push(item.created_by)
        }
        arrImage.push(item.pictures)
      })
      let subUsers = Meteor.subscribe("getusersImageHome", arrUsers);
      Meteor.subscribe("images_home", arrImage);
    }
  })
})
Template.mainIndex.onRendered(function () {
  $(document).ready(function () {
    setTimeout(function () {
      $(".dropdown-button").dropdown();
    }, 500);

    // when user scroll to bottom ,load story 




    var controller = new ScrollMagic.Controller();


    var scene = new ScrollMagic.Scene({ triggerElement: ".load-story", triggerHook: "onEnter" })
      .addTo(controller)
      .on("enter", function (e) {
        if ($("#progressLoader").hasClass("hide")) {
          $("#progressLoader").removeClass("hide");

          // $('.load-story').remove()
          Session.set("limitStories", Session.get("limitStories") + 6)
          setTimeout(function () {
            $("#progressLoader").addClass("hide");
            scene.update();
          }, 1000);
        }
      });
    // End Scroll Magic 

  });
})
