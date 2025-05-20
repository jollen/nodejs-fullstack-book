# 9.1 Express Middleware 流程控制

延續第 8 章所建立的觀念，Express.js 中的 Middleware 不僅能針對「所有請求」全域攔截，也能設計為「特定 URL」專屬的流程守門人。

要真正掌握 Middleware 的運作方式，最佳方法就是實作一個具有流程邏輯的案例：**為 ********************************`/hello`******************************** 頁面加上密碼保護。**

> Express 中的 Middleware，不只是「插入一段驗證」，而是將語境處理模組化。
> 它讓流程不再是 `if...else` 疊加，而是清楚分工的語意鏈條——
> 誰處理驗證？誰處理前置資料？誰回應頁面？
> 每層 Middleware 都是一個語意角色。這是語言驅動架構的雛形。

## Middleware 是什麼？

在 Express 中，Middleware 是一種「請求處理函數」，具有 `(req, res, next)` 三個參數。
它的用途不是產生頁面，而是：

* 在請求送到路由前「進行處理」
* 決定是否要繼續流程（呼叫 `next()`）或直接回應（呼叫 `res.send()`）
* 可以被「堆疊」起來，形成一條串行的執行鏈

Express 應用的整體架構，其實是一串 Middleware 串接起來的語意流程。

## Step 1：在 Routing 中加入 Middleware

針對特定 URL 加入 Middleware，可透過 `app.get()` 的第二個參數完成。

```js
app.get('/hello', function (req, res, next) {
  // 這裡是 Middleware
}, hello.index);
```

* 第二個參數是一個 Middleware 函數，會在進入 `hello.index` 前執行
* 若該函數未呼叫 `next()`，請求將無法繼續，畫面會卡住

例如你想用最簡單的方式來驗證密碼，可透過 Query String 傳入密碼：

```js
app.get('/hello', function (req, res, next) {
  if (req.query.passwd === '123456') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}, hello.index);
```

這是 Middleware 最基本的語意：「先檢查條件，符合就繼續，不符就終止」。

📌 密碼寫在網址上並不安全，這裡僅作為 Middleware 實作示範。

## Step 2：認識 Middleware 的流程控制

若你曾省略 `next()`，就會發現瀏覽器一直轉圈圈。

Express 的請求處理鏈是串接式的：

```
[Request]
   ↓
Middleware A (驗證)
   ↓ next()
Middleware B (設定)
   ↓ next()
Handler (送出頁面)
   ↓
[Response]
```

每一層只做一件事，然後交棒。

🧭 **Debug 提示：**
若 Middleware 函數未呼叫 `next()` 或 `res.send()`，Express 將無法繼續處理請求，瀏覽器將持續等待回應。
開發時可加上 log 訊息，確認流程是否卡在某一層：

```js
app.use((req, res, next) => {
  console.log('[進入 Middleware]');
  next();
});
```

## 全域 Middleware：所有請求都會經過

使用 `app.use()` 可註冊「全站適用」的 Middleware，例如記錄請求日誌、設定 CORS 標頭、驗證 API token 等。

```js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

這段程式碼將在每一個請求進入應用時被執行，無論是 `/hello` 或 `/users`，皆會經過。

## Step 3：拆分流程邏輯

為了讓流程更清晰、結構更明確，我們可以拆分為多個獨立的 Middleware：

```js
app.get('/hello', hello.auth);
app.get('/hello', hello.config);
app.get('/hello', hello.index);
```

這表示：

1. `/hello` 的第一層處理是驗證身份（auth）
2. 第二層執行頁面前的準備（config）
3. 第三層才是輸出畫面（index）

對應的 `hello.js` 如下：

```js
exports.auth = function(req, res, next) {
  if (req.query.passwd === '123456') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

exports.config = function(req, res, next) {
  console.log('Preprocessing step...');
  next();
};

exports.index = function(req, res) {
  res.render('hello');
};
```

這就是 **Middleware 的核心設計思維**：一層一責任，每層只處理一件事。

## Step 4：系統觀視角：Middleware 就是語境控制鏈

從架構上來看，每一個 `app.get()` 宣告的 Middleware 都是一個「可插拔的語意模組」，你可以用來：

* 驗證登入
* 記錄日誌
* 前置處理資料
* 注入權限設定
* 攔截錯誤或偵錯資訊

這讓 URL 的背後不再只是「對應畫面」，而是一條語意流程鏈。你不必在畫面處理邏輯中塞入所有條件，而是用 Middleware 把語境邏輯拆成多段獨立模組。

這不只是程式設計技巧，而是系統設計觀。

📉 **Middleware 架構總覽圖**：

```
[Client Request]
      ↓
  app.use()    ← 全域 Middleware
      ↓
app.get('/hello', authMiddleware)
      ↓
      configMiddleware
      ↓
      indexHandler
      ↓
[Client Response]
```

## Step 5：補充 Basic 認證（basicAuth）與現代替代方案

Express 曾內建一個 `basicAuth()` 中介層，可用來快速加上 HTTP 認證框。但因安全性與彈性不足，現已移出核心模組，需另行安裝：

```bash
npm install basic-auth-connect
```

使用方式如下：

```js
const basicAuth = require('basic-auth-connect');

app.get('/hello', basicAuth('jollen', 'abcdef'));
app.get('/hello', hello.index);
```

📌 注意：Basic 認證僅適用於開發測試。正式環境建議使用 session、token 或 JWT 等驗證機制。

## 小結：Middleware 是邏輯分層的權限設計

本節展示了 Express 中 Middleware 的實際運作與設計心法。每個 Middleware 都像是一道「語意過濾器」，決定是否放行、是否轉交，或是中止流程回應錯誤。

這也是從 8.5 節延續下來的重點：Middleware 並非輔助元件，而是語境控制的主幹。

📊 **語意轉換對照：從 if/else 到 Middleware 結構化邏輯**

| 傳統 if...else 程式碼        | Express Middleware 語意結構     |
| ----------------------- | --------------------------- |
| `if (!auth) return`     | `authMiddleware → next()`   |
| `if (!configOK) return` | `configMiddleware → next()` |
| `res.send()`            | `res.render()`（最終 Handler）  |

下一節將進一步展開 View 的動態生成與 Template Engine 的使用。

---

Next: [9.2 MVC 與 HTML Template Engine](2-use.md)
