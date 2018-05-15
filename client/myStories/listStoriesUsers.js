import moment from 'moment-jalaali'
Template.listStoriesUser.helpers({
  listStories: function(){
    if(FlowRouter.subsReady()){
        
        if(Meteor.users.findOne().username != FlowRouter.getParam("username")){
            FlowRouter.redirect("/stories/"+Meteor.user().username)
        }
        
        if(Stories.find({}).count() == 0){
            return false;
        }
        
        return Stories.find({},{sort:{created_at: -1},});
    }
  },
  ImageId(){
    let arrIdPicStorie = [];

    findIdImage= Stories.find().map((item)=>{
        arrIdPicStorie.push(item.pictures);
    });
    
    let subscribeImage = Meteor.subscribe('subscibeListStoriesImagesUser',arrIdPicStorie);
    if(subscribeImage.ready()){
        return Images.findOne({
            _id : Stories.findOne({_id:Template.parentData(0)._id}).pictures
        });
    } 
  },
  getDescription(description){
    return  description.replace(/<(.|\n)*?>/g, ' ').substring(0,150) + '   ...';
  },
  jalali(date){
    moment.loadPersian({dialect: 'persian-modern'})
    return moment(date).format('jD-jMMMM')
  },
  profileImg(){
    let subscribeImage = Meteor.subscribe('subscibeListStoriesUser',Stories.findOne().created_by);
    if(subscribeImage.ready()){


       let result =  Meteor.users.findOne({_id : Stories.findOne({}).created_by}).profile.picture;
        if(result){
            return result;
        }else{
            return '/images/default/profile.png';
        }
    }  
  },
  condition(){
      
      let data = Template.parentData(0);
      
      if(data.draft){
          return "/images/condition/draft.svg"
        }else if(!data.published && data.content_problems.length > 1){
            return "/images/condition/waiting-for-submit.svg"
        }else if (data.content_problems&& data.content_problems.length > 1){
            return "/images/condition/corrected.svg"
        }else if(!data.published){
            return "/images/condition/waiting-for-submit.svg"
        }else if(data.best_stories){
            return "/images/condition/best-story.svg"
        }else if(data.unknown){
            return "/images/condition/unknown.svg"
        }else{
            return "/images/condition/submited.svg"
        }
  }
});


Template.listStoriesUser.onCreated(function(){
  moment.locale('fa');
})
