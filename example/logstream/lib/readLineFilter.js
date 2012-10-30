var log = function(){};//console.log.bind(console);
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
log('rls.write(): ', data);
  if (data) {
    this.line += data;
    while (this.line.match(/\r?\n/)) {
      this.emit('data', RegExp.leftContext + '\n');
      this.line = RegExp.rightContext;
log('remain:', this.line);
    }
  }
  return true;
};

ReadLineFilter.prototype.end = function() {
log('rls.end(): ');
  filter.prototype.end.apply(this, arguments);
  this.line = '';
  this.buf = '';
};

module.exports = ReadLineFilter;

if(process.env.NODE_ENV === 'test') {
  var assert = require('assert');
  var fixture = 'I dont \n want \nto work!!';

  var readline = new ReadLineFilter();
  var count = 0;
  readline.on('data', function(data) {
    if(count === 0) {
      assert.equal(data, 'I dont \n');
    } else if(count === 1) {
      assert.equal(data, ' want \n');
    } else if(count === 2) {
      assert.equal(data, ' to work!!');
    } else {
      assert.fail(data);
    }
    count++;
  });
  readline.write(fixture);
  console.log('all ok');
}
