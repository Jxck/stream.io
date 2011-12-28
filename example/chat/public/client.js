var log = console.log.bind(console);
var socket = io.connect();

// function InputStream() {
//   this.readable = true;
//   this.piped = false;
// };

// util.inherits(InputStream, stream.Stream);

// InputStream.prototype.pipe = function() {

// };

// InputStream.prototype.write = function(data) {
//   socket.emit('msg send', data);
// };

// var server = stream.io.server();

// // TODO
// inputStrem.pipe(server);

//var inputStream = new InputStream();

$(function() {
  $('#ok').click(function() {
    var msg = $('#msg').val();
    log(msg);
    socket.emit('msg send', msg);
  });
});

socket.on('msg push', function(data) {
  $li = $('<li>').text(data);
  $('#display').append($li);
});
