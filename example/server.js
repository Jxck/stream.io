// Server
var log = console.log.bind(console);
var connect = require('connect');
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
