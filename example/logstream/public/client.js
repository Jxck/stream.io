var log = console.log.bind(console);

$(function() {
  var server = new ServerStream(io);
  var output = new OutputStream($);
  server.resume();
  server.pipe(output);
});
