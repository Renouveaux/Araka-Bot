

module.exports = function(data, Config, Helpers){

	getXP();

	Configs.findOne({name: 'levels'}, function(err, res){
		

		Levels.findOne({userID: data.userID}, function(err, person){

			if(person !== null){
				// The user exist				
				Levels.update({
					'userID' : data.userID 
				},
				{ 
					$inc: { XP: getRandomInt(5, 10) },
					$set: { lastMessage: Date.now() }
				})

			}else{

				new Levels({
					userID : data.userID,
					pseudo : data.user,
					avatar : data.rawEvent.d.author.avatar,
					lastMessage : Date.now(),
					XP : 0
				}).save();


			}

		})

	})

}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getXP() {


	var xp = 2075;
	var n = -1;
	var L = 0;

	while(n < xp){
		n += Math.floor(Math.pow((L+1), 3) + 30 * Math.pow((L+1), 2) + 30 * (L+1) - 50);
		L++;
	}

	console.log("Current XP: " +xp);
    console.log("Current Level: "+L);
    console.log("Next Level: " +n);


}