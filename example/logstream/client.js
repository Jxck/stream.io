var socket = io.connect();
socket.on('msg push', function(data) {
  console.log(data);
  $('#log').append(data);
});
