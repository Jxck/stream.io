(function(global) {

if (typeof module === 'object' && typeof module.exports === 'object') {
  var Stream = require('stream')
    , util = require('util')
    ;
  module.exports = FilterStream;
} else {
  var Stream = global.stream
    , util = global.util
    ;
  if (!global['stream.io']) global['stream.io'] = {};
  global['stream.io'].Filter = FilterStream;
}

function FilterStream() {
  /**
   * Filter Stream is
   * Readable & Writable
   */

  // readable
  this.readable = true;
  this.encoding = 'utf8';

  // writable
  this.writable = true;

  // writable
  this.on('drain', function() {
  }.bind(this));

  // readable
  this.on('data', function(data) {

  }.bind(this));

  // writable
  this.on('pipe', function(reabable) {

  }.bind(this));

  // readable
  this.on('end', function() {
    this.readable = false;
  }.bind(this));

  // both
  this.on('error', function(exception) {
    this.readable = false;
    this.writable = false;
  }.bind(this));

  // both
  this.on('close', function() {

  }.bind(this));


}
util.inherits(FilterStream, Stream);

// readable
FilterStream.prototype.setEncoding = function(encoding) {
  this.encoding = encoding;
};

// writable
FilterStream.prototype.write = function(data, encoding/*, [fd] */) {
  if (!encoding) encoding = 'utf8'; // default

};

// readable
FilterStream.prototype.pause = function() {

};

// readable
FilterStream.prototype.resume = function() {

};

// both
FilterStream.prototype.destroy = function() {
  this.readable = false;
  this.writable = false;
};

// both
FilterStream.prototype.destroySoon = function() {

};

// writable
FilterStream.prototype.end = function() {
  this.writable = false;
};

// readable
// FilterStream.prototype.pipe = function(writable /*, [options]*/) {
//   Stream.prototype.pipe.apply(this, arguments);
// };


if (typeof process === 'object' && process.env.NODE_ENV === 'test') {
  log = console.log.bind(console);
  var assert = require('assert')
    , child_process = require('child_process')
    ;

  (function() {
    var exec = require('child_process').exec
      , child = exec('echo test')
      ;


    FilterStream.prototype.write = function(data) {
      assert(true);
    };

    var fs = new FilterStream();
    child.stdout.pipe(fs);
  })();
}

}(this));
