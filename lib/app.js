app = {};
Log = new Meteor.Collection("log");
app.isJsonString = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

app.set = function(key,value){
	if(typeof value == "object"){
		value = JSON.stringify(value);
	}
	return window.localStorage.setItem(key,value);
}
app.get = function(key){
	var value = window.localStorage.getItem(key);
	if(app.isJsonString(value)){
		return JSON.parse(value);
	}
	else{
		return value;
	}
}



if(Meteor.absoluteUrl.defaultOptions.rootUrl.match("localhost:3000") || Meteor.absoluteUrl.defaultOptions.rootUrl.match("192.168.")){
	app.debug = true;
	log = console.log.bind(console);
}	
else{
	app.debug = false;
	log = function(){
		var string = "";
		for(var i=0,il=arguments.length;i<il;i++){
			if(typeof arguments[i] == "object"){
				if(app.isJsonString(arguments[i])){
					string = JSON.stringify(arguments[i]);
				}
				else{
					if(arguments[i].toString() == "[object Object]")
						string = arguments[i];
					else
						string = arguments[i].toString();
				}
			}
			else{
				string = arguments[i];
			}
			var insert = {"log":string,"date": new Date().getTime()};
			
			if(Meteor.isClient)
				insert.side = "client";
			else
				insert.side = "server";
			try{
				insert.userId = Meteor.userId();
			}
			catch(error){}
			Log.insert(insert);
		}
	}
	// will think of this later
}


// config
app.credential = {};


//app config
app.app = {};
app.app.name = "SparkThis.io";
app.app.url = "";