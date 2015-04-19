# Node.js 入門 - WebSocket 與 JSON 篇

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

## 建立 WebSocket Server

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

## 學習 JSON 格式

第 1 章介紹了 JSON 的主要精神，現在要來學習 JSON 表示方法。

在 NoChat 範例裡，Server 要把收到的訊息，Push 給所有的 Client 端。Server 與 Client 所使用的標準資料交換格式，就是 JSON。如何把訊息打包成 JSON 格式？方式非常簡單。以表 4-1 為例，要將這個資料表，撰寫為 JSON 格式，只需要二個步驟：

### Step 1：以 JavaScript 物件表示一筆資料

例如，第一筆個人資料，以 JavaScript 物件來表示的話，只要用 *var* 來宣告此物件即可：

~~~~~~~~
var obj = {
  "name": "Jollen",
  "score":  80
};
~~~~~~~~

大括號是 JavaScript 表示物件的語法。上述範例，我們宣告了 *obj* 物件。

### Step 2：轉換成標準 JSON 語法

去掉等號，以及等號左邊的物件宣告，結果如下：

~~~~~~~~
{
  "name": "Jollen",
  "score":  80
}
~~~~~~~~

請注意，結尾的分號也要一併去除。上述的表示方法，就是標準的 JSON 語法。這個例子用 JSON 來表示一筆個人資料。JSON 表示方法非常地簡單，只要會 JavaScript 保證 1 分鐘即可上手，不需要特意學習。

### Step 3：用陣列表示多個物件

{title="表 4-1 資料表"}
|"name" 欄位    |"score" 欄位   |說明      
|--------------|---------------|--------------
|"Jollen"      |80             |第 1 筆使用者資料
|"Paul"        |170            |第 2 筆使用者資料
|"Peter"       |250            |第 3 筆使用者資料
|"Ellaine"     |580            |第 4 筆使用者資料

表 4-1 共有 4 筆個人資料，因此需要撰寫 4 個物件，每個物件之間用逗號隔開。試想，過去撰寫程式的經驗裡，我們用哪一個資料結構（Data Structure）來表示多筆型別（Data Type）相同的資料呢？答案是：陣列（Array）。

JavaScript 的陣列用中括號來宣告，例如：

~~~~~~~~
var string = ['Jollen', 'Paul', 'Peter'];
~~~~~~~~

這個例子宣告 *string* 陣列，裡頭有 3 個字串。用 JavaScript 怎麼表示 4 個物件的陣列呢？答案如下：

~~~~~~~~
var persons = [
  {
    "name": "Jollen",
    "score": 80
  },
  {
    "name": "Paul",
    "score": 170
  },
  {
    "name": "Peter",
    "score": 250
  },
  {
    "name": "Ellaine",
    "score": 580
  }
];
~~~~~~~~

我們只要把上述的 4 個物件，用陣列「群組」起來即可。和 Step 2 相同，保留以下的寫法即可：

~~~~~~~~
[
  {
    "name": "Jollen",
    "score": 80
  },
  {
    "name": "Paul",
    "score": 170
  },
  {
    "name": "Peter",
    "score": 250
  },
  {
    "name": "Ellaine",
    "score": 580
  }
]
~~~~~~~~

這就是表 4-1 的 JSON 表示方式了。將上述的 JSON 儲存為純文字，這個純文字檔就叫做 JSON Document，這就是 JSON Document 資料庫的概念。

同理，NoChat Server 收到訊息後，只要把訊息表示成 JSON 後，傳送給 Client 端即可。JSON 相當簡單易學，更是優秀的輕量級資料交換格式。

## JSON Stringify

請注意，上述的 JSON 是一個型別（Type），是一個 Array Type。我們不能儲存或傳送「Type」，所以要將 Type 轉成字串（String）後，才能儲存或傳送。例如，對電腦來說，這是一個物件（Object）：

~~~~~~~~
{ "name": "James" }
~~~~~~~~

我們把這個物件轉成字串：

~~~~~~~~
"{ \"name\": \"James\" }""
~~~~~~~~

對電腦來說，這才是字串。所以，將 JSON 物件（Object）轉成字串後，才能儲存或傳送。這個動作就叫 JSON Stringify（字串化）。當然，字串化過的 JSON 字串，要使用時，也要解析（Parse）回物件。

在 Node.js 裡如何做 JSON Stringify 呢？只要呼叫 JSON.stringify() 函數即可。例如：

