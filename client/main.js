Meteor.startup(function(){
  // moment.locale('fa');
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