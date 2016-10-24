# 4.3 製作 WebSocket 用戶端

現在是製作一個 Frontend 的時機了，透過一個簡單的 Frontend 來測試目前的實作成果。我們要 Frontend 的文件，命名為 client.html。實作 client.html 前，要瀏覽器必須支援 HTML5 的 WebSocket 標準。目前新版的瀏覽器都支援 WebSocket 標準。本書皆使用 Chrome 18+ 瀏覽器進行測試。

### 實作 client.html

現在，我們可以不考慮 HTML5 的相容性問題，假設使用者的瀏覽器都支援 WebSocket 。不過，實作時，可以考慮加入一段程式碼，來檢查並提示使用者，目前的瀏覽器是否支援 WebSocket。

完整程式碼如下：

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

![圖 4.1：範例 01-ws-open.html](../images/figure-4_1.png)

---

Next: [4.4 使用 jQuery 模式](4-jquery-pattern.md)
