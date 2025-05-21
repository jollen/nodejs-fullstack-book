# 10.6 WebSocket 即時推播

> REST 架構讓 Client 能主動請求資料，但無法讓 Server 主動「說話」。真正的即時互動，需要另一種協定：WebSocket。

在前幾節，我們已完成 REST API 架構的設計，並透過 `fetch()` 建立了從 Client 到 Server 的單向請求模式。這樣的架構適合用於「查詢」與「提交」類型的互動。但在聊天室這樣的應用中，資料的變化是來自其他使用者的行為，Client 並不知道何時該去更新。

這時候，若僅靠 REST 架構，就必須不斷地用 `setInterval()` 輪詢（Polling）API，形成效能浪費，也難以實現真正的「即時性」。

這一節，我們將正式導入 WebSocket，補足 REST 架構的「被動」限制，讓 Server 可以主動推送訊息，實現 NoChat 專案的雙向互動：

* 使用者送出訊息後，其他使用者可立刻收到
* Server 可同時廣播訊息至多個 Client
* 不再依賴輪詢，而是持續連線的事件驅動式架構

接下來，我們將學會如何在 Node.js 中整合 WebSocket，與現有的 REST 架構共存，建立一個真正「語言驅動 × 雙向同步」的聊天室核心引擎。

## 認識 WebSocket

WebSocket 是 HTML5 標準的一部分，它提供了 Client 與 Server 之間持久連線的能力，基於 TCP 協定、透過 HTTP 通道升級協定完成連線。這使得 Web 應用可以擁有雙向溝通能力，適用於即時通訊、線上協作、即時資料串流等場景。

對 NoChat 專案而言，我們的應用程式需要成為 WebSocket Server，能夠接收使用者訊息、並即時推送至所有已連線的 Client。

## 安裝 WebSocket 模組

