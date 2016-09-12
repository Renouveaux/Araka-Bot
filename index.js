var cp = require('child_process');
var bot = cp.fork(`${__dirname}/bot/index.js`);

var config = require('./config-file.json')
, express = require('express')
, cors = require('cors')
, passport = require('passport')
, session = require('express-session')
, DiscordStrategy = require('passport-discord').Strategy
, io = require('socket.io')
, app = express()
, ejwt = require('express-jwt')
, mongoose = require('mongoose')
, winston = require('winston')
, jwt = require('jsonwebtoken');

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

require('./models');

var logger = new (winston.Logger)({
	transports: [
	new (winston.transports.Console)(),
	new (winston.transports.File)({ filename: '../application.log' })
	]
});

mongoose.connect(config.database.host + ':' + config.database.port + '/' + config.database.base, {
	db: { native_parser: true },
	user: config.database.user || null,
	pass: config.database.pass || null
});

var db = mongoose.connection;
/**
  *
  * Listen the database status
  *
  */
  mongoose.connection.on('opening', function() {
  	logger.verbose("reconnecting... %d", mongoose.connection.readyState);
  });
  db.once('open', function callback () {
  	logger.verbose("Database connection opened.");
  });
  db.on('error', function (err) {
  	logger.debug("DB Connection error %s", err);
  });
  db.on('reconnected', function () {
  	logger.verbose('MongoDB reconnected!');
  });
  db.on('disconnected', function() {
  	logger.debug('MongoDB disconnected!');
  	mongoose.connect(connectStr, {server:{auto_reconnect:true}});
  });

  var scopes = ['identify', 'email', 'guilds'];

  passport.use(new DiscordStrategy(
  {
  	clientID: '221738769479368704',
  	clientSecret: 'fRAInwB6E8b-91YXQmt7latGMVgXxVcn',
  	callbackURL: 'http://192.168.0.254:3000/auth/discord/return',
  	scope : scopes
  },
  function(accessToken, refreshToken, profile, cb) {

  	Users.findOne({ 'userId' : profile.id }, function(err, res) {
  		if(res.role === 'admin'){
  			var token = jwt.sign(res._doc, "e90fa022e12c384cac7b2366bafeccea", {expiresIn : 1800});
  		}
  		return cb(err, token);
  	});
  }
  ));

  app.use(cors());


app.use('/api', ejwt({ secret: 'e90fa022e12c384cac7b2366bafeccea'}));

app.use(passport.initialize());
//app.use(passport.session());
app.use(express.static(__dirname + '/web'));

app.get('/auth/discord', passport.authenticate('discord', { session: false, failureRedirect: '/#/login' }), function(req, res){
	res.redirect('/')
});
app.get('/auth/discord/return', passport.authenticate('discord', { session: false,
	failureRedirect: '/#/login'
}), function(req, res) {
	res.redirect("/#/profile?access_token=" + req.user);
});

var server = require('http').createServer(app)
, server = require('http').createServer(app)
, io = io.listen(server);

server.listen(config.port);