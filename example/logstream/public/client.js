var log = console.log.bind(console);
log(events, stream);




$(function() {
  var server = new ServerStream(io);
  var display = new DisplayStream($);
  server.resume();
  server.pipe(display);
});
