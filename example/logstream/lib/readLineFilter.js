var util = require('util')
  , filter = require('../../../lib/filterStream')
  ;

function ReadLineFilter() {
  filter.call(this);
  this.buf = [];
  this.line = '';
}

util.inherits(ReadLineFilter, filter);

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
  this.line = '';
  this.buf = '';
  filter.prototype.end.call(this, arguments);
};

module.exports = ReadLineFilter;
