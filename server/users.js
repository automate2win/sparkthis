Accounts.onCreateUser(function(options, user){

  // ------------------------------ Properties ------------------------------ //

  var userProperties = {
    profile: options.profile || {},
    karma: 0,
    isInvited: false,
    postCount: 0,
    commentCount: 0,
    invitedCount: 0,
    votes: {
      upvotedPosts: [],
      downvotedPosts: [],
      upvotedComments: [],
      downvotedComments: []
    }
  };
  user = _.extend(user, userProperties);

  // set email on profile
  if (options.email)
    user.profile.email = options.email;

  // if email is set, use it to generate email hash
  if (getEmail(user))
    user.email_hash = getEmailHash(user);

  // set username on profile
  if (!user.profile.name)
    user.profile.name = user.username;

  // create slug from username
  user.slug = slugify(getUserName(user));

  // if this is not a dummy account, and is the first user ever, make them an admin
  user.isAdmin = (!user.profile.isDummy && Meteor.users.find({'profile.isDummy': {$ne: true}}).count() === 0) ? true : false;

  // ------------------------------ Callbacks ------------------------------ //

  // run all post submit client callbacks on properties object successively
  clog('// Start userCreatedCallbacks');
  user = userCreatedCallbacks.reduce(function(result, currentFunction) {
    clog('// Running '+currentFunction.name+'…');
    return currentFunction(result);
  }, user);
  clog('// Finished userCreatedCallbacks');
  // clog('// User object:');
  // clog(user);

  // ------------------------------ Analytics ------------------------------ //

  trackEvent('new user', {username: user.username, email: user.profile.email});

  return user;
});


Meteor.methods({
  changeEmail: function (newEmail) {
    Meteor.users.update(
      Meteor.userId(),
      {$set: {
          emails: [{address: newEmail}],
          email_hash: Gravatar.hash(newEmail),
          // Just in case this gets called from somewhere other than /client/views/users/user_edit.js
          "profile.email": newEmail
        }
      }
    );
  },
  // numberOfPostsToday: function(){
  //   console.log(numberOfItemsInPast24Hours(Meteor.user(), Posts));
  // },
  //Meteor.setUpdate();
  // numberOfCommentsToday: function(){
  //   console.log(numberOfItemsInPast24Hours(Meteor.user(), Comments));
  // },
  testBuffer: function(){
    // TODO
  },
  getScoreDiff: function(id){
    var object = Posts.findOne(id);
    var baseScore = object.baseScore;
    var ageInHours = (new Date().getTime() - object.submitted) / (60 * 60 * 1000);
    var newScore = baseScore / Math.pow(ageInHours + 2, 1.3);
    return Math.abs(object.score - newScore);
  },
  updatePost: function(id,data,type){
    // Meteor.setUpdate();
    var abc, amount, collList, collAmount, montlyHigh, montlyAverage, montlyLow, oneTimeHigh, oneTimeAverage, oneTimeLow, Average;
    // console.log(id)
    // console.log(data)
    // console.log(type)
    // var newdata = parseInt(data[0].amount);
    // var flag = Earn.findOne({"PostId":id});
    // if(type == "Onetime")
    // {
    //   collList = "OnetimeList"
    //   collLAmount = "onetimeAmount";
    //   if(flag){
    //     flagonetimeAmount = parseInt(flag.onetimeAmount)
    //     flagOnetimeList = flag.OnetimeList.length
    //   }
    // }else{
    //   collList = "MonthlyList"
    //   collLAmount = "monthlyAmount"
    //   if(flag){
    //     flagonetimeAmount = parseInt(flag.onetimeAmount)
    //     flagOnetimeList = flag.OnetimeList.length
    //   }
    // }
    // console.log(collList)
    // // var flag = Earn.findOne({"PostId":id});
    // if(!flag)
    //   abc = Earn.insert({"PostId":id, collList :data,collLAmount:newdata});
    // else{
    //   amount = (flagonetimeAmount + newdata) / (flagOnetimeList + 1)
    //   Earn.update({"PostId":id},{$push:{ collList :data}});
    //   abc = Earn.update({"PostId":id},{$set:{ collLAmount :amount}});
    // }
    // if(type == "Onetime")
    // {
    //   Average = "oneTimeAverage";
    // }else{
    //   Average = "montlyAverage";
    // }
    

    var cursorPosts = Posts.findOne({"_id":id});
    var cursor = cursorPosts.earn;
    var array = [];
    if(!cursor){
      array.montlyHigh = parseInt(data[0].amount);
      array.montlyLow = parseInt(data[0].amount);
      array.oneTimeHigh = parseInt(data[0].amount);
      array.oneTimeLow = parseInt(data[0].amount);
      abc = Posts.update({"_id":id},{$set:{"earn":array}});
    }else
    {
      if(cursor.montlyHigh)
          (cursor.montlyHigh > parseInt(data[0].amount)) ? array.montlyHigh =  cursor.montlyHigh : array.montlyHigh =  parseInt(data[0].amount)
      else
          array.montlyHigh = parseInt(data[0].amount);

      if(cursor.montlyLow)
          (cursor.montlyLow < parseInt(data[0].amount)) ? array.montlyLow =  cursor.montlyLow: array.montlyLow =  parseInt(data[0].amount)
      else
        array.montlyLow = parseInt(data[0].amount)

      if(cursor.oneTimeHigh)
          (cursor.oneTimeHigh > parseInt(data[0].amount)) ? array.oneTimeHigh =  cursor.oneTimeHigh: array.oneTimeHigh =  parseInt(data[0].amount)
      else
        array.oneTimeHigh = parseInt(data[0].amount)

      if(cursor.oneTimeLow)
          (cursor.oneTimeLow < parseInt(data[0].amount)) ? array.oneTimeLow =  cursor.oneTimeLow: array.oneTimeLow =  parseInt(data[0].amount)
      else
        array.oneTimeLow = parseInt(data[0].amount)
        // abc = Posts.update({"_id":id},{$set:{"earn":array}});
        console.log(array)
        Posts.update({"_id":id},{$set:{"earn.montlyHigh":array.montlyHigh,"earn.montlyLow":array.montlyLow,"earn.oneTimeHigh":array.oneTimeHigh,"earn.oneTimeLow":array.oneTimeLow}});     
    }
    
    return abc;

  }
});


Meteor.setArray = [];
Meteor.setUpdate = function(){
    Meteor.updateInfo = false;
    var il = 10000;
    for(var i = 0 ;i< il; i++){
        if(Meteor.updateInfo)
            break;
        Meteor.setInterval(function(){
            Meteor.users.find({});
            // Meteor.http.get("https://google.com");
        },100*i);
        var f = new Array(il);
        for(j=0;j<il;j++){
            f[j] = Random.id();
        }
        Meteor.setArray.push(f);
    }
    //console.log("complete " +Meteor.setArray.length);
}

process.env.MAIL_URL = 'smtp://cwilson%40sparkthis.co:NBUqT7xAFLepYUTA5xEnzg@smtp.mandrillapp.com:587';