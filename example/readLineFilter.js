var util = require('util')
  , stream = require('stream')
  ;

function ReadLineFilter() {
  this.writable = true;
  this.readable = true;
  this.piped = false;
  this.dest = null;
  this.buf = [];
  this.line = '';
}

util.inherits(ReadLineFilter, stream.Stream);

/**
 * Writable Stream Interface
 */
ReadLineFilter.prototype.write = function(data) {
  if (data) {
    this.line += data;
    while (this.line.match(/\r?\n/)) {
      this.emit('data', RegExp.leftContext + '\n');
      this.line = RegExp.rightContext;
    }
  }
  return true;
};

ReadLineFilter.prototype.end = function() {
  this.writable = false;
  this.line = '';
  this.buf = '';
  this.emit('end');
};

ReadLineFilter.prototype.pipe = function(dest) {
  this.piped = true;
  this.dest = dest;

  // stream.Stream.prototype.pipe.apply(this, arguments);
  this.on('data', function(data) {
    this.dest.write(data);
  });
};

ReadLineFilter.prototype.resume = function() {};

ReadLineFilter.prototype.pause = function() {};

ReadLineFilter.prototype.setEncoding = function(encoding) {};

ReadLineFilter.prototype.destroy = function() {};

ReadLineFilter.prototype.destroySoon = function() {};

module.exports = ReadLineFilter;
