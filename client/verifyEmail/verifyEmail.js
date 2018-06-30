Template.verifyEmailUser.onRendered(function () {
    let token = FlowRouter.getParam("token");
    console.log('token: ', token);
    Accounts.verifyEmail(token, function (err) {
        if(err == undefined){
            Bert.alert("اکانت شما با موفقیت تایید شد.","success","growl-top-right")
            FlowRouter.redirect("/");
        }
        if (err.message == 'Verify email link expired [403]') {
            Bert.alert("لینک تایید ایمیل منقضی شده است", "danger", "growl-top-right")
            FlowRouter.redirect("/")
        }else if(err != null) {
          Bert.alert("لینک نامعتبر می‌‌باشد","danger","growl-top-right")
          FlowRouter.redirect("/")
        } else {
          Bert.alert("اکانت شما با موفقیت تایید شد.","success","growl-top-right")
          FlowRouter.redirect("/")
        }
        
    })
})