
Template[getTemplate('popup_post')].events({
  'click .popup_post_Onetime': function(e, instance) {
      var cursor = Session.get("currentPost");
      var amount = parseInt($("#popup_post_Amount").val());
      var data = {};
      if(isNaN(amount))
      {
        console.log(amount)
        return;
      }
      data.amount = parseInt(amount) ;
      // if(amount){
      //   data.push({
      //       "amount": amount
      //   });
      // }
      Meteor.call("updatePost",cursor._id,data,"Onetime",function(err,data){
        console.log(err)
        console.log(data);
      });
      // Earn.insert({"PostId":cursor._id, "Onetime":data});
      $(".popEach").css("display","none");
      $(".nonPost").css("display","block");
      $(".backGrey").css("display","block");
      // console.log(cursor._id+"onetime")
  },
  'click .popEach .remove':function(e){
      $(".popEach").css("display","none");
      $(".nonPost").css("display","block");
      $(".backGrey").css("display","block");
  },
  'click .popup_post_Monthly': function(e, instance) {
      var cursor = Session.get("currentPost");
      var amount = parseInt($("#popup_post_Amount").val());
      if(isNaN(amount))
      {
        console.log(amount)
        return;
      }
      var data = {};
      data.amount = amount;
      // var data = [];
      // if(amount){
      //   data.push({
      //       "amount": amount
      //   });
      // }
      // Posts.update({"_id":cursor._id},{$set:{"Monthly":data}});
      Meteor.call("updatePost",cursor._id,data,"Monthly",function(err,data){
        // console.log(err)
        // console.log(data)
      });
      $(".popEach").css("display","none");
      $(".nonPost").css("display","block");
      $(".backGrey").css("display","block");
  }
});
