function DisplayStream($) {
  this.writable = true;
  this.$ = $;
  this.$display = $('#display');
};

util.inherits(DisplayStream, stream.Stream);

DisplayStream.prototype.write = function(data) {
  var $li = this.$('<li>').text(data);
  this.$display.append($li);
  return true;
};
