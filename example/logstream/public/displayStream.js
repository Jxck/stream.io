function DisplayStream($) {
  this.writable = true;
  this.$log = $('#log');
};

util.inherits(DisplayStream, stream.Stream);

DisplayStream.prototype.write = function(data) {
  this.$log.append(data);
  return true;
};