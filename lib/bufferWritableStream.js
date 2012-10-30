var stream = require('stream')
  , util = require('util')
  , log = console.log.bind(console)
  , debug = function(){}
  ;

if(process.env.NODE_DEBUG) {
  debug = function(a, b) {
    if(!b) b = '';
    log('\033[35m' + a + '\033[0m',
        '\033[35m' + b + '\033[0m');
  }
  debug(__filename);
}

/**
 * this stream is a writable buffer stream.
 * buffring wrote data to array
 * and return that when end() colls.
 */
function BufferWritableStream(option) {
  this.writable = true;
  this.buffer = [];
  this.on('pipe', function(dest) {
    this.dest = dest;
  }.bind(this));
}

util.inherits(BufferWritableStream, stream.Stream);

BufferWritableStream.prototype.write = function(data, encoding) {
  debug('write');
  if (!encoding) encoding = 'utf8'; // default

  // buffer became full
  if (this.buffer.length > 2) {

    // set the flushing timer
    setTimeout(function() {
      // flush buffer
      debug('flush', this.buffer);
      this.emit('data', this.buffer);
      this.buffer = [];
      debug(this.dest.readable);
      debug('drain');
      this.emit('drain');
    }.bind(this), 1000);

    debug('buffer is full');
    return false;
  }

  // buffering data
  this.buffer.push(data);
  debug('wrote: ', this.buffer);

  return true;
};

BufferWritableStream.prototype.end = function(data) {
  debug('end');
  if (data) this.write(data);
  this.writable = false;
  //log('\nresult:', this.buffer.join(''));
  this.emit('end', this.buffer);
  return this.buffer;
};

BufferWritableStream.prototype.destroy = function() {
  debug('destroy');
  this.writable = false;
};

BufferWritableStream.prototype.destroySoon = function() {
  debug('destroySoon');
  this.writable = false;
  this.buffer = [];
  this.destroy();
};

module.exports = BufferWritableStream;

if (require.main === module) {
  var TimerStream = require('./timerReadableStream');
  var buff = new BufferWritableStream()
    , timer = new TimerStream()
    ;

  // 標準入力をパイプする
  timer.pipe(buff);
  // 読み込み開始
  timer.resume();
}
