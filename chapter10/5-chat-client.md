# 10.5 Node.js Chat Client

本節將延續前章 REST API 架構與 NoChat 專案的實作基礎，從 Client 端的角度出發，建構完整的聊天室應用資料流程。我們將聚焦於如何從 Client 呼叫 REST API 傳遞與取得訊息，並進一步介紹測試流程與路由行為設計。

## Client 應具備的核心功能

Client Application 的部份，應實作以下功能：

* 輸入即時訊息（Input）
* 呼叫 REST API 傳出訊息給 Server（POST）
* 呼叫 REST API 取得最新的 *n* 筆訊息（GET）
* 經由 WebSocket 接收 Server 主動推送的訊息（實時性）

這代表：Client 扮演「資料主動發送者」與「畫面更新者」的雙重角色。Server 則僅提供 API 與即時推播的能力，不負責畫面渲染。

## Step 1：定義 REST API 結構

假設主機名稱為 `chatservice.org`，nodejs-chat 專案的最低實作 API 如下表所示：

| CRUD 操作 | HTTP Method | URI 格式                                                                                               |
| ------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| Create  | POST        | [http://chatservice.org/discussion/{msg}](http://chatservice.org/discussion/{msg})                   |
| Read    | GET         | [http://chatservice.org/discussion/latest/{items}](http://chatservice.org/discussion/latest/{items}) |

表 10-2 REST API 定義

這樣的 URI 格式設計符合 REST 精神，避免使用 query string、空白字元與大小寫混用，並以「語意導向 × 資源結構化」為設計原則。

例如：

* 傳送 "Hello" 訊息：`POST /discussion/hello`
* 讀取最新 10 筆訊息：`GET /discussion/latest/10`

你可以將其想像為樹狀檔案系統：

```
└── discussion
    ├── {md5-hash-1}
    │   └── db.txt ("hello")
    ├── {md5-hash-2}
    │   └── db.txt ("how are you")
```

這樣的目錄架構類比，有助於你理解「每則訊息都是一筆獨立資源」的設計邏輯。

## Step 2：URL Routing 實作

在 `app.js` 中加入 REST API 的路由設定：

```js
const discussion = require('./routes/discussion');

app.post('/discussion/:message', discussion.create);
app.get('/discussion/latest/:items', discussion.read);
```

對應到 `routes/discussion.js` 檔案中的實作：

```js
const history = [];

exports.create = function(req, res) {
  const msg = { message: req.params.message };
  history.push(msg);
  res.json({ status: 'OK' });
};

exports.read = function(req, res) {
  const n = parseInt(req.params.items);
  const latest = history.slice(-n);
  res.json(latest);
};
```

📌 **注意事項**：瀏覽器僅支援以 GET 發送請求，因此若要測試 POST，請使用 curl 工具或 Postman：

```bash
$ curl -X POST http://localhost:3000/discussion/hello
```

## Step 3：用 JavaScript 撰寫 Client 呼叫 API

在第 9 章中，我們已經學會如何使用 Express.js 設計路由與處理靜態檔案。現在，我們將這些能力延伸至 Client 端的互動邏輯上。這代表不只是設計 API，更要在使用者操作發生時，主動觸發請求、解析回應並渲染畫面。

以下為前端以 `fetch()` 透過 HTTP POST 方戈式，來呼叫 REST API 的範例：

```js
// 送出訊息
fetch('/discussion/hello', {
  method: 'POST'
});

// 取得最新 5 筆訊息
fetch('/discussion/latest/5')
  .then(res => res.json())
  .then(data => {
    data.forEach(msg => {
      console.log(msg.message);
    });
  });
```

這些邏輯日後將整合進前端頁面事件，如「送出表單」「載入畫面時自動取得歷史訊息」等情境中。

若搭配最小前端 UI，可以設計以下結構：

```html
<input id="input-msg">
<button onclick="sendMessage()">送出</button>
<ul id="chat-log"></ul>
```

對應的 JavaScript 邏輯為：

```js
function sendMessage() {
  const msg = document.getElementById('input-msg').value;
  fetch('/discussion/' + encodeURIComponent(msg), { method: 'POST' });
}
```

並可補上錯誤處理機制：

```js
fetch('/discussion/latest/5')
  .then(res => {
    if (!res.ok) throw new Error('伺服器錯誤');
    return res.json();
  })
  .then(data => renderMessages(data))
  .catch(err => alert('載入失敗：' + err.message));
```

## Step 4：撰寫測試程式（Test Case）

若只用 curl 測試，效率不高。建議改以 Node.js 撰寫測試腳本。可使用 [Requestify](http://ranm8.github.io/requestify/) 套件：

```json
"dependencies": {
  "express": "^4.18.2",
  "requestify": "*"
}
```

測試腳本範例（tests/01-test-discussion-create.js）：

```js
const requestify = require('requestify');

requestify.post('http://localhost:3000/discussion/hello')
  .then(response => {
    console.log('Response:', response.getBody());
  });
```

也可撰寫 GET 測試：

```js
requestify.get('http://localhost:3000/discussion/latest/2')
  .then(response => {
    console.log('Messages:', response.getBody());
  });
```

透過測試腳本，你將能快速驗證 API 行為，也可配合 `npm test` 指令整合進 CI 流程。

## 📦 專案整合提示：NoChat 專案完整性任務

完成 10.5 章後，請確認你在 NoChat 專案中完成以下整合：

* 前端介面能透過 `fetch()` 呼叫 `/discussion/:message` API 傳送訊息
* 頁面載入時能自動呼叫 `/discussion/latest/:n` 並渲染訊息
* 錯誤處理與例外情境有適當提示（如網路錯誤、無資料）
* 測試腳本可模擬 API 操作，並驗證回傳格式為 JSON
* 為下一章 WebSocket 整合預留 `onmessage` 處理結構與訊息串接方式

這些整合任務將確保你的聊天室從「單向 API」進入「互動應用」的實作階段，並為即時通訊功能奠定穩固基礎。

## 小結

本節完成了 RESTful Client 的初步實作與測試流程設計。你已經學會：

* 透過 Express.js 定義 RESTful 路由
* 使用 JavaScript `fetch()` 呼叫 API 並處理資料
* 建立測試腳本驗證 API 功能

下一章，將進入 WebSocket 的整合，實現聊天室的即時推播能力，完成 NoChat 專案的雙向互動架構。

---

Next: [10.6 WebSocket 即時推播](6-realtime.md)
