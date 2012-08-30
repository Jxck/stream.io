// Server
log = console.log.bind(console);
var connect = require('connect');

var ClientStream = require('./lib/clientStream');

var app = connect()
  .use(connect.static(__dirname + '/public'))
  .listen(3000);

var clientStream = new ClientStream(app);

clientStream.pipe(clientStream);
clientStream.resume();
