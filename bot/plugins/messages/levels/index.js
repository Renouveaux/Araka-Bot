module.exports = function(Bot, msg, Config, Helpers, Logger){

	Configs.findOne({name: 'levels'}, function(err, data){

		Levels.findOne({userID: msg.sender.id}, function(err, person){

			if(person !== null){

				if( ((Date.now() - person.lastMessage) / 1000) > data.value ){

					Levels.update({
						userID : msg.sender.id
					},{ 
						$inc: { XP: getRandomInt(20, 50) },
						$set: { lastMessage: new Date }
					}, function(err, res){
						if(err)
							throw err;
					})
				}
			}else{
				new Levels({
					userID : msg.sender.id
				}).save();
			}

		})
		
	})

}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}