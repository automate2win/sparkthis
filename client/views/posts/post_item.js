var post = {};

Template[getTemplate('post_item')].created = function () {
  post = this.data;
};

Template[getTemplate('post_item')].helpers({
  postModules: function () {
    return postModules;
  },
  getTemplate: function () {
    return getTemplate(this.template);
  },
  
  moduleContext: function () { // not used for now
    var module = this;
    module.templateClass = camelToDash(this.template) + ' ' + this.position + ' cell';
    module.post = post;
    return module;
  },
  moduleClass: function () {
    return camelToDash(this.template) + ' post-module';
  },
  postClass: function () {
    var post = this;
    var postAuthorClass = "author-"+post.author;

    var postClass = postClassCallbacks.reduce(function(result, currentFunction) {
        return currentFunction(post, result);
    }, postAuthorClass);
    
    return postClass;
  }
});
Template[getTemplate('popup_post')].events({
    'click  .remove':function(event){
        // var selector = $(event.currentTarget).parent().parent().parent().find(".popEach");
        // var selector = $(this.currentTarget).parent().parent().parent();
        $(".popEach").css("display","none");
        $(".nonPost").css("display","block");
        // console.log(selector)
    }
})