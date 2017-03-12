var http = require("http");
var url = require("url");

function start(route, handlers) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;

    console.log("Request for " + pathname + " received.");

    route(pathname, handlers, response, query);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

// Export functions
exports.start = start;
