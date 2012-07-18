var Readable = this['stream.io'].Readable;
function InputStream($) {
  Readable.call(this);
  this.$ok = $('#ok');
  this.$msg = $('#msg');
};

util.inherits(InputStream, Readable);

InputStream.prototype.resume = function() {
  Readable.prototype.resume.apply(this, arguments);
  this.$ok.click(function() {
    var msg = this.$msg.val();
    this.emit('data', msg);
  }.bind(this));
};
