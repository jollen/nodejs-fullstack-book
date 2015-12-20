# Node.js 應用 - Express.js 入門

經過前幾章的基礎學習後，接下來開始進入 Node.js 的進階主題。首要課題就是導入一個 Web Application Framework，以協助開發者發展 Web Application。現在，我們需要一個 Web Application Framework，來簡化 URL Routing 的開發，一個很好的選擇是 Express.js。

Express.js 除了支援 URL Routing 的功能外，也提供很完整的 Web Application 支援。Express.js 的功能強大，對 Express.js 的初學者來說，要先學好以下 3 個主題：

- 使用 Express.js 做 URL Routing
- Express.js 與 HTML Template 的結合
- 學習 Jade Programming Language

本章的範例可由 Github 取得：

~~~~~~~~
http://github.com/jollen/nodejs-express
~~~~~~~~

接下來，透過一個連貫性的實例，學習 Express.js、HTML Template 與 Jade 程式語言。

## Express.js 初體驗

NoChat 是第 3 章與第 4 章的實例，包含 Server 端與 Client 端。Client 端是一份 HTML5 網頁，這份網頁應該要放到 Web Server 上存取。典型的 Web Server 是 Apache 軟體，所以可以使用 Apache 來架構自已的 Web Server，以便瀏覽 Client 端網頁。

另外一個做法，是使用 Node.js 的 Web Server 功能，將網頁放到 Node.js 的 Web Server 裡。這個功能如果使用 Express.js 來做的話，只需要幾個步驟即可完成。

### Step 1：安裝 Express CLI

利用 npm 安裝 Express 的 CLI（Command Line Interface）：

~~~~~~~~
$ sudo npm -g i express
~~~~~~~~

接著利用 express 命令來建立新的 Express.js 專案。

### Step 2：建立 Express.js 專案

先建立一個新的專案目錄，在這個目錄下，使用 npm 安裝 Express.js：

~~~~~~~~
$ mkdir nodejs-express
$ cd nodejs-express
$ npm i express
~~~~~~~~

安裝完成後，執行 Express.js 命令列工具：

~~~~~~~~
$ express .
destination is not empty, continue? y

   create : .
   create : ./package.json
   create : ./app.js
   create : ./public
   create : ./public/javascripts
   create : ./public/images
   create : ./public/stylesheets
   create : ./public/stylesheets/style.css
   create : ./routes
   create : ./routes/index.js
   create : ./routes/user.js
   create : ./views
   create : ./views/layout.jade
   create : ./views/index.jade

   install dependencies:
     $ cd . && npm install

   run the app:
     $ node app
~~~~~~~~

在執行 app.js 前，需要安裝 Express 所需的相依模組：

~~~~~~~~
$ npm i
~~~~~~~~

接著依照提示畫面的說明，執行 Express 的主程式：

~~~~~~~~
$ node app.js 
Express server listening on port 3000
~~~~~~~~

Express.js 會自動生成 app.js 框架，這是 Web Application 的主程式，開發人員只要基於 app.js 來做擴充即可。利用瀏覽器開啟 *http://localhost:3000/* 網址，可以看到圖 8-1 的畫面，表示一個基本的 Web Appication Framework 已經順利啟動了。

![圖 8-1 啟動第一個 Express App](images/figure-8_1.png)

Express.js 是一個 Web Application Framework，也可以很方便地協助我們發展 Web Service API。基本上，Express.js 並不是一個 Web Server 的模組，因此不要誤解 Express.js 只是一個輕量級的 Web Server；Express.js 的本質是一個 Web Application 開發框架。

此外，要學好 Express.js，就要了解它的基本精神。Express.js 的基本精神，是提供了一個基於 URL Routing 機制的應用程式框架。此外，基於 Express.js 所發展的 Web 應用程式，會以 API 的形式呈現出來。這裡所指的 API 可以是典型的 URL（CGI）形式，也可以是 REST 的標準。

總結來看，Express.js 並不只是一個提供網頁服務的 Web Server，即使這也是 Express.js 其中一個功能。

### Step 3：認識 Express 專案結構與 MVC 模式

以下是 Express 所生成的專案結構（Structure）：

