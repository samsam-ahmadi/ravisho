
// Tracker.autorun(() => {
//   // wait on roles to intialise so we can check is use is in proper role
//   if (Roles.subscription.ready() && !FlowRouter._initialized) {
//     FlowRouter.initialize()
//   }
// });
FlowRouter.route('/', {
  name:'home',
    action: function() {
      BlazeLayout.render('mainLayout', {main: "mainIndex",header: 'header',footer:'footer'});
      DocHead.setTitle("راوی‌شو | داستان‌های نگفته و ماندگار");
      DocHead.addMeta({property: 'description', content: "راوی‌شو | داستان‌های خودت رو به صورت شناس و ناشناس بگو"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "راوی‌شو | داستان‌های نگفته و ماندگار"});
      DocHead.addMeta({property: 'og:type', content: "website"});
      DocHead.addMeta({property: 'twitter:title', content: "راوی‌شو | داستان‌های نگفته و ماندگار"});
      DocHead.addMeta({property: 'twitter:url', content: "https://ravisho.com"});
    }
});

FlowRouter.route('/our-story', {
  name:'ourStoryPage',
    action: function() {
      BlazeLayout.render('mainLayout', {main: "ourStory",header: 'header',footer:'footer'});
      DocHead.setTitle("داستان ما");
      DocHead.addMeta({property: 'description', content: "داستان  ما | صفحه‌ای است از داستان‌های سازندگان راوی‌شو"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "داستان‌ ما"});
      DocHead.addMeta({property: 'og:type', content: "website"});
      DocHead.addMeta({property: 'twitter:title', content: "داستان‌ ما"});
      DocHead.addMeta({property: 'twitter:url', content: "داستان  ما | صفحه‌ای است از داستان‌های سازندگان راوی‌شو"});
    }
});

FlowRouter.route('/new', {
  name:'newPage',
  triggersEnter: [(context, redirect) => {
    if (!Meteor.userId() ) {
      redirect('/login');
    }
    if(Roles.userIsInRole(Meteor.userId(), ['blocked'])){
      redirect('/');      
      Bert.alert("شما اجازه ساختن داستان جدید را ندارید.",'danger', 'growl-top-right')
    }
  }],
    action: function() {
      BlazeLayout.render('mainLayout', {main: "newStory",header: 'header',footer:'footer'});
      DocHead.setTitle("داستان جدید");
      DocHead.addMeta({property: 'description', content: "داستان جدید"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "داستان جدید"});
      DocHead.addMeta({property: 'og:type', content: "website"});
      DocHead.addMeta({property: 'twitter:title', content: "داستان جدید"});
      DocHead.addMeta({property: 'twitter:url', content: "داستان جدید"});
    }
});
FlowRouter.route('/login', {
  name:'loginPage',
    action: function() {
      BlazeLayout.render('mainLayout', {main: "loginPage",header: 'header',footer:'footer'});
      DocHead.setTitle("ورود");
      DocHead.addMeta({property: 'description', content: "ورود"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "ورود"});
      DocHead.addMeta({property: 'og:type', content: 'website'});
      DocHead.addMeta({property: 'twitter:title', content: "ورود"});
      DocHead.addMeta({property: 'twitter:url', content: "ورود"});
    }
});
FlowRouter.route('/manager', {
  name:'managerPage',
    triggersEnter: [(context, redirect) => {
      if (!Roles.userIsInRole(Meteor.userId(), ['admin','management'])) {
        redirect('/');
      }
    }],
    action: function() {
      BlazeLayout.render('mainLayout', {main: "managerPage",header: 'header',footer:'footer'});
      DocHead.removeDocHeadAddedTags()
      DocHead.setTitle("مدیریت داستان‌ها");
      DocHead.addMeta({property: 'description', content: "مدیریت داستان‌ها"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "مدیریت داستان‌ها"});
      DocHead.addMeta({property: 'og:type', content: 'website'});
      DocHead.addMeta({property: 'twitter:title', content: "مدیریت داستان‌ها"});
      DocHead.addMeta({property: 'twitter:url', content: "مدیریت داستان‌ها"});
    }
});
FlowRouter.route('/m/:_id/:_title', {
    name:'managerPostPage',
    subscriptions: function(params, queryParams) {
        this.register('managerPostPage', Meteor.subscribe('managerPostPageSub', params._id));
    },
    triggersEnter: [(context, redirect) => {
      if (!Roles.userIsInRole(Meteor.userId(), ['admin','management'])) {
        redirect('/');
      }
    }],
    action: function() {
      BlazeLayout.render('mainLayout', {main: "managerPostPage",header: 'header',footer:'footer'});
    }
});
// public user can see that

