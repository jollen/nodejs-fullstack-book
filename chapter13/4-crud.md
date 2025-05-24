## 13.4 CRUD 實作：語意資料的最終流轉

> CRUD 不是資料操作，而是語意生命週期的設計。

來到本書最後一章，我們將串連所有先前章節的學習成果 —— 結合 REST 架構、Express.js、Mongoose 與 MongoDB，實作一套完整的「Post System」API，並作為 NoChat 的語意延伸模組。

### Step 1：定義 REST API

下表為五個基本的 CRUD 操作對應的 RESTful API，搭配語意說明：

| 方法     | 路徑           | 說明     | 語意角色   |
| ------ | ------------ | ------ | ------ |
| GET    | /1/post/\:id | 讀取單篇文章 | 回憶語言事件 |
| GET    | /1/post      | 讀取所有文章 | 檢索語意集合 |
| POST   | /1/post      | 新增文章   | 生成語言紀錄 |
| DELETE | /1/post/\:id | 刪除文章   | 終止語言紀錄 |
| PUT    | /1/post/\:id | 更新文章   | 修訂語言內容 |

這些路由定義不只是資料操作 API，更是語意對話的資料存取入口。

### Step 2：讀取單篇文章的 API

觀念要點：

* 從 URL path 裡讀取文章編號的參數（即 `:id`），通常以 `_id` 作為主要的查詢條件，確保查詢結果唯一

* 使用 Mongoose 的 `findOne()` 方法來查詢單一文件，配 `_id` 作為 query 條件

* `_id` 是 MongoDB 自動產生的唯一鍵，MongoDB 會為每份文件自動加入 `_id` 欄位，作為唯一識別碼（unique ID）

```js
1 app.get('/1/post/:id', function(req, res) {
2   var id = req.params.id;
3   var model = req.app.db.model.Post;

4   model.findOne({ _id: id }, function(err, post) {
5     res.send({ post: post });
6   });
7 });
```

範例解說：

📌 **第 1 行**：定義 REST API－ GET /1/post/\:id，讀取指定文章內容，並透過 URL 傳入文章的 `id`

📌 **第 2 行**：透過 `req.params.id` 取得 URL 參數 `:id`

📌 **第 3 行**：透過 `req.app.db.model.Post` 取得資料模型（data model）

📌 **第 4 行**：使用 `findOne()` 查詢符合 `_id` 的文件

📌 **第 5 行**：查詢結果回傳後，包裝成物件並送出

### Step 3：讀取所有文章的 API

觀念要點：

* 使用 Mongoose 的 `find()` 方法
* 第一個參數是 query criteria（查詢條件）
* 當條件為空 `{}`，表示「查詢所有文件」

```js
1 app.get('/1/post', function(req, res) {
2   var model = req.app.db.model.Post;

3   model.find({}, function(err, posts) {
4     res.send({ posts: posts });
5   });
6 });
```

範例解說：

📌 **第 1 行**：定義 REST API－GET /1/post，讀取所有文章資料

📌 **第 2 行**：取得 Post 的資料模型（MongoDB）

📌 **第 3 行**：查詢全部文件，`{}` 表示無條件

📌 **第 4 行**：將查詢結果以 `posts` 陣列回傳

### Step 4：新增一篇文章的 API

&#x20;觀念要點：

* 前端透過表單送出資料（使用 body-parser）
* 使用 `new model()` 產生一份新的語意文件，再 `save()` 儲存

```js
1 app.post('/1/post', function(req, res) {
2   var model = req.app.db.model.Post;

3   var title = req.body.title;
4   var content = req.body.content;

5   var post = { title: title, content: content };
6   var instance = new model(post);

7   instance.save(function(err, post) {
8     res.send(post);
9   });
10 });
```

範例解說：

📌 **第 1 行**：定義 REST API－ POST /1/post，接收新增文章請求

📌 **第 2 行**：取得 Post 模型

📌 **第 3–4 行**：從 HTTP body 取得 title 與 content

📌 **第 5 行**：將資料組成新物件

📌 **第 6 行**：建立新的 model 實例（即一筆文件）

📌 **第 7 行**：呼叫 `.save()` 儲存文件

📌 **第 8 行**：將新增結果回傳

### Step 5：刪除一篇文章的 API

觀念要點：

* 使用 `_id` 作為查詢條件，指定欲刪除的文件
* 使用 Mongoose 的 `findByIdAndRemove()` 方法，傳入欲刪除的 ID

```js
1 app.delete('/1/post/:id', function(req, res) {
2   var model = req.app.db.model.Post;
3   var _id = req.params.id;

4   model.findByIdAndRemove(_id, function(err, post) {
5     res.send(post);
6   });
7 });
```

