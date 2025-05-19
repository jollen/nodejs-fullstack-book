## 3.1 Hello, World

HTML5 的學習可以從兩個層面進行：

* Frontend：也就是 Client（Device）端的開發
* Backend：也就是 Server（Cloud）端的開發

本章從 Backend 開始整理重要的入門技術。傳統上學習 HTML5 通常從 Frontend 開始，從基本的 HTML5 標籤與 CSS 語法切入。然而，從 Backend 的視角反觀 Frontend，反而能對許多常見的技術獲得新的理解與詮釋。

筆者不建議初學者從標籤與樣式語法出發。現在的開發技術環境，早已與過去開發 Web 網頁的方式不同；因此，那些曾經通用的學習方法，對今日的 HTML5 軟體開發並不完全適用。

## 觀看 Node.js 線上課程

本章將介紹 Node.js 技術，它是 HTML5 生態中非常重要的一環。Node.js 並不是用在 Client-side，它的設計重點在於 Server-side 的應用。

接下來，我們將聚焦於 Node.js 的精神與技術哲學。本節以「軟體思考」為主軸，不深究技術細節。關於函數用法，建議參考 Node.js 官方網站：

[http://nodejs.org/api/](http://nodejs.org/api/)

也可參考由 MokoVersity 提供的免費線上課程，快速建立基本觀念與開發環境：

[http://www.mokoversity.com/course/html5/nodejs-overview](http://www.mokoversity.com/course/html5/nodejs-overview)

### 取得上課範例

本章所介紹的 Node.js 程式碼皆可在以下 GitHub 專案中取得：

[https://github.com/jollen/html5-websocket-nodejs](https://github.com/jollen/html5-websocket-nodejs)

接下來我們將透過一個連貫性的範例——即時通訊軟體，來說明 Node.js 技術的應用邏輯。

### 第一個 Node.js 程式

我們提過，Node.js 就是一個 Web Server 的實作工具。所以，讓我們從最經典的 Hello World 開始：

```javascript
var http = require('http');

var httpServer = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello World</h1>\n');
});

httpServer.listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
```

這段程式碼的第 3 行呼叫了 http 模組的 createServer() 函數，用以建立 Web Server 物件。這是學習 Node.js 技術的第一步。

createServer() 函數語法如下：

```javascript
http.createServer([requestListener])
```

當 createServer() 成功執行，會傳回 Web Server 物件。requestListener 是用來處理 request 事件的函數（也稱為 Request Handler Function）。當 request 發生時，這個函數會被 callback，並傳入兩個參數：

* req：一個 http.ServerRequest 的實體
* res：一個 http.ServerResponse 的實體

將上述程式儲存為 `hello.js`，並使用下列指令執行：

```bash
$ node hello.js
```

安裝 Node.js 後就可以使用 `node` 指令，這是最基本的執行方式。之後我們也會介紹 `forever` 工具，以更進階方式啟動 Node.js 程式。

Node.js 採用 Google 所開發的 V8 JavaScript 引擎。原本 V8 是為瀏覽器而生，如今它被抽離出來作為獨立的直譯器，讓 JavaScript 升格為 Server-side Script。

使用瀏覽器連至 [http://127.0.0.1:8080/，即可看到如圖](http://127.0.0.1:8080/，即可看到如圖) 3.1 所示的執行結果。

圖 3.1：hello.js 執行結果

### V8 JavaScript 引擎介紹

JavaScript 引擎逐漸成為手持裝置裡的重要技術。早期 Android 使用 Apple 開發的 JavaScriptCore（JSC）引擎，此引擎為 WebKit 的一部分。之後 Google 決定自行開發 JavaScript 引擎，即為 V8。

JSC 與 V8 在設計理念上有所不同。一般認為 V8 效能優於 JSC，引擎更新速度也更快。Android 2.3 開始導入 V8 引擎，若想使用新版 V8，建議使用 Android 2.3 以上版本。

### 為什麼要使用 Node.js？

此時大家可能會問：為什麼不用現成的 Web Server（如 Apache）來開發 Web Service？Node.js 有什麼不可取代之處？

答案要從 Thread Model 說起。傳統 Web Server 採 Multi-thread 架構來處理多工，邏輯如下：

* 每個 Thread 可處理約 10 個事件
* 若需同時處理 1000 個事件，勢必產生 100 個 Thread
* 大量 Thread 意味著高記憶體占用與 Context-Switch 的效能瓶頸

在這種架構下：

* Server 負擔會隨連線數劇增
* Thread 管理成本高，系統效能受限

Node.js 的做法不同，它採用 Event Loop 架構來處理並行請求。這意味著：

* 所有事件都由單一流程管理，無需額外開 Thread
* 非同步（Non-blocking）為預設行為，適合處理大量連線
* JavaScript 本身支援 Lambda、匿名函數與 Closure，使事件處理更加靈活

此外，Node.js 幾乎所有 I/O 操作皆為非阻塞機制，這使它在處理高併發連線時特別高效。

相較於像 PHP 這類同步阻塞式語言環境，Node.js 為建構 Real-time Web 應用提供了更適合的語意模型。

---

Next: [3.2 製作 Node.js 模組](2-module.md)
