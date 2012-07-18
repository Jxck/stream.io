$(function() {
  var server = new ServerReadableStream(io);
  var output = new OutputWritableStream($);
  server.resume();
  server.pipe(output);
  //server.on('data', function(data) {
  //  $('#log').prepend(data);
  //});
  //server.pipe('#log');
});