- *app.js*：Web Application 原型
- *package.json*：NPM 套件管理程式設定檔
- *public/*：放置靜態文件
- *routes/*：處理 URL Routing 的程式碼
- *views/*：放置 View 文件

關於 View 文件的觀念，在後續討論 MVC 設計模式時再做說明。目前，有一個很簡單的問題：圖 8-1 的主畫面存放在什麼位置？從典型的「網頁製作」觀念來看的話，應該會有一份 *index.html* 的文件，並且可能放置在 *public/* 目錄下。

然而，圖 8-1 的主畫面，實際上是由 *views/index.jade* 所動態產生。與網頁製作的概念比較，可以整理出幾個很基本但相當重要的觀念：

- *index.html* 是一種製作文件（Web Pages）的觀念，這是一個開發網站的概念
- *index.jade* 是一個 HTML5 模板（HTML5 Template），製作模板的語法稱為 Jade
- *index.jade* 是製作應用程式（Web Apps）的觀念，應用程式的 Presentation 與程式碼要切割開來
- Presentation 的部份以 Jade 撰寫，並存儲在 views/ 目錄下
- 程式碼的部份，以 JavaScript 撰寫，這是一個靜態文件，所以應儲存於 *public/javascripts/* 目錄下
- 也就是說，這個 Web App 的架構採用 MVC 設計模式

Express 框架把基本的 MVC 模式都做好了。簡單來說，利用 Node.js + Express 可以很輕地開發 Web Application，這個 Web Application 的基本能力是提供 Web Service API。

### Step 4：佈署靜態文件

Express 生成的專案結構，規劃了一個存放靜態文件的目錄，常見的靜態文件有 CSS、JavaScript 與圖片等等。要將 Express 當做典型的 Web Server 來使用時，只要將靜態文件放置於 *public/* 目錄下即可。例如，要佈署 Bootstrap 至目前的 Express.js 專案，做法如下：

~~~~~~~~
$ cd nodejs-express       (切換到專案目錄)
$ cd public               (進入 public/ 目錄)
$ cd stylesheets          (Express.js 所規劃用來存放 CSS 的目錄)
~~~~~~~~

接著將 Bootstrap 的 CSS 下載至這個目錄下：

~~~~~~~~
$ wget http://netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css
~~~~~~~~

同理，將 JavaScript 程式碼下載至對應的目錄下：

~~~~~~~~
$ cd ../javascripts/
$ wget http://netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min.js
~~~~~~~~

可以利用 *tree* 命令，來檢查目前為止的 *public/* 狀態：

~~~~~~~~
├── public
│   ├── images
│   ├── javascripts
│   │   └── bootstrap.min.js
│   └── stylesheets
│       ├── bootstrap.min.css
│       └── style.css
~~~~~~~~

*style.css* 是 Express.js 自動產生的檔案。到這裡，經由以上 4 個學習步驟，我們可以知道如何將 NoChat 範例佈署至 Express.js 專案裡，並透過 Express.js 來提供網頁的服務。這部份留給讀者自行練習。

### Step 5：擴充 app.js

*app.js* 是 Express 生成的 Web Applicatoin Framework。開發人員將基於 *app.js* 擴充這個 Web Application Framework 的功能：

- 擴充 URL Routing
- 實作與定義 REST API
- 加入 Middleware
- 使用 HTML Template 撰寫 UI

關於以上 4 個主要的 Express 技術，後續將以獨立的章節進行說明。這是開發 Express.js 的重點戲，對初學者來說，必須先學習 URL Routing 的開發。關於 URL Routing 的觀念，已經在第 3 章做過說明。

## Express.js 的學習建議

以下是建議的 Express.js 學習步驟，初學者可依照這個順序進行練習。在熟悉每一個步驟後，再繼續研讀更多主題。

- Stage 1：學會建立新的 Express.js 專案
- Stage 2：了解 Express.js 專案的目錄結構
- Stage 3：練習加入 Bootstrap
- Stage 4：學習 Jade 語法並撰寫第一個 "View"
- Stage 5：練習新增 URL Routing

截至目前為止，我們已經學會了 Stage 1~3 的做法，接下來繼續說明 Stage 4 與 Stage 5 的做法與觀念。

## MVC 與 HTML Template Engine

MVC 模式的全名是 Model-View-Controller，這是一種軟體架構。學習以 MVC 觀念，來重新製作 NoChat 用戶端網頁，很快就能體會到 MVC 的精神。MVC 中的 "V" 指的是 "View"，View 的意思是「可見」，也就是人類眼睛所能看到的畫面。

一般來看，這裡所指的 View 就是 Web UI 的部份；不過 View 也代表 Presentation（視覺），UI 與 Presentation 意義上並不完全相同。關於這點，後續討論 MVP 模式時，再另行說明。以下皆以 Presentation 來表示 Web UI，也就是 View 的部份。

MVC 的基本精神是將 Presenetation 與程式碼分開。Express 所產生的 *view/* 目錄就是用來存放 Presenetation，也就是 UI。將 UI 與程式碼切割，不助於維護良好的程式碼結構，讓程式設計人員將程式碼組織的更好。

MVC 的觀念在軟體工程裡非常重要，程式設計師可以透過 MVC 模式，讓程式碼的組識更好。有了 MVC 模式，整個專案的管理結構也會更好，例如：結構更好的目錄階層。

Express.js 是一個 MVC 的 Web Application 框架，要展現 MVC 模式的精神，首要的工作就是導入 Template 觀念，利用 Template 來撰寫 View（HTML5）。

## 學習 Jade 程式語言

HTML 的 Template 選擇很多，目前 Express.js 能支援的 Template Engine 有：

- hjs
- hbs
- Jade

Express.js 已經將 Jade 做為預設的 Template Egnine。Jade 的語法風格簡潔，而且易學。Jade 將會成為重要的 HTML Template Egnine，以及 HTML Template 程式語言。建議讀者儘量去先了解它的語法。

Jade 的語法非常容易學習，只要透過幾個基本的練習，就可以很快上手。以下以 3 個練習，介紹 Jade 程式語言的基本語法。關於 Jade 語法的完整說明，請參考：

http://jade-lang.com

![圖 8-2 Jade 是一個 Template Engine](images/figure-8_2.png)

### Exercise 1：<h1> 大標題

接下來，說明如何在 Express.js 框架裡加入一個新的 HTML5 頁面。首先，先練習將以下的內容，改寫為 Jade，並放置於專案的 views/ 目錄下：

~~~~~~~~
<h1>Hello World!</h2>
~~~~~~~~

改寫為 Jade 語法：

~~~~~~~~
h1 Hello World!
~~~~~~~~

將上述內容儲存為 *views/hello.jade*。經由這個例子，可以知道 Jade 提供了一套很簡約的 HTML5 標籤語法。使用 Jade 來撰寫 HTML5 標籤，更不必擔心漏寫了結尾標籤，非常方便。

### Exercise 2：<p> 段落

如果要寫入一段文字的話呢？HTML5 利用 <p></p> 標籤來書寫段落文字：

~~~~~~~~
<h1>Hello World!</h2>
<p>這是一個文章段落。</p>
~~~~~~~~

改寫成 Jade 如下：

~~~~~~~~
h1 Hello World!
p 這是一個文章段落。
~~~~~~~~

Jade 的語法就是這麼簡單：只要懂得 HTML5 標籤語法，就可以很直接地將它改寫為 Jade。

### Exercise 3：完整的 HTML5 文件

一個標準的 HTML5 文件，需包含 *doctype*、*<html>* 標籤、*<body>* 標籤、*<head>* 區域等內容。這些同樣都可以用 Jade 來撰寫。

繼續修改 *hello.jade*，將它發展成完整的 HTML5 文件。

{title="views/hello.jade"}
~~~~~~~~
1 doctype 5
2 html
3   head
4     title= title
5   body
6     h1 Hello World!
7     p 這是一個文章段落。
~~~~~~~~

![圖 8-3 *hello.jade* 輸出結果](images/figure-8_3.png)

圖 8-3 是 *hello.jade* 的輸出結果，如果「檢視原始碼」的話，可以看到解析出來的 HTML5 內容：

~~~~~~~~
<!DOCTYPE html><html><head><title>學習 Jade</title></head><body><h1>Hello World!</h1><p>這是一個文章段落。</p></body></html>
~~~~~~~~

Express.js 預設會輸出最小化（Minify）後的 HTML5 文件內容。要如何使用瀏覽器來瀏覽 *hello.jade* 呢？這就是學習如何新增 URL Routing 的時候了。

## 解析 app.js

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

{title="routes/index.js"}
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

## Express URL Routing

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

## Middleware 的觀念

Middleware 的觀念與插件（Plugins）很像，開發者可以在 URL Routing 的「中間」加入一個 Middleware。這個架構可以做到 2 個功能：

- 開發者可以為這個 URL 加入額外的處理程序，也就是 URL Plugins 的觀念
- 更簡潔地控制程式邏輯

URL Plugins 是筆者為了說明 Express Middleware 觀念，自行創造的說法，實際上在正規的軟體架構理論中，並沒有這樣的說法。URL Plugins 可以讓開發人員「無限量」地為每一個 URL 加入額外的處理程序。

關於上述的處理程序，最典型的應用案例（Use Case）就是使用者系統（User System）。例如，用戶請求 '/admin' 文件時，可以先透過一個 Middleware 來檢查登入狀態，再交給最後的 Handler Function 處理。

Middleware 的實作分為二個部份：

- 針對所有 URL 加入 Middleware，方式是呼叫 *app.use()* 函數
- 針對特定 URL 加入 Middleware，方式是透過 *app.get()* 函數的第二個參數

關於 Middleware 的觀念與實作，將在第 9 章做介紹。