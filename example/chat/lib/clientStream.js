var util = require('util')
  , stream = require('stream')
  , log = console.log.bind(console);

function ClientStream(socket) {
  this.socket = socket;
  this.readable = true;
  this.writable = true;
};

util.inherits(ClientStream, stream.Stream);

/**
 * Readable Stream
 */
ClientStream.prototype.resume = function() {
  this.socket.on('msg send', function(data) {
    this.emit('data', data);
  }.bind(this));
};

ClientStream.prototype.pipe = function() {
  this.piped = true;
  stream.Stream.prototype.pipe.apply(this, arguments);
};


/**
 * Writable Stream
 */
ClientStream.prototype.write = function(data) {
  this.socket.emit('msg push', data);
  return true;
};

module.exports = ClientStream;