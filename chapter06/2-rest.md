# 6.2 REST

SOAP 雖然標準嚴謹，但實作成本高，過於繁複。為了尋求一種簡潔、易於實作且貼近 HTTP 原生語意的架構，Roy Fielding 博士於 2000 年提出了 REST（Representational State Transfer）—— 一種基於 Web 的軟體架構風格。

Fielding 是 Apache HTTP Server 的共同創辦人之一，他的博士論文便提出了 REST 架構，其核心思想奠基於 HTTP 協定的語意設計。

## 6.2.1 REST 架構的思維：從資源出發

REST 並不是一種技術或語言，而是一種設計風格。RESTful Web API 的關鍵，在於以「資源」為單位，而非「功能」為導向來定義 API。

舉例：若要新增一位名為 James 的使用者，REST 的設計流程如下：

### Step 1：確認資源項目

資源名稱為 user，因此 API URL 可為：

```text
http://www.moko365.com/resource/user
```

### Step 2：定位特定資源

要描述 "James" 這位使用者，應使用路徑延伸：

```text
http://www.moko365.com/resource/user/james
```

### Step 3：對資源進行操作（CRUD）

針對資源的基本操作對應如下：

| 操作       | HTTP 方法 | 意義     |
|------------|-----------|----------|
| Create     | POST      | 建立資源 |
| Read       | GET       | 讀取資源 |
| Update     | PUT       | 更新資源 |
| Delete     | DELETE    | 刪除資源 |

使用範例：

```http
POST /resource/user/james HTTP/1.1
```

表示對 `user/james` 資源執行「新增」操作。

## 6.2.2 REST vs 功能導向：思維差異

以 NoChat 系統為例，原本若採功能導向設計，API 如下：

```http
http://localhost:8080/send?m=hello
```

改寫為 RESTful 架構：

```http
POST http://localhost:8080/resource/message/hello
```

語意上改變如下：

- `/send` 是功能，說明要「做一件事」
- `/resource/message/hello` 是資料，說明要「處理某個資源」
- 使用 POST 表示新增一筆訊息內容 `hello`

類似地，若想讀取所有訊息，傳統方式可能是：

```http
http://localhost:8080/query?type=all
```

REST 寫法則為：

```http
GET http://localhost:8080/resource/message
```

REST 將所有操作簡化為：資源（URI）+ 方法（HTTP Method）= 意圖（語意）。

## 6.2.3 URI 命名設計的語意規則

在 REST 架構中，URL（或稱 URI）並不代表動作，而是標示資源的位置。操作的語意，交由 HTTP Method 來描述。為了讓 API 結構更清晰，常見的 URI 設計原則如下：

| 類型         | URI 寫法                        | 說明                       |
|--------------|----------------------------------|----------------------------|
| 資源集合     | `/users`                         | 所有使用者資源             |
| 資源單一項目 | `/users/james`                  | 特定使用者                 |
| 子資源       | `/users/james/messages`          | 某位使用者的訊息集合       |
| 篩選查詢     | `/users?role=admin&active=true` | 使用查詢參數進行過濾       |

REST 的核心精神之一，即是**資源名稱（名詞）放進 URL，操作行為（動詞）交由 HTTP Method 負責**。這讓 API 更符合語言邏輯，並易於閱讀與維護。

## 6.2.4 Express.js 與 RESTful 路由預告

在 REST 架構中，若要對不同資源與行為做出應對，URL Routing 的邏輯必須清楚定義。

以 Express.js 框架為例，它提供了非常直觀的方式來實作 RESTful API：

```javascript
// POST /users：新增使用者
app.post('/users', (req, res) => {
  // 處理新增邏輯
});

// GET /users：讀取所有使用者
app.get('/users', (req, res) => {
  // 回傳使用者清單
});

// GET /users/:id：讀取特定使用者
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  // 回傳 id 對應的使用者資料
});
```

從這些語法可以看到：**URL 對應資源，Method 對應動作，語意一目了然。**

我們將在第 8 章正式導入 Express.js，並實作這樣一套 RESTful 架構的 Web Service。

## 6.2.5 小結與思維轉換圖解（選讀）

可以將 REST 的資源導向思維，整理為以下邏輯圖：

```
[資源：/users] → GET → 讀取使用者
                POST → 新增使用者
[資源：/users/:id] → GET → 讀取特定使用者
                    PUT → 更新使用者
                    DELETE → 刪除使用者
```

從這個角度看，REST 並非只是另一種 API 寫法，而是一種**重新設計資料與操作關係的語言結構觀**。

## 6.2.6 後續實作與框架導入

REST 架構對程式邏輯與 URL Routing 有結構性要求。在第 3 章與第 4 章中，我們是以原生方式實作 routing。若要轉向 RESTful 架構，需調整路由設計與方法解析。

實務上，我們不會手寫所有 routing 規則，而是引入專業的 Web 應用框架。

目前最常與 Node.js 搭配的框架是 [Express.js](http://expressjs.com/)。它提供：

- 基於路徑與方法的 routing 規則定義
- middleware 機制
- JSON 自動處理
- 與 REST 架構自然接軌的 API 設計方式

在第 8 章，我們將正式導入 Express.js，並用它來實作完整的 RESTful Web API。
