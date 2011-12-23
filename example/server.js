// Server
var log = console.log.bind(console);
var connect = require('connect')
  , fs = require('fs')
  , util = require('util')
  , stream = require('stream');


var ReadLineFilter = require('./readLineFilter');
var readable = fs.createReadStream('sample.log', {encoding: 'utf-8'})
  , readline = new ReadLineFilter();


readable.pause();

var server = connect.createServer(
    connect.logger()
  , connect.static(__dirname)
).listen(3000);

var io = require('socket.io').listen(server);

var ClientStream = function(socket) {
  this.socket = socket;
  this.writable = true;
};

ClientStream.prototype.write = function(data) {
  this.socket.emit('msg push', data);
  return true;
};

ClientStream.prototype.end = function() {
  this.writable = false;
};

io.sockets.on('connection', function(socket) {
  var client = new ClientStream(socket);
  readable.resume();
  readable.pipe(readline).pipe(client);
  log('connected');
  socket.emit('msg push', 'data');
  socket.on('msg send', function(msg) {
    log(msg);
  });
});