~~~~~~~~
var obj = { "name": "James" };    // 一個物件
var str = JSON.stringify(obj);    // 字串化
~~~~~~~~

下面是簡約的寫法：

~~~~~~~~
var str = JSON.stringify({ "name": "James" });    // 字串化
~~~~~~~~

沿續第 3 章的 NoChat 實作，將 requestHandler.js 加入 JSON Stringify 的處理。完整程式碼如下：

{title="07-websocket-data-push/requestHandler.js"}
~~~~~~~~
 1 var querystring = require('querystring'); 
 2 
 3 /**
 4  * Global variables
 5  */
 6 var history = [ ];
 7 
 8 function start(response, query, clients) {
 9     console.log("Handler 'start' is started.");
10     console.log("Query string is: " + query);
11 }
12 
13 function send(response, query, clients) {
14     console.log("Handler 'send' is started.");
15     console.log("Query string is: " + query);
16 
17     var parsedstring = querystring.parse(query); 
18 
19     var obj = {
20         message: parsedstring.m,
21         username: parsedstring.u,
22         timestamp: (new Date()).getTime()
23     };
24 
25     history.push(obj);
26 
27     //////// DEBUG ////////
28     for (var i = 0; i < history.length; i++) {
29         console.log("["+i+"]: " + history[i].message);
30     }
31 
32     var json = JSON.stringify({ type: 'message', data: obj });
33 
34     // Data push to all clients
35     for (var i = 0; i < clients.length; i++) {
36         clients[i].sendUTF(json);
37     }
38 }
39 
40 exports.start = start;
41 exports.send = send;
~~~~~~~~

第 19 行到第 23 行，將訊息封裝到物件裡，同時也加入使用者名稱，以及時間戳記（Timestamp）。第 32 行將物件字串化，這就是一個標準的 JSON 資枓了。接著，第 35 行到第 37 行，將這筆 JSON 資料，傳送給所有的 WebSocket Client 端。

## 製作 WebSocket 用戶端

現在是製作一個 Frontend 的時機了，透過一個簡單的 Frontend 來測試目前的實作成果。我們要 Frontend 的文件，命名為 client.html。實作 client.html 前，要瀏覽器必須支援 HTML5 的 WebSocket 標準。目前新版的瀏覽器都支援 WebSocket 標準。本書皆使用 Chrome 18+ 瀏覽器進行測試。

### 實作 client.html

現在，我們可以不考慮 HTML5 的相容性問題，假設使用者的瀏覽器都支援 WebSocket 。不過，實作時，可以考慮加入一段程式碼，來檢查並提示使用者，目前的瀏覽器是否支援 WebSocket。

完整程式碼如下：

{title="client/01-ws-open.html"}
~~~~~~~~
 1 <!DOCTYPE html>
 2 <head>
 3 </head>
 4 <body>
 5 <div id="header"></div>
 6 <button onClick="WebSocketTest();">Get News</button>
 7 
 8 <script type="text/javascript">  
 9 function WebSocketTest()
10 {
11   if ("WebSocket" in window)
12   {
13      // Let us open a web socket
14      var ws = new WebSocket("ws://svn.moko365.com:8080/", "echo-protocol");
15      ws.onopen = function(evt)
16      {
17         alert("open");
18      };
19      ws.onclose = function(evt)
20      {
21         alert("close");
22      };
23   }
24   else
25   {
26      // The browser doesn't support WebSocket
27      alert("WebSocket NOT supported by your Browser!");
28   }
29 }
30 </script>
31 </body>
32 </html>
~~~~~~~~

說明如下：

- 第 11 行：檢查瀏覽器是否支援 WebSocket
- 第 14 行：與伺服器建立 WebSocket 連線，第一個參數是伺服器位址，第二個參數是前面提及過的自定協定

當 WebSocket 建立成功後，瀏覽器會回呼 onopen 函數，即程式碼第 15 行。當 WebSocket 連線關閉後，則回呼 onclose 函數。伺服器將訊息推送給瀏覽器時，瀏覽器會回呼 onmessage 函數。這個部份將在後續做說明。使用瀏覽器將 01-ws-open.html 文件打開後，可以看到一個按紐，如圖 4.1。按下按紐時，呼叫 WebSocketTest() 函數。

![圖 4.1：範例 01-ws-open.html](images/figure-4_1.png)

