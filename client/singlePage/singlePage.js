import moment from 'moment-jalaali';
Template.singleStoryPage.helpers({
  postItem() {
    if (FlowRouter.subsReady()) {
      if (Stories.find().count() > 0) {
        let story = Stories.findOne();
        DocHead.removeDocHeadAddedTags()
        DocHead.setTitle(" راوی شو -  " + story.title);
        DocHead.addMeta({ property: 'description', content: story.stories.substring(0, 200) });
        DocHead.addMeta({ property: 'og:site_name', content: 'ravisho' });
        DocHead.addMeta({ property: 'og:title', content: story.title });
        DocHead.addMeta({ property: 'og:type', content: 'website' });
        DocHead.addMeta({ property: 'og:description', content: story.stories.substring(0, 200) });
        DocHead.addMeta({ property: 'twitter:card', content: story.stories.substring(0, 200) });
        DocHead.addMeta({ property: 'twitter:title', content: " راوی شو -  " + story.title });
        DocHead.addMeta({ property: 'twitter:url', content: 'ravisho.com' + FlowRouter.current().path });
        DocHead.addMeta({ property: 'twitter:description', content: story.stories.substring(0, 2000) });
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
      if(FlowRouter.subsReady()){
        // if user publishe story in unknown
        let data = Stories.findOne();
        if(data.created_by == Meteor.userId() && Meteor.userId()){
          let sub =  Meteor.subscribe("managerUserPageSub",data.created_by);
          if(sub.ready()){
            let result =  Meteor.users.findOne({"_id":data.created_by});
            if(result.profile.picture){
              return result;
            }else{
          return {"profile":{"picture":'/images/default/profile.png'},"username":result.username,"countStories":result.countStories};
              
            }
          }
        }
        if(data.unknown){

          return {"profile":{"pictures":"/images/default/unknown.png"},"username":"(راوی شو (ناشناس","unknown":true};
          // sub ready
        }else{
          let sub =  Meteor.subscribe("managerUserPageSub",data.created_by);
          if(sub.ready()){
            let result =  Meteor.users.findOne({"_id":data.created_by});
            if(result.profile.picture){
              return result;
            }else{
          return {"profile":{"picture":'/images/default/profile.png'},"username":result.username,"countStories":result.countStories};
              
            }
          }
        }
      }
    } catch (e) {
      
    }
  },
  jalali(date) {
    try {
      if (FlowRouter.subsReady()) {
        moment.loadPersian({ dialect: 'persian-modern' })
        return moment(date).format('jD jMMMM jYY')
      }

    } catch (e) {

    }
  },
  canEdit() {
    if (FlowRouter.subsReady()) {
      if (Meteor.userId()) {
        if (Stories.findOne().created_by == Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          return true;
        } else {
          return false;
        }
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

            return { 'like': 'like1', 'msg': '۱ لایک' }
            break;
          case 2:
            return { 'like': 'like2', 'msg': '۲ لایک' }
            break;
          case 3:
            return { 'like': 'like3', 'msg': '۳ لایک' }
            break;
          case 4:
            return { 'like': 'like4', 'msg': '۴ لایک' }
            break;
          case 5:
            return { 'like': 'like5', 'msg': '۵ لایک' }
            break;
          default:
            return;
        }
      }
    }

  }
});


Template.singleStoryPage.onCreated(function () {
  if ($(window).width() > 996) {
    fixedSidebr()
  }
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
  },
  'click #js-delete-story'(event, template) {
    let idStory = Stories.findOne()._id;

    Meteor.call('deleteStory', idStory, function (error, success) {
      if (error) {

        Bert.alert("خطایی رخ داده است", "warning", "growl-top-right")

      }
      if (success) {
        FlowRouter.redirect("/")
        Bert.alert("داستان شما با موفقیت حذف شد.", "success", "growl-top-right")

      }
    });
  }

});

Template.singleStoryPage.onRendered(function () {
  //fixed sidebar
  setTimeout(function () {
    $('.modal').modal();
  }, 1000)
  if ($(window).width() > 996) {

    fixedSidebr();

    // setTimeout(function () {fixedSidebr();},1000);
  }


});
function fixedSidebr() {
  setTimeout(function () {
    let $sidebar = $(".sidebar-single-page"),
      $back = $("#back"),
      $window = $(window),
      offset = $sidebar.position(),
      offsetFooter = $('footer').position().top;
      $window.scroll(function () {
        console.log('offset: ', $window.scrollTop() + "asdasd"+ offset.top);
      //
      if ($(".sidebar-single-page").length > 0) {
        if ($window.scrollTop() > (parseInt(offset.top) -parseInt(30))  && $window.scrollTop() < (parseInt($('.main-content').height()) - parseInt($('.main-content').position().top - parseInt($('.share-it').height())) - parseInt(400))  ) {
          $sidebar.css({
            marginTop: $window.scrollTop() + 50,
          });
          $back.css({
            marginTop: $window.scrollTop() + 50,
          });
        } else {
          $sidebar.css({
            marginTop: 0
          });
          $back.css({
            marginTop: 0
          });
        }
      }
    });
  }, 1000)

}