## 13.3 使用 Mongoose Driver：語意模型的起點

> Mongoose 不是資料庫驅動，而是語言邏輯的中介層。

延續 13.2 的資料儲存設計，本節將系統性說明如何透過 Mongoose 操作 MongoDB，並與 NoChat 專案結合，建立「語意驅動 × 結構柔性」的開發流程。

---

### ▍語意資料流程概觀

```
Schema → Model → Document → Collection
```

📌 這是 Mongoose 的語意資料流：

* **Schema**：定義結構 → 語意骨架
* **Model**：建立操作實體 → 語意模組
* **Document**：每筆資料 → 一段語言事件
* **Collection**：語言事件的儲存夾 → MongoDB 的文件集

---

### Step 1：安裝 Mongoose 模組

Node.js 透過 `mongoose` 模組與 MongoDB 連線：

```bash
$ cd <your-nodejs-app>
$ npm install mongoose --save
```

📌 `--save` 表示將依賴寫入 `package.json`，確保部署環境一致。

---

### Step 2：連線至 MongoDB 資料庫

使用 `mongoose.connect()` 建立連線：

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://booklog3:123456@ds053130.mongolab.com:53130/booklog3');
```

📌 可替換為 MongoDB Atlas 提供的 URI。

---

### Step 3：處理連線事件

監聽成功與錯誤事件，確保語意通道建立：

```js
mongoose.connection.on('error', function() {
  console.log('MongoDB: error');
});

mongoose.connection.on('open', function() {
  console.log('MongoDB: connected');
});
```

📌 這是語意驅動應用的 handshake 確認。

---

### Step 4：定義 Schema

MongoDB 不強制 Schema，但透過 Mongoose 可以選擇加入「語意結構」，讓每筆資料有預期格式。

以下是一個「Post System」的 schema design 範例，包含標題（title）與內文（content）二個欄位。標題的資料型別（data type）是 *String*，預設值為 ''（空字串）：

```js
var postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String }
});
```

📌 每個欄位即一個語意單元，建構出語言事件的描述結構。

> 🔁 若將 `Post` 改為 `ChatMessage`，就可套用至 NoChat 專案，即「使用者留言 × 對話紀錄」語意模型。

> 🔧 若需自定 collection 名稱，可用：

```js
mongoose.model('Post', postSchema, 'articlePosts');
```

> ⚙️ 可加入 middleware 操作：

```js
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
```

---

### Step 5：宣告 Data Model

MongoDB 是 NoSQL 資料庫系統，其核心資料結構基於「文件（document）」，而非傳統的資料表。

* 每筆資料（例如一位會員）就是一份 document
* 所有文件會被存放在某個 collection（相當於 SQL 的 table）中
* Mongoose 中的 model name 決定 collection 的命名規則

例如：

```js
var Post = mongoose.model('Post', postSchema);
```

上述程式中：

* model 名稱為單數 `Post`
* MongoDB 將其自動轉為複數 `posts` 作為 collection 名稱

📌 想像這像是一個語言事件的分類資料夾 —— collection 是裝著所有對話、文章、紀錄的「語意容器」

定義好 Schema 後，建立 Model：

```js
var Post = mongoose.model('Post', postSchema);
```

📌 `Post` 為語意模組名稱，Mongoose 會自動將其轉為複數 `posts` 作為 Collection 名稱。

* 第一個參數為單數名詞 Model Name
* 第二個參數為語意結構 Schema
* 回傳值為操作資料的物件

> 🧠 若你來自 SQL 世界：Model 就像 table 的操作物件，而你現在能用物件方式，與「無表結構」對話。

---

### Step 6：整合 Express.js 框架

將上述步驟整合至 Express.js 框架，代表我們要根據 Express 架構的規則撰寫程式，並進一步做到以下幾點：

* 將資料模型（data model）傳遞給 Express 的 middleware 層級
* 在 URL routing 階段，能正確取得並使用 model
* 更簡單說，這就是「語意模組的參數傳遞」：從定義 → 傳遞 → 使用

讓資料模型與 Express 中間層整合，才能在 route handler 中正確使用：

```js
var app = express();

app.db = {
  model: {
    Post: Post
  }
};
```

在 Router 中透過 `req.app.db.model.Post` 存取資料模型：

```js
app.get('/1/post/:id', function(req, res) {
  var Post = req.app.db.model.Post;
  // 可進行查詢、編輯等操作
});
```

---

### 小結：Mongoose 作為語意層的價值

Mongoose 不只是 Schema 建構器，它讓資料層擁有語意與預測性。

> 在 NoSQL 的自由結構中，Mongoose 是語意邊界的設計師。

在下一節，我們將以 `Post` 為例，實作完整的 CRUD 操作邏輯，從定義、儲存、查詢，到更新與刪除 —— 語意資料流，將正式啟動。
