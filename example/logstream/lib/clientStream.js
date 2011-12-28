var util = require('util')
  , stream = require('stream');

var ClientStream = function(socket) {
  this.socket = socket;
  this.writable = true;
};

util.inherits(ClientStream, stream.Stream);

ClientStream.prototype.write = function(data) {
  this.socket.emit('msg push', data);
  return true;
};

ClientStream.prototype.end = function() {
  this.writable = false;
};

module.exports = ClientStream;
