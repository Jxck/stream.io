var log = console.log.bind(console);
var socket = io.connect();

$(function() {
  var server = new ServerStream(io);
  var input = new InputStream($);
  var display = new DisplayStream($);

  server.resume();
  input.resume();

  input.pipe(server);
  server.pipe(display);
});