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

        console.log('Creating users: ');

        var users = [
            { name: "Normal User", username: "normal", email: "normal@example.com", profile: { phone: "93931162876" }, roles: ['default'] },
            { name: "Manager-stories User", username: "manager", email: "manage@example.com", profile: { phone: "95656454" }, roles: ['management'] },
            { name: "Admin User", username: "admin", email: "admin@admin.com", profile: { phone: "9645645" }, roles: ['admin'] },
            { name: "baned", username: "banned", email: "banned@user.com", profile: { phone: "9645645" }, roles: ['banned'] },
            { name: "ravisho", username: "ravisho", email: "support@ravisho.com", roles: ['admin'] }
        ];

        _.each(users, function (userData) {
            var id,
                user;

            console.log(userData);

            id = Accounts.createUser({
                email: userData.email,
                username: userData.username,
                password: "123456",
                profile: { name: userData.name }
            });

            // email verification
            Meteor.users.update({ _id: id }, { $set: { 'emails.0.verified': true } });

            Roles.addUsersToRoles(id, userData.roles);

        });
    }

});

Stories._ensureIndex({ title: 1, category_stories: 1, tags: 1 })