我們將使用 [`websocket`](https://github.com/Worlize/WebSocket-Node) 模組。請透過 npm 安裝：

```bash
$ npm install websocket
```

該模組提供四種物件：

* `WebSocketServer`：建立 Server
* `WebSocketClient`：建立 Client
* `WebSocketFrame`：進階使用
* `WebSocketRouter`：進階路由封裝

在 NoChat 中，我們僅使用 `WebSocketServer`。

## 建立 WebSocket Server

以下為基礎範例：修改 `server.js` 加入 WebSocket 能力：

```js
01 // server.js
02 const http = require("http");
03 const url = require("url");
04 const WebSocketServer = require('websocket').server;

05 const start = (route, handlers) => {
06   const onRequest = (request, response) => {
07     const pathname = url.parse(request.url).pathname;
08     const query = url.parse(request.url).query;

09     console.log(`Request for ${pathname} received.`);
10     route(pathname, handlers, response, query);
11     response.writeHead(200, {"Content-Type": "text/plain"});
12     response.write("Hello World");
13     response.end();
14   };

15   const server = http.createServer(onRequest).listen(8080, () => {
16     console.log("Server has started and is listening on port 8080.");
17   });

18   const wsServer = new WebSocketServer({
19     httpServer: server,
20     autoAcceptConnections: false
21   });

22   const onWsConnMessage = (message) => {
23     if (message.type === 'utf8') {
24       console.log(`Received message: ${message.utf8Data}`);
25     }
26   };

27   const onWsConnClose = (reasonCode, description) => {
28     console.log(`Peer disconnected with reason: ${reasonCode}`);
29   };

30   const onWsRequest = (request) => {
31     const connection = request.accept('echo-protocol', request.origin);
32     console.log("WebSocket connection accepted.");

33     connection.on('message', onWsConnMessage);
34     connection.on('close', onWsConnClose);
35   };

36   wsServer.on('request', onWsRequest);
37 };

38 exports.start = start;
```

### 重點說明：

* 第 4 行：載入 WebSocketServer 類別
* 第 15～17 行：建立並啟動 HTTP Server，再綁定至 WebSocket Server
* 第 30 行：當有 WebSocket 請求時，呼叫 `onWsRequest`
* 第 31 行：接受請求，指定自定義協定名稱（如 'echo-protocol'）

  * `request.accept()` 是將瀏覽器的 HTTP 請求升級為 WebSocket 通訊的核心步驟。
  * 第一個參數 `'echo-protocol'` 是協定名稱，必須與前端 `new WebSocket(url, protocol)` 中提供的協定名稱一致，否則連線會被拒絕。
  * 第二個參數為來源（origin），用於驗證來源是否合法，可搭配安全機制或 CORS 原則使用。
  * 若希望不使用自定義協定，可改為 `request.accept(null, request.origin)`，但不推薦。
* 第 33～34 行：註冊訊息與斷線的事件處理函式
* 第 22 行：收到訊息後，Console 顯示，未來將於此處加上廣播邏輯

此架構完成後，Server 將可接收來自任一使用者的訊息，並可根據需求進一步推送至所有使用者，這正是實現 NoChat 雙向即時溝通的基礎。

---

## 廣播訊息給所有 Client（Server 端推送）

要實作 WebSocket 廣播邏輯，我們需要維護一份所有連線中的使用者清單。每當有一位使用者送出訊息，我們便可將該訊息推送給所有 Client：

```js
const clients = [];

function onWsRequest(request) {
  var connection = request.accept('echo-protocol', request.origin);
  console.log("WebSocket connection accepted.");

  clients.push(connection);

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received: ' + message.utf8Data);

      // 廣播給所有 Client
      clients.forEach(client => {
        if (client.connected) {
          client.sendUTF(message.utf8Data);
        }
      });
    }
  });

  connection.on('close', function(reasonCode, description) {
    console.log('Peer disconnected.');

    const idx = clients.indexOf(connection);
    if (idx !== -1) clients.splice(idx, 1);
  });
}
```

這段程式碼讓 Server 可以「一次說給所有人聽」，實現聊天室的即時訊息同步。

### 錯誤處理補充建議：

為了強化穩定性，建議加入錯誤處理邏輯，例如：

```js
connection.on('error', (error) => {
  console.error('WebSocket 錯誤:', error);
});
```

這能捕捉連線過程中可能出現的錯誤，例如：

* 資料格式不合法
* 發送訊息時連線意外中斷

此外，也建議監控 `client.connected` 狀態是否異常，例如 catch 發送錯誤：

```js
try {
  client.sendUTF(message.utf8Data);
} catch (err) {
  console.warn('廣播失敗：', err.message);
}
```

這些設計能避免單一連線異常導致整體廣播流程失敗。

---

## 前端：連接 WebSocket 並接收訊息

接下來，我們在前端加上 WebSocket 的初始化與接收邏輯。

```html
<script>
const ws = new WebSocket('ws://localhost:8080/', 'echo-protocol');

ws.onopen = () => {
  console.log('WebSocket 連線成功');
};

ws.onerror = (err) => {
  console.error('WebSocket 錯誤：', err);
};

ws.onclose = (event) => {
  console.warn('WebSocket 已關閉，原因：', event.reason || '無明確說明');
  // 進階：可於此實作自動重連機制
};

ws.onmessage = (event) => {
  try {
    const ul = document.getElementById('chat-log');
    const li = document.createElement('li');
    li.textContent = '[ws] ' + event.data;
    ul.appendChild(li);
  } catch (err) {
    console.warn('接收訊息顯示失敗：', err.message);
  }
};

function sendViaWebSocket() {
  const msg = document.getElementById('input-msg').value;
  ws.send(msg);
}
</script>
```

只要透過 `ws.send()` 將文字送出，Server 就會接收並廣播，所有 Client 會立即收到訊息，並顯示於畫面。

你可以搭配一顆新的按鈕來測試這個功能：

```html
<button onclick="sendViaWebSocket()">WebSocket 送出</button>
```

如此便完成 Client → Server → All Clients 的即時資料流轉。這就是 WebSocket 的核心價值：**低延遲、雙向互動、不中斷連線的語意推播機制。**

---

## REST × WebSocket 的協作關係：首次資料載入設計

WebSocket 適合處理「變化後即時通知」的情境，但「聊天室初次進入時」的歷史訊息，仍建議透過 REST API 來載入，避免 WebSocket 負擔資料查詢的責任。

以下是一種常見設計模式：

```js
window.onload = () => {
  fetch('/discussion/latest/10')
    .then(res => res.json())
    .then(renderMessages)
    .catch(err => console.warn('載入歷史訊息失敗：', err.message));
};

function renderMessages(messages) {
  const ul = document.getElementById('chat-log');
  messages.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = '[history] ' + msg.message;
    ul.appendChild(li);
  });
}
```

這樣設計的優點是：

* REST 負責一次性資料查詢，降低 WebSocket 初始化複雜度
* 使用者一進聊天室就能看到完整對話上下文
* WebSocket 僅負責之後的即時訊息，不需儲存訊息狀態

這是典型的「資料載入 × 即時推播」分工架構，也是 NoChat 採用的實務模式。
