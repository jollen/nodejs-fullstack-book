## 9.2 使用 *app.use()* 撰寫 Middlware

Express.js 的 Middleware，也能針對所有的 URL，方式是使用 *app.use()* 函數。例如，我想為「所有的 URL」加上使用者認證的「流程」，做法非常簡單。以下是修改後的 *app.js*：

{title="app.js"}
~~~~~~~~
 1 var express = require('express');
 2 var routes = require('./routes');
 3 var user = require('./routes/user');
 4 var http = require('http');
 5 var path = require('path');
 6 var hello = require('./routes/hello');
 7 
 8 var app = express();
 9 
10 // all environments
11 app.set('port', process.env.PORT || 3000);
12 app.set('views', path.join(__dirname, 'views'));
13 app.set('view engine', 'jade');
14 
15 app.use(express.favicon());
16 app.use(express.logger('dev'));
17 app.use(express.json());
18 app.use(express.urlencoded());
19 app.use(express.methodOverride());
20 app.use(express.basicAuth('jollen', '654321'));
21 app.use(app.router);
22 app.use(express.static(path.join(__dirname, 'public')));
23 
24 // development only
25 if ('development' == app.get('env')) {
26   app.use(express.errorHandler());
27 }
28 
29 app.get('/', routes.index);
30 app.get('/users', user.list);
31 
32 app.get('/hello', hello.config);
33 app.get('/hello', hello.index);
34 
35 http.createServer(app).listen(app.get('port'), function(){
36   console.log('Express server listening on port ' + app.get('port'));
37 });
~~~~~~~~

各位是否能看出當中的細節？說明如下：

- 第 20 行，使用 *app.use()* 來加入 *basicAuth()* Middleware，表示針對所有的 URL
- 第 21 行，為所有 URL 加入了 URL Rounter，*app.router* 是 Express.js 內建的 URL Router
- 第 20 行與第 21 行，依照「流程」的邏輯，應該是先進入 *basicAuth()* 流程，再到 URL Routing 的流程
- 如上，也就是說，這 2 行的順序是不能修改的，否則就會變成「先做 URL Routing、再做使用者驗證」的錯誤

此外，我們也發現，Express.js 預設加入了這些 Middleware：

~~~~~~~~
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
~~~~~~~~

*express.static()* 這個 Middleware 是用來指定 "Static Files" 的路徑。典型的 Use Case 是將 Static Files 放在 public/ 目錄下，比如，瀏覽器送出這個請求：

~~~~~~~~
GET /style.css
~~~~~~~~

當 *app.router* 無法處理這個檔案的 Routing 時，就會進到 *express.static()* 流程，這時 Express.js 會到 *public/* 子目錄下搜尋這個檔案，最後將 *public/style.css* 送出。Static files 一般指的是 CSS、JavaScript、圖片、影片、靜態 HTML 文件等。

Middleware 的「順序」，非常的重要。所有的 Middleware 都是依照寫作順序逐一呼叫。通常，較早先被使用的 Middleware 為 *express.logger()*，這是 Middleware 的 Log System，用來紀錄 HTTP 的請求。

由上述程式碼的順序來看，*express.logger()* 會紀錄下幾乎所有的資訊，包含 HTTP 請求、送出的 Static Files 等。如果不想把 Static Files 放到紀錄訊息裡呢？只要調整其順序即可：

~~~~~~~~
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
~~~~~~~~

這個順序，可以讓 *express.logger()* 紀錄最少量的資訊。