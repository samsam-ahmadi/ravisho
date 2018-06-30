Template.profilePage.helpers({
  users: function(){
    try {
      // if(FlowRouter.subsReady()){
        let user =  Meteor.users.findOne();
        return Meteor.users.findOne();
      // }
    } catch (e) {
      return e
    }

  },
  picture(){
    try {
      let sub = Meteor.subscribe("ProfileImage", Meteor.users.findOne().profile.picture);
      if(sub.ready){
        return Meteor.users.findOne().profile.picture;
      }
    } catch (e) {
      
    }
  }
});

Template.profilePage.events({
  "change .js-upload-image-profile": function(event, template){
     FS.Utility.eachFile(event,function(file){
       let  newFile = new FS.File(file);
       ProfileImages.insert(newFile,function(err,file){
         if(!err){
           Meteor.setTimeout(function() { 
              Meteor.users.update({"_id":Meteor.userId()},{$set:{'profile.picture':file.url({brokenIsFine: true})}})
           }, 1500);
         }else{
           
         }
       })
     })
  },
  "click .submit-profile"(events,template){
    let  obj = {};
    let name = $('#name').val().trim();
    let password = $('#password').val().trim();
    let verifyPassword = $('#verify-password').val().trim();
    if(password.length <6 && password.length > 1){
        Bert.alert("رمز عبور شما حداقل باید ۶ کارکتر باشد","warning","growl-top-right")
        return false;
    }else if(password !== verifyPassword){
      Bert.alert("رمز عبور با تاییدیه رمز عبور مطابقت ندارد","warning","growl-top-right")
      return false;
    }else if(password.length != 0){
      obj.password =password;
    }

    let oldName = Meteor.users.findOne().profile.name;
    if(name !== oldName){
      obj.name = name;
    }

    if(Object.keys(obj).length>0){
      Meteor.call( 'updateProfile' , obj, function(error, success) { 
        if (error) { 
           
          Bert.alert(error,'danger','growl-top-right')
        } 
        if (success) { 
           
           Bert.alert(success,"success","growl-top-right")
        } 
      });
    }else{
      return false;
    }

    
  },
  "click .js-send-email-verification"(event,template){
    
    Meteor.call('sendEmailVerify', {}, function(error, success) { 
      if (error) { 
        Bert.alert("خطایی در ارسال تاییدیه ایمیلرخ داده است لطفا مجددا تلاش کنید","danger","growl-top-right")
      } 
      if (success) { 
        Bert.alert("تاییدیه ایمیل برای شما با موفقیت ارسال شد","success","growl-top-right")
      } 
    });
  }
});