範例解說：

📌 **第 1 行**：定義 REST API－DELETE /1/post/\:id ，刪除指定文章

📌 **第 2 行**：取得 Post 模型

📌 **第 3 行**：從參數中取出 \_id

📌 **第 4 行**：呼叫 `.findByIdAndRemove()` 刪除對應文件

📌 **第 5 行**：將刪除結果回傳

### Step 6：更新一篇文章的 API

觀念要點：

* 使用 `_id` 作為查詢條件，找尋欲更新的文件
* 使用 Mongoose 的 `update()` 方法，第一個參數為查詢條件，第二個參數為要更新的欄位與值

```js
1 app.put('/1/post/:id', function(req, res) {
2   var model = req.app.db.model.Post;
3   var id = req.params.id;

4   var fieldsToSet = {
5     title: req.body.title,
6     content: req.body.content
7   };

8   model.update({ _id: id }, fieldsToSet, function(err, numAffected) {
9     res.send({ numAffected: numAffected });
10   });
11 });
```

範例解說：

📌 **第 1 行**：定義 REST API－PUT /1/post/\:id，更新指定文章內容

📌 **第 2 行**：取得 Post 模型

📌 **第 3 行**：從 URL 中讀取欲更新的文章 ID

📌 **第 4–7 行**：組成更新欄位物件

📌 **第 8 行**：以 `_id` 作為條件，使用 `.update()` 更新文件

📌 **第 9 行**：回傳影響筆數（numAffected）

### 資料驗證補強建議（防止空值輸入）

在 Step 4 的 POST API 中，為強化語意資料的完整性，建議加入欄位驗證：

```js
if (!title || !content) {
  return res.status(400).send({ error: 'Title 與 content 不可為空' });
}
```

語意資料的誕生也需要邏輯約束 —— 驗證是語言輸入的守門人。

### 查詢條件進階補強：分頁與排序建議

當文章數量漸增，可搭配 `.sort()` 與 `.limit()` 實作語意流的切片：

```js
model.find({}).sort({ createdAt: -1 }).limit(20);
```

語言資料若無秩序與邊界，將難以管理。這是從語意流轉邁向語意結構的第一步。

### NoChat 上線部署提醒

若你打算將本專案部署上線，請留意以下安全與維運事項：

* 將資料庫連線字串改為環境變數：`process.env.MONGODB_URI`
* 所有 API 加入身分驗證機制（如 JWT）
* 統一錯誤處理格式，避免直接暴露 `err.stack`
* 搭配 `morgan` 記錄存取行為，搭配 `PM2` 進行進程管理

開發不只是把功能做出來，更是設計能穩定運作的語意應用。

### 範例原始碼

完整範例可參考：
[https://github.com/jollen/my-booklog/tree/mongodb](https://github.com/jollen/my-booklog/tree/mongodb)

### 語意流程總覽圖：CRUD × 語言生命週期

```
使用者輸入
  ↓
POST → Document 建立（語言生成）
  ↓
GET → Document 查詢（語意回憶）
  ↓
PUT → Document 更新（語意修正）
  ↓
DELETE → Document 刪除（語意終止）
```

 每一個 CRUD 操作，都是語言資料在應用場景中的一種「變態」與「輪迴」。

### 技術詞彙小辭典：語意資料模型快速對照

| 概念   | 對應術語       | 語意說明              |
| ---- | ---------- | ----------------- |
| 結構定義 | Schema     | 語言輸入的語法規範與格式約定    |
| 資料模組 | Model      | 資料操作的語意模組（可 CRUD） |
| 資料實體 | Document   | 每筆語言資料，如一段留言或一篇文  |
| 資料集合 | Collection | 多筆同型資料的儲存容器       |
| 操作語意 | CRUD       | 對語言資料的創建、回顧、修正、終止 |

### NoChat 最終整合指南：CRUD 與即時訊息共構語意層

* **新增訊息**：原本已用 `WebSocket + ChatMessage.save()` 儲存語意事件
* **查詢歷史訊息**：可使用 `GET /1/post` 讓管理員查閱對話紀錄
* **更新訊息**：結合 `PUT` API，可製作「編輯訊息」功能
* **刪除訊息**：串接 `DELETE` API，實作「訊息撤回」

將 WebSocket 與 REST API 結合，即是「即時語意 × 歷史語意」的雙軌資料流。

### 本書總結

在本書的最後，我們以最經典的 CRUD 做總結。從 JavaScript 設計模式，到 WebSocket 的即時溝通，從 Schema 的語意結構，到 MongoDB 的語言容器 —— 我們一路走來，學的不是技術，而是 Node.js 軟體思惟與設計方法。
