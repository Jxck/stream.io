// Server
log = console.log.bind(console);
var io = require('socket.io')
  , connect = require('connect')
  , fs = require('fs')
  , util = require('util')
  , stream = require('stream');

var app = connect()
  .use(connect.static(__dirname + '/public'))
  .listen(3000);

var ReadLineFilter = require('./lib/readLineFilter')
  , ClientStream = require('./lib/clientStream')
  ;

var readable = fs.createReadStream('sample.log', {encoding: 'utf-8'})
  , readline = new ReadLineFilter()
  , client = new ClientStream(app)
  ;

readable.resume();

readable.pipe(readline).pipe(client);
