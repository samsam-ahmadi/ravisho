Meteor.startup(function(){
  // moment.locale('fa');
  reCAPTCHA.config({
    publickey: '6LfTt1QUAAAAANzxvqdbY1eoVjuzXr9TsrzGENul',
});
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {
      scope: '.' // <--- THIS BIT IS REQUIRED
  }).then(function(registration) {
      // Registration was successful
      
  }, function(err) {
      // registration failed :(
      
  });
}