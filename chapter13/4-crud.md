## 13.4 CRUD 實作

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