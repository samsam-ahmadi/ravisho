Template.loginPage.onRendered = function(){
   $('ul.tabs').tabs();
}

Template.loginPage.events({
  "click .login-frm .tabs .signIn": function(event, template){
     AccountsTemplates.linkClick("signIn");
     $('.login-frm .tabs .signUp').removeClass('active')
     $('.login-frm .tabs .signIn').addClass('active')
  },
  "click .login-frm .tabs .signUp": function(event, template){
     AccountsTemplates.linkClick("signUp");
     $('.login-frm .tabs .signIn').removeClass('active')
     $('.login-frm .tabs .signUp').addClass('active')
  },
  // when user login or suignup ,init dropdown in header profile
  "click #at-pwd-form .submit"(events,template){
    setTimeout(function(){
      $(".dropdown-button").dropdown();
    }, 500);
    $(".dropdown-button").dropdown();
  }
});


Template.changePassword.onRendered(function(){

	$("#at-pwd-form").find("label").eq(0).text("رمز عبور فعلی");
	$("#at-pwd-form").find("label").eq(1).text("رمز عبور جدید");

});

Template.sendEmailVerify.onRendered(function(){
	$(".at-title .header").text("ارسال مجدد ایمیل فعال سازی.");
	$("#at-pwd-form button").text("ارسال");
})
