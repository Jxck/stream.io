


function ReadableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred,
   * the stream came to an 'end', or destroy() was called.
   */
  this.readable = true;
  this.encoding = 'utf8';
}

util.inherits(ReadableStream, stream.Stream);


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
  stream.Stream.prototype.pipe.apply(this, arguments);
};

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
function WritableStream() {
  /**
   * A boolean that is true by default, but turns false after an 'error' occurred
   * or end() / destroy() was called.
   */
  this.writable = true;
}

util.inherits(WritableStream, stream.Stream);


/**
 * Writes string with the given encoding to the stream.
 * Returns true if the string has been flushed to the kernel buffer.
 * Returns false to indicate that the kernel buffer is full,
 * and the data will be sent out in the future.
 * The 'drain' event will indicate when the kernel buffer is empty again.
 * The encoding defaults to 'utf8'.
 *
 * If the optional fd parameter is specified,
 * it is interpreted as an integral file descriptor to be sent over the stream.
 * This is only supported for UNIX streams, and is silently ignored otherwise.
 * When writing a file descriptor in this manner,
 * closing the descriptor before the stream drains risks sending an invalid (closed) FD.
 */
// WritableStream.prototype.write(buffer) {
WritableStream.prototype.write = function(data, encoding /*, [fd]*/) {
  if (!encoding) encoding = utf8; // default

  // buffer was flushed
  // return true;

  // buffer is full
  // return false;
};

/**
 * Terminates the stream with EOF or FIN.
 * This call will allow queued write data to be sent before closing the stream.
 * function() or function(string, encoding) or function(buffer);
 * end with string or buffer is useful to reduce the number of packets sent.
 */
WritableStream.prototype.end = function() {
  this.writable = false;
};

/**
 * Closes the underlying file descriptor.
 * Stream will not emit any more events. Any queued write data will not be sent.
 */
WritableStream.prototype.destroy = function() {
  this.writable = false;
};

/**
 * After the write queue is drained, close the file descriptor.
 * destroySoon() can still destroy straight away,
 * as long as there is no data left in the queue for writes.
 */
WritableStream.prototype.destroySoon = function() {

};

var writable = new WritableStream();


/**
 * Event: 'drain'
 * After a write() method returned false,
 * this event is emitted to indicate that it is safe to write again.
 */
writable.on('drain', function() {

});

/**
 * Event: 'error'
 * Emitted on error with the exception exception.
 */
writable.on('error', function(exception) {
  writable.writable = false;
});

/**
 * Event: 'close'
 * Emitted when the underlying file descriptor has been closed.
 */
writable.on('close', function() {

});

/**
 * Event: 'pipe'
 * Emitted when the stream is passed to a readable stream's pipe method.
 */
writable.on('pipe', function(reabable) {

});
