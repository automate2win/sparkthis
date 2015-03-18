Template[getTemplate('userMenu')].helpers({
  isLoggedIn: function () {
    return !!Meteor.user();
  },
  name: function () {
    return getDisplayName(Meteor.user());
  },
  profileUrl: function () {
    return Router.path('user_profile', {_idOrSlug: Meteor.user().slug});
  },
  userEditUrl: function () {
    return Router.path('user_edit', {slug: Meteor.user().slug});
  }
});
Template[getTemplate('userMenu')].events({
    'click #facebookLogin': function(e){
      console.log("vsdjbvkjsjdbvkjsdbkj")
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });

    },
    'click #twitterLogin': function(e){
        console.log("twitterLogin")
        Meteor.loginWithTwitter({}, function(err){
            if (err) {
                throw new Meteor.Error("twitter login failed");
            }
        });
    },

});