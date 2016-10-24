# 4.5 使用 *this* 物件

接下來，要解決一個 Bug。解掉這個 Bug 後，可以學到「this」的重要觀念。上述範例第 24 行與第 32 行的 *this* 並不是網頁裡的 'message' 區塊。這和我們想達成的目的不同。所以執行 client.html 並無法看到我們想像中的結果。

上述範例第 24 行與第 32 行中所使用的 this 物件，是 *WebSocket* 類別的實例化，而不是 'message' 區塊。這與我們想實作的結果不同。原本我們期望可以直接使用 *this* 將訊息直接放到 'message' 區塊裡面，但問題出在哪裡？

原來，第 21 行與第 30 行的函數，其實都是物件。這就是 JavaScript 非常重要的觀念之一：函數即物件。意思是：

- 第 21 行用定義了一個 function 給 *onmessage*，而 function 就是物件，所以 *onmessage* 是一個物件
- 第 30 行同上
- 因此，在 24 行裡的 *this* 其實是上述的 *onmessage* 物件

第 24 行的 *this* 代表的是 *onmessage* 物件。要修正這個問題並不然，我們只要想清楚，在程式碼什麼位置，*this* 才是表示 'message' 這個區塊物件實例化即可。

修正後的正確版本如下：

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
