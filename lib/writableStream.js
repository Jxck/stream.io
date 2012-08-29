(function(global) {
if (typeof module === 'object' && typeof module.exports === 'object') {
  var Stream = require('stream')
    , util = require('util')
    ;
  module.exports = WritableStream;
} else {
  var Stream = global.stream
    , util = global.util
    ;
  if (!global['stream.io']) global['stream.io'] = {};
  global['stream.io'].Writable = WritableStream;
}

function WritableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred
   * or end() / destroy() was called.
   *
   * デフォルト true. 'error', end(), destroy() で false になる。
   */
  this.writable = true;

  /**
   * Event: 'drain'
   * After a write() method returned false,
   * this event is emitted to indicate that it is safe to write again.
   *
   * wrtite() が false を返した後に発生。
   * 再度書き込みが可能なことを知らせる。
   */
  this.on('drain', function() {

  }.bind(this));

  /**
   * Event: 'error'
   * Emitted on error with the exception exception.
   *
   * エラー発生時に、コールバックに exception を渡す。
   */
  this.on('error', function(exception) {
    this.writable = false;
  }.bind(this));

  /**
   * Event: 'close'
   * Emitted when the underlying file descriptor has been closed.
   *
   * file descriptor が close した時に発生
   */
  this.on('close', function() {

  }.bind(this));

  /**
   * Event: 'pipe'
   * Emitted when the stream is passed to a readable stream's pipe method.
   *
   * 自身が readable stream の pipe() に渡された時に発生。
   */
  this.on('pipe', function(reabable) {

  }.bind(this));
}

util.inherits(WritableStream, Stream);


/**
 * Writes string with the given encoding to the stream.
 * Returns true if the string has been flushed to the kernel buffer.
 * Returns false to indicate that the kernel buffer is full,
 * and the data will be sent out in the future.
 * The 'drain' event will indicate when the kernel buffer is empty again.
 * The encoding defaults to 'utf8'.
 *
 * 与えられた encoding で文字列を stream に書き出す。
 * カーネルバッファに書きだされたら true を、
 * バッファが一杯で書き出せなかった場合 false を返す。
 * 書き出せなかった場合は、いずれ書き出される。
 * 'drain' イベントはバッファが再度空になったら発生する。
 * encoding のデフォルトは 'utf8'
 *
 * If the optional fd parameter is specified,
 * it is interpreted as an integral file descriptor to be sent over the stream.
 * This is only supported for UNIX streams, and is silently ignored otherwise.
 * When writing a file descriptor in this manner,
 * closing the descriptor before the stream drains risks sending an invalid (closed) FD.
 *
 * オプションで fd が指定された場合、
 * 書き込み対象の stream として利用される。
 * これは UNIX でのみサポートされ、他では無視されます。
 * この方法で file descriptor に書き込んだ場合
 * stream が drain する前に fd を閉じると、無効な fd に書き込むおそれがある。
 *
 */
// WritableStream.prototype.write(buffer) {
WritableStream.prototype.write = function(data, encoding /*, [fd]*/) {
  if (!encoding) encoding = 'utf8'; // default

  // buffer is full
  // return false;

  // buffer was flushed
   return true;
};

/**
 * Terminates the stream with EOF or FIN.
 * This call will allow queued write data to be sent before closing the stream.
 * function() or function(string, encoding) or function(buffer);
 * end with string or buffer is useful to reduce the number of packets sent.
 *
 * Stream を EOF, FIN で終わらせる。
 * Stream が閉じる前に、キューに残ったデータを送ることができる。
 * 引数は、なし, String, buffer を選択でき、 string か buffer なら
 * パケット数を減らせる。
 */
WritableStream.prototype.end = function() {
  this.writable = false;
};

/**
 * Closes the underlying file descriptor.
 * Stream will not emit any more events. Any queued write data will not be sent.
 *
 * file descriptor を閉じる。
 * Stream はこれ以上イベントを発生しない。
 * queue のデータもこれ以上送られない。
 */
WritableStream.prototype.destroy = function() {
  this.writable = false;
};

/**
 * After the write queue is drained, close the file descriptor.
 * destroySoon() can still destroy straight away,
 * as long as there is no data left in the queue for writes.
 *
 * write のキューが空になったら、file descriptor を閉じる。
 * キューが空ならすぐ終わる。
 */
WritableStream.prototype.destroySoon = function() {

};

if (process.env.NODE_ENV === 'test') {
  log = console.log.bind(console);
  var assert = require('assert')
    , child_process = require('child_process')
    ;

  (function() {
    var ws = new WritableStream();
    assert(ws);
    assert(ws.writable);
    assert(ws.write);
    assert(ws.end);
    assert(ws.destroy);
    assert(ws.destroySoon);
  })();

  (function() {
    var piped = false;
    var ws = new WritableStream();

    ws.on('pipe', function(readable) {
      piped = true;
    });
    process.stdin.pipe(ws);

    assert(piped);
  })();

}

}(this));
