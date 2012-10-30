var stream = require('./stream')
  , util = require('util')
  , log = function(){}
  , debug = function(){}
  ;

if(process.env.NODE_DEBUG) {
  log = console.log.bind(console);
  debug = function(data) {
    log('\033[31m' + data + '\033[0m');
  }
  debug(__filename);
}

/**
 * this stream is a readable timer stream
 * emits a the number of sec.
 *
 * stream has a buffer inside.
 * this buffer is queue which length is 3.
 * number of sec enqueues to buffer
 * and dequeued will emit.
 *
 * example)
 * time  queue      emits
 * 0s    [1, 2, 3]
 * 1s    [2, 3, 4]  1
 * 2s    [3, 4, 5]  2
 * 3s    [4, 5, 6]  3
 * ...
 */
function TimerStream() {
  this.readable = false; // toggle when resumed
  this.encoding = 'utf8';

  this.buffer = [1, 2, 3];
  this.t = 3;
  this.timer = null;
  this.interval = 1000;
}

util.inherits(TimerStream, stream.Stream);

TimerStream.prototype._timer = function() {
  return function() {
    this.t++;
    this.buffer.push(this.t);
    if (this.t > 8) {
      this.destroySoon();
    }
    this.emit('data', this.buffer.shift().toString());
  }.bind(this);
};

TimerStream.prototype.resume = function() {
  this.readable = true;
  if (this.timer) return;
  this.timer = setInterval(this._timer(), this.interval);
};

TimerStream.prototype.pause = function() {
  this.readable = false;
  clearInterval(this.timer);
  this.timer = null;
};

TimerStream.prototype.setEncoding = function(encoding) {
  if (encoding) this.encoding = encoding;
};

TimerStream.prototype.destroy = function() {
  this.readable = false;
  clearInterval(this.timer);
  this.t = 0;
  this.timer = null;
  this.emit('close');
  process.exit(0);
};

TimerStream.prototype.destroySoon = function() {
  clearInterval(this.timer);
  this.timer = setInterval(function() {
    if (this.buffer.length === 0) {
      clearInterval(this.timer);
      return this.destroy();
    }
    this.emit('data', this.buffer.shift().toString());
  }.bind(this), this.interval);
};

module.exports = TimerStream;

if (require.main === module) {
  var timerStream = new TimerStream();
  timerStream.pipe(process.stdout);
  timerStream.resume();

  setTimeout(function() {
    timerStream.pause();
  }, 2000);

  setTimeout(function() {
    timerStream.resume();
  }, 3000);
}
