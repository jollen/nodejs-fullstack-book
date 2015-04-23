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

這是由 MongoDB 官方所推出的 Database-as-a-Service 雲端服務。MongoLab 提供的免費版本，可以滿足學習階段的使用需求。

## 使用 Mongoose Driver

Mongoose 是 Node.js 的 MongoDB Driver。使用 Node.js 來操作 MongoDB 資料庫的做法如下。

### Step 1: 安裝 mongoose 模組

Node.js 透過 mongoose 模組與 MongoDB 資料庫連線。安裝 mongoose 模組：

$ cd <your-nodejs-app>
$ npm i mongoose --save

### Step 2: 連線到 MongoDB

呼叫 mongoose.connect() 連線到 MongDB 資料庫伺服器。連線時，指定資料庫名稱，例如：booklog。

~~~~~~~~
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booklog');
~~~~~~~~

### Step 3: 事件處理

註冊連線成功或失敗的事件：

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MongoDB: connected.');	
});

### Step 4: 定義 Schema

NoSQL 資料庫的特色是不需要 schema。因此，使用 MongoDB 時可以在 has schema 或 no schema 間做選擇。Schema 等同於 SQL 資料庫的 table 定義。以下是一個簡單的 schema design 範例：

var postSchema = new mongoose.Schema({
    subject: { type: String, default: ''},
    content: String
});

這是一個「Post System」的 schema design，包含標題（subject）與內文（content）二個欄位。標題的資料型別（data type）是 *String*，預設值為 ''（空字串）。

### Step 5: 宣告 Data Model



### Step 6: 整合 Express.js 框架

將上述步驟整合至 Express.js 框架，意思如下：

* 根據 Express.js 架構的規則（rules）寫程式
* 以上述範例來說，要將 data model 傳遞給 express 的 middleware
* 以上述範例來說，在 URL routing 時要能讀取 data model

更簡單的白話文就是：參數傳遞。傳遞 data model 的做法如下：

```
```

URL router 在 callback request handler 時，可以這樣取得參數：

```
```

這樣的做法，就是在符合 Express.js 框架架構的情況下，傳遞 data model 物件。

## CRUD 實作


app.get('/1/post/:id', function(req, res) {	
	var id = req.params.id;
	var model = req.app.db.model;

	model.findOne({_id: id}, function(err, post) {
		res.send({post: post});	
	});
});

app.get('/1/post', function(req, res) {	
	var model = req.app.db.model;

	model.find(function(err, posts) {
		res.send({posts: posts});	
	});
});


app.post('/1/post', function(req, res) {
	var model = req.app.db.model;

	var subject;
	var content;

	if (typeof(req.body) === 'undefined') {
		subject = req.query.subject;
		content = req.query.content;
	} else {
		subject = req.body.subject;
		content = req.body.content;		
	}

	var post = {
		subject: subject,
		content: content
	};

	//posts.push(post);
	var card = new model(post);
	card.save();

	res.send({ status: 'OK'});
});

### 

app.delete('/1/post', function(req, res) {
	res.send("Delete a post");
});

app.put('/1/post/:postId', function(req, res) {
	var id = req.params.postId;

	res.send("Update a post: " + id);
});


## 使用 Passport.js

## Workflow

Nodejs 實作流程控制時，應使用 workflow 的觀念，而不是邏輯判斷的方式。其差別如下：

* 邏輯判斷是使用程式語言的特性與語法，例如：if...else...
* 邏輯判斷使用流程圖（flow chart）來設計
* workflow 是有限狀態機（finite state machine）的設計，不是流程圖設計
* workflow 是一種與邏輯解離（decouple，無直接相關的意思）的設計，更易於重用




