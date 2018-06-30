Accounts.onCreateUser(function(options, user) {
   // Use provided profile in options, or create an empty object
   var role = ['normal'];
	Roles.addUsersToRoles(user._id, role);
    user.roles = ['default'];
    
   user.profile = options.profile || {};
   // Assigns first and last names to the newly created user object
   user.profile.name = '';
   user.profile.picture = '';
   user.countStories = 0;
   user.canCreateStories =true;
   // Returns the user object
   return user;
});

AccountsTemplates.configure({
	reCaptcha: {
        secretKey: "6LfTt1QUAAAAAInub1RKzWo_ZVQgjhJwzNPDSmME",
	},
	sendVerificationEmail: true,
});