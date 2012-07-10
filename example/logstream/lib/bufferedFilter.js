log = console.log.bind(console);
var util = require('util')
  , filter = require('../../../lib/filterStream')
  , stream = require('stream');

function BufferedFilter(interval) {
  filter.call(this);
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

util.inherits(BufferedFilter, filter);

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

  filter.prototype.pipe.apply(this, arguments);
};

module.exports = BufferedFilter;
