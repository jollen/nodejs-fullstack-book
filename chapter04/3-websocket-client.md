## 4.3 製作 WebSocket 用戶端

現在是製作一個 Frontend 的時機了，透過一個簡單的 Frontend 來測試目前的實作成果。我們要 Frontend 的文件，命名為 `client.html`。實作 `client.html` 前，瀏覽器必須支援 HTML5 的 WebSocket 標準。新版的瀏覽器皆支援 WebSocket，本書皆使用 Chrome 18+ 進行測試。

### 實作 client.html

現在，我們可以不考慮 HTML5 的相容性問題，假設使用者的瀏覽器都支援 WebSocket。不過，實作時仍可考慮加入一段檢查程式碼，以提示使用者目前的瀏覽器是否支援 WebSocket。

```html
 1 <!DOCTYPE html>
 2 <html>
 3 <head>
 4   <meta charset="UTF-8">
 5   <title>NoChat Client</title>
 6 </head>
 7 <body>
 8   <div id="header"></div>
 9   <input type="text" id="messageBox" placeholder="輸入訊息...">
10   <button onclick="WebSocketTest();">Get News</button>
11   <button onclick="sendMessage();">送出訊息</button>
12 
13   <script type="text/javascript">  
14   var ws;

15   function WebSocketTest() {
16     if ("WebSocket" in window) {
17       // 建立 WebSocket 連線
18       ws = new WebSocket("ws://svn.moko365.com:8080/", "echo-protocol");

19       ws.onopen = function(evt) {
20         console.log("WebSocket opened.");
21         document.getElementById('header').innerText = 'WebSocket 連線成功';
22       };

23       ws.onmessage = function(evt) {
24         console.log("Received: " + evt.data);
25         alert("接收到訊息：" + evt.data);
26       };

27       ws.onerror = function(evt) {
28         console.error("WebSocket error:", evt);
29         alert("WebSocket 發生錯誤，請確認伺服器是否啟動");
30       };

31       ws.onclose = function(evt) {
32         alert("WebSocket 連線已關閉。");
33       };

34     } else {
35       // 不支援 WebSocket
36       alert("WebSocket NOT supported by your Browser!");
37     }
38   }

39   function sendMessage() {
40     const msg = document.getElementById('messageBox').value;
41     if (ws && ws.readyState === WebSocket.OPEN) {
42       ws.send(msg);
43       console.log("已送出訊息：" + msg);
44     } else {
45       alert("WebSocket 尚未建立連線。");
46     }
47   }
48   </script>
49 </body>
50 </html>
```

說明如下：

* 第 15 行：檢查瀏覽器是否支援 WebSocket
* 第 18 行：與伺服器建立 WebSocket 連線，第一個參數是伺服器位址，第二個參數是自定協定（protocol）
* 第 19 行：WebSocket 成功連線後，觸發 `onopen` 回呼函數，並更新畫面
* 第 23 行：伺服器傳送訊息時，觸發 `onmessage`，這是實作 Data Push 的核心
* 第 27 行：當 WebSocket 發生錯誤時觸發，便於除錯與提示
* 第 31 行：WebSocket 關閉時，觸發 `onclose` 回呼函數
* 第 39 行：`sendMessage()` 函數將訊息送給伺服器，作為簡易的訊息測試按鈕

補充說明：

* `WebSocket` 物件是瀏覽器內建的 API，類似於瀏覽器內的「TCP socket 實作」，它讓前端程式能與後端進行雙向、持續的資料通訊。
* `onopen` 代表的是連線初始化的成功提示。它常見用途是：更新 UI 狀態，顯示已連線成功、解除送出按鈕的禁用等。
* `onmessage` 是核心。資料推送模型（Data Push Model）建立在此回呼函數內，它會攔截並處理從伺服器推送來的所有訊息。
* `onerror` 提供了基本的錯誤處理能力，是前端與後端「協定容錯」的重要檢查點。
* `onclose` 表示該 WebSocket 連線生命周期終結，開發者可藉此釋放資源或提示使用者重新連線。
* `ws.send(msg)` 代表 Client-to-Server 的訊息送出，會轉為 UTF-8 格式推向 Server。

這段程式碼為 WebSocket 前端測試的基礎，整合 UI 顯示與訊息推送回應的流程。使用瀏覽器打開 `client.html`，按下按鈕後，將觸發 `WebSocketTest()` 函數，並可輸入訊息測試傳送功能。

![圖 4.1：範例 01-ws-open.html](../images/figure-4_1.png)

---

### 4.3.1 使用 ES6 重構 client.html

下面是以 ES6 語法改寫的版本，更加符合現代 JavaScript 的開發標準。

```html
 1 <!DOCTYPE html>
 2 <html lang="zh-Hant">
 3 <head>
 4   <meta charset="UTF-8">
 5   <title>NoChat Client (ES6)</title>
 6 </head>
 7 <body>
 8   <div id="header"></div>
 9   <input type="text" id="messageBox" placeholder="輸入訊息...">
10   <button id="connectBtn">建立連線</button>
11   <button id="sendBtn">送出訊息</button>
12 
13   <script type="module">
14   let ws;
15 
16   const connectBtn = document.getElementById('connectBtn');
17   const sendBtn = document.getElementById('sendBtn');

18   connectBtn.addEventListener('click', () => {
19     if ('WebSocket' in window) {
20       ws = new WebSocket('ws://svn.moko365.com:8080/', 'echo-protocol');
21 
22       ws.onopen = () => {
23         console.log('WebSocket opened.');
24         document.getElementById('header').textContent = 'WebSocket 連線成功';
25       };

26       ws.onmessage = ({ data }) => {
27         console.log(`接收到訊息：${data}`);
28         alert(`接收到訊息：${data}`);
29       };

30       ws.onerror = (e) => {
31         console.error('WebSocket error:', e);
32         alert('WebSocket 發生錯誤，請確認伺服器是否啟動');
33       };

34       ws.onclose = () => {
35         alert('WebSocket 連線已關閉。');
36       };
37     } else {
38       alert('此瀏覽器不支援 WebSocket');
39     }
40   });

41   sendBtn.addEventListener('click', () => {
42     const msg = document.getElementById('messageBox').value;
43     if (ws && ws.readyState === WebSocket.OPEN) {
44       ws.send(msg);
45       console.log(`已送出訊息：${msg}`);
46     } else {
47       alert('WebSocket 尚未建立連線。');
48     }
49   });
50   </script>
51 </body>
52 </html>
```

#### 差異說明：

| 特性   | ES5                 | ES6 改寫                        |
| ---- | ------------------- | ----------------------------- |
| 變數宣告 | `var`               | `let` / `const` 用於區塊作用域       |
| 事件綁定 | HTML 屬性 (`onclick`) | `addEventListener()` 模式       |
| 字串處理 | 字串相加                | 模板字串（Template literals） `${}` |
| 函數語法 | function 關鍵字        | 箭頭函數 `=>`                     |

使用 ES6 可提升語意清晰度與維護性，也符合現代瀏覽器的執行效能與可讀性標準。

---

Next: [4.4 使用 jQuery 模式](4-jquery-pattern.md)
