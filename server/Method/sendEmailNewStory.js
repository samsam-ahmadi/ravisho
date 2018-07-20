Meteor.methods({ 
    newStoryEmail: function() { 
        Email.send({
            to: 'support@ravisho.com',
            from: "info@ravisho.com" + "راوی شو -داستان جدید",
            subject: "راوی شو داستان جدید",
            text:'داستان جدید داریم.',
          });   
    } 
});