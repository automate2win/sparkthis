
if(!Meteor.isServer){
	Earn = new Meteor.Collection("earn");
	Meteor.subscribe("earn");
}