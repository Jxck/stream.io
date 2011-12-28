function OutputStream($) {
  this.writable = true;
  this.$ = $;
  this.$display = $('#display');
};

util.inherits(OutputStream, stream.Stream);

OutputStream.prototype.write = function(data) {
  var $li = this.$('<li>').text(data);
  this.$display.append($li);
  return true;
};
