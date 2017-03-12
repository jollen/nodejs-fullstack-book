var http = require('http');

var httpServer = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  var obj = {
  	name: 'jollen',
  	email: 'jollen@jollen.org'
  };
  res.end(JSON.stringify(obj));
});

httpServer.listen(1234);

console.log('Server running at http://127.0.0.1:1234/');
