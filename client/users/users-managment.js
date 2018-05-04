
Template.userList.onCreated(function () {
	Session.set('searchUser', '');
	this.autorun(() => {
		this.subscribe("userList",

			{ userSearch: Session.get('searchUser') },
			() => {
				setTimeout(function () {
					// Session.set("searchUser", false);
				}, 300);
			}
		);
	})

});

Template.userList.helpers({
	users: function () {
		// if (Meteor.user()) {
		// if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
		return Meteor.users.find();
		// }
		// }
	},
	isBanned: function (data) {
		if (data) {
			return "checked";
		} else {
			return "";
		}
	},
	roles: function () {
		if (!this.roles) {
			return 'default'
		}

		return this.roles.join(',')
	}
})


/*====================================
=            remove user  by event            =
====================================*/




Template.usersPage.events({
	// 'click .del_user': function (event) {


	// 	removeUserById = this._id;

	// 	$('#del_user_list_modal').openModal();
	// 	// ...
	// },
	// 'click .deleteـuserـmodal': function (event) {
	// 	Meteor.call('del_user_in_list', removeUserById, function (error, result) {
	// 		if (result) {

	// 			

	// 		} else if (error) {

	// 			
	// 			

	// 		}


	// 	});


	// },

	'keyup #searching-user': function (event, template) {
		let value = event.target.value;
		
		if (value.length > 2) {
			if (value !== '') {
				Session.set('searchUser', value);
			}
		}
		if (value === '') {
			Session.set("searchUser", '');
		}
	}
});


/*=====  End of remove user by event   ======*/

Template.userList.events({
	'change .change-role': function (event, template) {
		let value = event.currentTarget.value;
		if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
			Meteor.call('changeRolesUser', { user: this._id, roles: value }, function (error, success) {
				if (error) {
					
				}
				if (success) {
					Bert.alert('نقش کاربر با موفقیت تغییر کرد.', 'success', 'growl-top-right');
				}
			});
		}
	},
	'click #js-for-banned-user': function (event) {
		event.preventDefault();
		if (Meteor.user()) {
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {

				Meteor.call('bannedUser', this, function (error, result) {
					if (result) {
						Bert.alert(result, "success", "growl-top-right")
					} else {
						Bert.alert(error, "danger", "growl-top-right")

					}
				})

			}
		}
	},
});