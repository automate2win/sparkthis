ServiceConfiguration.configurations.remove({});



if(app.debug){
	ServiceConfiguration.configurations.insert({
		service: "facebook",
		clientId: "326194714245717",
		secret: "ba55c927a6a280276d7b7a6277aa0366"
    });
    ServiceConfiguration.configurations.insert({
		service: "twitter",
		consumerKey: "0xFqlBi3QBDa55wykFFdn1UyU",
		secret: "XqsZ0Qlx3raV94VUWGRTFVzjTh42wcMSrlHtmb4s4uVLMXQ9w5"
	});
}
else{
	ServiceConfiguration.configurations.insert({
		service: "facebook",
		clientId: "326194714245717",
		secret: "ba55c927a6a280276d7b7a6277aa0366"
    });
    ServiceConfiguration.configurations.insert({
		service: "twitter",
		consumerKey: "0xFqlBi3QBDa55wykFFdn1UyU",
		secret: "XqsZ0Qlx3raV94VUWGRTFVzjTh42wcMSrlHtmb4s4uVLMXQ9w5"
	});
}