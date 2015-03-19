 ServiceConfiguration.configurations.remove({});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '326194714245717',
    secret: 'ba55c927a6a280276d7b7a6277aa0366'
});

// ServiceConfiguration.configurations.remove({
//     service: 'twitter'
// });
 
// ServiceConfiguration.configurations.insert({
//     service: 'twitter',
//     appId: '0xFqlBi3QBDa55wykFFdn1UyU',
//     secret: 'XqsZ0Qlx3raV94VUWGRTFVzjTh42wcMSrlHtmb4s4uVLMXQ9w5'
// });

// //399034973608261
if(app.debug){
    ServiceConfiguration.configurations.insert({
		service: "twitter",
		consumerKey: "0xFqlBi3QBDa55wykFFdn1UyU",
		secret: "XqsZ0Qlx3raV94VUWGRTFVzjTh42wcMSrlHtmb4s4uVLMXQ9w5"
	});
}
else{
    ServiceConfiguration.configurations.insert({
		service: "twitter",
		consumerKey: "3TUrNUCzHrGy0dHacGcmTeKg0",
		secret: "DPQYpmgcL9oQtQjX0sqSj5lqqBXRIqCKwpwth5udKgr7ZVtH00"
	});
}