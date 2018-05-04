import moment from 'moment-jalaali';
Template.singleStoryPage.helpers({
  postItem() {
    if (FlowRouter.subsReady()) {
      if (Stories.find().count() > 0) {
        let story = Stories.findOne();
        DocHead.removeDocHeadAddedTags()
        DocHead.setTitle(story.title);
        DocHead.addMeta({ property: 'description', content: story.stories.substring(0, 170) });
        DocHead.addMeta({ property: 'og:site_name', content: 'ravisho' });
        DocHead.addMeta({ property: 'og:title', content: story.title });
        DocHead.addMeta({ property: 'og:type', content: 'website' });
        DocHead.addMeta({ property: 'og:description', content: story.stories.substring(0, 170) });
        DocHead.addMeta({ property: 'twitter:card', content: story.stories.substring(0, 170) });
        DocHead.addMeta({ property: 'twitter:title', content: story.title });
        DocHead.addMeta({ property: 'twitter:url', content: 'ravisho.com' + FlowRouter.current().path });
        DocHead.addMeta({ property: 'twitter:description', content: story.stories.substring(0, 170) });
        return Stories.findOne();
      } else {
        
        FlowRouter.redirect("/")
      }
    }
  },
  ImageId() {
    try {
      if (FlowRouter.subsReady()) {
        findIdImage = Stories.findOne().pictures;
        let sub = Meteor.subscribe("managerImagePageSub", findIdImage);
        if (sub.ready()) {
          DocHead.addMeta({ property: 'og:image', content: Images.findOne({ _id: findIdImage }).url() });
          return Images.findOne({ _id: findIdImage }).url();
        }
      }
    } catch (e) {
      
    }
  },
  StoriesUser() {
    try {
      if (FlowRouter.subsReady()) {
        let story = Stories.findOne();
        // if user publishe story in unknown
        let sub = Meteor.subscribe('singleUserPageSub', story.created_by);
        if (Stories.findOne().unknown) {
          return { "profile": { "picture": "/images/logo.jpg" }, "username": "(راوی شو (ناشناس" };
          // sub ready
        } else {
          if (sub.ready()) {
            return Meteor.users.findOne({ '_id': story.created_by });
          }
        }
      }
    } catch (e) {
      
    }
  },
  jalali(date) {
    try {
      moment.loadPersian({ dialect: 'persian-modern' })
      return moment(date).format('jD jMMMM jYY')

    } catch (e) {
      
    }
  },
  canEdit() {
    if (FlowRouter.subsReady()) {
      if (Stories.findOne().created_by == Meteor.userId()  && Meteor.userId() || Roles.userIsInRole(this.userId, ['admin'])) {
        return true;
      } else {
        return false;
      }
    }
  },
  tags() {
    if (FlowRouter.subsReady()) {
      return Stories.findOne().tags.split(/\،|,/);
    }
  },
  countLikesStories() {
    if (FlowRouter.subsReady()) {
      if (Stories.findOne().likes) {


        let count = Stories.findOne().likes[0].NumberLikes
        switch (count) {
          case 1:

            return { 'like': 'like1', 'msg': 'یک بار دوست داشتید' }
            break;
          case 2:
            return { 'like': 'like2', 'msg': 'دو بار دوست داشتید' }
            break;
          case 3:
            return { 'like': 'like3', 'msg': 'سه بار دوست داشتید' }
            break;
          case 4:
            return { 'like': 'like4', 'msg': 'چهار بار دوست داشتید' }
            break;
          case 5:
            return { 'like': 'like5', 'msg': 'خیلی دوست دارید' }
            break;
          default:
            return;
        }
      }
    }

  }
});


Template.singleStoryPage.onCreated(function () {
})

Template.singleStoryPage.events({

  "click .like-post": function (event, template) {
    let data = Stories.findOne();
    if (Meteor.userId()) {
      Meteor.call("increaseLikes", data, function (error, result) {
        if (error) {
          
        }
        if (result) {
          

        }
      });
    } else {
      Bert.alert("لطفا وارد شوید", "warning", "growl-top-right")
    }
    //end call
  },
  "click #back"(event, template) {
    var defaultLocation = "https://www.ravisho.com";
    var oldHash = window.location.hash;
    history.back(); // Try to go back
    var newHash = window.location.hash;
    if (
      newHash === oldHash &&
      (typeof (document.referrer) !== "string" || document.referrer === "")
    ) {
      window.setTimeout(function () {
        // redirect to default location
        window.location.href = defaultLocation;
      }, 1000); // set timeout in ms
    }
    if (e) {
      if (e.preventDefault)
        e.preventDefault();
      if (e.preventPropagation)
        e.preventPropagation();
    }
    return false; // stop event propagation and browser default event
  }

});

Template.singleStoryPage.onRendered(function () {
  //fixed sidebar
  if ($(window).width() > 996) {
    fixedSidebr()
  }
  // $(window).resize(function(){

  //   if($(window).width() > 996){
  //     fixedSidebr();
  //   }
  // })
  // end fixed sidebar


});
function fixedSidebr() {
  setTimeout(function () {
    let $sidebar = $(".sidebar-single-page"),
      $window = $(window),
      offset = $sidebar.offset(),
      offsetFooter = $('footer').offset().top;
      if($(".sidebar-single-page").length >0){
        $window.scroll(function () {
          
          if ($window.scrollTop() > offset.top && $window.scrollTop() < parseInt($('.main-content').height()) - parseInt($('.main-content').offset().top -parseInt($('.share-it').height()) ) -parseInt(120) ) {
            $sidebar.css({
              marginTop: $window.scrollTop() - offset.top+150
            });
          } else {
            $sidebar.css({
            marginTop: 0
            });
          }
        });
      }
  }, 1000)

}