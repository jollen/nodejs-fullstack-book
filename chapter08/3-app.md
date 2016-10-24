# 8.3 解析 app.js

要知道如何新增 URL Routing，就要對 *app.js* 有基本的了解。*app.js* 是 Express.js 建立專案時，自動建立的 Web Application 主程式，內容如下：

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
11 
12 var app = express();
13 
14 // all environments
15 app.set('port', process.env.PORT || 3000);
16 app.set('views', path.join(__dirname, 'views'));
17 app.set('view engine', 'jade');
18 app.use(express.favicon());
19 app.use(express.logger('dev'));
20 app.use(express.json());
21 app.use(express.urlencoded());
22 app.use(express.methodOverride());
23 app.use(app.router);
24 app.use(express.static(path.join(__dirname, 'public')));
25 
26 // development only
27 if ('development' == app.get('env')) {
28   app.use(express.errorHandler());
29 }
30 
31 app.get('/', routes.index);
32 app.get('/users', user.list);
33 
34 http.createServer(app).listen(app.get('port'), function(){
35   console.log('Express server listening on port ' + app.get('port'));
36 });
~~~~~~~~

程式碼說明如下：

- 第 6~10 行，匯入外部 Node.js 模組，其中 *routes/* 目錄就是存放 URL Routing 程式碼的位置
- 第 12 行，匯入 Express.js 模組
- 第 15~17 行，呼叫 Express.js 的 *set()* 函數來定義常數，當中的 'port' 常數用來定義 Express.js 的 Listerning Port 編號
- 第 18~24 行，呼叫 *use()* 函數，來載入（使用）Middleware，Express.js Middleware 的觀念後續再做說明
- 第 32~32 行，這裡就是 URL Routing 的關鍵，呼叫 *get()* 函數來指定 URL 的 Handler Funtion

以第 32 行為例，當瀏覽器發出 '/' 的請求時（例如：*http://localhost:3000/*），Express.js 就會呼叫（Callback） *routes.index* 函數來做處理。

讓我們來了解一下 *routes.index* 函數的實作：

~~~~~~~~
1 
2 /*
3  * GET home page.
4  */
5 
6 exports.index = function(req, res){
7   res.render('index', { title: 'Express' });
8 };
~~~~~~~~

這是一個 Node.js 的模組，裡面匯出了 *index* 函數，當 '/' 請求發生時，Express.js 就會 Callback 這個 函數，並且傳入二個參數：

- *req* 是 Request 物件，存放這此請求的所有資訊
- *res* 是 Response 物件，用來回應該請求

在程式碼第 7 行的地方，呼叫了 *res.render* 函數，這個函數透過 Jade Template Engine 將 *index.jade* 解析（Rendering）成 HTML5 後回應（Response）給用戶端。

---

Next: [8.4 Express URL Routing](4-url-routing.md)
