
Template[getTemplate('popup_post')].events({
  'click .popup_post_Onetime': function(e, instance) {
      var element = e.currentTarget;
      // var element = $(enement).parent().prev().children().val()
      var cursor = Session.get("currentPost");
<<<<<<< HEAD
      var amount = parseInt($("#popup_post_Amount").val());
=======
      var amount = $(element).parent().prev().children().val()
>>>>>>> 2a4f845b6715913d5b1c9f85efb332b6fe11a1f9
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
      var element = e.currentTarget;
      var cursor = Session.get("currentPost");
<<<<<<< HEAD
      var amount = parseInt($("#popup_post_Amount").val());
      if(isNaN(amount))
      {
        console.log(amount)
        return;
      }
=======
      var amount = $(element).parent().prev().prev().children().val()
>>>>>>> 2a4f845b6715913d5b1c9f85efb332b6fe11a1f9
      var data = {};
      data.amount = amount;
      Meteor.call("updatePost",cursor._id,data,"Monthly",function(err,data){
        // console.log(err)
        // console.log(data)
      });
      $(".popEach").css("display","none");
      $(".nonPost").css("display","block");
      $(".backGrey").css("display","block");
  }
});
