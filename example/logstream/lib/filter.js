var util = require('util')
  , stream = require('stream')
  ;

function DefaultFilter() {
  this.writable = true;
  this.readable = true;
  this.piped = false;
  this.dest = null;
}

util.inherits(DefaultFilter, stream);

module.exports = DefaultFilter;

DefaultFilter.prototype.resume = function() {};

DefaultFilter.prototype.pause = function() {};

DefaultFilter.prototype.setEncoding = function(encoding) {};

DefaultFilter.prototype.destroy = function() {};

DefaultFilter.prototype.destroySoon = function() {};

