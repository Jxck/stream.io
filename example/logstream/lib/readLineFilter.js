var util = require('util')
  , stream = require('stream')
  , filter = require('./filter')
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
  this.writable = false;
  this.line = '';
  this.buf = '';
  this.emit('end');
};

module.exports = ReadLineFilter;
