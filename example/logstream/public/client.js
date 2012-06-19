var log = console.log.bind(console);

$(function() {
  var server = new ServerStream(io);
  var output = new OutputStream($);
  server.resume();
  //server.pipe(output);
  //server.on('data', function(data) {
  //  $('#log').prepend(data);
  //});
  server.pipe('#log');
});
