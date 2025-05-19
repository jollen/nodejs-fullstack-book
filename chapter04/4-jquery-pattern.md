# 4.4 使用 jQuery 模式

第 1 章介紹的 jQuery 模式，在這裡派上用場了。

上述的例子雖然很直覺，不過還有一些缺點。第一件事情就是以 jQuery 模式來重構。將用戶端改寫如下：

```javascript
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
```

重點說明如下：

* 第 9 行：在 jQuery 裡加入 `createWebSocket` 函數，這就是 jQuery plugin 的做法
* 第 37 行：以 jQuery selector 找出 `#message` 後，再呼叫它的 `createWebSocket` 函數

### jQuery 模式的精神

非常簡單，就可以將程式碼重構為 jQuery 插件模式（請參考第 1 章）。但是，一定要這麼做嗎？這要從 jQuery 的精神說起。

一般來說，JavaScript 最害怕去操作物件（Object）。根據 Addy Osmani 在他的著作「[JavaScript Design Pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)」中的說明，使用選擇器（Selector）模式可以提升 JavaScript 程式碼的效能。效能的提昇關鍵為：選擇器模式以很有效率的方式去使用 DOM。jQuery 就是選擇器模式，並且能以高品質的代碼，提昇 DOM 的操作效率。

筆者使用另外一種更簡單的方式來說明。在上述範例中，裡有一個 Div 區塊叫做 'message'，重構後的例子使用了 jQuery 選擇器，並且呼叫了 'message' 的 `createWebSocket()` 方法。從物件導向的角度來看，`createWebSocket()` 被封裝在 'message' 物件裡了。所以，`createWebSocket()` 是 'message' 物件的一個方法，這個觀念得到二個好處：

* `createWebSocket` 函數的操作範圍（Scope）是在 'message' 物件裡面；簡單來說
* 在 `createWebSocket()` 裡可以使用 'this' 物件，這實際上是一個參考（Reference），指向「物件自已」

重構前，因為沒有使用 jQuery 模式，所以差別如下：

* `createWebSocket()` 的操作範圍是全域環境（Global）
* 無法使用 'this' 物件
* `createWebSocket()` 操作的是外部物件

這是二個版本最大差異。所以，將程式碼重構為 jQuery 模式後，能給我們帶來許多好處。

### 考慮 Closure

重構後的範例，還有一個需要考量的地方：Closure（封閉性）。

首先，利用第 1 章所介紹的 Module Pattern 觀念 將程式碼全都「封閉起來」。Closure 是為了避免變數的污染：全域變數很容易受到其它地方程式碼的改寫。這就像老師開始上課時，要把教室門關起來一樣的道理：為了避免外界的干擾。

如果沒有把程式碼「關」起來，外界的程式碼可能干擾到我們，例如：全域變數被修改。再進行第二次的重構，結果如下：

```javascript
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
24         $("#message").html(received_msg);
25      };
26      ws.onclose = function()
27      { 
28         // websocket is closed.
29      };
30      ws.onerror = function()
31      { 
32         $("#message").html("<h1>error</h1>");
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
```

從程式碼第 9 行與第 42 行可以很明顯看出，我們將原本的程式碼封閉起來了。所以原本的程式碼具有了封閉性。並且根據第 1 章提到的觀念，jQuery 的選擇器（\$）要以參數傳遞的方式匯入（Import）到 Module 內部後再使用。

另外，這裡的實作也加入了 `onmessage` 與 `onerror` 二個回呼函數（Callback Function）。當伺服器透過 WebSocket 傳送訊息過來時，`onmessage` 便會被呼叫。後續我們將擴充此函數，處理伺服器 Push 過來的即時訊息。

### 4.4.1 ES6 改寫：使用箭頭函數與模板字串

基於前述的範例，我們可以將 WebSocket 客戶端重構為 ES6 版本：

```javascript
 1 <!DOCTYPE html>
 2 <html lang="en">
 3 <head>
 4   <meta charset="UTF-8">
 5   <title>NoChat Client</title>
 6   <script src="./jquery.min.js"></script>
 7 </head>
 8 <body>
 9   <div id="message"></div>
10   <script>
11     (($) => {
12       $.fn.createWebSocket = function () {
13         if ("WebSocket" in window) {
14           const ws = new WebSocket("ws://localhost:8080/start");
15
16           ws.onopen = () => {
17             ws.send("Message to send");
18           };
19
20           ws.onmessage = (evt) => {
21             const msg = evt.data;
22             $("#message").html(`Received: ${msg}`);
23           };
24
25           ws.onerror = () => {
26             $("#message").html(`<h1>Error</h1>`);
27           };
28         } else {
29           alert("WebSocket NOT supported by your Browser!");
30         }
31       };
32     })($);
33
34     $("#message").createWebSocket();
35   </script>
36 </body>
37 </html>
```

#### 差異重點說明

* 使用 `const` / `let` 取代 `var`，強化變數作用域與可預測性
* 使用箭頭函數 `() => {}`，語意更清晰，避免 `this` 指向混淆
* 使用模板字串 `` `Received: ${msg}` `` 取代字串相加，語意與可讀性更好
* 用 IIFE（Immediately Invoked Function Expression）結合 ES6 語法實現閉包封裝

