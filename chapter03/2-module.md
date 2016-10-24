## 3.2 製作 Node.js 模組

學習 Node.js 的第一件事情，就是了解如何將程式碼模組化，簡單來說，就是製作一個程式庫 Node.js 的模組隱含著 Closure 的特性，這與第一章介紹的觀念相同（但做法不同）。

JavaScript 比較講求模組化，所以我們繼續重構 hello.js。先將 Web Server 的部份獨立成一個模組，程式碼規劃如下：

- index.js：主程式
- server.js：啟動Web server的模組

index.js的完整程式碼如下：

~~~~~~~~
var server = require("./server");

server.start();
~~~~~~~~

主程式的部份，以 require() 函數將 server 模組（即 server.js 檔案）引入，接著呼叫模組裡的 start() 函數。server.js 完整程式碼如下：

~~~~~~~~
 1 var http = require("http");
 2 
 3 function start() {
 4   function onRequest(request, response) {
 5     console.log("Request for " + pathname + " received.");
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
16 // Export functions
17 exports.start = start;
~~~~~~~~

程式碼第 3 行到第 16 行的地方，我們實作了一個函數，並且將它匯出。請特別留意，沒有匯出的函數，將不是 Public，它不能被外部的人呼叫。exports 是 Node.js 的一個 Global object，用來讓我們匯出模組裡的函數，成為 Public Function。

目前為止，我們發現了一些觀念：

- Frontend 與 Backend 都使用 JavaScript 做為主要的程式語言
- Frontend 與 Backend 都要模組化，並引入 Closure 觀念
- Frontend 與 Backend 的 Module / Closure，相念相通，實作方式不同

### Chaining Pattern

另外，server.js 裡也做了一些改寫。程式碼第 4 行的地方，以具名函數的方式重新實作，目的是讓程式碼更具可維護性。此外，程式碼第 14 行的地方：

~~~~~~~~
http.createServer(onRequest).listen(8080);
~~~~~~~~

物件接著下一個物件來連續呼叫多個方法的寫法，就叫 Chaining Pattern（鏈接模式）。這個設計模式的目的，同樣是為了提升程式碼的可維護性：不但能簡化程式碼，更能讓程式碼能構成一個句子。

在接下來的範例裡，我們將善用具名函數以及 Chaining Pattern 來提昇程式碼的可維護性。

---

Next: [3.3 URL Routing](3-url-routing.md)
