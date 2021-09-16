var http = require('http');
var server = http.createServer(app);
var socketIo = require('socket.io').listen(server);

socketIo.on('connection', function(socket) {});
// The server should start listening
server.listen(8080);