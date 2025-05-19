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

### 4.3.2 使用 ES6 Class 封裝 WebSocket 客戶端（含 async/await）

在本節中，我們將進一步將 WebSocket 客戶端重構為一個具備封裝性與可重用性的 ES6 類別（Class），並導入 `async/await` 語法來處理初始化流程中的非同步行為。

這樣做的目的不只是提升語意清晰度，更是對「封裝、行為控制、非同步處理」的最佳實踐。

```html
 1 <!DOCTYPE html>
 2 <html lang="zh-Hant">
 3 <head>
 4   <meta charset="UTF-8">
 5   <title>NoChat Client - Class 封裝</title>
 6 </head>
 7 <body>
 8   <div id="header"></div>
 9   <input type="text" id="messageBox" placeholder="輸入訊息...">
10   <button id="connectBtn">建立連線</button>
11   <button id="sendBtn">送出訊息</button>
12 
13   <script type="module">
14   class WebSocketClient {
15     constructor(url, protocol) {
16       this.url = url;
17       this.protocol = protocol;
18       this.ws = null;
19     }
20 
21     async connect() {
22       if (!('WebSocket' in window)) {
23         alert('此瀏覽器不支援 WebSocket');
24         return;
25       }
26 
27       this.ws = new WebSocket(this.url, this.protocol);
28 
29       this.ws.onopen = () => {
30         console.log('WebSocket 已連線');
31         document.getElementById('header').textContent = 'WebSocket 已連線';
32       };
33 
34       this.ws.onmessage = ({ data }) => {
35         console.log(`接收到訊息：${data}`);
36         alert(`接收到訊息：${data}`);
37       };
38 
39       this.ws.onerror = (err) => {
40         console.error('WebSocket 錯誤:', err);
41       };
42 
43       this.ws.onclose = () => {
44         console.log('WebSocket 已關閉');
45       };
46     }
47 
48     async send(msg) {
49       if (this.ws && this.ws.readyState === WebSocket.OPEN) {
50         this.ws.send(msg);
51         console.log(`送出訊息：${msg}`);
52       } else {
53         alert('WebSocket 尚未建立連線。');
54       }
55     }
56   }
57 
58   const client = new WebSocketClient('ws://svn.moko365.com:8080/', 'echo-protocol');
59 
60   document.getElementById('connectBtn').addEventListener('click', async () => {
61     await client.connect();
62   });
63 
64   document.getElementById('sendBtn').addEventListener('click', async () => {
65     const msg = document.getElementById('messageBox').value;
66     await client.send(msg);
67   });
68   </script>
69 </body>
70 </html>
```

---

### ES6 封裝設計對照

| 概念           | 傳統寫法（ES5）              | 封裝後寫法（ES6）                       |
| ------------ | ---------------------- | -------------------------------- |
| WebSocket 實例 | 全域變數 `var ws`          | 類別屬性 `this.ws`                   |
| 建立連線         | 全域函數 `WebSocketTest()` | 類別方法 `connect()`                 |
| 傳送訊息         | 全域函數 `sendMessage()`   | 類別方法 `send(msg)`                 |
| 訊息處理         | 直接寫在 `onmessage` 事件中   | 封裝於 `connect()` 方法中              |
| 非同步控制        | 傳統事件觸發                 | `async/await` 確保流程明確             |
| 重複使用         | 無模組化，無法複用              | 任何頁面可建立多個 `WebSocketClient` 實例使用 |

---

### 封裝的效益

1. **語意集中**：所有與 WebSocket 連線與互動邏輯集中於 `WebSocketClient` 類別中。
2. **控制範圍**：變數不再污染全域空間，提升封裝與維護性。
3. **可擴展性**：未來可為此類別增加自動重連、心跳偵測、訊息佇列等功能。
4. **語法現代化**：透過 `async/await`，非同步邏輯清楚易懂，減少 callback 地獄的可能性。

---

下一節將進入 jQuery Pattern，並對比 `Class` 封裝與 jQuery Plugin Pattern 的差異。

Next: [4.4 使用 jQuery 模式](4-jquery-pattern.md)
