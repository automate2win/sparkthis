Meteor.startup(function() {
	try{
	  SyncedCron.start();
	  Kadira.connect('oTQMPuDSDL3AGXf9t', '796c4b83-3b5d-4366-83cf-b1edb74091e2')
	}
	catch(err){
		console.error(err);
	}
});
