function ServerStream(io) {
  this.socket = io.connect();
  this.readable = true;
};

util.inherits(ServerStream, stream.Stream);

ServerStream.prototype.resume = function() {
  this.socket.on('msg push', function(data) {
    this.emit('data', data);
  }.bind(this));
};

ServerStream.prototype.pipe = function(dest) {
  this.piped = true;
  this.dest = dest;
  this.on('data', function(data) {
    this.dest.write(data);
  });
};
