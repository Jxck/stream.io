/**
 * server to client
 */

// on server
readable.pipe(server).pipe(client);
server(readable).pipe(client);

// on clinet
server.pipe(filter).pipe(function(dat) {
  $('#target').text(data);
});

server.pipe(filter).pipe('#target'); // default jQuery


/**
 * client to server
 */

// on client
client($('input')).pipe(server);

// on server
client.pipe(function(data) {
  console.log(data);
});

// broadcast to server
client.pipe(boroadcast).pipe(clients());


/**
 * server to server
 */

// on client
readable.pipe(server).pipe(dest);
dest.pipe(function(data) {
  console.log();
});
