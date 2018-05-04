Meteor.subscribe('images');
Template.afFileSelectFileBtnTemplateFixed.onRendered(function () {
  $(".js-file").fileupload();
});
AutoForm.setDefaultTemplate('materialize');

Template.newStory.rendered= function (){
// initial summernote
  $('.editor').summernote({
      toolbar: [
      ],
      shortcuts: {},
      placeholder: 'داستانت رو شروع کن :))',    
      callbacks: {
        onPaste: function (e) {
          var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');

          e.preventDefault();
  
          document.execCommand('insertText', false, bufferText);
      } 
    }
  });

  // end  summer
}

var hooksObject = {
  before: {
    insert: function(doc) {
      // get story of input
      let htmlStories =  $('.editor').summernote('code');
      doc.stories = htmlStories;
      // get tags from input page 
      if(htmlStories == "<p><br></p>"){
        return false;
      }
      if(Roles.userIsInRole(Meteor.userId(), ['blocked'])){
        Bert.alert("شما اجازه ساختن داستان جدید را ندارید.",'danger', 'growl-top-right')
        redirect('/');      
        return false;
      }
      
      if(Meteor.user().emails[0].verified){
        return doc;
      }else{
        Bert.alert("لطفا قبل ارسال داستان ایمیل خود را تایید کنید. برای درخواست مجدد تاییدیه ایمیل به تنظیمات کاربری برید.","warning","growl-top-right")
      }
    }
  },
  onSuccess: function(formType, result) {
    if(result){
      Bert.alert( 'داستان شما با موفقیت ارسال شد.لطفا منتظر تایید آن باشید', 'success', 'growl-top-right' ); 
      FlowRouter.redirect("/stories/"+Meteor.user().username)
    }
  }
};
AutoForm.hooks({
  newstory: hooksObject
});







// 
// 
// 
// 
// 
//        EDITOR
// 
// 
// 
// 
// 


Template.newStory.events({ 
  'change #event': function(event, template) { 
     
  } 
});

