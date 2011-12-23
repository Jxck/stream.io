// Server
var log = console.log.bind(console);
var connect = require('connect')
  , fs = require('fs')
  , util = require('util')
  , stream = require('stream')
  ;

var server = connect.createServer(
    connect.logger()
  , connect.static(__dirname)
).listen(3000);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  log('connected');
  socket.emit('msg push', 'data');
  socket.on('msg send', function(msg) {
    log(msg);
  });
});

function ReadLineFilter() {
  this.writable = true;
  this.readable = true;
  this.piped = false;
  this.dest = null;
  this.buf = [];
  this.line = '';
}

util.inherits(ReadLineFilter, stream.Stream);

ReadLineFilter.prototype.write = function(data) {
  if (data) {
    this.line += data;
    while (this.line.match(/\r?\n/)) {
      this.emit('data', RegExp.leftContext + '\n');
      this.line = RegExp.rightContext;
    }
  }
  return true;
};

ReadLineFilter.prototype.end = function(data) {
  if (data) this.write(data);
  this.writable = false;
  if (this.line) {
    log(this.line);
  }
};

ReadLineFilter.prototype.pipe = function(dest) {
  this.piped = true;
  this.dest = dest;

  // stream.Stream.prototype.pipe.apply(this, arguments);
  this.on('data', function(data) {
    this.dest.write(data);
  });
};

ReadLineFilter.prototype.resume = function() {
  this.dest.resume();
};

ReadLineFilter.prototype.pause = function() {
  this.dest.pause();
};

ReadLineFilter.prototype.setEncoding = function(encoding) {
  this.dest.setEncoding(encoding);
};

ReadLineFilter.prototype.destroy = function() {
  this.dest.destroy();
};

ReadLineFilter.prototype.destroySoon = function() {
  this.dest.destroySoon();
};


function ConsoleStream() {}
util.inherits(ConsoleStream, stream.Stream);
ConsoleStream.prototype.write = function(data) {
  log(data);
};


var readable = fs.createReadStream('sample.log', {encoding: 'utf-8'})
  , readline = new ReadLineFilter()
  ;

readable.pipe(readline).pipe(process.stdout);
