var server = require("./server");
var router = require("./router");
var handlers = require("./requestHandlers");

// 使用 Object 來對應 pathname 與 request handlers
var handlers = {
   "/": handlers.start,
   "/start": handlers.start,
   "/send": handlers.send
};

// 傳遞 request handler 
server.start(router.route, handlers);
