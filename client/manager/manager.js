import moment from 'moment-jalaali'
Template.managerPage.helpers({
  listStories: function(){
      return Stories.find({});
  },
  ImageId(){
    findIdImage= Stories.findOne({_id:Template.parentData(0)._id});
    return Images.findOne({_id : findIdImage.pictures});
  },
  getDescription(description){
    return description.replace(/<(.|\n)*?>/g, ' ').substring(0,150) + '   ...';
  },
  jalali(date){
    moment.loadPersian({dialect: 'persian-modern'})
    return moment(date).format('jD-jMMMM')
  },
  imgProfileUser(id){
    if(FlowRouter.subsReady()){

      if(id != undefined){

        
        let newarr = []
        let arr = Stories.find().map((item)=>{
          if(item.created_by != undefined){
            newarr.push(item.created_by)
          }
        })
        let subUsers = Meteor.subscribe("getusersImageHome",newarr);
        if(subUsers.ready()){
          return Meteor.users.findOne({"_id":id}).profile.picture
        }
      }else{
        return "/images/default/unknown.png"
      }
    } 
  }
});


Template.managerPage.onCreated(function(){
  moment.locale('fa');
  let optionsSubscribeStories = {
          // limit:Session.get("booksLimmited"),
          // province:Session.get("province"),
          // category:Session.get("category")
      };
    this.autorun(() => {
     let suscriveStorie = Meteor.subscribe("stories_manager");
     let arrImageStories=[];
     if(suscriveStorie.ready()){

      Stories.find().map((item)=>{
        arrImageStories.push(item.pictures)
      })
      this.subscribe("images_manage",arrImageStories);
     }
   });
})
