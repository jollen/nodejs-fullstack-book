# 8.3 解析 app.js

要新增 URL Routing，首先要對專案中的主程式 *app.js* 有基本認識。

在使用 Express CLI 建立專案時，系統會自動生成 *app.js* 作為應用程式的進入點。以下為範例內容：

```js
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
17 app.set('view engine', 'jade'); // 若使用 Pug，請修改為 'pug'
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
```

### 程式碼逐段說明

* **第 6～10 行**：匯入外部模組與本地模組，包含核心的 `express`、`http` 與 `path`，以及 `routes` 目錄中的路由模組。
* **第 12 行**：建立一個 Express 應用實例。
* **第 15～17 行**：使用 `app.set()` 設定應用層級變數，如：

  * `port`：指定伺服器監聽的 Port
  * `views`：設定樣板（View）檔案的資料夾路徑
  * `view engine`：設定樣板引擎為 Jade（建議更新為 Pug）

📌 **補充提醒**：若你已如 8.2 節所示，改用 Pug 作為樣板引擎，記得將第 17 行的設定改為：

```js
app.set('view engine', 'pug');
```

否則 Express 將無法正確尋找 `.pug` 檔案。

* **第 18～24 行**：使用 `app.use()` 註冊各項 Middleware，處理請求前的各種前置作業。
* **第 31～32 行**：設定 URL Routing，當用戶請求 `'/'` 或 `'/users'` 時，分別交由 `routes.index` 與 `user.list` 處理。
* **第 34～36 行**：建立 HTTP 伺服器並開始監聽，啟動整個 Web 應用。

### Routing 範例：routes.index

以下為 routes 與樣板的對應關係，搭配實作範例進一步說明：

以第 31 行為例，當瀏覽器請求 `/` 路徑（如 `http://localhost:3000/`）時，Express 會呼叫 `routes.index` 函數。其內容如下：

```js
1 
2 /*
3  * GET home page.
4  */
5 
6 exports.index = function(req, res){
7   res.render('index', { title: 'Express' });
8 };
```

這段程式碼說明：

* 這是 Node.js 的模組語法，將 `index` 函數作為模組輸出（`exports.index`）。
* 當 `index()` 被呼叫時，Express 會傳入兩個參數：

  * `req`：Request 物件，封裝所有來自瀏覽器的請求資訊
  * `res`：Response 物件，用來產生伺服器回應
* 在第 7 行中，透過 `res.render()` 呼叫樣板引擎將 `views/index.pug`（原為 jade）編譯為 HTML 並送出給用戶端。

📌 **補強說明**：
`res.render('index', { title: 'Express' })` 這一行對應到 `views/index.pug` 檔案。Express 會根據 `app.set('view engine', 'pug')` 的設定，套用指定樣板引擎，並將變數 `title` 傳入樣板，在 Pug 中對應語法為：

```pug
title= title
```

這就是 8.2 節所提到的 Pug 模板實作，從語法學習延伸至實際渲染流程的完整鏈結。

### 對應的 Pug 樣板：views/index.pug

以下為一個簡單的 `index.pug` 樣板內容：

```pug
doctype html
html
  head
    title= title
  body
    h1 歡迎使用 NoChat
    p 這是一個使用 Pug 語法撰寫的首頁樣板。
```

上述程式中，`title` 是由 `res.render()` 傳入的變數，會在頁籤標題中顯示；`h1` 與 `p` 則為頁面主內容。

### 請求 → 路由 → 樣板 → 輸出：Pug 渲染流程簡圖

```
[Browser Request '/']
        ↓
app.get('/', routes.index)
        ↓
function index(req, res) {
  res.render('index', { title: 'Express' })
}
        ↓
views/index.pug
        ↓
<Rendered HTML to browser>
```

下一節將深入說明如何設計 URL Routing 並延伸其結構設計能力。
