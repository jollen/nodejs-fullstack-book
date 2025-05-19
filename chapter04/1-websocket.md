## 4.1 第一個 WebSocket 伺服器

WebSocket 是 HTML5 裡的一個標準，它是一種 TCP/IP 的連線技術。在協定部份，則是基於 HTTP（Over HTTP）協定。因此，WebSocket 標準定義了一些 HTTP Headers 來進行 Client/Server 的通訊。

WebSocket 分為 Client 端與 Server 端二個部份，本章要介紹的是利用 Node.js 技術，來開發 WebSocket Server。目前有許多現成的 Node.js WebSocket 模組可使用，實作時，我們就不必自行處理複雜的 WebSocket 協定問題。

本章所使用的 WebSocket 模組，要使用 npm 工具另外安裝。利用 npm 安裝 WebSocket-Node：

```bash
$ npm install websocket
```

WebSocket-Node 原始碼可由 GitHub 上取得：

```
https://github.com/Worlize/WebSocket-Node
```

安裝後即可引入模組。WebSocket-Node 提供 4 個模組如下：

```javascript
1 const WebSocketServer = require('websocket').server;
2 const WebSocketClient = require('websocket').client;
3 const WebSocketFrame  = require('websocket').frame;
4 const WebSocketRouter = require('websocket').router;
```

NoChat 範例中，我們會使用 `server` 模組來建立 WebSocket Server。

### 建立 WebSocket Server

基於第 3 章的 server.js 範例，以下為最新版本：

```javascript
 1 const http = require("http");
 2 const url = require("url");
 3 const WebSocketServer = require("websocket").server;
 4 
 5 const clients = []; // Connected WebSocket clients
 6 
 7 const start = (route, handlers) => {
 8   const onRequest = (request, response) => {
 9     const pathname = url.parse(request.url).pathname;
10     const query = url.parse(request.url).query;
11     console.log("Request for " + pathname + " received.");
12     route(pathname, handlers, response, query, clients);
13     response.writeHead(200, {"Content-Type": "text/plain"});
14     response.write("Hello World");
15     response.end();
16   };
17 
18   const server = http.createServer(onRequest).listen(8080, () => {
19     console.log("Server has started and is listening on port 8080.");
20   });
21 
22   const wsServer = new WebSocketServer({
23     httpServer: server,
24     autoAcceptConnections: false
25   });
26 
27   const onWsConnMessage = (message) => {
28     if (message.type === "utf8") {
29       console.log("Received message: " + message.utf8Data);
30     } else if (message.type === "binary") {
31       console.log("Received binary data.");
32     }
33   };
34 
35   const onWsConnClose = (reasonCode, description) => {
36     console.log("Peer disconnected with reason: " + reasonCode);
37   };
38 
39   const onWsRequest = (request) => {
40     const connection = request.accept("echo-protocol", request.origin);
41     console.log("WebSocket connection accepted.");
42 
43     // Save client connection
44     clients.push(connection);
45 
46     connection.on("message", onWsConnMessage);
47     connection.on("close", onWsConnClose);
48   };
49 
50   wsServer.on("request", onWsRequest);
51 };
52 
53 exports.start = start;
```

### 模組說明整理：

* 第 1–3 行：引入 HTTP、URL 與 WebSocket 模組
* 第 5 行：宣告全域 `clients` 陣列，用以儲存所有連線中的 WebSocket 客戶端
* 第 8–16 行：HTTP Server 的 Request Handler，透過 `route()` 分派 URL 與參數
* 第 22–25 行：設定並啟動 WebSocket Server
* 第 27–33 行：WebSocket 訊息處理函式
* 第 35–37 行：連線關閉時的處理函式
* 第 39–48 行：WebSocket Request Handler，接受連線後儲存至 `clients` 陣列，並註冊訊息與關閉事件

這就是 NoChat 的第一個 WebSocket Server。下一節，我們將處理訊息的格式與傳遞方式，進一步介紹 JSON 的使用。
