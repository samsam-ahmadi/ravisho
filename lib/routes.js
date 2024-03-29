
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
      DocHead.setTitle("راوی شو - دنیایی از جنس داستان");
      DocHead.addMeta({property: 'description', content: "ما آدما داستان‌های زیادی برای گفتن داریم. تجربیات زندگی، موفقیت و شکست‌ها، عاشقانه‌های زندگی و هرآنچه که در زندگی برای ما پیش میاد. راوی شو محیطی گرم و دوستانه برای تعریف داستان‌هاست. می‌توانید داستان‌های خود را به صورت ناشناس هم منتشر کنید"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "راوی شو - دنیایی از جنس داستان"});
      DocHead.addMeta({property: 'og:type', content: "website"});
      DocHead.addMeta({property: 'twitter:title', content: "ما آدما داستان‌های زیادی برای گفتن داریم. تجربیات زندگی، موفقیت و شکست‌ها، عاشقانه‌های زندگی و هرآنچه که در زندگی برای ما پیش میاد. راوی شو محیطی گرم و دوستانه برای تعریف داستان‌هاست. می‌توانید داستان‌های خود را به صورت ناشناس هم منتشر کنید"});
      DocHead.addMeta({property: 'twitter:url', content: "https://ravisho.com"});
    }
});

FlowRouter.route('/our-story', {
  name:'ourStoryPage',
    action: function() {
      BlazeLayout.render('mainLayout', {main: "ourStory",header: 'header',footer:'footer'});
      DocHead.setTitle("داستان ما");
      DocHead.addMeta({property: 'description', content: "راوی شو - داستان‌های سازندگان راوی‌شو"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "داستان‌ ما"});
      DocHead.addMeta({property: 'og:type', content: "website"});
      DocHead.addMeta({property: 'twitter:title', content: "داستان‌ ما"});
      DocHead.addMeta({property: 'twitter:url', content: "راوی شو - داستان‌های سازندگان راوی‌شو"});
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
      DocHead.setTitle("راوی شو - داستان جدید");
      DocHead.addMeta({property: 'description', content: "راوی شو - داستان جدید"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "داستان جدید"});
      DocHead.addMeta({property: 'og:type', content: "website"});
      DocHead.addMeta({property: 'twitter:title', content: "راوی شو - داستان جدید"});
      DocHead.addMeta({property: 'twitter:url', content: "داستان جدید"});
    }
});
FlowRouter.route('/login', {
  name:'loginPage',
    action: function() {
      BlazeLayout.render('mainLayout', {main: "loginPage",header: 'header',footer:'footer'});
      DocHead.setTitle("راوی شو - ورود");
      DocHead.addMeta({property: 'description', content: "راوی شو - ورود"});
      DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
      DocHead.addMeta({property: 'og:title', content: "ورود"});
      DocHead.addMeta({property: 'og:type', content: 'website'});
      DocHead.addMeta({property: 'twitter:title', content: "راوی شو - ورود"});
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
    DocHead.setTitle('راوی شو - تنظیمات کاربری');
    DocHead.addMeta({property: 'description', content: "تنظیمات کاربری"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: "تنظیمات کاربری"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'twitter:title', content: "راوی شو - تنظیمات کاربری"});
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
    DocHead.setTitle('راوی شو - داستان‌های من');
    DocHead.addMeta({property: 'description', content: "راوی شو - داستان‌های من"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: "داستان‌های من"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'twitter:title', content: "راوی شو - داستان‌های من"});
    DocHead.addMeta({property: 'twitter:url', content: 'ravisho.com/stories/ravisho'});
  }
});


FlowRouter.route( '/reset-password/:token', {
  name: 'resetPassword',
  action: function(params) {
    BlazeLayout.render('mainLayout', {main: "resetPassword",header: 'header',footer:'footer'});
  }
});



FlowRouter.route( '/verify/:token', {
  name: 'verifyEmail',
  action: function(params) {
    BlazeLayout.render('mainLayout', {main: "verifyEmailUser",header: 'header',footer:'footer'});
  }
});


AccountsTemplates.configureRoute('resetPwd', {
  template: 'resetPassword',
  name:'resetPwd',
  redirect:"/",
  path:'/reset-password'
});

// 404 error

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('mainLayout', {main: "404page"});
    DocHead.removeDocHeadAddedTags()
    DocHead.setTitle("راوی شو - صفحه مورد نظر پیدا نشد");
    DocHead.addMeta({property: 'description', content: "صفحه مورد نظر پیدا نشد"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: " راوی شو - صفحه مورد نظر پیدا نشد"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
  }
};




// reset password




//term and conidtions

FlowRouter.route('/terms', {
  name:'TermConditionsPage',
  action: function() {
    BlazeLayout.render('mainLayout', {main: "termConditionsPage",header: 'header',footer:'footer'});

    DocHead.removeDocHeadAddedTags()
    DocHead.setTitle('قوانین راوی‌شو');
    DocHead.addMeta({property: 'description', content: "قوانین راوی‌شو"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: "قوانین راوی‌شو"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'twitter:title', content: "قوانین راوی‌شو"});
    DocHead.addMeta({property: 'twitter:url', content: 'https://ravisho.com/terms-conditions'});
  }
});



FlowRouter.route('/contact-us', {
  name:'TermConditionsPage',
  action: function() {
    BlazeLayout.render('mainLayout', {main: "contactUs",header: 'header',footer:'footer'});
    DocHead.removeDocHeadAddedTags()
    DocHead.setTitle('ارتباط با ما');
    DocHead.addMeta({property: 'description', content: "ارتباط با ما"});
    DocHead.addMeta({property: 'og:site_name', content: 'ravisho'});
    DocHead.addMeta({property: 'og:title', content: "ارتباط با ما"});
    DocHead.addMeta({property: 'og:type', content: 'website'});
    DocHead.addMeta({property: 'twitter:title', content: "ارتباط با ما"});
    DocHead.addMeta({property: 'twitter:url', content: 'https://ravisho.com/contact-us'});
  }
});