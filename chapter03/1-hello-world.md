## 3.1 Hello, World

HTML5 的學習，可分為二個層面：

- Frontend：即 Client（Device）端的開發
- Backend：即 Server（Cloud）的開發

這一章將從 Backend 開始整理重要的入門技術。通常 HTML5 的學習是由 Frontend 開始，而且是從最根本的 HTML5 標籤或 CSS 語法開始介紹。不過，從 Backend 的角度去看 Frontend，可以讓我們重新認識許多常見的 Frontend 技術。

筆者並不建議初學者，從 HTML5 標籤與 CSS 語法的角度來學習。現在的時空背景，與過去開發 Web 所使用的軟體技術已經有很大的差異了；因此，過去學習 Web 的觀念與方式，不太能適用於現在的 HTML5 軟體開發。

## 觀看 Nodejs 線上課程

這個章節將介紹 Node.js 技術，這是一個在 HTML5 領域裡非常重要的技術。 Node.js 並不是使用於 Client-side，如同先前所做的介紹，它使用於 Server-side。

接下來將會大家介紹的是 Node.js 的精神與技術哲學。本章節的寫作原則是著重「軟體思考」，關於技術上的細節不多加著墨。有關 Node.js  函數的說明，可參考 Node.js 官方網站。在繼續進行範例說明前，請先備妥這份文件：

http://nodejs.org/api/

另外，也請參考 Node.js 官方網站的說明，來安裝 Node.js 環境。關於環境安裝，以及 Node.js 的入門觀念，可參考由 MokoVersity 所提供的免費線上課程：

http://www.mokoversity.com/course/html5/nodejs-overview

### 取得上課範例

本章所撰寫的 Node.js 程式碼，皆可在 Github 上取得：

https://github.com/jollen/html5-websocket-nodejs

接下來，讓我們用一個連貫性的實例：即時通訊軟體，來為大家介紹 Node.js 技術。

### 第一個 Node.js 程式

我們提過了， Node.js 就是 Web Server。所以，不免俗地先了解 "Hello, World" 的寫法：

~~~~~~~~
 1 var http = require('http');
 2 
 3 var httpServer = http.createServer(function (req, res) {
 4   res.writeHead(200, {'Content-Type': 'text/html'});
 5   res.end('<h1>Hello World</h1>\n');
 6 });
 7 
 8 httpServer.listen(8080);
 9 
10 console.log('Server running at http://127.0.0.1:8080/');
~~~~~~~~

程式碼第 3 行的地方，呼叫 http 模組的 createServer() 函數來建立一個 Web Server 物件。建立 Web Server 物件，並且啟動一個 Web Server，是  Node.js  技術的第一個步驟。

createServer()函數的說明如下：

~~~~~~~~
http.createServer([requestListener])
~~~~~~~~

createServer() 執行成功後傳回 Web Server 物件，參數 requestListener 是一個 Request Handler Function，用來處理 request 事件。關於 Node.js 的事件處理技術，後續再做說明。當 request 事件發生時，Request Handler Function 將被 Callback，並帶有二個參數：

- req：http.ServerRequest的實例化(instance)
- res：http.ServerResponse的實例化

將上述的範例，儲存為 hello.js，並且利用 node 指令執行：

$ node hello.js 

安裝 Node.js 後，就可以取得 node 命令。

這是執行 Node.js 程式碼的陽春版做法，後續將導入 forever 工具，以進階的方式來執行 Node.js 程式。

 Node.js 採用 Google 所開發的 V8 JavaScript 引擎，原本 V8 引擎是設計給瀏覽器使用的 JavaScript 引擎，現在有開發者把它抽離出來，變成一個獨立的直譯器，讓 JavaScript 程式碼升格為 Server-Side Script。

我們利用瀏覽器連到 http://127.0.0.1:1234/，結果如圖 3.1。

![圖 3.1：hello.js 執行結果](../images/figure-3_1.png)
圖 3.1：hello.js 執行結果

### V8 JavaScript引擎介紹

JavaScript 引擎將成為手持裝置的重要技術。早期的 Android 系統，使用的 JavaScript 引擎稱為 JavaScriptCore (JSC)，這是由 Apple 所開發的 JavaScript 引擎，並且包含在 Webkit 中。因為一些原因，Google 也決定開發自已的 JavaScript 引擎，稱之為 V8。

技術上，JSC 與 V8 的設計理念不同，一般相信，新一代的 V8 引擎效能比 JSC 引擎更好。Android 2.3 加入了 V8 引擎，若想使用最近的 V8 引擎，就要使用 Android 2.3 以上的版本。

### 為什麼要使用 Node.js？

到這裡，大家可能會有一個疑問。為什麼不使用現有的 Web Server 來開發 Web Service 就好，例如使用 Apache。非要使用 Node.js 技術不可嗎？這個問題的答案，要從 Thread Model 說起。

典型的 Web Server 以 Multi-thread 架構來實作「Concurrency」，也就是以建立 Thread 的方式，來處理處理事件（Events）。但是過多的 Thread 會造成伺服器的負擔：

- 假設一個 Thread 可以處理 10 個事件
- 同時處理 1000 個事件，就必須建立 100 個 Thread
- 大量的 Thread 在分時作業系統裡，會造成 Context-Switch Overhead，讓每一個 Thread 處理事件的時間拉長，形成效能低落的現象

由此可知:

- 若是將 Multi-thread 架構，應用在「處理巨量的同時連線請求」上，伺服器的負擔就會很大
- Multi-thread 架構的軟體，可能在系統產生過多的 Thread，過多的 Thread 除造成伺服器的負載增加外，也需要大量的記憶體

是否有替代方案呢？將上述的 Multi-thread 架構，改為 Event Loop 架構即可。Node.js 的訴求之一就是：採用 Event Loop 架構。此外，Node.js 採用 JavaScript 程式語言，JavaScript 本身也有一些很好的語言特性：

- 具備 Lambda 運算子，大量使用暱名函數（anonymous function）與 Closure（封閉性）觀念
- 使用 Callback Object 做為函數的參數（Lambda），易於處理 Non-blocking Operation 與 Event Handling

Node.js 本身的 I/O 操作，也大多是（幾乎）Non-blocking 的機制。這點與 PHP 有很大的不同。這樣的機制，對於消化巨量的連線請求，有非常大的幫助。

---

Next: [3.2 製作 Node.js 模組](2-module.md)
