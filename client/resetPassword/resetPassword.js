Template.resetPassword.events({
    'click .at-btn.submit': function (event, template) {
        event.preventDefault();
        let newPass = $("#at-field-password").val()
        console.log('newPass: ', newPass);
        let token = FlowRouter.getParam("token");
        console.log('token: ', token);

        if (newPass) {
            Accounts.resetPassword(token.toString(), newPass, (err) => {
                if (err) {
                    Bert.alert("توکن شما منقضی شده است دوباره تلاش کنید", "danger", "growl-top-right")
                    FlowRouter.redirect("/login")
                } else {
                    Bert.alert("پسورد شما با موفقیت تغییر کرد.", "success", "growl-top-right")
                    FlowRouter.redirect("/")
                }
            })
        } else {
            Bert.alert("پسورد جدید خود را وارد کنید", "danger", "growl-top-right")

        }
    }
});