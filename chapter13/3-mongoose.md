## 13.3 使用 Mongoose Driver

Mongoose 是 Node.js 的 MongoDB Driver。使用 Node.js 來操作 MongoDB 資料庫的做法如下。

### Step 1: 安裝 mongoose 模組

Node.js 透過 mongoose 模組與 MongoDB 資料庫連線。安裝 mongoose 模組：

$ cd <your-nodejs-app>
$ npm i mongoose --save

### Step 2: 連線到 MongoDB 資料庫

呼叫 mongoose.connect() 連線到 MongDB 資料庫伺服器。連線時，指定資料庫名稱，例如：booklog3。

~~~~~~~~
var mongoose = require('mongoose');
mongoose.connect('mongodb://booklog3:123456@ds053130.mongolab.com:53130/booklog3');
~~~~~~~~



### Step 3: 事件處理

處理連線成功與失敗的事件：

~~~~~~~~
mongoose.connection.on('error', function() {
  console.log('MongoDB: error');
});
mongoose.connection.on('open', function() {
  console.log('MongoDB: connected');
});
~~~~~~~~

### Step 4: 定義 Schema

NoSQL 資料庫的特色是不需要 schema。因此，使用 MongoDB 時可以在 has schema 或 no schema 間做選擇。Schema 等同於 SQL 資料庫的 table 定義。以下是一個簡單的 schema design 範例：

var postSchema = new mongoose.Schema({
    title  :  { type: String }
  , content   :  { type: String }
});

這是一個「Post System」的 schema design，包含標題（title）與內文（content）二個欄位。標題的資料型別（data type）是 *String*，預設值為 ''（空字串）。

### Step 5: 宣告 Data Model

定義好 schema 後，再宣告 data model：

~~~~~~~~
var Post = mongoose.model('Post', postSchema);
~~~~~~~~

呼叫 ** mongoose.model()** 來宣告 data model，參數與回傳值說明如下：

* 第一個參數是 model name，必須填寫「單數」的名詞
* 第二個參數是 schema
* 回傳值（即 **Post**）就是 data model，可用來操作該資料庫（即 CRUD）

MongoDB 是 NoSQL 資料庫系統，簡單來說，這是一種使用文件系統（document）來儲存資料的系統。每筆資料（例如：每一個會員）都是一份文件（document），這些文件，都儲放在同一個資料夾（folder）裡。NoSQL 資料庫把資料夾稱為「collections」。

MongoDB 會根據 model name 來命名 collections。以上述例子來看，collections 的名稱為 **posts**。請注意，data model 的名稱是單數名詞，collections 的名字為複數名稱。MongoDB 自動將單數名稱加上 's' 後，成為 collections 的名稱。

### Step 6: 整合 Express.js 框架

將上述步驟整合至 Express.js 框架，意思如下：

* 根據 Express.js 架構的規則（rules）寫程式
* 以上述範例來說，要將 data model 傳遞給 express 的 middleware
* 以上述範例來說，在 URL routing 時要能讀取 data model

更簡單的白話文就是：參數傳遞。傳遞 data model 的做法如下：

~~~~~~~~
var app = express();

app.db = {
  model: {
    Post: Post
  }
};
~~~~~~~~

URL router 在 callback URL handler 時，可以這樣取得 data model：

~~~~~~~~
app.get('/1/post/:id', function(req, res) {	
	var Post = req.app.db.model.Post;
});
~~~~~~~~

這樣的做法，就是在符合 Express.js 框架架構的情況下，傳遞 data model 物件。