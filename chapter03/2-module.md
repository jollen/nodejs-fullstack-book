## 3.2 製作 Node.js 模組

學習 Node.js 的第一步，就是理解如何將程式碼模組化。簡單來說，就是建立自己的程式庫。Node.js 的模組機制隱含著 Closure 的概念，這與第一章所提到的觀念一致（雖然實作手法不同）。

JavaScript 本身強調模組化的設計哲學，因此我們將重構前一節的 `hello.js` 程式碼，將 Web Server 的邏輯獨立為一個模組。規劃如下：

* `index.js`：主程式入口點
* `server.js`：負責啟動 Web Server 的模組

以下是 `index.js` 的完整程式碼：

```javascript
1 var server = require("./server");
2 
3 server.start();
```

主程式透過 `require()` 將 `server.js` 模組引入，並呼叫模組內部的 `start()` 函數。以下是 `server.js` 的內容：

```javascript
 1 var http = require("http");
 2 
 3 function start() {
 4   function onRequest(request, response) {
 5     console.log("Request for " + request.url + " received.");
 6 
 7     response.writeHead(200, {"Content-Type": "text/plain"});
 8     response.write("Hello World");
 9     response.end();
10   }
11 
12   http.createServer(onRequest).listen(8080);
13   console.log("Server has started.");
14 }
15 
16 // 匯出函數
17 exports.start = start;
```

在第 3 行至第 16 行中，我們實作了 `start()` 函數，並在最後使用 `exports` 將其匯出。這裡需要注意：若沒有匯出，該函數即為模組私有（private），無法被外部程式呼叫。`exports` 是 Node.js 中的全域物件，用來將模組內部的函數公開為 Public API。

這裡我們可以觀察出幾個重要概念：

* Frontend 與 Backend 現在都使用 JavaScript 作為主語言
* 兩者都必須具備模組化思維，並引入 Closure 的語言特性
* 雖然 Frontend 與 Backend 的模組實作方式不同，但邏輯上是相通的

### Chaining Pattern

在 `server.js` 裡，我們也導入了具名函數與 Chaining Pattern。

第 14 行：

```javascript
1 http.createServer(onRequest).listen(8080);
```

這種以物件接續方法呼叫的寫法，稱為 Chaining Pattern（鏈式模式）。這個設計模式的好處在於：

* 增強程式可維護性
* 精簡語法，邏輯更清楚
* 程式碼結構更接近語句（語意風格）

這種風格將在後續範例中繼續出現，搭配具名函數使用，更有助於建構語意清晰的 Node.js 架構。

---

Next: [3.3 URL Routing](3-url-routing.md)
