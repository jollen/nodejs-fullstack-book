# 10.4 Express.js 與 REST API

在本節中，我們將透過實作觀點，掌握 Express.js 作為 Web Framework 時，如何實現 RESTful API 架構。這不只是 URL 與函數的對應，更是將前章的「3-Tier × 資料服務設計」具體化的實作關鍵。

## Express.js 中的 CRUD 對應

Express.js 提供與 HTTP Method 對應的函數，正好對應到 REST 架構的四大基本操作（CRUD）：

| CRUD 操作 | HTTP Method | Express.js 函數  |
| ------- | ----------- | -------------- |
| Create  | POST        | `app.post()`   |
| Read    | GET         | `app.get()`    |
| Update  | PUT         | `app.put()`    |
| Delete  | DELETE      | `app.delete()` |

（表 10-1 REST API 定義）

只要能掌握上述對應關係，就能清楚地針對不同的業務邏輯與資源操作，實作出具有語意清晰結構的 REST API。舉例來說：

```js
01 app.get('/', routes.index);    // 讀取首頁
02 app.post('/', routes.index_add); // 新增內容
```

這代表同樣的 URL，可以依據不同的 HTTP Method 進行不同操作。

## 動態路由參數：實作資源變數化 URI

REST 的核心在於「資源導向」，所以 URI 不該針對個別資源硬編寫。例如：

```js
app.get('/user/jollen', user.jollen);    // 錯誤寫法
app.get('/user/ellaine', user.ellaine);  // 錯誤寫法
```

這種寫法破壞了 URI 的結構性與可擴展性。正確做法是引入「參數化路由」：

```js
01 app.get('/user/:username', user.index); // 正確寫法
```

Express.js 允許以 `:變數名` 方式定義動態路由。只要 URL 符合 `/user/任意值` 格式，就會被導向至 `user.index` handler。

接著，在 handler 裡讀取參數值：

```js
01 exports.index = function(req, res) {
02   res.send("Welcome " + req.params.username);
03 };
```

在這裡，`:username` 被對應為 `req.params.username`，這就是 Express.js 將 URI 視為語意接口的實作方式。

如果使用者訪問：

```
http://localhost:3000/user/jollen
```

畫面就會回應：

```
Welcome jollen
```

如下圖所示：

![圖 10-2 範例的執行結果](../images/figure-10_2.png)

## NoChat 專案延伸：REST API 擴充實作

在 `nodejs-chat` 專案的基礎上，我們可以延伸實作 REST API，讓聊天室支援 Client-Side 資料互動。以下是擴充步驟：

### 步驟 1：新增 GET `/api/messages`

**用途**：用於 Client 端取得最近 20 筆歷史訊息。

```js
01 app.get('/api/messages', (req, res) => {
02   const lastMessages = messages.slice(-20);
03   res.json(lastMessages);
04 });
```

### 步驟 2：新增 POST `/api/messages`

**用途**：接收使用者送出的新訊息，加入訊息列表。

```js
01 app.post('/api/messages', (req, res) => {
02   const msg = {
03     user: req.body.user,
04     text: req.body.text,
05     timestamp: Date.now()
06   };
07   messages.push(msg);
08   res.status(201).json({ status: 'ok' });
09 });
```

⚠️ 注意：請確認已在應用中註冊 `express.json()` middleware：

```js
app.use(express.json());
```

### 步驟 3：API 路由模組化（建議）

除了集中定義路由外，我們可將 REST API 拆分為獨立模組，維持主程式結構簡潔。以下為 `routes/api.js` 的實作範例：

```js
// routes/api.js
const express = require('express');
const router = express.Router();

router.get('/messages', (req, res) => {
  res.json(messages.slice(-20));
});

router.post('/messages', (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: 'Missing user or text' });
  }
  const msg = { user, text, timestamp: Date.now() };
  messages.push(msg);
  res.status(201).json({ status: 'ok' });
});

module.exports = router;
```

在主程式 `index.js` 中匯入模組並掛載：

可將上述 API 拆分為獨立檔案 `routes/api.js`，並在主程式 `index.js` 中加入：

```js
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
```

這樣可將 View 層與 API 層邏輯分離，提升專案維護性。

---

## RESTful 架構原則 × Express.js 實作

從開發者角度回顧，我們可以整理出 RESTful 架構下的四大實作原則：

1. **使用 HTTP Method 實作 CRUD**（參見第 6.3 節與表 6-1）
2. **Stateless：每一次請求均為獨立事件，不儲存狀態**
3. **URI 結構應具備語意階層性**（參見第 6.1、6.2 節）
4. **使用 JSON 作為資料交換格式**（參見第 2.12 節與第 4 章）

這些原則，幾乎都能透過 Express.js 直觀實作，這也是為什麼它成為 Node.js 初學者進入 REST 架構的首選框架。

## 實作任務：整合 REST API 至 NoChat

完成本節學習後，請將以下內容整合進 `nodejs-chat` 專案，強化對 REST 架構的理解與實戰能力：

* 建立 `/api/messages` 路由模組，並採用 `express.Router()` 進行封裝。
* 將 GET 與 POST API 與現有前端頁面串接，完成聊天室初始訊息載入與新訊息送出功能。
* 強化 POST API 的錯誤處理與輸入驗證。
* 可額外設計 PUT 與 DELETE 功能，以支援訊息編輯與移除。

透過這些實作任務，將完整體驗 RESTful API 在 3-Tier 架構中的邏輯定位，並為下一章前端整合做好準備。

---

## 應用實例：nodejs-chat 專案中的 REST API

在實作 nodejs-chat 專案的 Server 端時，建議加入以下功能模組，作為 RESTful 設計的實踐場域：

* 提供 GET API `/messages`：回傳最新 n 筆訊息（以 JSON 格式）
* 提供 POST API `/messages`：接收使用者輸入的訊息，並儲存至記憶體或資料庫中

未來進一步擴充時，也可加入：

* PUT `/messages/:id`：修改既有訊息內容
* DELETE `/messages/:id`：刪除特定訊息

這些 API 的實作，不只讓應用程式具備邏輯分離與維運彈性，也將為下一章（10.5 Chat Client）鋪設前端呼叫的資料路徑。

---

Next: [10.5 Node.js Chat Client](5-chat-client.md)
