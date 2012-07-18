var Readable = this['stream.io'].Readable;
function ServerReadableStream(io) {
  Readable.call(this);
  this.socket = io.connect();
}

util.inherits(ServerReadableStream, Readable);

ServerReadableStream.prototype.resume = function() {
  Readable.prototype.resume.apply(this, arguments);
  this.socket.on('msg push', function(data) {
    this.emit('data', data);
  }.bind(this));
};

ServerReadableStream.prototype.pipe = function(dest) {
  Readable.prototype.pipe.apply(this, arguments);
  if (typeof dest === 'string') {
    this.dest = {
      write: function(data) {
        $(dest).text(data);
      }
    };
  }
};
