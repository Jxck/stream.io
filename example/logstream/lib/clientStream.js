var util = require('util')
  , stream = require('stream')
  , io = require('socket.io')
  ;

function ClientStream(server) {
  this.writable = false;
  this.server= server;
  this.io = io.listen(server);
  this.io.configure('development', function() {
    this.io.set('log level', 1);
    this.io.set('transports', ['websocket']);
  }.bind(this));
  this.io.on('connection', function() {
    console.log('connected');
    this.writable = true;
  }.bind(this));
};

util.inherits(ClientStream, stream.Stream);

ClientStream.prototype.write = function(data) {
  if(!this.writable) {

  }
  this.io.emit('msg push', data);
  return true;
};

module.exports = ClientStream;
