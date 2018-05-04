Template.header.helpers({
  imageuser: function() {
    try {
         let src = Meteor.users.findOne({"_id":Meteor.userId()}).profile.picture;
         if(src){
           return src;
         }else{
           return '/images/logo.svg'
         }
    } catch (e) {
      
    }
  }
});
Template.header.events({
  "mouseenter .menu-content-primary .item": function(event, template){

    if($(window).width() <600){
      if(!$(event.currentTarget).find('.item-link a').hasClass('activated')){
        $('.menu-content-primary .item .item-link a').removeClass('activated');
        $(event.currentTarget).find('.item-link a').addClass('activated');
        $('.menu-item-des').html('')
        $('.menu-content-primary .item-content').css('display', 'none');
        $(event.currentTarget).find('.item-content').css('display', 'block');
        let tl = new TimelineMax();
        tl
        .staggerTo('.menu-content-primary .item-content .item-list a',0.3,{opacity:1},0.1);
      }
    }else{
      if(!$(event.currentTarget).find('.item-link a').hasClass('activated')){
        $('.menu-content-primary .item .item-link a').removeClass('activated');
        $(event.currentTarget).find('.item-link a').addClass('activated');
        $('.menu-item-des').html($(event.currentTarget).children('.item-content').clone())
        let tl = new TimelineMax();
        tl
        .staggerTo('.menu-item-des .item-content .item-list a',0.3,{opacity:1},0.1);
      }
    }
  },
  "click .menu-content-primary .item": function(event, template){
    if($(window).width() <600){
      if(!$(event.currentTarget).find('.item-link a').hasClass('activated')){
        $('.menu-content-primary .item .item-link a').removeClass('activated');
        $(event.currentTarget).find('.item-link a').addClass('activated');
        $('.menu-item-des').html('')
        $('.menu-content-primary .item-content').css('display', 'none');
        $(event.currentTarget).find('.item-content').css('display', 'block');
      }
    }else{
      if(!$(event.currentTarget).find('.item-link a').hasClass('activated')){
        $('.menu-content-primary .item-content').css('display', 'none');;
        $('.menu-content-primary .item .item-link a').removeClass('activated');
        $(event.currentTarget).find('.item-link a').addClass('activated');
        $('.menu-item-des').html($(event.currentTarget).children('.item-content').clone())
        let tl = new TimelineMax();
        tl
        .staggerTo('.menu-item-des .item-content .item-list a',0.3,{opacity:1,y:10},0.1);
      }
    }

  },
  "click .js-menu"(event, template){
    let tl = new TimelineMax();
    tl
    .to('.menu-content', 0.1, { display:'block'} )
    .to('.menu-content', 0.3, { opacity:0.95} )
    .staggerTo('.menu-content-primary .item',0.2,{opacity:1,y:15},0.1)
  },
  "click .close-header"(events,template){
    let tl = new TimelineMax();
    tl
    .staggerTo('.menu-content-primary .item',0.2,{opacity:0,y:0},0.1)
    .to('.menu-content', 0.3, { opacity:0} )
    .to('.menu-content', 0.1, { display:'none'} )
  },
  "click #logout"(events,template){
    Meteor.logout(function(){});

    FlowRouter.go("/")
  },
  "click #js-profile"(events,template){
      $(".dropdown-button").dropdown();
  },
  "click .verifying-user"(events,template){
    Bert.alert("لطفا قبل ارسال داستان ایمیل خود را تایید کنید. برای درخواست مجدد تاییدیه ایمیل به تنظیمات کاربری برید.","warning","growl-top-right")
  }

});

Template.header.rendered = function(){
  setTimeout(function(){
    $(".dropdown-button").dropdown();
  }, 500);
  $(".dropdown-button").dropdown();
}
