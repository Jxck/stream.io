function InputStream($) {
  this.$ok = $('#ok');
  this.$msg = $('#msg');
  this.readable = true;
};

util.inherits(InputStream, stream.Stream);

InputStream.prototype.resume = function() {
  this.$ok.click(function() {
    var msg = this.$msg.val();
    this.emit('data', msg);
  }.bind(this));
};

InputStream.prototype.pipe = function() {
  this.piped = true;
  stream.Stream.prototype.pipe.apply(this, arguments);
};
