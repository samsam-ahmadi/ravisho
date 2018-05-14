import moment from 'moment-jalaali';
Meteor.subscribe("Tags")
Template.managerPostPage.helpers({
  postItem(){
    return Stories.findOne();
  },
  ImageId(){
    try {
      if(FlowRouter.subsReady()){
        findIdImage= Stories.findOne().pictures;
        let sub =  Meteor.subscribe("managerImagePageSub", findIdImage);
        if(sub.ready()){
          return Images.findOne({_id : findIdImage}).url();
        }
      }
    } catch (e) {
      console.Error('E', e)
    }
  },
  tags(){
    if (FlowRouter.subsReady()) {
      return Stories.findOne().tags.split(',');
    }
  },
  StoriesUser(){
    try {
      if(FlowRouter.subsReady()){
        // if user publishe story in unknown
        let data = Stories.findOne();
        if(data.unknown){

          return {"profile":{"picture":"/images/default/unknown.png"},"username":"(راوی شو (ناشناس","unknown":true};
          // sub ready
        }else{
          let sub =  Meteor.subscribe("managerUserPageSub",data.created_by);
          if(sub.ready()){
            return Meteor.users.findOne({"_id":data.created_by});
          }
        }
      }
    } catch (e) {
      
    }
  },
  jalali(date){
    if (FlowRouter.subsReady()) {
      try {
        moment.loadPersian({dialect: 'persian-modern'})
        return moment(date).format('jD jMMMM jYY')

      } catch (e) {
        
      }
    }
  }
});

Template.managerPostPage.events({
  //  change published story to true and chaange tags and saved to collections
  "click #js-submit-story": function(event, template){
    let data = Stories.findOne()
    console.log('data: ', data);
    // delete unnessery feilds
    delete data.stories;
    delete data.created_at;
    
    
    Meteor.call("submitStory",data, function(error, result){
      if(error){
        console.log('error: ', error);
        
      }
      if(result){
        
        Materialize.toast("داستان ثبت شد",1000)
        FlowRouter.redirect("/manager")
      }
    });
  },
  "click #js-submit-best-story": function(event, template){
    let data = Stories.findOne()
    delete data.stories;
    delete data.created_at;
    Meteor.call("submitBestStory",data, function(error, result){
      if(error){
        
      }
      if(result){
        Materialize.toast("داستان به عنوان برتر ثبت شد",1000)
        FlowRouter.redirect("/manager")
      }
    });
  },
  "click #js-correction": function(event, template){
    $(".modal-corrected").toggleClass('active');
  },
  "click .modal-corrected i": function(event, template){
    $(".modal-corrected").toggleClass('active');
  },
  "click .js-submit-corrected"(event,template){
    let data = Stories.findOne();
    data.txtcorrected = $(".modal-corrected textarea").val();

    Meteor.call("submitCurrectedStory",data, function(error, result){
      if(error){
        
      }
      if(result){
        $(".modal-corrected").toggleClass('active');
        Materialize.toast("موارداصلاح شده ارسال شد",1000)
        FlowRouter.redirect("/manager")
      }
    });
  }
});


Template.managerPostPage.onRendered = function(){
  
};
