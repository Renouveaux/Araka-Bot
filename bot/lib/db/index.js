/**
 * regroupe les différentes function faisant appel à la bdd
 * @param data
 * @param Bot
 * @param Config
 * @param Helpers
 */

 import PouchDB from 'pouchdb';
 PouchDB.plugin(require('pouchdb-upsert'));

 module.exports = function(data, Config, Helpers) {

 	let db = new PouchDB('dataBase/user');

 	if(data.rawEvent.d.status === 'online'){

 		db.putIfNotExists(data.userID, 
 		{
 			_id: data.userID,
 			pseudo: data.user,
 			avatar: data.rawEvent.d.user.avatar,
 			lastMessage : Date.now(),
 			XP : 0
 		}, function(err, res){

 			if(res.updated){
 				require('./introUser')(data, Config, Helpers);
 			}

 		});

 	}


 }