FlowRouter.route('/s/:_id/:_title', {
    name:'singlePostPage',
    subscriptions: function(params, queryParams) {
        this.register('myPost', Meteor.subscribe('singlePostPageSub', params._id));
    },
    action: function() {
      BlazeLayout.render('mainLayout', {main: "singleStoryPage",header: 'header',footer:'footer'});
    }
});




FlowRouter.route('/e/:_id/:_title', {
  name:'editPostPage',
  subscriptions: function(params, queryParams) {
    if(Meteor.userId()) {
      this.register('editMyPost', Meteor.subscribe('editPostPageSub', params._id));
    }
  },
  action: function() {
    BlazeLayout.render('mainLayout', {main: "updateStory",header: 'header',footer:'footer'});
  }
});


// show users and manage them

FlowRouter.route('/users', {
  name:'usersPage',
    triggersEnter: [(context, redirect) => {
      if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        redirect('/');
      }
    }],
    action: function() {
      BlazeLayout.render('mainLayout', {main: "usersPage",header: 'header',footer:'footer'});
    }
});



// setting
FlowRouter.route('/setting', {
  name:'settingPage',
  triggersEnter: [(context, redirect) => {
    if (!Meteor.userId()) {
      redirect('/');
    }
  }],
  subscriptions: function(params, queryParams) {
      this.register('mySetting', Meteor.subscribe('ProfilePageSub'));
      this.register('mySetting', Meteor.subscribe('ProfileImagePageSub'));
  },
  action: function() {
    BlazeLayout.render('mainLayout', {main: "profilePage",header: 'header',footer:'footer'});
    DocHead.removeDocHeadAddedTags()
    DocHead.setTitle('تنظیمات کاربری');
    DocHead.addMeta({property: 'description', content: "تنظیمات کاربری"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: "تنظیمات کاربری"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'twitter:title', content: "تنظیمات کاربری"});
    DocHead.addMeta({property: 'twitter:url', content: 'ravisho.com/setting'});
  }
});

// list of stories user
FlowRouter.route('/stories/:_username', {
  name:'StoriesUserPage',
  triggersEnter: [(context, redirect) => {
    if (!Meteor.userId()) {
      redirect('/login');
    }
  }],
  subscriptions: function(params, queryParams) {
      this.register('StoriesUserPage', Meteor.subscribe('listStoryUserPageSub'));
  },
  action: function() {
    BlazeLayout.render('mainLayout', {main: "listStoriesUser",header: 'header',footer:'footer'});

    DocHead.removeDocHeadAddedTags()
    DocHead.setTitle('داستان‌های من');
    DocHead.addMeta({property: 'description', content: "داستان‌های من"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: "داستان‌های من"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'twitter:title', content: "داستان‌های من"});
    DocHead.addMeta({property: 'twitter:url', content: 'ravisho.com/stories/ravisho'});
  }
});


FlowRouter.route( '/reset-password/:token', {
  name: 'resetPassword',
  action: function(params) {
    BlazeLayout.render('mainLayout', {main: "resetPassword",header: 'header',footer:'footer'});
  }
});

AccountsTemplates.configureRoute('resetPwd', {
  template: 'resetPassword',
});

FlowRouter.route( '/verify-emails/:token', {
  name: 'verifyEmail',
  action: function(params) {
    BlazeLayout.render('mainLayout', {main: "verifyEmail",header: 'header',footer:'footer'});
  }
});

// 404 error

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('mainLayout', {main: "404page"});
    DocHead.removeDocHeadAddedTags()
    DocHead.setTitle("صفحه مورد نظر پیدا نشد");
    DocHead.addMeta({property: 'description', content: "صفحه مورد نظر پیدا نشد"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: "صفحه مورد نظر پیدا نشد"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'twitter:title', content: "صفحه مورد نظر پیدا نشد"});
    DocHead.addMeta({property: 'twitter:url', content: "صفحه مورد نظر پیدا نشد"});
  }
};




// reset password

