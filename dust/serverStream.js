var util = require('util')
  , stream = require('stream')
  , io = require('socket.io')
  ;

function ServerFilter(server) {
  this.writable = true;
  this.readable = true;
  this.piped = false;
  this.dest = null;
  this.io = io.listen(server);
  this.io.configure('development', function() {
    io.set('log level', 1);
    io.set('transports', ['websocket']);
  });
}

util.inherits(ServerFilter, stream.Stream);

ServerFilter.prototype.write = function(data) {
  if (data) {
    this.emit('data', data);
  }
  return true;
}

ServerFilter.prorotype.end = function() {
  this.writable = false;
  this.emit('end');
}

ServerFilter.prototype.pipe = function(dest) {
  this.piped = true;
  this.dest = dest;

  this.on('data', function(data) {
    this.dest.write(data);
  });
}

module.exports = ServerFilter;
