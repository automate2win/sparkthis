Earn = new Meteor.Collection("earn");
Meteor.publish("earn", function() {
	return Earn.find();
})
// Earn.remove({})