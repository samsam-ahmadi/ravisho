Template.contactUs.events({ 
    'click #submit-contact': function(event, template) { 
        event.preventDefault();
        // Materialize.toast("asdasd",1000)
        // 
        let data = $( '#contact-us' ).serializeArray();

        data.map((item)=>{
            if(item.value ==""){
                Bert.alert( 'فیلد‌های مورد نیاز را وارد کنید' , 'warning', 'growl-bottom-right' );
                return false
            }
        })
        form = {};
        
        $.each($('#contact-us').serializeArray(), function() {
            form[this.name] = this.value;
        });


        Meteor.call('contactus', form, function(error, success) { 
            if (error) { 
                 
                Bert.alert( 'خطایی رخ داده است مجددا تلاش کنید.' , 'warning', 'growl-bottom-right' );
                
            } 
            if (success) { 
                Bert.alert( 'پیغام شما دریافت شد.لطفا ایمیل خود را بررسی کنید.' , 'success', 'growl-bottom-right' );
                grecaptcha.reset();
                $( '#contact-us' )[0].reset();
            } 
        });

        return false;
    } 
});