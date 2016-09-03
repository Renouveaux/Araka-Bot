var cp = require('child_process');
var bot = cp.fork(`${__dirname}/bot/index.js`);

var config = require('./config-file.json')
, express = require('express')
, cors = require('cors')
, io = require('socket.io')
, app = express();

app.use(cors());
app.use(express.static(__dirname + '/web'));

var server = require('http').createServer(app)
, server = require('http').createServer(app)
, io = io.listen(server);

server.listen(config.port);