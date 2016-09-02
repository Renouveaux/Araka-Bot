/**
 * Can return the user level from his XP
 */

 module.exports = function(Bot, params, msg, Config, Helpers, Logger) {

    // If a user is mentionned
    if(msg.mentions[0]){

        get_playerInfo(msg.mentions[0].id, function(err, d){
            if(err)
                throw err;
            if(typeof d === "string"){
                Bot.sendMessage(msg, "<@"+msg.mentions[0].id+"> " + d)
            }else{
                Bot.sendMessage(msg, "<@"+msg.mentions[0].id+"> a : " + d.playerTotalXP + "pts d'xp, Level : " + d.player_lvl + ". Xp manquant pour prochain level " + d.remaining_xp)
            }
        })

    }else{
        get_playerInfo(msg.author.id, function(err, d){
            if(err)
                throw err;
            if(typeof d === "string"){
                Bot.reply(msg, "Tu n'a pas encore de point, commence à écrire pour augmenter ton niveau")
            }else{
                Bot.reply(msg, "Tu a : " + d.playerTotalXP + "pts d'xp, Level : " + d.player_lvl + ". Xp manquant pour prochain level " + d.remaining_xp);
            }
            
        })

    }
};

var get_playerInfo = function(playerID, cb){
    Levels.findOne({userID : playerID}, function(err, d){

        if(err)
            throw err

        if(d === null){
            cb(err, "n'a pas encore gagné d'XP")
        }else{

            var playerTotalXP = d.XP;
            var player_lvl = get_level_from_xp(d.XP);

            var x = 0
            for (var i = 0; i <= player_lvl; i++){
                x += get_level_xp(i)
            }
            remaining_xp = Math.floor(x - playerTotalXP);

            cb(err, {
                'playerTotalXP' : playerTotalXP,
                'player_lvl' : player_lvl,
                'remaining_xp' : remaining_xp
            })
        }
    })
}

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