var stream = require('stream')
  , util = require('util')
    , log = console.log.bind(console)
    , debug = function(data) {
        log('\033[35m' + data + '\033[0m');
      }
    ;

/**
 * this stream is a writable buffer stream
 *
 *
 *
 *
 */
function MyStream() {
  this.writable = true;
  this.buffer = [];
  this.on('pipe', function(dest) {
    this.dest = dest;
  }.bind(this));
}

util.inherits(MyStream, stream.Stream);

MyStream.prototype.write = function(data, encoding) {
  debug('write');
  if (!encoding) encoding = 'utf8'; // default

  // buffer became full
  if (this.buffer.length > 2) {

    // set the flushing timer
    setTimeout(function() {
      // flush buffer
      console.log(this.buffer.join(','));
      this.buffer = [];
      debug(this.dest.readable);
      debug('drain');
      this.emit('drain');
    }.bind(this), 1000);

    debug('buffer is full');
    return false;
  }

  // buffering data
  var data = data.toString().trim();
  this.buffer.push(data);
  log('write: ', this.buffer);

  return true;
};

MyStream.prototype.end = function(data) {
  debug('end');
  if (data) this.write(data);
  this.writable = false;
  log('\nresult:', this.buffer.join(''));
};

MyStream.prototype.destroy = function() {
  debug('destroy');
  this.writable = false;
};

MyStream.prototype.destroySoon = function() {
  debug('destroySoon');
  this.writable = false;
  console.log(this.buffer.join(','));
  this.buffer = [];
  this.destroy();
};

module.exports = MyStream;

if (require.main === module) {
  var TimerStream = require('./timerReadableStream');
  var mystream = new MyStream()
    , timer = new TimerStream()
    ;

  // 標準入力をパイプする
  timer.pipe(mystream);
  // 読み込み開始
  timer.resume();
}
