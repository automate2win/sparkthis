Template[getTemplate('post_page')].helpers({
  post_item: function () {
    return getTemplate('post_item');
  },
  post_body: function () {
    return getTemplate('post_body');
  },
  comment_form: function () {
    return getTemplate('comment_form');
  },
  comment_list: function () {
    return getTemplate('comment_list');
  },
  arrow_up: function () {
    return Posts.findOne(this._id).upvotes;
  },
});

Template[getTemplate('post_page')].rendered = function(){
  $('body').scrollTop(0);
};
Template[getTemplate('post_page')].events({
    'click .arrows .uparrow_postContent': function(events,tpl){
        // app.test = tpl;
        // console.log(tpl);
        $(tpl.find(".popEach")).css("display","block");
        $(tpl.find(".backGrey")).css("display","none");
        // var cursor = $(event.currentTarget).parent().parent().parent().parent().find(".popEach")
        // console.log(cursor)
        Session.set("currentPost",this);
        // $(cursor).css("display","block");
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
})
