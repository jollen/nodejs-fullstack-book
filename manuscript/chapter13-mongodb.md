## MongoDB 簡介

MongoDB 是一種 NoSQL（Not-only SQL）的資料庫系統。NoSQL[1] 有別於典型的 SQL 關鍵式資料庫，它採用 JSON 的格式儲存資料，並以文件的形式儲存。文件（Document）可以看做一種純文字檔。

JSON（key-value pair）、文件式儲存與分散式，是 NoSQL 資料庫所強調的特色。NoSQL 資料庫與 SQL 資料庫有著很大的差別，NoSQL 的起源，是為了提出分散式資料庫系統，也就是能分散式儲存資料的 data store。

正因為 NoSQL 是分散式資料庫系統的概念，現今已被廣泛應用在 big data 與 real-time Web application 的領域。技術上，NoSQL 除了不採用 SQL 查詢語法外，也不支援真正的 ACID。此外，也不強調固定的資料表定義（table definition）。

MongoDB 正是一個熱門的 NoSQL 資料庫系統，現今也是一家商業公司。以 MongoDB 為例，可採取定義或不定義資料表，即使採取定義的資料表做法，也可以隨時變更；這樣的觀念稱為 flexiable schema design，後文將會有相關說明。

[1]: http://zh.wikipedia.org/wiki/NoSQL

## 安裝 MongoDB 資料庫伺服器

MongoDB 可安裝在 Linux/OS X/Windows 環境，請依 MongoDB 官網上的步驟說明進行安裝：

http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

除了自行安裝 MongoDB 外，也可以使用 MongoDB Lab 服務：

https://mongolab.com

這是由 MongoDB 官方所推出的 Database-as-a-Service 雲端服務。MongoLab 提供的免費版本，可以滿足學習階段的使用需求。建議讀者可以申請 MongoLab 的免費版本；在 MongoLab 管理後台建立資料庫與使用者帳號後，可以取得資料庫的 URI：

~~~~~~~~
mongodb://booklog3:123456@ds053130.mongolab.com:53130/booklog3
~~~~~~~~

接著依照以下步驟，使用 Mongoose 來操作 MongoDB 資料庫。

## 使用 Mongoose Driver

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

## CRUD 實作

結合 REST API 架構、Express.js 框架、Mongoose API 以及 MongoDB 資料庫，來實作一個陽春的「post system」。

### Step 1：定義 REST API

先定義 CRUD（新增、讀取、更新與刪除）的 REST API 如下：

* GET /1/post/:id
* GET /1/post
* POST /1/post
* DELETE /1/post/:id
* PUT /1/post/:id

接著分別實作每一個 API。

### Step 2：讀取單篇文章的 API

實作觀念：

* 從 URL path 裡讀取文章編號的參數
* 使用 Mongoose 的 **findOne()**，第一個參數是 query criteria（查詢條件）
* MongoDB 會為每份文件加入 **_id** 欄位，這是文件的 unique ID
* 以 **_id** 做為主要的 query criteria，從資料庫裡讀取該文件

程式碼如下：

~~~~~~~~
app.get('/1/post/:id', function(req, res) {	
	var id = req.params.id;
	var model = req.app.db.model.Post;

	model.findOne({_id: id}, function(err, post) {
		res.send({post: post});	
	});
});
~~~~~~~~

### Step 3：讀取所有文章的 API

實作觀念：

* 使用 Mongoose 的 **find()**，第一個參數是 query criteria（查詢條件）
* Query criteria 不包含條件（條件為空），表示「所有文件」的意思

程式碼如下：

~~~~~~~~
app.get('/1/post', function(req, res) {	
	var model = req.app.db.model.Post;

	model.find({}, function(err, posts) {
		res.send({posts: posts});	
	});
});
~~~~~~~~

### Step 4：新增一篇文章的 API

實作觀念：

* 預設使用 HTML5 的表單來傳送資料，並使用 Express.js 的 Body Parser 來解析
* 先實例化 data model 後，再呼叫 data model 的 *save()* 來儲存文件
* 實例化 data model 實，將新的文件內容傳遞給 constructor

程式碼如下：

~~~~~~~~
app.post('/1/post', function(req, res) {
	var model = req.app.db.model.Post;

	var title = req.body.title;
	var content = req.body.content;		

	var post = {
		title: title,
		content: content
	};

	var instance = new model(post);
	instance.save(function(err, post) {
		res.send(post);
	});
});
~~~~~~~~

### Step 5：刪除一篇文章的 API

實作觀念：

* 以 **_id** 做為主要的 query criteria，從資料庫裡讀取該文件
* 使用 Mongoose 的 **findByIdAndRemove()**，第一個參數是欲刪除文件的 ID

程式碼如下：

~~~~~~~~
app.delete('/1/post/:id', function(req, res) {
	var model = req.app.db.model.Post;

	model.findByIdAndRemove(_id, function(err, post) {
		res.send(post);
	});
});
~~~~~~~~

### Step 6：更新一篇文章的 API

實作觀念：

* 以 **_id** 做為主要的 query criteria，從資料庫裡找尋文件
* 使用 Mongoose 的 **update()**，第一個參數 query criteria，第二個參數是新的文件內容

程式碼如下：

~~~~~~~~
app.put('/1/post/:id', function(req, res) {
	var model = req.app.db.model.Post;
	var id = req.params.id;

	var fieldsToSet = {
		title: req.body.title,
		content: req.body.content
	};

	model.update({_id: id}, fieldsToSet, function(err, numAffected) {
		res.send({
			numAffected: numAffected
		})	
	});
});
~~~~~~~~

本章提供一個完整的「post system」範例供參考，網址如下：

https://github.com/jollen/my-booklog/tree/mongodb

## 結論

本章是 Node.js 結合 NoSQL 資料庫的第一課，並且學習使用 Mongoose 來操作 MongoDB 資料庫。MongoDB 資料庫的基本知識廣圍廣大，因此仍有許多需要學習的入門知識：

* Aggregation
* Reference Model
* MapReduce

本章只是 MongoDB 資料庫技術的起點。此外，未來 REST API 的實作，會涉及更多的處理過程，因此必須學習 Node.js 的流程處理（Workflow）。Nodejs 實作流程控制時，應使用 workflow 的觀念，而不是邏輯判斷的方式。其差別如下：

* 邏輯判斷是使用程式語言的特性與語法，例如：if...else...
* 邏輯判斷使用流程圖（flow chart）來設計
* workflow 是有限狀態機（finite state machine）的設計，不是流程圖設計
* workflow 是一種與邏輯解離（decouple，無直接相關的意思）的設計，更易於重用

這部份在後續章節進行說明。此外，對 web app 來說，會員系統是不可或缺的功能。目前的主流做法，是使用 OAuth 技術，讓使用者透過 social accounts（例如：Facebook）來進行會員註冊與登入。這部份會使用 passport.js 模組。