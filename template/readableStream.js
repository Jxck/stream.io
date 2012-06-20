var Stream = require('stream')
  , util = require('util')
  ;

function ReadableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred,
   * the stream came to an 'end', or destroy() was called.
   *
   * デフォルト True で 'error', 'end', destroy() で false になる。
   */
  this.readable = true;
  this.encoding = 'utf8';
}

util.inherits(ReadableStream, Stream);


/**
 * Makes the data event emit a string instead of a Buffer.
 * encoding can be 'utf8', 'ascii', or 'base64'.
 *
 * Buffer ではなく string として emit する場合に使う encode 指定。
 * 'utf8', 'ascii', 'base64' のいずれか。
 */
ReadableStream.prototype.setEncoding = function(encoding) {
  this.encoding = encoding;
};

/**
 * Pauses the incoming 'data' events.
 *
 * 'data' イベントの発生を止める(pause)。
 */
ReadableStream.prototype.pause = function() {

};

/**
 * Resumes the incoming 'data' events after a pause()
 *
 * pause() の後に 'data' イベントを再会する。
 */
ReadableStream.prototype.resume = function() {

};

/**
 * Closes the underlying file descriptor.
 * Stream.Prototype will not emit any more events.
 *
 * file descriptor を close する。
 * これ以降 stream ではどんなイベントも発生しない。
 */
ReadableStream.prototype.destroy = function() {
  this.readable = false;
};

/**
 * After the write queue is drained, close the file descriptor.
 *
 * 書き出しのキューが空になってから destroy()
 */
ReadableStream.prototype.destroySoon = function() {

};

/**
 * This is a Stream.prototype method available on all Streams.
 *
 * Stream.prototype に実装されているから、継承するだけ。
 */
ReadableStream.prototype.pipe = function(writable /*, [options]*/) {
  Stream.prototype.pipe.apply(this, arguments);
};

module.exports = ReadableStream;

var readable = new ReadableStream();

/**
 * Event: 'data'
 * The 'data' event emits either a Buffer (by default) or a string if setEncoding() was used.
 *
 * イベント発生時は Buffer(デフォルト) か string が使われる。
 */
readable.on('data', function(data) {

});

/**
 * Event: 'end'
 * Emitted when the stream has received an EOF (FIN in TCP terminology).
 * Indicates that no more 'data' events will happen.
 * If the stream is also writable, it may be possible to continue writing.
 *
 * stream が EOF, FIN などで終わった時 emit される。
 * これ以上 'data' イベントは発生しない。
 * writable だった場合、書き込みは可能。
 */
readable.on('end', function() {
  readable.readable = false;
});

/**
 * Event: 'error'
 * Emitted if there was an error receiving data.
 *
 * エラーが発生した時。
 */
readable.on('error', function(exception) {
  readable.readable = false;
});

/**
 * Event: 'close'
 * Emitted when the underlying file descriptor has been closed.
 * Not all streams will emit this.
 * (For example, an incoming HTTP request will not emit 'close'.)
 *
 * file descriptor などが close された時。
 * 全ての stream で発生するとは限らない。(HTTP リクエストなど)
 */
readable.on('close', function() {

});
