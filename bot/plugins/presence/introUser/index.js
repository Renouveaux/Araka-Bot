/**
 * @param o : old user information
 * @param n : new user information
 */

 module.exports = function(Bot, o, n){

 	var query = { 'userId' : n.id },
 	doc = { 'pseudo' : n.username, 'userId' : n.id, 'avatar' : n.avatar },
 	options = { upsert: true, new: true, setDefaultsOnInsert: true, passRawResult : true };

 	Users.findOneAndUpdate(query, doc, options, function(err, res, raw) {
 		if (err) {
 			console.log('err')
 		}else{

 			if(!raw.lastErrorObject.updatedExisting){
 				// send intro to user
 				Messages.findOne({'name': 'intro'}, function(err, data){
 					Bot.sendMessage(n.id, data.description);
 				});
 			}
 		}
 	});


 }



