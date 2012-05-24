var Stream = require('stream')
  , util = require('util')
  ;

function ReadableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred,
   * the stream came to an 'end', or destroy() was called.
   */
  this.readable = true;
  this.encoding = 'utf8';
}

util.inherits(ReadableStream, Stream);


/**
 * Makes the data event emit a string instead of a Buffer.
 * encoding can be 'utf8', 'ascii', or 'base64'.
 */
ReadableStream.prototype.setEncoding = function(encoding) {
  this.encoding = encoding;
};

/**
 * Pauses the incoming 'data' events.
 */
ReadableStream.prototype.pause = function() {

};

/**
 * Resumes the incoming 'data' events after a pause()
 */
ReadableStream.prototype.resume = function() {

};

/**
 * Closes the underlying file descriptor.
 * Stream.Prototype will not emit any more events.
 */
ReadableStream.prototype.destroy = function() {
  this.readable = false;
};

/**
 * After the write queue is drained, close the file descriptor.
 */
ReadableStream.prototype.destroySoon = function() {

};

/**
 * This is a Stream.prototype method available on all Streams.
 */
ReadableStream.prototype.pipe = function(writable /*, [options]*/) {
  Stream.prototype.pipe.apply(this, arguments);
};

module.exports = ReadableStream;

var readable = new ReadableStream();

/**
 * Event: 'data'
 * The 'data' event emits either a Buffer (by default) or a string if setEncoding() was used.
 */
readable.on('data', function(data) {

});

/**
 * Event: 'end'
 * Emitted when the stream has received an EOF (FIN in TCP terminology).
 * Indicates that no more 'data' events will happen.
 * If the stream is also writable, it may be possible to continue writing.
 */
readable.on('end', function() {
  readable.readable = false;
});

/**
 * Event: 'error'
 * Emitted if there was an error receiving data.
 */
readable.on('error', function(exception) {
  readable.readable = false;
});

/**
 * Event: 'close'
 * Emitted when the underlying file descriptor has been closed.
 * Not all streams will emit this.
 * (For example, an incoming HTTP request will not emit 'close'.)
 */
readable.on('clone', function() {

});
