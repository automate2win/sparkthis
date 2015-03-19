 ServiceConfiguration.configurations.remove({});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '877217708988742',
    secret: '0faf6494f6b3860f1161fe1946d4c65c'
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