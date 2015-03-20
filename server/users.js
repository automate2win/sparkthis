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
    var abc, averageAmount, collList, collAmount, montlyHigh, montlyAverage, montlyLow, oneTimeHigh, oneTimeAverage, oneTimeLow, Average;
    // console.log(id)
    // console.log(data)
    // console.log(type)
    var newdata = parseInt(data[0].amount);
    var flag = Earn.findOne({"PostId":id});
    if(type == "Onetime")
    {
        if(!flag){
          averageAmount = newdata;
          Earn.insert({"PostId":id, "OnetimeList" :data,"onetimeAmount":averageAmount});
        }else{
          if(flag.onetimeAmount && flag.OnetimeList){
            flagonetimeAmount = parseInt(flag.onetimeAmount)
            flagOnetimeList = flag.OnetimeList.length;
            averageAmount = (flagonetimeAmount + newdata) / (flagOnetimeList + 1)
            Earn.update({"PostId":id},{$push:{ "OnetimeList" :data}});
            Earn.update({"PostId":id},{$set:{ "onetimeAmount" :averageAmount}});
          }else{
            averageAmount = newdata;
            Earn.update({"PostId":id},{$push:{ "OnetimeList" :data}});
            Earn.update({"PostId":id},{$set:{ "onetimeAmount" :averageAmount}});
          }
        }
    }
    else{
        if(!flag){
          averageAmount = newdata;
          Earn.insert({"PostId":id, "MonthlyList" :data,"monthlyAmount":averageAmount});
        }else{
          if(flag.monthlyAmount && flag.MonthlyList){
            flagmonthlyAmount = parseInt(flag.monthlyAmount)
            flagMonthlyList = flag.MonthlyList.length;
            averageAmount = (flagmonthlyAmount + newdata) / (flagMonthlyList + 1)
            Earn.update({"PostId":id},{$push:{ "MonthlyList" :data}});
            Earn.update({"PostId":id},{$set:{ "monthlyAmount" :averageAmount}});
          }else{
            averageAmount = newdata;
            Earn.update({"PostId":id},{$push:{ "MonthlyList" :data}});
            Earn.update({"PostId":id},{$set:{ "monthlyAmount" :averageAmount}});
          }
        }
    }

    var cursor = Posts.findOne({"_id":id})
    if(cursor.montlyHigh)
        (cursor.montlyHigh > parseInt(data[0].amount)) ? montlyHigh =  cursor.montlyHigh : montlyHigh =  parseInt(data[0].amount)
    else
      montlyHigh = parseInt(data[0].amount);

    if(cursor.montlyLow)
        (cursor.montlyLow < parseInt(data[0].amount)) ? montlyLow =  cursor.montlyLow: montlyLow =  parseInt(data[0].amount)
    else
      montlyLow = parseInt(data[0].amount)

    if(cursor.oneTimeHigh)
        (cursor.oneTimeHigh > parseInt(data[0].amount)) ? oneTimeHigh =  cursor.oneTimeHigh: oneTimeHigh =  parseInt(data[0].amount)
    else
      oneTimeHigh = parseInt(data[0].amount)

    if(cursor.oneTimeLow)
        (cursor.oneTimeLow < parseInt(data[0].amount)) ? oneTimeLow =  cursor.oneTimeLow: oneTimeLow =  parseInt(data[0].amount)
    else
      oneTimeLow = parseInt(data[0].amount)

    if(type == "Onetime")
    {
      Posts.update({"_id":id},{$set:{"oneTimeAverage":averageAmount,"oneTimeHigh":oneTimeHigh,"oneTimeLow":oneTimeLow}});
    }else{
      Posts.update({"_id":id},{$set:{"montlyAverage":averageAmount,"montlyHigh":montlyHigh,"montlyLow":montlyLow}});
    }
    // Posts.update({"_id":id},{$set:{"montlyHigh":montlyHigh,"montlyLow":montlyLow,"oneTimeHigh":oneTimeHigh,"oneTimeLow":oneTimeLow}});
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