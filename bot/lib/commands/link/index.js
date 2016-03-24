module.exports = function(data, Config, Helpers, Logger) {

	var content = [];

	Bot.getMessages({
		channel: "106702700409815040",
		limit: 1000
	}, function(err, messageArr) {

		if(err){
			Logger.log('warn', 'link command : The channel probably don t exist');
		}else{
			for(let i=0; i < messageArr.length; i++){
				content.push({
					author: messageArr[i].author.username,
					content: messageArr[i].content
				});
			}

			fs.appendFile('link.json', JSON.stringify(content), function(err){
				if (err) throw err;
				console.log('It\'s saved!');
			});
		}

	});

};

var fs = require('fs');