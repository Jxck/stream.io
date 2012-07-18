var Writable = this['stream.io'].Writable;
function OutputWritableStream($) {
  Writable.call(this);
  this.writable = true;
  this.$log = $('#log');
};

util.inherits(OutputWritableStream, Writable);

OutputWritableStream.prototype.write = function(data) {
  this.$log.prepend(data);
  return true;
};
