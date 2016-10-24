## 4.4 使用 jQuery 模式

第 1 章介紹的 jQuery 模式，在這裡派上用場了。

上述的例子雖然很直覺，不過還有一些缺點。第一件事情就是以 jQuery 模式來重構。將用戶端改寫如下：

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

* 第 9 行：在 jQuery 裡加入 ```createWebSocket``` 函數，這就是 jQuery plugin 的做法
* 第 37 行：以 jQuery selector 找出 ```#message``` 後，再呼叫它的 ```createWebSocket``` 函數

### jQuery 模式的精神

非常簡單，就可以將程式碼重構為 jQuery 插件模式（請參考第 1 章）。但是，一定要這麼做嗎？這要從 jQuery 的精神說起。

一般來說，JavaScript 最害怕去操作物件（Object）。根據 Addy Osmani 在他的著作「[JavaScript Design Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)」中的說明，使用選擇器（Selector）模式可以提升 JavaScript 程式碼的效能。效能的提昇關鍵為：選擇器模式以很有效率的方式去使用 DOM。jQuery 就是選擇器模式，並且能以高品質的代碼，提昇 DOM 的操作效率。

筆者使用另外一種更簡單的方式來說明。在上述範例中，裡有一個 Div 區塊叫做 'message'，重構後的例子使用了 jQuery 選擇器，並且呼叫了 'message' 的 createWebSocket() 方法。從物件導向的角度來看，createWebSocket() 被封裝在 'message' 物件裡了。所以，createWebSocket() 是 'message' 物件的一個方法，這個觀念得到二個好處：

- createWebSocket() 函數的操作範圍（Scope）是在 'message' 物件裡面；簡單來說
- 在 createWebSocket() 裡可以使用 'this' 物件，這實際上是一個參考（Reference），指向「物件自已」

重構前，因為沒有使用 jQuery 模式，所以差別如下：

- createWebSocket() 函數的操作範圍是全域環境（Global）
- 無法使用 'this' 物件
- createWebSocket() 函數，操作的是外部物件

這是二個版本最大差異。所以，將程式碼重構為 jQuery 模式後，能給我們帶來許多好處。

### 考慮 Closure

重構後的範例，還有一個需要考量的地方：Closure（封閉性）。

首先，利用第 1 章所介紹的 Module Pattern 觀念 將程式碼全都「封閉起來」。Closure 是為了避免變數的污染：全域變數很容易受到其它地方程式碼的改寫。這就像老師開始上課時，要把教室門關起來一樣的道理：為了避免外界的干擾。

如果沒有把程式碼「關」起來，外界的程式碼可能干擾到我們，例如：全域變數被修改。再進行第二次的重構，結果如下：

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

---

Next: [4.5 使用 *this* 物件](5-this.md)
