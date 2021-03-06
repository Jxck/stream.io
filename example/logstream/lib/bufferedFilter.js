var util = require('util')
  , filter = require('../../../lib/filterStream')
  ;

/**
 * Buffering Data & emitting it per interval
 */
function BufferedFilter(interval) {
  filter.call(this);
  this.buf = [];
  this.interval = interval * 100 || 1000;

  this.fn = function() {
    if (this.buf.length !== 0) {
      var data = this.buf.shift();
      this.emit('data', data);
    }
  }.bind(this);

  setInterval(this.fn, this.interval);
}

util.inherits(BufferedFilter, filter);

BufferedFilter.prototype.write = function(data) {
  filter.prototype.write.apply(this, arguments);
  if (data) {
    this.buf.push(data);
  }
  return true;
};

module.exports = BufferedFilter;
