var ClientStream = function(socket) {
  this.socket = socket;
  this.writable = true;
};

ClientStream.prototype.write = function(data) {
  this.socket.emit('msg push', data);
  return true;
};

ClientStream.prototype.end = function() {
  this.writable = false;
};

module.exports = ClientStream;
