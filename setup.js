"use strict";
var inquirer = require('inquirer');
var colors = require("colors");
var request = require('request');

let infos = [];
let user = {};
let token = {};

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



/**
 * First question to be sure that the user have a discord account
 * @param  {string} answers
 * @return {function} or {information}
 */

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

/**
 * Log user to discord with his creadential and store token only for the instance
 */
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

 					token = body.token; 

 					getUserInfo(); // Storing user data to user var			

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

 var getUserInfo = function(){

 	request.get({
 		url: 'https://discordapp.com/api/users/@me',
 		headers: {
 			Authorization: token
 		}
 	}, function(err, httpResponse, body){
 		user = JSON.parse(body);
 	})

 }


/**
 * Help to create a bot with fex questions
 * If everything is good, we create the bot by calling makeAsBot
 */
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
 				Authorization: token
 			}}, function(err,httpResponse,body){

 				if(err) console.log(err);

 				makeAsBot(body);

 			});

 	});

 }


/**
 * Convert a tokened account to a bot account
 */
 var makeAsBot = function(data){

 	request.post({
 		url: 'https://discordapp.com/api/oauth2/applications/'+ data.id +'/bot',
 		headers: {
 			Authorization: token
 		},
 		json: {}
 	}, function(err, httpResponse, body){

 		console.log(body)

 		if(err) {
 			console.log(err);
 			return false;
 		}else{
 			whatNext(body);			
 		}

 	})

 }

/**
 * If the user already have bot(s), he can use one of them
 */
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
 						makeAsBot(botInfo);
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
 			whatNext(botInfo);
 		}

 	});

 }

/**
 * Last part to create the configuration for the server app
 */
 var configureApp = function(botInfo){
 	
 	console.log("App configuration initiated");

 	let db = {};


 	inquirer.prompt([{
 		type: 'input',
 		message: 'adresse to mongoDb database',
 		name: 'host'
 	},{
 		type: 'input',
 		message: 'Port of the database',
 		name: 'port',
 		default: "27017"
 	},{
 		type: 'input',
 		message: 'Database login if you have one',
 		name: 'login'
 	},{
 		type: 'password',
 		message: 'Database password if you have one',
 		name: 'password'
 	},{
 		type: 'input',
 		message: 'Choose a prefix to call the bot, usually / or !',
 		name: 'commandPrefix',
 		default: '!'
 	},{
 		type: 'input',
 		message: "Do you wan't that the bot autoreconnect to the server in case of deconnexion ?",
 		name: 'autoReconnect',
 		default: "true",
 		filter: function(data){
 			let val = data === "true" ? data = true : data = false;
 			return val;
 		}
 	}
 	], function(res){

 		let botName = (typeof botInfo.name !== 'undefined') ? botInfo.name : botInfo.username;

 		let config = {
 			"protectedKeys": [],
 			"allowedChannelIds": {},
 			"admin": "["+ user.id +"]",
 			"botName": botName,
 			"debug": false,
 			"autoReconnect": res.autoreconnect,
 			"autorun": true,
 			"commandPrefix": res.commandPrefix,
 			"database" : {
 				"prefix" : "mongodb",
 				"host" : res.host,
 				"port" : res.port,
 				"base" : botName.toLowerCase(),
 				"login" : res.login,
 				"pass" : res.password
 			}
 		}

 		console.log(config)

 	})


 }

/**
 * Work but not implemented. Ready to delete a bot account
 */
 var deleteBot = function(botId){

 	console.log("deleteBot".red);

 	request.del({
 		url: 'https://discordapp.com/api/oauth2/applications/'+ botId,
 		headers: {
 			Authorization: data.botToken
 		}
 	}, function(err, httpResponse, body){

 	})

 }

/**
 * Bot as been created and everything, what we do next ?
 */
 var whatNext = function(botInfo){

 	console.log("whatNext".red);

 	inquirer.prompt([
 	{
 		type: "list",
 		name: "select",
 		message: "Your bot is create, What next ?",
 		choices: [
 		{
 			name: "Configure the app",
 			value: function(){
 				configureApp(botInfo);
 			}
 		},{
 			name: "Get the bot Information and quit",
 			value: function(){
 				console.log("Your token : " + token);
 				console.log("                          ");
 				console.log("The bot data :");
 				console.log(botInfo);
 				console.log("                          ");
 				console.log("To add the bot to your server, follow this link");
 				console.log("https://discordapp.com/oauth2/authorize?&client_id="+ botInfo.id +"&scope=bot")
 			}
 		}
 		]
 	}
 	], function(answer){
 		answer.select();
 	})
 }
