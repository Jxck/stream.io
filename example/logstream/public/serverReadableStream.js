var Readable = this['stream.io'].Readable;
function ServerReadableStream(io) {
  Readable.call(this);
  this.socket = io.connect();
  this.readable = true;
};

util.inherits(ServerReadableStream, Readable);

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
