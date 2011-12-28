function OutputStream($) {
  this.writable = true;
  this.$log = $('#log');
};

util.inherits(OutputStream, stream.Stream);

OutputStream.prototype.write = function(data) {
  this.$log.append(data);
  return true;
};