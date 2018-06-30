Meteor.methods({ 
    updateProfile: function(data) { 
        // check(data.name, String);
        // check(data.password, String);

        if('password' in data){
            let newpass=Accounts.setPassword(this.userId,data.password,{logout: false})
                return "پسورد شما با موفقیت عوض شد"
        }else if(data.name){
            let newname =  Meteor.users.update({"_id":this.userId},{$set:{'profile.name':data.name}})
            if(newname){
                return "نام شما با موفقیت تغییر کرد."
            }else{
                return "لطفا مجددا تلاش کنید."
            }
         }
    },
    sendEmailVerify: function(){
    console.log("alsdhalsdh");
        
        try {
            // console.log('Accounts.sendVerificationEmail(this.userId): ', Accounts.sendVerificationEmail(this.userId));
            console.log("test")
            return Accounts.sendVerificationEmail(this.userId)
        } catch (error) {
            return error;
        }
    } 
});

