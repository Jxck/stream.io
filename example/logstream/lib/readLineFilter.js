log = console.log.bind(console);
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
  this.writable = false;
  this.line = '';
  this.buf = '';
  this.emit('end');
};

ReadLineFilter.prototype.resume = function() {};

ReadLineFilter.prototype.pause = function() {};

ReadLineFilter.prototype.setEncoding = function(encoding) {};

ReadLineFilter.prototype.destroy = function() {};

ReadLineFilter.prototype.destroySoon = function() {};

module.exports = ReadLineFilter;
