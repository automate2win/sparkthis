Template[getTemplate('postContent')].helpers({
  // postThumbnail: function () {
  //   return postThumbnail;
  // },
  postHeading: function () {
    return postHeading;
  },
  postBodyText: function () {
    return Posts.findOne(this._id).body;
  },
  arrow_down: function () {
    return Posts.findOne(this._id).downvotes;
  },
  arrow_up: function () {
    return Posts.findOne(this._id).upvotes;
  },
  // postMeta: function () {
  //   return postMeta;
  // },
  getTemplate: function () { 
    return getTemplate(this.template);
  },
  sourceLink: function(){
    return !!this.url ? this.url : "/posts/"+this._id;
  },
  current_domain: function(){
    return "http://"+document.domain;
  },
  timestamp: function(){
    time = this.status == STATUS_APPROVED ? this.postedAt : this.createdAt;
    return moment(time).format("MMMM Do, h:mm:ss a");
  },
  userAvatar: function(){
    // THIS FUNCTION IS DEPRECATED -- package bengott:avatar is used instead.
    var author = Meteor.users.findOne(this.userId, {reactive: false});
    if(!!author)
      return getAvatarUrl(author); // ALSO DEPRECATED
  },
  inactiveClass: function(){
    return (isAdmin(Meteor.user()) && this.inactive) ? i18n.t('inactive') : "";
  },
  commentsDisplayText: function(){
    return this.comments == 1 ? i18n.t('comment') : i18n.t('comments');
  },
  "amount": function(){
    return "$"+(Posts.findOne(this._id).amount||1);
  }
});
Template[getTemplate('postContent')].events({
    'click .arrows .downarrow_postContent': function(events){
        console.log("down")
        var post = this;
        events.preventDefault();
        if(!Meteor.user()){
          Router.go('atSignIn');
          flashMessage(i18n.t("please_log_in_first"), "info");
        }
        Meteor.call('downvotePost', post, function(error, result){
          trackEvent("post downvoted", {'_id': post._id});
        });




    },
    'click .arrows .uparrow_postContent': function(events){
        // var cursor = $(event.currentTarget).parent().parent().parent()
        // console.log(cursor)
        Session.set("currentPost",this);
        $(".popEach").css("display","block");
        var post = this;
        events.preventDefault();
        if(!Meteor.user()){
          Router.go('atSignIn');
          flashMessage(i18n.t("please_log_in_first"), "info");
        }
        Meteor.call('upvotePost', post, function(error, result){
          trackEvent("post upvoted", {'_id': post._id});
        });
    },
    'click .dollarAmt': function(){
        console.log(this)
        // Router.go("postDescription/"+this._id)
         Router.go('postDescription', {_id: this._id});
        // Router.go("postDescription")
    },
})