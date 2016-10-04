## 8.4 Express URL Routing

Express.js 框架基本上，幫助開發者解決了 4 個基本問題：

- URL Routing
- REST API 定義與實作
- Middleware
- Template Engine

首先，以 *hello.jade* 做為例子，練習如何新增 URL Routing。如何讓使用者瀏覽 *http://localhost:3000/hello*，並且讓 Express 解析並輸出 *views/hello.jade* 呢？請跟著以下的步驟進行練習。

### Step 1：新增 *routes/hello.js*

根據前文介紹的觀念，可以很快知道，新增 URL Routing 的第一個步驟就是加入 Handler Function。在 *routes/* 下新增 *hello.js* 檔案：

{title="routes/hello.js"}
~~~~~~~~
1 
2 /*
3  * GET home page.
4  */
5 
6 exports.index = function(req, res){
7   res.render('hello');
8 };
~~~~~~~~

程式碼第 7 行的地方，表示要解析 *views/* 目錄下的 *hello.jade* 文件。Express.js 是一個 MVC 模式的開發框架，並且 Express.js 的專案已定義好目錄結構，因此請特別注意相關檔案的擺放位置。

### Step 2：修改 app.js

以下是修改後的 app.js 完整內容：

{title="app.js"}
~~~~~~~~
 1 
 2 /**
 3  * Module dependencies.
 4  */
 5 
 6 var express = require('express');
 7 var routes = require('./routes');
 8 var user = require('./routes/user');
 9 var http = require('http');
10 var path = require('path');
11 var hello = require('./routes/hello');
12 
13 var app = express();
14 
15 // all environments
16 app.set('port', process.env.PORT || 3000);
17 app.set('views', path.join(__dirname, 'views'));
18 app.set('view engine', 'jade');
19 app.use(express.favicon());
20 app.use(express.logger('dev'));
21 app.use(express.json());
22 app.use(express.urlencoded());
23 app.use(express.methodOverride());
24 app.use(app.router);
25 app.use(express.static(path.join(__dirname, 'public')));
26 
27 // development only
28 if ('development' == app.get('env')) {
29   app.use(express.errorHandler());
30 }
31 
32 app.get('/', routes.index);
33 app.get('/users', user.list);
34 app.get('/hello', hello.index);
35 
36 http.createServer(app).listen(app.get('port'), function(){
37   console.log('Express server listening on port ' + app.get('port'));
38 });
~~~~~~~~

這裡修改了二個地方，分別說明如下：

- 第 11 行，匯入 Step 1 的 *hello.js* 模組
- 第 34 行，新增 '/hello' 的 URL Routing 處理

當 Express.js 收到 '/hello' 的請求時，Express.js 就會 Callback *hello.index* 函數，接著 *hello.index* 函數會解析 *hello.jade* 文件，並 Response 給用戶端。

只需要二個很簡單的步驟，就可以新增 URL Routing，這就是 Express.js 框架帶來的便利性之一。