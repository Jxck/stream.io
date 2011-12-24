// Server
var log = console.log.bind(console);
var io = require('socket.io')
  , connect = require('connect')
  , fs = require('fs')
  , util = require('util')
  , stream = require('stream');


var ReadLineFilter = require('./readLineFilter')
  , ClientStream = require('../clientStream')
  ;

var server = connect.createServer(
    connect.logger()
  , connect.static(__dirname)
).listen(3000);

io = io.listen(server);

io.configure('development', function() {
  io.set('log level', 1);
  io.set('transports', ['websocket']);
});

io.sockets.on('connection', function(socket) {
  log('connected');
  var readable = fs.createReadStream('sample.log', {encoding: 'utf-8'})
    , readline = new ReadLineFilter()
    , client = new ClientStream(socket)
    ;
  readable.resume();
  readable.pipe(readline).pipe(client);
});
