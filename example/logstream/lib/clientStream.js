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
  this.io.on('connection', function(socket) {
    console.log('connected');
    this.writable = true;
  }.bind(this));
};

util.inherits(ClientStream, stream.Stream);

ClientStream.prototype.write = function(data) {
  if(!this.writable) {

  }
log(data);
  this.io.sockets.emit('msg push', data);
  return true;
};

ClientStream.prototype.end = function() {};

ClientStream.prototype.resume = function() {};

ClientStream.prototype.pause = function() {};

ClientStream.prototype.setEncoding = function(encoding) {};

ClientStream.prototype.destroy = function() {};

ClientStream.prototype.destroySoon = function() {};

module.exports = ClientStream;