### 使用 jQuery 模式

第 1 章介紹的 jQuery 模式，在這裡派上用場了。

上述的例子雖然很直覺，不過還有一些缺點。第一件事情就是以 jQuery 模式來重構。將用戶端改寫如下：

{title="client/02-ws-jquery-plugin-pattern.html"}
~~~~~~~~
 1 <!DOCTYPE html>
 2 <head>
 3 <script type='text/javascript' src="./jquery.min.js"></script>
 4 </head>
 5 <body>
 6 <div id="message"></div>
 7 
 8 <script type="text/javascript">  
 9 $.fn.createWebSocket = function () {
10   if ("WebSocket" in window)
11   {
12      alert("WebSocket is supported by your Browser!");
13      // Let us open a web socket
14      var ws = new WebSocket("ws://localhost:8080/start");
15      ws.onopen = function()
16      {
17         // Web Socket is connected, send data using send()
18         ws.send("Message to send");
19      };
20      ws.onmessage = function (evt) 
21      { 
22         var received_msg = evt.data;
23         this.html(received_msg);
24      };
25      ws.onclose = function()
26      { 
27         // websocket is closed.
28      };
29   }
30   else
31   {
32      // The browser doesn't support WebSocket
33      alert("WebSocket NOT supported by your Browser!");
34   }
35 };
36 
37 $("#message").createWebSocket();
38 </script>
39 </body>
40 </html>
~~~~~~~~

重點說明如下：


### jQuery 模式的精神

非常簡單，就可以將程式碼重構為 jQuery 插件模式（請參考第 1 章）。但是，一定要這麼做嗎？這要從 jQuery 的精神說起。

一般來說，JavaScript 最害怕去操作物件（Object）。根據XXX在他的著作「JavaScript Design Pattern」中的說明，使用選擇器（Selector）模式可以提升 JavaScript 程式碼的效能。效能的提昇關鍵為：選擇器模式以很有效率的方式去使用 DOM。jQuery 就是選擇器模式，並且能以高品質的代碼，提昇 DOM 的操作效率。

筆者使用另外一種更簡單的方式來說明。在 02-ws-jquery-plugin-pattern.html 裡有一個 Div 區塊叫做 'message'，重構後的例子使用了 jQuery 選擇器，並且呼叫了 'message' 的 createWebSocket() 方法。從物件導向的角度來看，createWebSocket() 被封裝在 'message' 物件裡了。所以，createWebSocket() 是 'message' 物件的一個方法，這個觀念得到二個好處：

- createWebSocket() 函數的操作範圍（Scope）是在 'message' 物件裡面；簡單來說
- 在 createWebSocket() 裡可以使用 'this' 物件，這實際上是一個參考（Reference），指向「物件自已」

重構前，因為沒有使用 jQuery 模式，所以差別如下：

- createWebSocket() 函數的操作範圍是全域環境（Global）
- 無法使用 'this' 物件
- createWebSocket() 函數，操作的是外部物件

這是二個版本最大差異。所以，將程式碼重構為 jQuery 模式後，能給我們帶來許多好處。

### 考慮 Closure

重構後的 02-ws-jquery-plugin-pattern.html 還有一個需要考量的地方：Closure（封閉性）。

首先，利用第 1 章所介紹的 Module Pattern 觀念 將程式碼全都「封閉起來」。Closure 是為了避免變數的污染：全域變數很容易受到其它地方程式碼的改寫。這就像老師開始上課時，要把教室門關起來一樣的道理：為了避免外界的干擾。

如果沒有把程式碼「關」起來，外界的程式碼可能干擾到我們，例如：全域變數被修改。再進行第二次的重構，結果如下：

{title="client/err-ws-jquery-module-pattern.html"}
~~~~~~~~
 1 <!DOCTYPE html>
 2 <head>
 3 <script type='text/javascript' src="./jquery.min.js"></script>
 4 </head>
 5 <body>
 6 <div id="message"></div>
 7 
 8 <script type="text/javascript">  
 9 (function($) {
10 $.fn.createWebSocket = function () {
11   if ("WebSocket" in window)
12   {
13      alert("WebSocket is supported by your Browser!");
14      // Let us open a web socket
15      var ws = new WebSocket("ws://localhost:8080/start");
16      ws.onopen = function()
17      {
18         // Web Socket is connected, send data using send()
19         ws.send("Message to send");
20      };
21      ws.onmessage = function (evt) 
22      { 
23         var received_msg = evt.data;
24         this.html(received_msg);
25      };
26      ws.onclose = function()
27      { 
28         // websocket is closed.
29      };
30      ws.onerror = function()
31      { 
32         this.html("<h1>error</h1>");
33      };
34   }
35   else
36   {
37      // The browser doesn't support WebSocket
38      alert("WebSocket NOT supported by your Browser!");
39   }
40 };
41 
42 })($);
43 
44 $("#message").createWebSocket();
45 </script>
46 </body>
47 </html>
~~~~~~~~

