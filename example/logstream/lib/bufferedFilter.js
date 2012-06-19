var util = require('util')
  , stream = require('stream');

function BufferedFilter(interval) {
  this.writable = true;
  this.readable = true;
  this.piped = false;
  this.dest = null;
  this.buf = [];
  this.interval = interval * 100 || 1000;

  this.fn = function() {
    if(this.buf.length !== 0) {
      var data = this.buf.shift();
      this.emit('data', data);
    }
  }.bind(this);

  setInterval(this.fn, this.interval);
}

util.inherits(BufferedFilter, stream.Stream);

/**
 * Writable Stream Interface
 */
BufferedFilter.prototype.write = function(data) {
  if (data) {
    this.buf.push(data);
  }
  return true;
};

BufferedFilter.prototype.pipe = function(dest) {
  this.piped = true;
  this.dest = dest;

  // stream.Stream.prototype.pipe.apply(this, arguments);
  this.on('data', function(data) {
    this.dest.write(data);
  });
};

BufferedFilter.prototype.end = function() {};

BufferedFilter.prototype.resume = function() {};

BufferedFilter.prototype.pause = function() {};

BufferedFilter.prototype.setEncoding = function(encoding) {};

BufferedFilter.prototype.destroy = function() {};

BufferedFilter.prototype.destroySoon = function() {};

module.exports = BufferedFilter;
