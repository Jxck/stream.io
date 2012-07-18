// Server
log = console.log.bind(console);
var io = require('socket.io')
  , connect = require('connect')
  , fs = require('fs')
  , util = require('util')
  , stream = require('stream');

var ClientStream = require('./lib/clientStream');

var server = connect.createServer(
    connect.logger()
  , connect.static(__dirname + '/public')
).listen(3000);

io = io.listen(server);
 
io.configure('development', function() {
  io.set('log level', 1);
  io.set('transports', ['websocket']);
});

io.sockets.on('connection', function(socket) {
  var client = new ClientStream(socket);
  // TODO
  // client.pipe(broadcast).pipe(client);
  client.resume();
  client.pipe(client);
});

