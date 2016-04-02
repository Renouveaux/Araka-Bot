"use strict";
var inquirer = require('inquirer');
var colors = require("colors");
var request = require('request');

let infos = [];
let user = {};
let bot = {};

console.log("											");
console.log("                 --          --			");
console.log("                | °|        | °| 			");
console.log("                 --          --			");
console.log("											");
console.log("                      °  °					");
console.log("											");
console.log("                  '--______--'				");
console.log("											");
console.log("               	    \\	   /			");
console.log("											");
console.log("	Welcome to the Araka configurator		".gray);
console.log("											");
console.log("											");

console.log("We are going to create a fresh bot for Discord using API and autoconfigure the server".gray);

console.log("											");
console.log("											");

console.log("...............Requirements....................".magenta);
console.log("											");
console.log("To continu in goods conditions, you need :".magenta);
console.log("A mongoDB server, his adress and credential".magenta);
console.log("A valid Discord account with a confirmed mail".magenta);
console.log("											");
console.log("...............................................".magenta);



// Is the user have a account from discord
inquirer.prompt([{
	type: "list",
	name: "token",
	message: "Do you have a valid Discord Account ??",
	choices: [
	"Yes",
	"No"
	]
}], function( answers ) {
	if(answers.token === "Yes"){
		getToken();
	}else{
		console.log("Came back when you have your account ready".red);
	}
});


var getToken = function(){
	inquirer.prompt([{
		type: "input",
		message: 'Your email',
		name: 'email',
		validate: function(data){
			if(data.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)){
				return true
			}
		}
	},{
		type: "password",
		message: "Your password account",
		name: "password",
		validate: function( answer ) {
			if ( answer.length < 1 ) {
				return "You must choose at least one topping.";
			}
			return true;
		}
	}], function(res){

		request.post({
			url:'https://discordapp.com/api/auth/login', 
			json: {
				email : res.email, 
				password: res.password }
			}, function(err,httpResponse,body){

				if(body.token){
					user.token = body.token;
					//infos.push({'token': body.token})

					request.get({
						url: 'https://discordapp.com/api/oauth2/applications',
						headers: {
							Authorization: body.token
						}
					}, function(err, httpResponse, body){

						
						if(JSON.parse(body).length > 0){ // If a bot account exist for this user

							inquirer.prompt([{
								type: "list",
								name: "botExist",
								message: "You already have bot, do you wana use one of them ?",
								choices: [
								"Yes",
								"No"
								]
							}], function( answers ) {
								
								if(answers.botExist === "Yes"){
									useExistingBot(JSON.parse(body));
								}else{
									createBot();
								}

							});

						}else{
							createBot();
						}
					});
					
				}else if(body.email){
					console.log("Your email doesn't exist !!".red);
				}else if(body.password){
					console.log("Wrong password !!!".red);
				}else{
					console.log("There is a unknow error somewhere, sorry ;(");
				}

			});
	})
}

var createBot = function(){

	inquirer.prompt([{
		type: 'input',
		message: 'Enter the name of your Bot',
		name: 'name'
	},{
		type: 'input',
		message: 'Tel me about your bot in few words',
		name: 'description'
	},{
		type: "input",
		message: "Give me the adresse that we can have access to the bot server",
		name: "redirect_uris",
		default: "http://localhost",
		validate: function(data){
			if(data.match(/^(https?:\/\/)([\da-z\.-]+)(\.([a-z\.]{2,6})([\/\w \.-]*)*)?\/?$/)){
				return true
			}
		}
	}
	], function(payload){

		request.post({
			url:'https://discordapp.com/api/oauth2/applications', 
			json: payload,
			headers: {
				Authorization: user.token
			}}, function(err,httpResponse,body){

				if(err) console.log(err);

				//getAllBotInfo(body);

			});

	});

}

var getAllBotInfo = function(data){

	request.post({
		url: 'https://discordapp.com/api/oauth2/applications/'+ data.id +'/bot',
		headers: {
			Authorization: user.token
		},
		json: {}
	}, function(err, httpResponse, body){

		if(err) {
			console.log(err);
			return false;
		}else{
			bot = body;
			whatNext();			
		}

	})


}

var getBotInfos = function(){
	inquirer.prompt([{
		type: 'input',
		message: 'I need the bot Token',
		name: 'botToken',
		validate: function( answer ) {
			if ( answer.length < 1 ) {
				return "This is nothing, I need a token";
			}
			return true;
		}
	}], function(data){

		request.get({
			url:'https://discordapp.com/api/users/@me', 
			headers: {
				Authorization: data.botToken
			}}, function(err,httpResponse,body){

				let data = JSON.parse(body);

				if(data.bot){
					console.log("This is a valid bot token".green);
					console.log("I will now create the configuration of the server".green);
					infos.push(data);
					configureApp();
				}else{
					console.log("Your are not enter a correct bot token".red);
					console.log("I need the bot token, not your token.".red);
					console.log("Thanks to retry or create a new one".red);
				}

			});

	})
}

var useExistingBot = function(botList){

	let List = [];

	for (var i=0; i < botList.length ; ++i){		
		List.push({name: botList[i].name, value: i});
	}

	inquirer.prompt([
	{
		type: "rawlist",
		name: "bot",
		message: "Select the bot you want ?",
		choices: List
	}
	], function( answers ) {
		//console.log( JSON.stringify(answers, null, "  ") );
		let botInfo = botList[answers.bot];

		if(typeof botInfo.bot === 'undefined'){
			inquirer.prompt([
			{
				type: "list",
				name: "select",
				message: "This is not a bot account, do you wanna convert it ?",
				choices: [
				{
					name: "Yes",
					value: function(){
						getAllBotInfo(botInfo);
					}
				},{
					name: "No",
					value: function(){						
						console.log("Ok, see you soon !!");
					}
				}
				]
			}
			], function(answer){
				answer.select();
			})
		}else{
			whatNext();
		}


	});


}

var configureApp = function(){
	console.log("App configuration initiated");
	console.log("This part was not implemented yet");
}


var deleteBot = function(botId){

	request.del({
		url: 'https://discordapp.com/api/oauth2/applications/'+ botId,
		headers: {
			Authorization: data.botToken
		}
	}, function(err, httpResponse, body){

	})

}

var whatNext = function(){
	inquirer.prompt([
	{
		type: "list",
		name: "select",
		message: "Your bot is create, What next ?",
		choices: [
		{
			name: "Configure the app",
			value: function(){
				configureApp();
			}
		},{
			name: "Get the bot Information and quit",
			value: function(){
				console.log("Your token : " + user.token);
				console.log("                          ");
				console.log("The bot data :");
				console.log(bot);
			}
		}
		]
	}
	], function(answer){
		answer.select();
	})
}