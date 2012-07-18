var Writable = this['stream.io'].Writable;
function OutputStream($) {
  Writable.call(this);
  this.$ = $;
  this.$display = $('#display');
};

util.inherits(OutputStream, Writable);

OutputStream.prototype.write = function(data) {
  Writable.prototype.write.apply(this, arguments);
  var $li = this.$('<li>').text(data);
  this.$display.append($li);
  return true;
};
