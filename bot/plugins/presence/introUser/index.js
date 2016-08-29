var message = `
Salut à toi et bienvenue sur le serveur Discord l'Evolution est en marche.

Premièrement et pour ne pas déroger aux règle, tu a accès aux #reglement du serveur dans le salon portant le même nom.
Si cela est ta première venu, merci d'enregistrer un email pour ton compte Discord et d'informer un GM de la guils dont tu fait parti,
de cette façons nous t'ajouterons au rôle adéquate. Si tu fait parti de plusieurs guilds, donnes la liste.

Les différents salons contienent chacun leur propre description pour plus de clarté. N'hésite pas à poster un message.
Si tu a des questions, n'hesite pas à les poser. Si la question concerne les GM, tu peux directement mentionner le groupe GM, 
de sorte que tous les GM soient au courant de la question et puisse te répondre le plus rapidement.
Pour cela il te suffit d'écrire **@GM** Ton message.

Pour information, je suis un bot, il n'est pas nécessaire de tenter de taper une discute avec moi, je ne suis pas très répondant.
Sur ce Salut.
`;

var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-upsert'));

module.exports = function(data, Config, Helpers){

	var db = new PouchDB('dataBase/user');

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
				Bot.sendMessage({
					'to': data.userID,
					'message': message
				});
			}

		});

	}


}