從程式碼第 9 行與第 42 行可以很明顯看出，我們將原本的程式碼封閉起來了。所以原本的程式碼具有了封閉性。並且根據第 1 章提到的觀念，jQuery 的選擇器（$）要以參數傳遞的方式匯入（Import）到 Module 內部後再使用。

另外，這裡的實作也加入了 onmessage 與 onerror 二個回呼函數。當伺服器透過 WebSocket 傳送訊息過來時，onmessage 便會被呼叫。後續我們將擴充此函數，處理伺服器 Push 過來的即時訊息。

### 關於 *this* 物件

接下來，要解決一個 Bug。解掉這個 Bug 後，可以學到「this」的重要觀念。上述範例第 24 行與第 32 行的 *this* 並不是網頁裡的 'message' 區塊。這和我們想達成的目的不同。所以執行 client.html 並無法看到我們想像中的結果。

上述範例第 24 行與第 32 行中所使用的 this 物件，是 *WebSocket* 類別的實例化，而不是 'message' 區塊。這與我們想實作的結果不同。原本我們期望可以直接使用 *this* 將訊息直接放到 'message' 區塊裡面，但問題出在哪裡？

原來，第 21 行與第 30 行的函數，其實都是物件。這就是 JavaScript 非常重要的觀念之一：函數即物件。意思是：

- 第 21 行用定義了一個 function 給 *onmessage*，而 function 就是物件，所以 *onmessage* 是一個物件
- 第 30 行同上
- 因此，在 24 行裡的 *this* 其實是上述的 *onmessage* 物件

第 24 行的 *this* 代表的是 *onmessage* 物件。要修正這個問題並不然，我們只要想清楚，在程式碼什麼位置，*this* 才是表示 'message' 這個區塊物件實例化即可。

修正後的正確版本如下：

{title="client/03-ws-jquery-module-pattern.html"}
~~~~~~~~
 1 <!DOCTYPE html>
 2 <head>
 3 <script type='text/javascript' src="./jquery.min.js"></script>
 4 </head>
 5 <body>
 6 <div id="message"></div>
 7 
 8 <script type="text/javascript">
 9 (function($) {
10 $.fn.createWebSocket = function () {
11 
12   // This 'this' is '#message' object according to this sample
13   var div = this;
14 
15   if ("WebSocket" in window)
16   {
17      alert("WebSocket is supported by your Browser!");
18      // Let us open a web socket
19      var ws = new WebSocket("ws://localhost:8888/start");
20      ws.onopen = function()
21      {
22         // Web Socket is connected, send data using send()
23         // eg, ws.send("Message to send");
24      };
25      ws.onmessage = function (evt)
26      {
27         var received_msg = evt.data;
28         div.html(received_msg);
29      };
30      ws.onclose = function()
31      {
32         // websocket is closed.
33 
34         // 'this' here is [Object WebSocket]
35         div.html("<h1>onclose</h1>");
36      };
37      ws.onerror = function()
38      {
39         // 'this' here is [Object WebSocket]
40         div.html("<h1>onerror</h1>");
41      };
42   }
43   else
44   {
45      // The browser doesn't support WebSocket
46      alert("WebSocket NOT supported by your Browser!");
47   }
48 };
49 
50 })($);
51 
52 $("#message").createWebSocket();
53 </script>
54 </body>
55 </html>
~~~~~~~~

程式碼第 13 行就是關鍵：*div* 物件所儲存的 this 代表的是 'message' 這個區塊物件；因此，修改後的程式碼第 35 行與第 40 行，就可以成功將資料加入到 message 這個 <div> 裡了。

透過 jQuery Plugin Pattern 與 Module Pattern的使用，程式碼的實作觀念，變成是在物件裡「操作自已」。如此一來，消除掉了對 DOM 的操作，也就是不必要的「Select」。這就是效能得以提昇的關鍵。

