T9n.setLanguage('ir');

AccountsTemplates.configure({
	confirmPassword: false,
	showForgotPasswordLink: true,
	enablePasswordChange: true,
	sendVerificationEmail: true,
	reCaptcha: {
		siteKey: "6LfTt1QUAAAAANzxvqdbY1eoVjuzXr9TsrzGENul",
	},
	showReCaptcha: true,
	texts: {
		navSignIn: "ورود",
		navSignOut: "خروج",
		optionalField: "",
		pwdLink_pre: "",
		pwdLink_link: "فراموشی رمز عبور",
		pwdLink_suff: "",
		resendVerificationEmailLink_pre: "ایمیل تایید دریافت نکردید؟",
		resendVerificationEmailLink_link: "ارسال دوباره",
		resendVerificationEmailLink_suff: "",
		sep: "یا",
		signInLink_pre: "قبلا ثبت نام کردین ؟ ",
		signInLink_link: "ورود",
		signInLink_suff: "",
		signUpLink_pre: "عضو نیستید؟",
		signUpLink_link: "ثبت نام",
		signUpLink_suff: "",
		socialAdd: "add",
		socialConfigure: "configure",
		socialIcons: {
			"meteor-developer": "fa fa-rocket",
		},
		errors: {
			accountsCreationDisabled: "Client side accounts creation is disabled!!!",
			cannotRemoveService: "Cannot remove the only active service!",
			captchaVerification: "اشکال در تشخصی ربات و انسان",
			loginForbidden: "خطا در ورود",
			mustBeLoggedIn: "خطا در ورود کاربر",
			pwdMismatch: "خطا در مطابقت رمز عبور",
			validationErrors: "Validation Errors",
			verifyEmailFirst: "لطفا ایمیل خود را تایید کنید.",
		},
		socialRemove: "حذف",
		socialSignIn: "ورود",
		socialSignUp: "خروج",
		socialWith: "با",
		termsPreamble: "توافق",
		termsPrivacy: "privacyPolicy",
		termsAnd: "و",
		termsTerms: "ترمز",

		title: {
			changePwd: "رمز عبور",
			enrollAccount: "Enroll Title",
			forgotPwd: "فراموشی رمز عبور",
			resetPwd: "تغییر رمز عبور",
			signIn: "ورود",
			signUp: "ثبت نام",
			verifyEmail: "ایمیل تایید",
		},
		button: {
			changePwd: "رمز عبور",
			enrollAccount: "Enroll Text",
			forgotPwd: "فراموشی رمز عبور",
			resetPwd: "ریست رمز عبور",
			signIn: "ورود",
			signUp: "ثبت نام",
		},
		errors: {
			accountsCreationDisabled: "عضویت غیر فعال گردیده است.",
			cannotRemoveService: "نمیتواندی حذف کنید تنها سرویس فعال رو",
			captchaVerification: "کد اشتباه است",
			loginForbidden: "ورود غیر مجاز",
			mustBeLoggedIn: "باید وارد شوید",
			pwdMismatch: "رمز عبور ها یکسان نیستند",
			validationErrors: "سیبسی",
			verifyEmailFirst: "لطفا ایمیل خود را تايید کنید.چک کنید ایمیل خود را و کلیک کنید روی لینک مورد نظر!",
		}
	}
})





AccountsTemplates.addField({
	_id: "username",
	type: "text",
	displayName: "نام کاربری",
	placeholder: "نام کاربری",
	required: true,
	minLength: 5,
	errStr: 'را وارد کنید',
});


AccountsTemplates.addField({
	_id: "allowAddAdv",
	type: "hidden"
});

AccountsTemplates.removeField('email');
AccountsTemplates.addField({
	_id: 'email',
	type: 'email',
	required: true,
	displayName: "ایمیل",
	placeholder: "ایمیل",
	re: /.+@(.+){2,}\.(.+){2,}/,
	errStr: 'ایمیل نامعتبر است',
});

AccountsTemplates.addField({
	_id: 'username_and_email',
	type: 'text',
	displayName: 'نام کاربری و ایمیل',
	placeholder: "نام کاربری و ایمل خود را وارد کنید",
	errStr: 'نامعتبر است',

});


AccountsTemplates.removeField('password');
AccountsTemplates.addField({
	_id: 'password',
	type: 'password',
	displayName: "رمز عبور",
	placeholder: "حداقل ۶ کارکتر",
	required: true,
	minLength: 6,
	errStr: "عزیز بیشتر از ۶ کارکتر باید وارد کنی",
});
AccountsTemplates.configureRoute('verifyEmail');
