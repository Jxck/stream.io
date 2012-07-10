function OutputWritableStream($) {
  this.writable = true;
  this.$log = $('#log');
};

util.inherits(OutputWritableStream, stream.Stream);

OutputWritableStream.prototype.write = function(data) {
  this.$log.prepend(data);
  return true;
};
