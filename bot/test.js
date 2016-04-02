"use strict";
var inquirer = require('inquirer');
var colors = require("colors");
var request = require('request');

let infos = [];

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

console.log("We are going to create a fresh bot for Discord using API and autoconfigure the bot server".gray);

console.log("											");
console.log("											");

console.log("...............Requirements....................".magenta);
console.log("											");
console.log("To continu in goods conditions, you need :".magenta);
console.log("A mongoDB server, his adress and credential".magenta);
console.log("A valid Discord account with a confirmed mail".magenta);
console.log("											");
console.log("...............................................".magenta);

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
		name: 'email'
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
					infos.push({'token': body.token})


					inquirer.prompt([{
						type: "list",
						name: "botExist",
						message: "Do you already have a bot ?",
						choices: [
						"Yes",
						"No"
						]
					}], function( answers ) {
						if(answers.botExist === "Yes"){
							getBotInfos();
						}else{
							getBotCreate();
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


var getBotCreate = function(){

	inquirer.prompt([{
		type: 'input',
		message: 'Enter the name of your Bot',
		name: 'botName'
	},{
		type: 'input',
		message: 'Tel me about your bot in few words',
		name: 'description'
	},{
		type: "input",
		message: "Give me the adresse that we can have access to the bot server, ex: http://araka.bot.com",
		name: "redirect_uris"
	}
	], function(data){
		infos.push(data);
	});

}

var getBotInfos = function(){
	inquirer.prompt([{
		type: 'input',
		message: 'I need the bot Token',
		name: 'botToken'
	}], function(data){

		request.get({
			url:'https://discordapp.com/api/users/@me', 
			headers: {
				Authorization: data.botToken
			}}, function(err,httpResponse,body){

				console.log(body);

			});

	})
}