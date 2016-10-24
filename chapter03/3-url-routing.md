# 3.3 URL Routing

這是處理 URL（HTTP Request）與 Query String 的核心觀念，這是利用 Node.js 開發 Web Service 的重要步驟。讓我們先來了解 Routing 的寫法，再來探討它的觀念。

首先，先改寫 server.js 模組如下：

~~~~~~~~
 1 var http = require("http");
 2 var url = require("url");
 3 
 4 function start(route) {
 5   function onRequest(request, response) {
 6     var pathname = url.parse(request.url).pathname;
 7     console.log("Request for " + pathname + " received.");
 8     console.log("Request url: " + request.url);
 9 
10     route(pathname);
11 
12     response.writeHead(200, {"Content-Type": "text/plain"});
13     response.write("Hello World");
14     response.end();
15   }
16 
17   http.createServer(onRequest).listen(8888);
18   console.log("Server has started.");
19 }
20 
21 // Export functions
22 exports.start = start;
~~~~~~~~

Routing 觀念的主要用途是處理 URL，所以我們利用 url 模組來取出 URL 裡的 pathname，並將 pathname 交給 route() 函數來處理。這裡很特別的地方是，start() 函數裡所呼叫的 route()函數，是透過參數列傳遞進來的，這和模組的 Closure 特性有關係，觀念說明如下：

- route() 函數實作在 router 模組，而不是 server.js 模組
- 目的是將 Routing 的功能，拆成單獨的模組來維護
- route() 函數由 router.js 模組提供，必須引用 router 模組

在這裡範例裡，我們由 index.js 引入 router.js 模組，並且將裡頭的 router() 函數，透過參數列交給 start()函數。如此一來，start() 也可以呼叫到 route() 函數了。

這個部份，可以選擇另外一個實作方法：在 server.js 裡引用 router.js 模組。不過，就概念上來說，範例的實作方式好一些。原因如下。

- Decompostion：將 router.js 與 server.js 模組的相依性解除
- Component-based software engineering：將 router.js 與 server.js 做成獨立的模組，他們之間如果沒有相依性，就可以做為二個不同的模組來使用。例如，將 router.js 模組抽換成其它專案的 Routing 模組，並且 server.js 可以重用。Node.js 的軟體架構，主軸是模組化，即 Component-based 軟體工程的觀念

目前透過 npm 指令，不但可以安裝到各式不同的 Node.js 模組，甚致可以將自已的模組出版（Publish）給其他開發者使用。

Node.js 的事件處理機制，採用典型的 Callback Functions 做法。

接著，要開始處理 Pathname 與 Query String 的解析，請先參考圖 2.2。

改寫 index.js 主程式如下：

~~~~~~~~
1 var server = require("./server");
2 var router = require("./router");
3 
4 server.start(router.route);   // 傳遞route物件
~~~~~~~~

將 Routing 的演算法製作成獨立的模組，並將 router() 函數傳遞給 start()，函數的參數，可以傳遞一個函數，這個觀念就是 Lambda。router.js 完整程式碼如下：

~~~~~~~~
1 function route(pathname) {
2     console.log("Route this request: " + pathname);
3 }
4 
5 exports.route = route;
~~~~~~~~

請注意，這個範例雖然陽春，但是展示了一個非常重要的觀念：

- 函數就是物件，所以我們把 *route* 物件交給 start() 函數，讓 start() 函數去使用物件
- 直接在 start() 裡呼叫 route() 函數也可以，為什麼不這樣做？因為這不是 JavaScript 的觀念，倒是有點像是標準 C 語言呼叫函數的觀念，同時也會降低程式碼的可維護性

接下來，要讓 route() 解析 pathname。例如，我們定義了二個 API：

- http://localhost:8080/start，用來連接伺服器並接收即時訊息
- http://localhost:8080/send，送出文字訊息

分別要處理二個 pathname 如下：

- /start，呼叫專屬的 Handler 'start()' 來處理
- /send，呼叫專屬的 Handler 'send()' 來處理

實作的關鍵來了，我們要利用 Request Handler 的觀念來實作，首先，修改 index.js 如下：

~~~~~~~~
 1 var server = require("./server");
 2 var router = require("./router");
 3 var handlers = require("./requestHandlers");
 4 
 5 // 使用 Object 來對應 pathname 與 request handlers
 6 var req = {
 7    "/": handlers.start,
 8    "/start": handlers.start,
 9    "/send": handlers.send
10 };
11 
12 // 傳遞 request handler 
13 server.start(router.route, req);
~~~~~~~~

上述的二個 Handler 函數：start() 與 send() 將另行實作於 requestHandlers 模組。requestHandlers 模組匯出 start() 與 send() 函數，分別處理相對應的 pathname。

因此，主程式在第 6 行到第 10 行的地方，利用 *req* 物件來對應這個關係。在呼叫 start() 時，將 req 物件傳入。

另外，JavaScript 雖然不是物件導向式語言，但仍要以物件的觀念來撰寫。所以，我們將 *req* 以 var 語法定義成 object。很多時候，或許也能以 associative array 來實作，但並不是很建議。

以下就是一個以 associative array 的實作範例，原則上不推薦：

~~~~~~~~
 1 var server = require("./server");
 2 var router = require("./router");
 3 var handlers = require("./requestHandlers");
 4 
 5 // 使用 associative array 來對應 pathname 與 request handlers
 6 var req = {};
 7
 8 req["/"] = handlers.start;
 9 req["/start"] = handlers.start;
10 req["/send"] = handlers.upload;
11 
12 // 傳遞 request handler 
13 server.start(router.route, req);
~~~~~~~~

修改後的 router.js 如下：

~~~~~~~~
 1 function route(pathname, handlers, response) {
 2     console.log("Route this request: '" + pathname + "'");
 3 
 4     // 檢查 pathname 是否有對應的 request handlers
 5     if (typeof handlers[pathname] == "function") {
 6         handlers[pathname](response);
 7     } else {
 8         console.log("No request handler for this pathname: '" + pathname + "'");
 9     }
10 }
11 
12 exports.route = route;
~~~~~~~~

再次修改 server.js 如下：

~~~~~~~~
 1 var http = require("http");
 2 var url = require("url");
 3 
 4 function start(route, handlers) {
 5   function onRequest(request, response) {
 6     var pathname = url.parse(request.url).pathname;
 7     console.log("Request for " + pathname + " received.");
 8 
 9     route(pathname, handlers, response);
10 
11     response.writeHead(200, {"Content-Type": "text/plain"});
12     response.write("Hello World");
13     response.end();
14   }
15 
16   http.createServer(onRequest).listen(8080);
17   console.log("Server has started.");
18 }
19 
20 // Export functions
21 exports.start = start;
~~~~~~~~

最重要的模組：requestHandlers.js，完整程式碼如下：

~~~~~~~~
 1 function start(response) {
 2     console.log("Handler 'start' is started.");
 3 }
 4 
 5 function send(response) {
 6     console.log("Handler 'send' is started.");
 7 }
 8 
 9 exports.start = start;
10 exports.send = send;
~~~~~~~~

到這裡，已經完成了一份很基本的 Web Service 實作。接下來，我們要將這個成果發展成一個即時聊天軟體，就命名為 NoChat。NoChat 將會是一個完全使用 HTML5 技術開發的即時聊天軟體。

---

Next: [3.4 設計 HTTP API](4-http-api.md)
