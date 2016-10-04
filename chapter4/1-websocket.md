## 4.1 第一個 WebSocket 伺服器

WebSocket 是 HTML5 裡的一個標準，它是一種 TCP/IP 的連線技術。在協定部份，則是基於 HTTP（Over HTTP）協定。因此，WebSocket 標準定義了一些 HTTP Headers 來進行 Client/Server 的通訊。

WebSocket 分為 Client 端與 Server 端二個部份，本章要介紹的是利用 Node.js 技術，來開發 WebSocket Server。
目前有許多現成的 Node.js WebSocket 模組可使用，實作時，我們就不必自行處理複雜的 WebSocket 協定問題。

本章所使用的 WebSocket 模組，要使用 npm 工具另外安裝。利用 npm 安裝 WebSocket-Node：

  $ npm install websocket

WebSocket-Node 原始碼可由 Github 上取得：

https://github.com/Worlize/WebSocket-Node

安裝，依據需要，可引入不同的模組。WebSocket-Node 提供 4 個模組如下：

- var WebSocketServer = require('websocket').server;
- var WebSocketClient = require('websocket').client;
- var WebSocketFrame  = require('websocket').frame;
- var WebSocketRouter = require('websocket').router;

NoChat 範例，將會使用 'server' 模組。

### 建立 WebSocket Server

基於第 3 章最新的範例，繼續修改 server.js 的程式碼如下：

{title="06-websocket-with-protocol/server.js"}
~~~~~~~~
 1 var http = require("http");
 2 var url = require("url");
 3 var WebSocketServer = require('websocket').server;
 4 
 5 function start(route, handlers) {
 6   function onRequest(request, response) {
 7     var pathname = url.parse(request.url).pathname;
 8     var query = url.parse(request.url).query;
 9 
10     console.log("Request for " + pathname + " received.");
11 
12     route(pathname, handlers, response, query);
13 
14     response.writeHead(200, {"Content-Type": "text/plain"});
15     response.write("Hello World");
16     response.end();
17   }
18 
19   var server = http.createServer(onRequest).listen(8080, function() {
20      console.log("Server has started and is listening on port 8080.");
21   });
22 
23   wsServer = new WebSocketServer({
24     httpServer: server,
25     autoAcceptConnections: false
26   });
27 
28   function onWsConnMessage(message) {
29     if (message.type == 'utf8') {
30       console.log('Received message: ' + message.utf8Data);
31     } else if (message.type == 'binary') {
32       console.log('Received binary data.');
33     }
34   }
35 
36   function onWsConnClose(reasonCode, description) {
37     console.log(' Peer disconnected with reason: ' + reasonCode);
38   }
39 
40   function onWsRequest(request) {
41     var connection = request.accept('echo-protocol', request.origin);
42     console.log("WebSocket connection accepted.");
43 
44     connection.on('message', onWsConnMessage);
45     connection.on('close', onWsConnClose);
46   }
47 
48   wsServer.on('request', onWsRequest);
49 }
50 
51 // Export functions
52 exports.start = start;
~~~~~~~~

先將 WebSocket-Node 的 'server' 匯入，如程式碼第3行。其它的修改細節條列如下：

- 第 19~26 行：將原本的 HTTP Server 物件，聚合至（傳遞）WebSocket Server。WebSocker Server 的物件名稱為 wsServer
- 第 48 行：在 wsServer 物件裡註冊一個 Request Handler，即 onWsRequest() 函數
- 第 40 行：當 WebSocket 的連線請求發生時，便回呼此函數
- 第 41 行：接受該 WebSocket 連線，第一個參數是 WebSocket Protocol，這是一個自定的協定名稱，用途由開發者定義
- 第 44~45 行：為此連線註冊 Message Handler 與 Close Handler 函數
- 第 28 行：收到用戶端傳送過來的訊息時，回呼此函數，後續將繼續擴充此函數，將收到的訊息儲存，並將訊息即時（Real-time）推送（Push）到所有的用戶端
- 第 36 行：該 WebSocket 連線關閉後，回呼此函數

## 儲存用戶端 WebSocket 連線

要儲存所有的用戶端 WebSocket 連線，最簡便的方式是使用 Global Array：

~~~~~~~~
// Connected WebSocket clients
var clients = [];
~~~~~~~~

當用戶端與 Node.js 建立連線時，將會回呼上述提及的 onWsRequest() 函數。所以，儲存連線的程式碼，應該添加至這個地方。繼續加入程式碼如下：

~~~~~~~~
function onWsRequest(request) {
  var connection = request.accept('echo-protocol', request.origin);
  console.log("WebSocket connection accepted.");

  // Save clients (unlimited clients)
  clients.push(connection);

  connection.on('message', onWsConnMessage);
  connection.on('close', onWsConnClose);
}
~~~~~~~~

以下目前為止的最新程式碼。

{title="07-websocket-data-push/server.js"}
~~~~~~~~
 1 var http = require("http");
 2 var url = require("url");
 3 var WebSocketServer = require('websocket').server;
 4 
 5 // Connected WebSocket clients
 6 var clients = [];
 7 
 8 function start(route, handlers) {
 9   function onRequest(request, response) {
10     var pathname = url.parse(request.url).pathname;
11     var query = url.parse(request.url).query;
12 
13     console.log("Request for " + pathname + " received.");
14 
15     route(pathname, handlers, response, query, clients);
16 
17     response.writeHead(200, {"Content-Type": "text/plain"});
18     response.write("Hello World");
19     response.end();
20   }
21 
22   var server = http.createServer(onRequest).listen(8080, function() {
23      console.log("Server has started and is listening on port 8080.");
24   });
25 
26   wsServer = new WebSocketServer({
27     httpServer: server,
28     autoAcceptConnections: false
29   });
30 
31   function onWsConnMessage(message) {
32     if (message.type == 'utf8') {
33       console.log('Received message: ' + message.utf8Data);
34     } else if (message.type == 'binary') {
35       console.log('Received binary data.');
36     }
37   }
38 
39   function onWsConnClose(reasonCode, description) {
40     console.log('Peer disconnected with reason: ' + reasonCode);
41   }
42 
43   function onWsRequest(request) {
44     var connection = request.accept('echo-protocol', request.origin);
45     console.log("WebSocket connection accepted.");
46 
47     // Save clients (unlimited clients)
48     clients.push(connection);
49 
50     connection.on('message', onWsConnMessage);
51     connection.on('close', onWsConnClose);
52   }
53 
54   wsServer.on('request', onWsRequest);
55 }
56 
57 // Export functions
58 exports.start = start;
~~~~~~~~