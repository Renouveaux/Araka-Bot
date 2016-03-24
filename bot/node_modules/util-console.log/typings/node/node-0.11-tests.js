/// <reference path="node.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var assert = require("assert");
var fs = require("fs");
var events = require("events");
var zlib = require("zlib");
var url = require('url');
var util = require("util");
var crypto = require("crypto");
var http = require("http");
var net = require("net");
var dgram = require("dgram");
var querystring = require('querystring');
assert(1 + 1 - 2 === 0, "The universe isn't how it should.");
assert.deepEqual({ x: { y: 3 } }, { x: { y: 3 } }, "DEEP WENT DERP");
assert.equal(3, "3", "uses == comparator");
assert.notStrictEqual(2, "2", "uses === comparator");
assert.throws(function () { throw "a hammer at your face"; }, undefined, "DODGED IT");
assert.doesNotThrow(function () {
    if (false) {
        throw "a hammer at your face";
    }
}, undefined, "What the...*crunch*");
fs.writeFile("thebible.txt", "Do unto others as you would have them do unto you.", assert.ifError);
fs.writeFile("Harry Potter", "\"You be wizzing, Harry,\" jived Dumbledore.", {
    encoding: "ascii"
}, assert.ifError);
var content, buffer;
content = fs.readFileSync('testfile', 'utf8');
content = fs.readFileSync('testfile', { encoding: 'utf8' });
buffer = fs.readFileSync('testfile');
buffer = fs.readFileSync('testfile', { flag: 'r' });
fs.readFile('testfile', 'utf8', function (err, data) { return content = data; });
fs.readFile('testfile', { encoding: 'utf8' }, function (err, data) { return content = data; });
fs.readFile('testfile', function (err, data) { return buffer = data; });
fs.readFile('testfile', { flag: 'r' }, function (err, data) { return buffer = data; });
var Networker = (function (_super) {
    __extends(Networker, _super);
    function Networker() {
        _super.call(this);
        this.emit("mingling");
    }
    return Networker;
})(events.EventEmitter);
var errno;
fs.readFile('testfile', function (err, data) {
    if (err && err.errno) {
        errno = err.errno;
    }
});
url.format(url.parse('http://www.example.com/xyz'));
url.format({
    protocol: 'https',
    host: "google.com",
    pathname: 'search',
    query: { q: "you're a lizard, gary" }
});
util.inspect(["This is nice"], false, 5);
util.inspect(["This is nice"], { colors: true, depth: 5, customInspect: false });
function stream_readable_pipe_test() {
    var r = fs.createReadStream('file.txt');
    var z = zlib.createGzip();
    var w = fs.createWriteStream('file.txt.gz');
    r.pipe(z).pipe(w);
}
var hmacResult = crypto.createHmac('md5', 'hello').update('world').digest('hex');
http.createServer().listen(0).close().address();
net.createServer().listen(0).close().address();
var request = http.request('http://0.0.0.0');
request.once('error', function () { });
request.setNoDelay(true);
request.abort();
var http_tests;
(function (http_tests) {
    var code = 100;
    var codeMessage = http.STATUS_CODES['400'];
    var codeMessage = http.STATUS_CODES[400];
})(http_tests || (http_tests = {}));
var ds = dgram.createSocket("udp4", function (msg, rinfo) {
});
var ai = ds.address();
ds.send(new Buffer("hello"), 0, 5, 5000, "127.0.0.1", function (error, bytes) {
});
var original = 'http://example.com/product/abcde.html';
var escaped = querystring.escape(original);
console.log(escaped);
var unescaped = querystring.unescape(escaped);
console.log(unescaped);
//# sourceMappingURL=node-0.11-tests.js.map