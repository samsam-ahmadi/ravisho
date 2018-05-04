Template.updateStory.helpers({
    editStory: function () {
        if (FlowRouter.subsReady()) {
            $('.editor2').summernote({})
            return Stories.findOne();
        }
    }
});



Template.updateStory.onCreated(function () {
    let self = this;
    if (Meteor.userId()) {
        self.autorun(function () {
            
            self.subscribe("editPostPageSub", FlowRouter.getParam('_id'));
            self.subscribe("editImagePageSub", FlowRouter.getParam('_id'));
        })
    }
});

Template.updateStory.onRendered(function () {
    this.autorun(() => {
        if (this.subscriptionsReady()) {
            setTimeout(function () { runSummernote(); }, 300)
        }
    })
})

function runSummernote() {
    this.$('.editor').summernote({
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
    let story = Stories.findOne();
    
    $('.editor').summernote('code', story.stories + ' ')
    $('#tags').val(story.tags)
    $('#tags + label').addClass('active')
}



var hooksObject = {
    before: {
        update: function (doc) {
            // get story of input
            let htmlStories = $('.editor').summernote('code');
            doc.$set.stories = htmlStories;
            doc.$set.published = false;
            doc.$set.show_manager = true;
            delete doc.$unset;
            // get tags from input page 
            let tagsStory = $('#tags').val();
            doc.$set.tags = tagsStory;
            console.log('doc: ', doc);
            if(Roles.userIsInRole(Meteor.userId(), ['blocked'])){
                Bert.alert("شما اجازه ساختن داستان جدید را ندارید.",'danger', 'growl-top-right')
                redirect('/');      
                return false;
              }
            return doc;
        }
    },
    after: {
        update: function () {
            FlowRouter.redirect("/stories/"+Meteor.user().username)
        }
    }
};
AutoForm.hooks({
    updatestory: hooksObject
});

Template.updateStory.events({ 
    "click #back"(e, template) {
        var defaultLocation = "https://www.ravisho.com";
        var oldHash = window.location.hash;
        history.back(); // Try to go back
        var newHash = window.location.hash;
        if (
          newHash === oldHash &&
          (typeof (document.referrer) !== "string" || document.referrer === "")
        ) {
          window.setTimeout(function () {
            // redirect to default location
            window.location.href = defaultLocation;
          }, 1000); // set timeout in ms
        }
        if (e) {
          if (e.preventDefault)
            e.preventDefault();
          if (e.preventPropagation)
            e.preventPropagation();
        }
        return false; // stop event propagation and browser default event
      }
});