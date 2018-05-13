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
    //show taags in input 
    // split #
    let  text = ""
    tagsInput = story.tags;
    // show in the page
    $(".show-tags").html("");
    tagsInput.reverse().map((item) => {
        let tag = `
      <p class="blue-text rtl"> #${item} </p>
      `
        $(".show-tags").append(tag);

        text += "#"+item
    })
    $('#tags').val(text)
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
            let tagsInput = $('#tags').val();
            let tagsArray = [];
            // split #
            tagsInput = tagsInput.split('#');
            tagsInput.shift();
            //return replaced texxt with _ 
            tagsArray = tagsInput.map((item) => {
                item = item.replace(/\s+/g, '_');
                // console.log('item: ', item);
    
                if (item[item.length - 1] == "_") {
                    item = item.slice(0, -1)
                }
                return item;
            })



            doc.$set.tags = tagsArray;
            doc.$set.id = Stories.findOne()._id
            console.log('doc: ', doc);

            if (Roles.userIsInRole(Meteor.userId(), ['blocked']) || doc.$set.created_by != Meteor.userId()) {
                Bert.alert("شما اجازه تغییر داستان را ندارید.", 'danger', 'growl-top-right')
                // FlowRouter.redirect('/');      
                return false;
            }

            Meteor.call('editStory', doc, function (error, success) {
                if (error) {
                    console.log('error', error);
                    return false;
                }
                if (success) {
                    console.log('success: ', success);
                    FlowRouter.redirect("/stories/" + Meteor.user().username)
                    return false;
                }
            });









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
    },
    "keyup #tags"(events, template) {
        let tagsInput = event.target.value;
        let tagsArray = [];
        // split #
        tagsInput = tagsInput.split('#');
        tagsInput.shift();
        //return replaced texxt with _ 
        tagsArray = tagsInput.map((item) => {
            item = item.replace(/\s+/g, '_');
            // console.log('item: ', item);

            if (item[item.length - 1] == "_") {
                item = item.slice(0, -1)
            }
            return item;
        })

        // show in the page
        $(".show-tags").html("");
        tagsArray.map((item) => {
            let tag = `
          <p class="blue-text rtl"> #${item} </p>
          `
            $(".show-tags").append(tag);
        })
    }
});