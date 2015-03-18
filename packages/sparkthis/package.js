Package.describe({
  summary: "Special sparkthis package"
});

Npm.depends({
});

Cordova.depends({
	"org.apache.cordova.splashscreen" : "0.3.3",
	"org.apache.cordova.inappbrowser" : "0.5.2",
	"org.apache.cordova.device" : "0.2.12",
	"org.apache.cordova.console" : "0.2.11",
	"nl.x-services.plugins.socialsharing" : "https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/tarball/81c25f57e27edfbb5bef9709c845bc29c6e3179b",
	"com.phonegap.plugins.PushPlugin" : "https://github.com/phonegap-build/PushPlugin/tarball/1979d972b6ab37e28cf2077bc7ebfe706cc4dacd",
	"com.phonegap.plugins.facebookconnect" : "https://github.com/hastenfernandes/facebook-diggadog/tarball/e6fd3a070ccf68844197ca5413e5b32cdbd6e35c"
});
Package.on_use(function (api) {
	// api.add_files('common.js', ['client',"server"]);
 //    api.add_files('client.js', 'client');
 //    api.add_files('lib/timeago.js', 'client');
 //    api.add_files('lib/util.js', 'client');
 //    api.add_files('lib/jquery.transition.js', 'client');
	// if(api.export){
	// 	api.export(["app","collection","log"],['client',"server"]);
	// }
});