### Binding 'this'

上述的觀念，又稱為 Binding *this*。有 JavaScript Framework 開發經驗的開發者，都知道「binding *this*」的重要性。這可是 JavaScript 開發模式的靈魂。所以，上述的寫法其實還有一個改善空間。

為了更容易了解這個觀念，我將「binding *this*」的觀念，修改為「Save *this*」。Binding *this* 的實作方式，就是把自已的 *this* 物件，儲存起來，留待後續使用。

### 重構為 jquery.websocket.js

首先，將 JavaScript 的部份重構為獨立的檔案，命名為 jquery.websocket.js。修改後的 HTML5 頁面如下：

{title="client/04-ws-jquery-module-closure.html"}
~~~~~~~~
 1 <!DOCTYPE html>
 2 <head>
 3 <script type='text/javascript' src="./jquery.min.js"></script>
 4 <script type='text/javascript' src="./jquery.websocket-1.0.js"></script>
 5 </head>
 6 <body>
 7 <div id="message"></div>
 8 
 9 <div id="admin">
10 <input id="msg" type="text" value="Input message"></input>
11 <button id="send">Send</button>
12 </div>
13 
14 <script type="text/javascript">  
15 $("#message").createWebSocket();
16 $("#send").sendMessage();
17 </script>
18 </body>
19 </html>
~~~~~~~~

此外，我們也在 jquery.websocket.js 裡加上幾個新功能：

- 將變數 *ws* 重構為全域變數，由於我們採用了 Module Pattern 的觀念，因此 *ws* 被「封閉」在模組裡，不會受到外界的影響
- 修改 onWsMessage()，利用 JSON API 來解析 JSON 文件

在這裡，還是要不煩其煩地強調 Closure 的觀念。要學好 JavaScript 程式開發，Closure 是重要的第一課。完成後的最新版本如下：

{title="client/jquery.websocket-1.0.js"}
~~~~~~~~
 1 (function($) {
 2 
 3 // WebSocket object
 4 var ws;
 5 
 6 // The Div element selected by jQuery selector
 7 var div = this;
 8 
 9 function onWsMessage(message) {
10    var json = JSON.parse(message.data);
11 
12    if (json.type === 'message') {
13     content.prepend('<p>' + json.data.message + '</p>');
14    }
15 }
16 
17 $.fn.receiveWebSocket = function () {
18      content = this;
19 
20      ws.onmessage = onWsMessage;
21 };
22 
23 $.fn.createWebSocket = function () {
24   if ("WebSocket" in window)
25   {
26      // Let us open a web socket
27      ws = new WebSocket("ws://svn.moko365.com:8080/start", ['echo-protocol']);
28      ws.onopen = function()
29      {
30        div.append("<h2>Done</h2>");
31      };
32 
33      ws.onmessage = onWsMessage;
34 
35      ws.onclose = function()
36      { 
37         // websocket is closed.
38      };
39      ws.onerror = function()
40      { 
41         div.html("<h1>error</h1>");
42      };
43   } else {
44      // The browser doesn't support WebSocket
45      alert("WebSocket NOT supported by your Browser!");
46   }
47 };
48 
49 })($);
~~~~~~~~

## 結論

透過一個即時聊天室的開發過程，我們初步學會了重要的 WebSocket 基礎知識：

- 開發 WebSocket Server
- 開發 WebSocket Client
- 建立 Server/Client 的 WebSocket 連線
- 使用 WebSocket 做 Real-time Data Push

關於 NoChat 範例，目前還沒有使用資料庫來儲存訊息。後續將介紹 Node.js 如何使用資料庫的，有幾個相關的重要觀念，先整理如下：

- 如果要將即時訊息儲存下來，就要使用到資料庫。目前 Node.js 所使用的資料庫，是一種以 JSON Document 形式儲存資料的技術，並非傳統的 SQL 資料庫（關聯式資料庫）技術
- 這類型的資料庫，是一種 JSON Document-based 資料庫，故名思義，它是一種以 JSON 文件方式來儲存資料的 Database
- 這種不以 SQL 查詢語言為主的資料庫，又稱為 NoSQL（Not Only SQL）
- 較知名的有 MongoDB 與 CouchDB

由於這種資料庫，並不是以傳統的 SQL 查詢與儲存，因此也稱為「NoSQL」的資料庫。