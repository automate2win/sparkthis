Template[getTemplate('posts_list')].created = function() {
  Session.set('listPopulatedAt', new Date());
};

Template[getTemplate('posts_list')].helpers({
  postsLayout: function () {
    return getSetting('postsLayout', 'posts-list');
  },
  description: function () {
    var controller = Iron.controller();
    if (typeof controller.getDescription === 'function')
      return Iron.controller().getDescription();
  },
  before_post_item: function () {
    return getTemplate('before_post_item');
  },
  post_item: function () {
    return getTemplate('post_item');
  },
  after_post_item: function () {
    return getTemplate('after_post_item');
  },
  postsCursor : function () {
    if (this.postsCursor) { // not sure why this should ever be undefined, but it can apparently
      var posts = this.postsCursor.map(function (post, index, cursor) {
        post.rank = index;
        return post;
      });
      // console.log(posts)
      return posts;
    } else {
      console.log('postsCursor not defined')
    }
  },
  postsLoadMore: function () {
    return getTemplate('postsLoadMore');
  },
  postsListIncoming: function () {
    return getTemplate('postsListIncoming');
  }
});
Template[getTemplate('popup_post')].events({
  'click .popup_post_Onetime': function(e, instance) {
      var cursor = Session.get("currentPost");
      var amount = $("#popup_post_Amount").val();
      var data = [];
      if(amount){
        data.push({
            "amount": amount
        });
      }
      Meteor.call("updatePost",cursor._id,data,"Onetime",function(err,data){
        console.log(err)
        console.log(data);
      });
      $(".popEach").css("display","none");
      // console.log(cursor._id+"onetime")
  },
  'click .popup_post_Monthly': function(e, instance) {
      var cursor = Session.get("currentPost");
      var amount = $("#popup_post_Amount").val();
      var data = [];
      if(amount){
        data.push({
            "amount": amount
        });
      }
      // Posts.update({"_id":cursor._id},{$set:{"Monthly":data}});
      Meteor.call("updatePost",cursor._id,data,"Monthly",function(err,data){
        console.log(err)
        console.log(data)
      });
      $(".popEach").css("display","none");
  }
});