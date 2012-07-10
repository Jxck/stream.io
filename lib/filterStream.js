var Writable = require('./writableStream')
  , Readable = require('./readableStream')
  , util = require('util')
  ;

function FilterStream() {
  /**
   * Filter is Stream both of
   * readable and writable
   */
  Writable.call(this);
  Readable.call(this);
}

util.inherits(FilterStream, Readable);
util.inherits(FilterStream, Writable);

module.exports = FilterStream;
