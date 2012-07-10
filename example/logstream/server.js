// Server
log = console.log.bind(console);
var connect = require('connect')
  , fs = require('fs')
  ;

var app = connect()
  .use(connect.static(__dirname + '/public'))
  .listen(3000);

var ReadLineFilter = require('./lib/readLineFilter')
  , ClientStream = require('./lib/clientStream')
  , BufferedFilter = require('./lib/bufferedFilter')
  ;

var readable = fs.createReadStream('sample.log', {encoding: 'utf-8'})
  , readline = new ReadLineFilter()
  , client = new ClientStream(app)
  , buffer = new BufferedFilter(1)
  ;


readable
  .pipe(readline)
  .pipe(buffer)
  .pipe(client);

readable.resume();
