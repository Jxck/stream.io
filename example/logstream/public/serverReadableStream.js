function ServerReadableStream(io) {
  this.socket = io.connect();
  this.readable = true;
};

util.inherits(ServerReadableStream, stream.Stream);

ServerReadableStream.prototype.resume = function() {
  this.socket.on('msg push', function(data) {
    this.emit('data', data);
  }.bind(this));
};

ServerReadableStream.prototype.pipe = function(dest) {
  this.piped = true;
  this.dest = dest;
  if(typeof dest === 'string') {
    this.dest = {
      write: function(data) {
        $(dest).text(data);
      }
    }
  }
  this.on('data', function(data) {
    this.dest.write(data);
  });
};
