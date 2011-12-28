var log = console.log.bind(console);
var socket = io.connect();

$(function() {
  var server = new ServerStream(io);
  var input = new InputStream($);
  var output = new OutputStream($);

  server.resume();
  input.resume();

  input.pipe(server);
  server.pipe(output);
});