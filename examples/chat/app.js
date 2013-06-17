var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(path.join(__dirname, 'public')));
});

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

var socketio = require('socket.io').listen(server);
socketio.on('connection', function(client) {
  client.on('send', function(event) {
    client.emit('push', event.message);
    client.broadcast.emit('push', event.message);
  });
});
