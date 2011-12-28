var util = require('util')
  , stream = require('stream');

function ClientStream(socket) {
  this.socket = socket;
  this.writable = true;
};

util.inherits(ClientStream, stream.Stream);

ClientStream.prototype.write = function(data) {
  this.socket.emit('msg push', data);
  return true;
};

module.exports = ClientStream;
