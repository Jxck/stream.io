var socket = io.connect();
socket.on('msg push', function(data) {
  console.log(data);
  socket.emit('msg send', data);
});
