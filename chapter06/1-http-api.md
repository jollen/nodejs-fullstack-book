# 6.1 再探 HTTP API

在第 5 章，我們從 Lambda、Callback 到 async/await，梳理了 JavaScript 在語言層次上對「流程控制」與「時間邏輯」的表達方式。

但語言只是第一層。語言處理的是「如何寫程式」，而 Web Service 則處理「系統之間如何說話」。

> 換句話說：第 5 章討論控制權，第 6 章開始討論資源與結構。

若說 async/await 是讓程式更能掌握時間，那麼 Web Service 架構就是讓程式彼此交換語意與資料 —— 且要讓交換有標準、有結構、有邏輯。

延續第 5 章，本節將切入 Web Service 架構的核心議題，並引出 RESTful 架構的精神。理解 RESTful，必須先回到 HTTP API 的設計思維。

最直接的方式，就是從 HTTP API 的請求與回應開始談起。以下是一個典型的 HTTP API 例子：

```text
http://www.moko365.com/api/query?t=users
```

當使用者（Client）透過 HTTP 協定發出此請求，伺服器（Server）將以 JSON 格式回應結果，例如：

```json
{
  "online": 10
}
```

這裡的 JSON 格式是自定義的，資料內容描述了目前有 10 位使用者在線上。這種 API 寫法，就是一種 CGI（Common Gateway Interface）風格的設計觀念，也就是傳統 Web 程式最常使用的架構。

## Query String 與 HTTP 方法

為了具體說明 `GET` 與 `POST` 方法的使用差異，我們可以比較以下兩種請求方式：

### 使用 GET 方法（參數附在 URL）：

```http
GET /api/add_user.php?username=james&type=admin HTTP/1.1
```

適用情境：讀取操作、不涉及敏感資料、可被快取。

### 使用 POST 方法（參數放在 request body）：

```http
POST /api/add_user.php HTTP/1.1
Content-Type: application/x-www-form-urlencoded

username=james&type=admin
```

適用情境：新增／修改資料、提交表單、包含密碼等敏感資訊。

雖然兩者都可以傳遞參數，但從語意設計的角度來看，應該讓方法對應行為 —— GET 負責查詢，POST 負責新增或修改。

在上述範例中，問號（`?`）後方的字串稱為 Query String，用來將參數傳送給伺服器。以 `t=users` 為例，這段資料會成為伺服器端用來查詢的依據。

傳遞 Query String 的方式主要有兩種：

- 使用 HTTP 的 `GET` 方法
- 使用 HTTP 的 `POST` 方法

而 HTTP API 通常會以 URL 的形式來設計介面，因此會與 `GET` 或 `POST` 方法搭配使用。

然而，這種功能導向的 HTTP API 撰寫方式，存在一些問題：

```text
http://www.moko365.com/api/add_user.php?username=james&type=admin&email=who@anywhere.com
```

這段 API 實際上等同於以下 HTTP 請求：

```http
GET /api/add_user.php?username=james&type=admin&email=who@anywhere.com HTTP/1.1
```

問題在於：

- API 形式冗長，不夠精簡
- Server 架構不容易維護與擴充
- 功能導向（add_user.php）不易對應「資源」這個概念（如：使用者本身）

## Web Service 實作的探索

這種設計模式雖然簡單直觀，也仍然有其使用場景，但隨著系統規模與整合需求提升，我們需要更嚴謹、更標準化的 Web Service 架構。

SOAP（Simple Object Access Protocol）就是這種背景下提出的技術標準。它的主要特性包括：

- 所有請求與回應均採用 XML 格式
- API 呼叫格式簡潔統一
- 強調交換資料格式的標準化

SOAP 的出現，彌補了傳統 CGI/HTTP API 在系統整合上的劣勢。因為當資料交換缺乏標準，不同服務提供者之間的系統將無法互通，維護與合作成本高昂。

總結來說，SOAP 的貢獻不只是「結構化資料」，更在於**為資料流通建立標準協議**。

但標準並不等於易用，SOAP 的繁複 XML 結構與實作成本，也逐漸促成 RESTful 架構的誕生 —— 一種回歸 HTTP 原生語意、以資源為主體的服務設計思維。

## 6.1.1 Node.js 初體驗－HTTP GET 實戰

延續上節，我們可以透過一個簡單的 Node.js 應用程式，實際體驗 HTTP API 的基本概念與語法結構。本範例將採用第 5 章介紹過的 ES6 語法特性，包含 const、箭頭函數、模組化與 async/await。

### 建立一個簡單的 HTTP Server

以下是一個接收 GET 請求並回傳 JSON 的 Node.js 程式：

#### ES6 寫法
```javascript
// line 1
import http from 'http';
import url from 'url';

// line 4
const PORT = 3000;

// line 6
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (req.method === 'GET' && pathname === '/api/query') {
    if (query.t === 'users') {
      const data = { online: 10 };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

// line 21
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

### 使用方式

1. 將程式碼儲存為 `server.mjs`（需使用 `.mjs` 副檔名才能支援 ES6 模組語法）
2. 在終端機執行：
```bash
node server.mjs
```
3. 開啟瀏覽器或使用 curl：
```bash
curl "http://localhost:3000/api/query?t=users"
```
4. 預期回傳結果：
```json
{
  "online": 10
}
```

這段程式碼運用了：
- const 與箭頭函數簡化邏輯定義
- 模組化引入核心套件 `http` 與 `url`
- `url.parse()` 處理 Query String
- 條件分支控制路由與參數檢查
- JSON 物件作為語意回應

### 小結

這個簡單的 Web Service 範例，是一種「功能導向」的 HTTP API 設計方式。下一節，我們將探討 REST 架構如何以「資源導向」重新思考 API 設計。

---

Next: [6.2 REST](2-rest.md)
