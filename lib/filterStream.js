(function(global) {

if (typeof module === 'object' && typeof module.exports === 'object') {
  var Writable = require('./writableStream')
    , Readable = require('./readableStream')
    , util = require('util')
    ;

  module.exports = FilterStream;
} else {
  var Writable = global['stream.io'].Writable
    , Readable = global['stream.io'].Readable
    , util = global.util
    ;
  if (!global['stream.io']) global['stream.io'] = {};
  global['stream.io'].Filter = FilterStream;
}

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

}(this));
