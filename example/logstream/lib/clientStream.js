var util = require('util')
  , writable = require('../../../lib/writableStream')
  , io = require('socket.io')
  ;

function ClientStream(server) {
  writable.call(this);
  this.server = server;
  this.io = io.listen(server);
  this.io.configure('development', function() {
    this.io.set('log level', 1);
    this.io.set('transports', ['websocket']);
  }.bind(this));
  this.io.on('connection', function(socket) {
    console.log('connected');
    this.writable = true;
  }.bind(this));
}

util.inherits(ClientStream, writable);

ClientStream.prototype.write = function(data) {
  if (!this.writable) {
    // TODO
  }
  this.io.sockets.emit('msg push', data);
  return true;
};

module.exports = ClientStream;
