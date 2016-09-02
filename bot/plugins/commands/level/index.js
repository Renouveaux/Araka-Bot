/**
 * Can return the user level from his XP
 */

 module.exports = function(Bot, params, msg, Config, Helpers, Logger) {

    // If a user is mentionned
    if(msg.mentions[0]){
        console.log("true")
    }else{

        Levels.findOne({userID : msg.author.id}, function(err, d){

            var playerTotalXP = d.XP;
            var player_lvl = get_level_from_xp(d.XP);

            var x = 0
            for (var i = 0; i <= player_lvl; i++){
                x += get_level_xp(i)
            }
            remaining_xp = Math.floor(x - playerTotalXP);

            Bot.reply(msg, "Tu a : " + playerTotalXP + "pts d'xp, Level : " + player_lvl + ". Xp manquant pour prochain level " + remaining_xp);
        })
    }
};

var get_level_xp = function(n){
	return Math.floor(Math.pow((n+1), 3) + 30 * Math.pow((n+1), 2) + 30 * (n+1) - 50);
}

var get_level_from_xp = function(xp){
	var remaining_xp = Math.floor(xp);
	var level = 0;
	
	while (remaining_xp >= get_level_xp(level)){
		remaining_xp -= get_level_xp(level);
		level++
	}

	return level;

}