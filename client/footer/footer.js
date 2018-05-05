Template.footer.helpers({
    numberOfStories: function() {
        Meteor.call('getPostCount',(err,res) => {
            if(res){
                $("#countStories").text(res);
            }
            if(err){
                return ""
            }

        })
    }
});