這樣的寫法不僅讓語意邏輯更清晰，也與現代前端開發的主流接軌，更適合導入模組化與構建工具。

### 4.4.2 WebSocket 用戶端模組化

若要將 WebSocket 的 client 邏輯進一步模組化，可將通訊行為獨立封裝，便於日後重用與測試。以下是一個簡化的模組化範例：

```javascript
export function createSocket(endpoint, onMessage) {
  const socket = new WebSocket(endpoint);

  socket.onopen = () => {
    console.log('WebSocket opened');
  };

  socket.onmessage = (event) => {
    onMessage(event.data);
  };

  socket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  socket.onclose = () => {
    console.log('WebSocket closed');
  };

  return socket;
}
```

搭配 ES6 `import` 語法即可簡潔引入：

```
import { createSocket } from './ws-client.js';

const socket = createSocket('ws://localhost:8080/start', (msg) => {
  $('#message').html(msg);
});
```

這樣的設計讓 WebSocket 用戶端成為獨立模組，與 UI 邏輯解耦，並利於未來擴展與測試，實踐「前後端分離」的現代開發哲學。

### 4.4.3 jQuery 與 Class 封裝對照

在前一節（4.3.2）中，我們已使用 ES6 `class` 封裝 WebSocket 前端邏輯，實現模組化與結構化的管理。在這一節，我們將其與第 4.4 節的 jQuery 模式進行觀念對照與程式結構比對，幫助讀者從程式風格與維護觀點，做出技術選擇。

---

#### 一、概念層級對照

| 封裝方式     | jQuery Plugin Pattern    | ES6 Class 模式                  |
| -------- | ------------------------ | ----------------------------- |
| 封裝單元     | 函數（function plugin）      | 類別（class）                     |
| 綁定資料與方法  | jQuery 物件內部透過 `this` 管理  | 使用 `constructor` 與實例屬性 `this` |
| 對 DOM 操作 | 依賴 `$()` 與鏈式操作（chaining） | 需額外傳入 DOM 或使用 querySelector   |
| 非同步處理    | callback 為主，支援 Promise   | 可整合 `async/await`             |
| 可測性      | 綁定在 DOM 上，測試與邏輯耦合高       | 較易抽象與測試                       |
| 擴充性      | 以 `$.fn.xxx` 方式擴充        | 以繼承或 mixin 模式延伸               |

---

#### 二、程式結構比對（片段）

**jQuery Plugin 範例：**

```js
1 (function($) {
2   $.fn.createWebSocket = function () {
3     const self = this;
4     const ws = new WebSocket("ws://localhost:8080/start");
5     ws.onmessage = function (evt) {
6       self.html(evt.data);
7     };
8   };
9 })($);

10 $("#message").createWebSocket();
```

**ES6 Class 封裝版本：**

```js
1 class WebSocketClient {
2   constructor(url, targetId) {
3     this.url = url;
4     this.target = document.getElementById(targetId);
5   }
6   connect() {
7     this.ws = new WebSocket(this.url);
8     this.ws.onmessage = (evt) => {
9       this.target.innerHTML = evt.data;
10     };
11   }
12 }

13 const client = new WebSocketClient("ws://localhost:8080/start", "message");
14 client.connect();
```

---

#### 三、jQuery 模式 vs Class 模式設計哲學

jQuery 模式強調「介面驅動、事件導向」的程式設計方法，它將邏輯緊密綁定於 DOM 節點本身，適合快速開發、小型互動，屬於「語法簡便但可測性低」的思維框架。相對地，ES6 Class 模式則將事件與資料結構封裝於類別內部，將「狀態管理、邏輯組織、行為觸發」明確地包裝為可重用、可測試的單元模組。

* jQuery 模式比較偏向「物件上的功能註冊」：你對 DOM 元素直接綁定一個 plugin 方法，程式碼更貼近介面事件，強調『事件發生 → 執行對應行為』的對映關係。
* Class 模式則是「資料結構與行為的封裝」：你建立一個可重複使用的物件型單元，把邏輯歸納到結構內部。這在實作多人協作、測試、自動化場景更具優勢。

這兩者對應於第 4.3.1 與 4.3.2 節中提到的實作風格：前者強調 UI 的操作便利性，後者則著重邏輯的模組性與測試友善性。若進一步整合 async/await（如 4.3.2 所示），則 Class 模式可進一步支援非同步處理的結構穩定性，這是在大型 WebSocket 應用中不可或缺的能力。

---

#### 四、總結：何時用哪一種？

| 使用情境                    | 建議使用方式        |
| ----------------------- | ------------- |
| 快速建立單一頁面互動邏輯            | jQuery Plugin |
| 專案需要模組化與可測試結構           | ES6 Class     |
| 預期多個元件共用相同 WebSocket 行為 | ES6 Class 更適合 |
| 整合 React/Vue 等框架開發流程    | Class 為主      |

本書以 jQuery 為基礎切入，但逐步引導至 ES6 `class` 封裝模式，協助讀者掌握從「DOM-centric」思維過渡到「封裝導向」思維，為後續開發多人協作與大型應用打下穩固基礎。

---

Next: [4.5 使用 *this* 物件](5-this.md)
