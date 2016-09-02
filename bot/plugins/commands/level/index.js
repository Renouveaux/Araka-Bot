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



/*
async def get_player_info(self, member):
        server = member.server
        storage = await self.get_storage(server)
        players = await storage.smembers('players')
        if member.id not in players:
            return None

        player_total_xp = int(await storage.get('player:' + member.id + ':xp'))
        player_lvl = self._get_level_from_xp(player_total_xp)
        x = 0
        for l in range(0, int(player_lvl)):
            x += self._get_level_xp(l)
        remaining_xp = int(player_total_xp - x)
        level_xp = Levels._get_level_xp(player_lvl)
        players = await storage.sort('players',
                                     by='player:*:xp',
                                     offset=0,
                                     count=-1)
        players = list(reversed(players))
        player_rank = players.index(member.id)+1

        return {"total_xp": player_total_xp,
                "lvl": player_lvl,
                "remaining_xp": remaining_xp,
                "level_xp": level_xp,
                "rank": player_rank,
                "total_players": len(players)}
 */