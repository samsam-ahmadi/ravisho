import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // var globalObject=Meteor.isClient?window:global;
    // for(var property in globalObject){
    //     var object=globalObject[property];
    //     if(object instanceof Meteor.Collection){
    //         object.remove({});
    //         console.log("remove all done")
    //     }
    // }

    if (Meteor.users.find().fetch().length < 5) {

        var users = [
            { name: "Normal User", username: "normal", email: "normal@example.com", roles: ['default'] },
            { name: "Manager-stories User", username: "manager", email: "manage@example.com",  roles: ['management'] },
            { name: "Admin User", username: "admin", email: "admin@admin.com",  roles: ['admin'] },
            { name: "baned", username: "banned", email: "banned@user.com", roles: ['banned'] },
            { name: "ravisho", username: "ravisho", email: "support@ravisho.com", roles: ['admin'] }
        ];

        _.each(users, function (userData) {
            var id,
                user;

            console.log(userData);

            id = Accounts.createUser({
                email: userData.email,
                username: userData.username,
                password: "654321",
                profile: { name: userData.name }
            });

            // email verification
            Meteor.users.update({ _id: id }, { $set: { 'emails.0.verified': true } });

            Roles.addUsersToRoles(id, userData.roles);

        });
    }

});

Stories._ensureIndex({ title: 1, category_stories: 1, tags: 1 })


