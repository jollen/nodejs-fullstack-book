## 3.3 URL Routing

URL Routing 是處理 HTTP Request 中 URL 與 Query String 的核心觀念，也是開發 Web Service 時不可或缺的一步。首先，我們來看看 Routing 的基本寫法，並進一步解釋其背後的語意架構。

### 改寫 `server.js`

```javascript
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
21 exports.start = start;
```

這段程式碼利用 `url` 模組取出 `pathname`，並將它交由 `route()` 函數處理。特別之處在於，`route()` 並非內部定義，而是作為參數傳入，這與 JavaScript 的 Closure 特性息息相關：

* `route()` 函數實作於 `router.js` 模組
* 它是獨立於 `server.js` 的模組，促進解耦與維護

透過 `index.js` 將 `route()` 函數以參數形式傳入 `start()` 函數，可維持 `server.js` 的模組獨立性，也便於未來替換 Routing 演算法。這是典型的 **Component-based Software Engineering** 思維。

這裡其實還有另一種實作方式：直接在 `server.js` 中引用 `router.js` 模組。但就語意與結構設計來看，範例目前所採用的作法更佳，理由如下：

* **Decomposition**：解除 `router.js` 與 `server.js` 間的耦合關係，讓模組各自獨立。
* **Component-based Software Engineering**：將 `router.js` 與 `server.js` 視為兩個獨立模組，彼此無相依性，就能被當作不同專案中的重用元件使用。舉例來說，我們可以將 `router.js` 替換成其他 Routing 策略的實作，而不需修改 `server.js`。

這正是 Node.js 軟體架構的精神：模組化。每一個模組不只是一段程式，而是一個語意角色，可以被替換、重組、推廣與發佈。

### 改寫 `index.js`

```javascript
 1 var server = require("./server");
 2 var router = require("./router");
 3 
 4 server.start(router.route);
```

將 Routing 函數作為物件傳遞，這就是 JavaScript 的語言特性：**函數即物件**（Function as First-Class Object）。

請注意，這個範例雖然陽春，卻揭示了一個非常關鍵的語意觀念：

* **函數即物件**：我們將 `route` 函數物件作為參數傳入 `start()`，這是 JavaScript 語言的基本能力；在其他語言中，這可能需要更複雜的手法模擬。
* **語意鬆耦合**：若我們直接在 `start()` 裡面呼叫 `route()`，這就不是 JavaScript 式的思維了——那像是 C 語言的函數呼叫，會強化彼此的耦合，削弱可維護性與可重構性。
* **設計開放式架構**：將函數物件作為參數傳遞，才能在不同專案中自由替換 router 或 handlers，實現語意彈性的架構設計。

接下來，要讓 `route()` 開始真正處理 pathname 對應的邏輯。舉例來說，假設我們定義兩個 HTTP API：

* `http://localhost:8080/start`：接收即時訊息
* `http://localhost:8080/send`：送出使用者輸入的訊息

這兩個路徑的對應關係如下：

* `/start`：對應到 handler 中的 `start()` 函數
* `/send`：對應到 handler 中的 `send()` 函數

這就是我們開始建構 Routing × Handler 架構的起點。

### 建立 `router.js`

```javascript
 1 function route(pathname) {
 2     console.log("Route this request: " + pathname);
 3 }
 4 
 5 exports.route = route;
```

雖然這只是基本範例，但已體現語言抽象能力：把行為作為參數進行傳遞與組裝，而非硬編寫死結。

### 延伸 API Routing

當我們要將 `/start` 與 `/send` 分別對應至不同的函數處理器，可在 `index.js` 中這樣撰寫：

```javascript
 1 var server = require("./server");
 2 var router = require("./router");
 3 var handlers = require("./requestHandlers");
 4 
 5 var req = {
 6    "/": handlers.start,
 7    "/start": handlers.start,
 8    "/send": handlers.send
 9 };
10 
11 server.start(router.route, req);
```

這裡 `req` 是一個 JavaScript Object，用於對應 URL 路徑與對應的函數。傳遞給 `start()` 後，會在 `router()` 裡透過物件鍵值存取相應的處理邏輯。

若使用 associative array 的方式，也可實作如下（不推薦）：

```javascript
 1 var server = require("./server");
 2 var router = require("./router");
 3 var handlers = require("./requestHandlers");
 4 
 5 var req = {};
 6 req["/"] = handlers.start;
 7 req["/start"] = handlers.start;
 8 req["/send"] = handlers.upload;
 9 
10 server.start(router.route, req);
```

建議使用 `Object Literal` 的方式，語意清晰，結構更接近語言模型。

### 改寫 `router.js`：支援 Request Handler

```javascript
 1 function route(pathname, handlers, response) {
 2     console.log("Route this request: '" + pathname + "'");
 3 
 4     if (typeof handlers[pathname] == "function") {
 5         handlers[pathname](response);
 6     } else {
 7         console.log("No request handler for this pathname: '" + pathname + "'");
 8     }
 9 }
10 
11 exports.route = route;
```

### 改寫 `server.js`：支援 Routing 與 Response 傳遞

```javascript
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
20 exports.start = start;
```

### 建立 `requestHandlers.js`

```javascript
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
```

---

至此，我們完成了一個基本 Web Service 架構，具備：Routing × 模組 × 函數導向設計。這是即將開發的聊天應用 NoChat 的語意骨架——全用 HTML5 技術打造的即時通訊系統。

Next: [3.4 設計 HTTP API](4-http-api.md)
