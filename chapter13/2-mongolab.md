## 13.2 安裝 MongoDB 資料庫伺服器

> 選擇資料庫，不只是安裝軟體，而是選擇一種與資料互動的方式。

### ▍實作場景：讓 NoChat 儲存聊天紀錄

在本節，我們將延續第 8 章的 NoChat 專案，讓這個即時聊天系統，能夠將使用者訊息永久保存至 MongoDB 資料庫中。這不僅是後端功能的延伸，更是語意資料流的起點：讓語言輸入變成可持續追蹤的歷史事件。

---

### ▍方式一：本地安裝 MongoDB

若你希望在本機端建構完整測試環境，可依作業系統參考下列官方安裝指南：

* macOS：[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
* Linux：[https://docs.mongodb.com/manual/administration/install-on-linux/](https://docs.mongodb.com/manual/administration/install-on-linux/)
* Windows：[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

安裝後，可使用以下指令啟動 MongoDB：

```bash
brew services start mongodb-community
```

開啟 Mongo Shell 測試是否正常運作：

```bash
mongo
show dbs
```

預設情況下，MongoDB 會在 `mongodb://localhost:27017` 運行。

---

### ▍方式二：使用 MongoDB Atlas（前身 MongoLab）

若你希望立即進入開發狀態，建議使用 **MongoDB Atlas 雲端平台**（[https://www.mongodb.com/cloud/atlas），這是](https://www.mongodb.com/cloud/atlas），這是) MongoDB 官方所提供的 Database-as-a-Service，取代早期的 MongoLab。

申請免費帳號後，你可以：

* 建立一個免費 Cluster（選擇 AWS/GCP/Azure 任一區域）
* 建立資料庫與使用者帳號
* 產生一組連線字串 URI，例如：

```bash
mongodb+srv://user:password@cluster0.mongodb.net/nochat?retryWrites=true&w=majority
```

#### 🔍 URI 結構說明：

* `user:password`：MongoDB 使用者帳密
* `cluster0.mongodb.net`：你的雲端資料庫位址
* `nochat`：目標資料庫名稱
* `?retryWrites=true&w=majority`：寫入容錯與複寫設定

這串 URI 是我們之後用來連接 MongoDB 的關鍵，也是整個資料流進入點。

---

### ▍使用 Mongoose：為 MongoDB 建立語意層

[Mongoose](https://mongoosejs.com) 是一個 ODM（Object Data Modeling）工具，可讓你用 JavaScript 物件方式操作 MongoDB 文件。安裝方式如下：

```bash
npm install mongoose --save
```

在 NoChat 專案中建立 `db.js`，並加入以下連線程式碼（已加上行號）：

```js
1 const mongoose = require('mongoose');

2 mongoose.connect('你的 MongoDB URI', {
3   useNewUrlParser: true, // 使用新版 URI 解析器
4   useUnifiedTopology: true // 使用新版 Topology 引擎
5 });

6 const db = mongoose.connection;
7 db.on('error', console.error.bind(console, 'MongoDB 連線錯誤:'));
8 db.once('open', () => {
9   console.log('已成功連接 MongoDB 資料庫');
10 });
```

📌 **第 1 行**：引入 Mongoose 模組，啟動整個語意層的橋接器。

📌 **第 2～5 行**：透過 `connect()` 方法與 MongoDB 建立連線，並設定新版本的連線解析與拓撲引擎以提高穩定性與相容性。

📌 **第 6 行**：取得 connection 物件，作為後續監聽與狀態操作的基礎。

📌 **第 7 行**：註冊錯誤監聽，確保若資料庫無法連線可即時顯示錯誤。

📌 **第 8～10 行**：當成功開啟連線時輸出提示，只執行一次，代表語意層的初始化已完成。

---

### ▍語意建模：定義 Chat 訊息模型

接著，定義一個儲存聊天紀錄的模型 `ChatMessage`：

```js
1 // models/ChatMessage.js
2 const mongoose = require('mongoose');

3 const ChatMessageSchema = new mongoose.Schema({
4   user: { type: String, required: true },
5   message: { type: String, required: true },
6   timestamp: {
7     type: Date,
8     default: Date.now
9   }
10 });

11 module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
```

📌 **第 2 行**：引入 Mongoose，用以定義資料模型的語意骨架。

📌 **第 3 行**：使用 `mongoose.Schema()` 宣告一份新的文件結構，也就是資料的語意模板。

📌 **第 4–5 行**：定義欄位 `user` 與 `message`，皆為必填文字。這是最基本的語意單元（誰說了什麼）。

📌 **第 6–9 行**：定義 `timestamp` 欄位，預設為 `Date.now`，自動記錄訊息產生時間 —— 就像語言事件的時間戳。

📌 **第 11 行**：透過 `mongoose.model()` 建立並輸出一個可被應用的模型實體 `ChatMessage`，供後續程式呼叫與操作。

這就是我們的語意單元，每則聊天訊息，都是一份帶時間戳的語言文件。

---

### ▍整合應用：儲存聊天訊息

在處理 WebSocket 的訊息接收處，加入寫入資料庫的行為，以下是加上行號與說明的程式碼：

```js
1 const ChatMessage = require('./models/ChatMessage');

2 socket.on('chat message', async (msg) => {
3   try {
4     const newMessage = new ChatMessage({ user: socket.username, message: msg });
5     await newMessage.save();
6   } catch (err) {
7     console.error('訊息儲存失敗:', err);
8   }

9   io.emit('chat message', msg);
10 });
```

📌 **第 1 行**：引入剛才定義的 ChatMessage 模型，準備儲存使用者訊息。

📌 **第 2 行**：監聽 `chat message` 事件，此事件由前端透過 WebSocket 傳送。

📌 **第 3–5 行**：建立新訊息實例，包含使用者與訊息內容，並儲存至 MongoDB。

📌 **第 6–8 行**：用 `try/catch` 捕捉可能的錯誤，避免資料庫錯誤造成伺服器中斷。

📌 **第 9 行**：使用 `io.emit` 廣播此訊息給所有連線使用者。

📌 **第 10 行**：結束事件處理函式。

這段程式碼的意義在於：

> 所有語言輸出，都成為一份被封存的語意事件。

---

### ▍可視化工具推薦：MongoDB Compass

建議初學者安裝 [MongoDB Compass](https://www.mongodb.com/products/compass)，這是一款由官方推出的圖形化操作介面，可視覺化地瀏覽資料庫內容、查詢文件與除錯，有助於建立資料結構的直觀理解。

---

至此，NoChat 已具備語意持續性的能力，從即時對話轉化為長期資料紀錄 —— 而 MongoDB，不再只是資料庫，而是語言流的歷史容器。

---

## 13.2.1 db.js 程式逐行解說

> 資料庫的連線，不只是開啟通道，而是初始化語意互動。

以下為 `db.js` 的實作程式碼與逐行說明：

```js
// db.js
const mongoose = require('mongoose');
```

📌 引入 Mongoose 模組，這是用來與 MongoDB 溝通的 ODM 工具（Object Data Modeling）。就像是一層「語意中介」，讓我們用物件思維操作資料庫。

```js
mongoose.connect('你的 MongoDB URI', {
  useNewUrlParser: true, // 使用新版 URL 解析器，避免舊版警告
  useUnifiedTopology: true // 啟用新的拓撲引擎，提高連線穩定性
});
```

📌 建立與 MongoDB 的連線：

* `connect()` 是 Mongoose 的連線方法
* `MongoDB URI` 是資料庫入口點（雲端或本地）
* 設定物件中的參數是為了避免過時警告，並採用官方推薦的新機制

```js
const db = mongoose.connection;
```

📌 取得目前連線的資料庫物件（connection instance）。這個物件可以監聽事件、進行操作。

```js
db.on('error', console.error.bind(console, 'MongoDB 連線錯誤:'));
```

📌 註冊一個監聽器：當連線發生錯誤時，將錯誤訊息輸出至終端機。

* `on('error', ...)` 是 Node.js 的事件語法
* `bind()` 綁定錯誤標頭字串與錯誤內容

```js
db.once('open', () => {
  console.log('已成功連接 MongoDB 資料庫');
});
```

📌 當連線成功並首次打開時觸發 `open` 事件。

* 使用 `once` 確保只執行一次
* 輸出提示訊息，確認連線成功

---

### 總結

這段 `db.js` 看似簡短，其實扮演整個應用程式「資料語境初始化」的角色。連線成功之後，整個語意層（Mongoose Schema、Model、CRUD 操作）才能展開。

> 在語意應用系統中，連線不是開始，是語意交換的協議確認。

---

## 13.2.2 MongoDB 資料操作起手式

> 儲存，是語意封存；查詢，是語意還原。

為了讓 13 章不只是連線成功、資料入庫，我們需要展開更多操作手勢。這一節將呈現三個起手式範例，作為進入資料操作（CRUD）與 API 實作的預備節奏。

---

### ▍1. 查詢歷史訊息

啟動時從資料庫中拉取聊天歷史，並推送給新加入的使用者：

```js
ChatMessage.find().sort({ timestamp: 1 }).limit(50).exec((err, messages) => {
  if (!err) {
    socket.emit('chat history', messages);
  }
});
```

📌 用 `.find()` 撈出全部紀錄，搭配 `.sort()` 依時間排序，`.limit()` 限制數量，是初階語意流回復的範型。

---

### ▍2. 建立簡易 RESTful API：查詢最新訊息

可作為後續 Chat Logs 頁面資料來源，也鋪路進入 Express Router 與 REST 設計章節：

```js
app.get('/messages', async (req, res) => {
  const messages = await ChatMessage.find().sort({ timestamp: -1 }).limit(100);
  res.json(messages);
});
```

📌 這是一個「語言檢索 API」：讓資料不再只是寫入，而能供未來回顧、串接、視覺化。

---

### ▍3. 刪除操作：開發用 or 定期清除

#### 刪除所有訊息：

```js
await ChatMessage.deleteMany({});
```

📌 常用於開發階段重置資料庫，注意勿誤用於正式環境。

#### 刪除 7 天前訊息：

```js
const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
await ChatMessage.deleteMany({ timestamp: { $lt: cutoff } });
```

📌 為後續介紹「排程任務」、「伺服器維運策略」提供語意鉤子。

---

這些範例不只完成任務，更打開了一條語意流程設計的路徑 —— MongoDB 是語言流的容器，而這些操作，則是語境的調度儀。
