import PouchDB from 'pouchdb';

let user = new PouchDB('dataBase/user');
PouchDB.plugin(require('pouchdb-upsert'));

module.exports = function(data, Config, Helpers){


	user.allDocs({
		include_docs: true,
		attachments: true
	}, function(err, response) {
		if (err) { return console.log(err); }
		console.log(response.rows)
	});

	user.get(data.userID, function(err, res) {

		console.log((Date.now() - res.lastMessage) / 1000)

		if( (Date.now() - res.lastMessage) / 1000 >= 60){
			user.upsert(res._id, function (doc) {
				doc.XP = res.XP + getRandomInt(5, 10);
				doc.lastMessage = Date.now();
				return doc;
			}).then(function (res) {
				console.log(res)
			}).catch(function (err) {
				console.log(err)
			});
		}

	});

	/*user.putIfNotExists(data.userID, 
	{
		_id: res._id,
		pseudo: res.pseudo,
		avatar: res.avatar,
		lastMessage : Date.now(),
		XP : getRandomInt(5, 10) + res.XP
	}).then(function (res) {
		console.log(res)
	}).catch(function (err) {
		console.log(err)
	});*/

	/*user.get(data.userID, function(err, res) {

			user.put({
				_id: res._id,
				pseudo: res.pseudo,
				avatar: res.avatar,
				lastMessage : Date.now(),
				XP : getRandomInt(5, 10) + res.XP
			}, res._id, res._rev);

		}else{
			console.log(res)
		}



	});*/




}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}