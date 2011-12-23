// Server
var log = console.log.bind(console);
var connect = require('connect')
  , fs = require('fs')
  , util = require('util')
  , stream = require('stream')
  ;

var server = connect.createServer(
    connect.logger()
  , connect.static(__dirname)
).listen(3000);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  log('connected');
  socket.emit('msg push', 'data');
  socket.on('msg send', function(msg) {
    log(msg);
  });
});

var ReadLineFilter = require('./readLineFilter');
var readable = fs.createReadStream('sample.log', {encoding: 'utf-8'})
  , readline = new ReadLineFilter()
  ;

readable.pipe(readline).pipe(process.stdout);
