var cp = require('child_process');
var bot = cp.fork(`${__dirname}/bot/index.js`);
