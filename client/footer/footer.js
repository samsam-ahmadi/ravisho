Template.footer.helpers({
    numberOfStories: function() {
        Meteor.call('getPostCount',(err,res) => {
            if(res){
                $("#countStories").html(` <span>${res}</span> داستان `);
            }
            if(err){
                return ""
            }

        })
    }
});
