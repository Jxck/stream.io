log = console.log.bind(console);
var util = require('util')
   , filter = require('../../../lib/filterStream')
   , io = require('socket.io')
   ;

function ClientStream(server) {
  filter.call(this);
  this.server = server;
  this.io = io.listen(server);
  this.io.configure('development', function() {
    this.io.set('log level', 1);
    this.io.set('transports', ['websocket']);
  }.bind(this));
  this.io.on('connection', function(socket) {
    console.log('connected');
    this.writable = true;
    socket.on('msg send', function(data) {
      log('msg send', data);
      this.emit('data', data);
    }.bind(this));
  }.bind(this));
}


util.inherits(ClientStream, filter);


/**
 * Writable Stream
 */
ClientStream.prototype.write = function(data) {
  this.io.sockets.emit('msg push', data);
  return true;
};

module.exports = ClientStream;
