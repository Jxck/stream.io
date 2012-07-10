# Stream.IO

strema.io is stream base web application framework

main motivation is make "Server" and "Client" to "Stream"


## idea sheet

![Sream.IO](https://github.com/Jxck/stream.io/raw/master/image/stream.io.jpg-large)


## ClientStream

make client to stream

``` javascript
//  server side
var client = stream.io.client();
var stream = fs.createStream(/* ... */);

stream.pipe(client);
```

``` javascript
// client side
var server = stream.io.server();
var output = $('impliment by jQuery etc..');

server.pipe(output);
```


## ServerStream

make server to stream

``` javascript
//  server side
var client = stream.io.client();
client.pipe(client);
```

``` javascript
var server = stream.io.server();
var output = $('impliment by jQuery etc..');
var input = $('impliment by jQuery etc..');

input.pipe(server);
server.pipe(output);
```


## dependencies

* [Socket.IO](http://github.com/learnboost/socket.io) for communication
* [Socket.IO-client](http://github.com/learnboost/socket.io-client) for communication
* [EventEmitter](https://github.com/Wolfy87/EventEmitter) for client side


## TODO

* impliment client side Stream
* make some example
