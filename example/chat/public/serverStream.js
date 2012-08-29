var Filter = this['stream.io'].Filter;
function ServerStream(io) {
  Filter.call(this);
  this.socket = io.connect();
};

util.inherits(ServerStream, Filter);

ServerStream.prototype.resume = function() {
  Filter.prototype.resume.apply(this, arguments);
  this.socket.on('msg push', function(data) {
    this.emit('data', data);
  }.bind(this));
};

ServerStream.prototype.write = function(data) {
  Filter.prototype.write.apply(this, arguments);
  this.socket.emit('msg send', data);
  return true;
};
