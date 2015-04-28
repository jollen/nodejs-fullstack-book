# Express.js 應用 - Middleware 

第 8 章提到 Express.js 的 Middlware 分為二個部份：所有 URL 與特定 URL。要了解 Middlware 的觀念，最快的方法就是實作「頁面保護」的功能。現在，讓我們為 '/hello' URL 加上密碼 '123456' 的保護。

## 使用 *app.get()* 撰寫 Middlware

針對特定 URL 加入 Middleware，必須透過 *app.get()* 函數的第二個參數。實作步驟如下。

### Step 1：加入 Middleware

延續上一章的範例，為 '/hello' 加入一個 Middleware：

~~~~~~~~
app.get('/hello', function (req, res, next) { }, hello.index);
~~~~~~~~

說明如下：

- 第 2 個參數，是一個暱名函數，這個暱名函數就是 '/hello' 的 Middleware
- 第 3 個參數，是原本處理 URL Routing 的函數

Middleware 會收到 3 個參數：

- *req* 是 Request 物件，存放這此請求的所有資訊
- *res* 是 Response 物件，用來回應該請求
- *next* 用來控制流程，後續說明

當使用者輸入密碼時，就要撰寫一段控制流程來處理，典型的控制流程邏輯如下：

~~~~~~~~
if (password == '123456') {
	send_page();
} else {
	end_request();
}
~~~~~~~~

但 Express.js 並不是用這種方式，來實作流程方式。如何為 '/hello' 加入控制邏輯呢？請看步驟 2。

### Step 2：找出密碼

使用 Query String 來傳入密碼，這是最簡便的方式（也是最糟的做法）。Express.js 可以幫助我們解析 Query String，這是 Express.js 框架的另一個優點。我們就不必像第 3 章介紹的內容一樣，自已去撰寫解析 Query String 的程式碼。

Express.js 將解析好的 Query String 放在 *req.query* 物件裡，現在先直接將它印出。修改程式碼如下：

~~~~~~~~
app.get('/hello', function (req, res, next) {
	console.log(req.query);
}, hello.index);
~~~~~~~~

啟動 *app.js* 後，利用瀏覽器開啟 http://localhost:3000/hello?passwd=123456 網址。接著，可以在 Console 畫面看到這段訊息：

~~~~~~~~
Express server listening on port 3000
{ passwd: '123456' }
GET /hello?passwd=123456 200 306ms - 135b
~~~~~~~~

還有一個可能讓你嚇一跳的現象：瀏覽器的畫面是空白的，而且一直打轉。感覺好像是卡住了，這是怎麼會事兒呢？修改程式碼如下：

~~~~~~~~
app.get('/hello', function (req, res, next) {
	console.log(req.query);
	next();
}, hello.index);
~~~~~~~~

Express.js 傳入的 *next* 參數，實際上是一個 Lambda。呼叫 *next()* 表示「進行下一個流程」的意思，所謂的下一個流程，當然就是執行 *hello.index* 函數。

加上 *next()* 後，就能在瀏覽器上看到原本的畫面了。所以，我們只要判斷 *req.query.passwd* 就知道密碼是否正確。不過，還有更好的做法，Express.js 的功能可不是只有這樣。

### Step 3：使用內建 Middleware

Express.js 內建幾個好用的 Middleware：

- basicAuth()
- bodyParser()
- compress()
- cookieParser()
- cookieSession()
- csrf()
- directory()

像「使用者驗證」這麼常見的「流程」，Express.js 就有提供 *basicAuth()* Middleware。再次修改程式碼如下：

~~~~~~~~
app.get('/hello', express.basicAuth('jollen', '12345678'), hello.index);
~~~~~~~~

*basicAuth()* 使用 HTTP 的方式做認證，並不是 Query String 的做法。只要再次瀏覽網頁，就可以看到一個非常熟悉的畫面，如下圖。

![圖 9-1 使用 *basicAuth()* Middleware](images/figure-9_1.png)

同時，在 Node.js 的 Console 也可以看到以下訊息：

~~~~~~~~
GET /hello 401 10ms
~~~~~~~~

這表示 *basicAuth()* 使用的是 HTTP 401 認證方式。

### Step 4：控制流程

將上述的寫法，重構為更清楚的「流程」觀念：

~~~~~~~~
app.get('/hello', express.basicAuth('jollen', 'abcdef'));
app.get('/hello', hello.index);
~~~~~~~~

這其實是較為常見，而且更好的寫法。觀念整理如下：

- 請注意，過去將第 2 個參數解釋為 URL Routing 的 Handler，在這裡則是解釋為 Middleware
- 所以，'/hello' 現在有 2 個 Middleware
- 瀏覽 URL 時，依「順序」來呼叫 Middleware
- 順序指的是程式碼的寫法順序
- *basicAuth()* 先被呼叫
- *basicAuth()* 會進行使用者驗證
- 如果驗證成功，就會呼叫 *next()* 進到下一個「流程」
- 下一個「流程」就是 *hello.index* 函數

這是 Express.js Middleware 的基本觀念，也是初學者必學的主題。

## Middleware 與流程控制

Express.js 使用 Middleware 來實作流程控制，我們可以發揮一些巧思，讓流程控制的程式碼邏輯更優雅。比如說，'/hello' 現在的流程是：

1. 使用者驗證
2. 進行一些環境設定的調整
3. 送出頁面

如果使用典型的 if...else... 來實作，肯定會寫出很醜的 Node.js 程式碼。反之，利用 Middleware 的觀念來實作，不但觀念簡單，程式碼也更優雅：

~~~~~~~~
app.get('/hello', express.basicAuth('jollen', 'abcdef'));
app.get('/hello', hello.config);
app.get('/hello', hello.index);
~~~~~~~~

完整的 *hello.js* 如下：

{title="hello.js"}
~~~~~~~~
1 exports.index = function(req, res, next) {
2   res.render('hello');
3 };
4 
5 exports.config = function(req, res, next) {
6   console.log("Do some configs here...");
7   next();
8 };
~~~~~~~~

使用者通過驗證後，會進到 *hello.config* 流程。重要的觀念補充如下：

- 在 *hello.config* 裡要記得呼叫 *next()*
- 請注意，以上 2 個暱名函數都加上了第 3 個參數 *next*，成為 Middleware

Express.js Middleware 很像是 URL 的 Plugin，例如上述的範例，可以想像成是在 '/hello' 裡，加入 *hello.config* 的插件。

以下是截至目前為止，最新版本的 *app.js*。

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
14 app.use(express.favicon());
15 app.use(express.logger('dev'));
16 app.use(express.json());
17 app.use(express.urlencoded());
18 app.use(express.methodOverride());
19 app.use(app.router);
20 app.use(express.static(path.join(__dirname, 'public')));
21 
22 // development only
23 if ('development' == app.get('env')) {
24   app.use(express.errorHandler());
25 }
26 
27 app.get('/', routes.index);
28 app.get('/users', user.list);
29 
30 app.get('/hello', express.basicAuth('jollen', 'abcdef'));
31 app.get('/hello', hello.config);
32 app.get('/hello', hello.index);
33 
34 http.createServer(app).listen(app.get('port'), function(){
35   console.log('Express server listening on port ' + app.get('port'));
36 });
~~~~~~~~

目前為止的範例，都是為特定的 URL 來撰寫 Middleware。

## 使用 *app.use()* 撰寫 Middlware

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

## 常用的 Express.js Middleware

以下介紹幾個經常使用的 Middleware。

### 使用 *compress()*

Express.js 內建 *express.compress()* Middleware，這個 Middleware 可以把 Response Data 壓縮，節省網路頻寬，當然也就縮短 Response Data 所需的時間。修改後的程式碼如下：

~~~~~~~~
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.basicAuth('jollen', '654321'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
~~~~~~~~

請注意，*express.compress()* 的順序要放在比較前面。

### 使用 *cookieParser()*

這是一個用來處理 HTTP Cookies 的 Middleware。它可以協助我們解析 Cookies，並將所有的 Cookies 放在 *req.cookies* 物件（Key-Value Pairs 格式）。寫法如下：

~~~~~~~~
app.use(express.cookieParser());
~~~~~~~~

比如說，有一個 Cookies 叫做 *purchase_id*，使用這個 Middleware 就可以透過 *req.cookies.purchase_id* 讀取該 Cookies 的值。

### 使用 *cookieSession()*

提供 Sessions 機制的 Middleware。為 *app.js* 加入 Sessions 功能：

~~~~~~~~
app.use(express.cookieSession());
~~~~~~~~

因為 Express.js 的 Sessions 是建構在 Cookies 的機制之上，所以為了防止 Sessions 被不當修改，可以傳入 *secret* 參數：

~~~~~~~~
app.use(express.session({
    secret: 'N1j2o3l4l5e6n7'
}));
~~~~~~~~

此外，也可以設定 Cookies 的屬性：

~~~~~~~~
app.use(express.session({
    secret: 'N1j2o3l4l5e6n7',
    cookie: { path: '/', httpOnly: true, maxAge: null }
}));
~~~~~~~~

上述設定是原本的預設值。

## 結論

Node.js + Express.js 初學者，務必了解 Middleware 的觀念，並且學會使用 Middleware 做流程控制。關於 Middleware 的實作，可分為特定 URL 與所有 URL，這是 Express.js 開發的基本功。網路上有一些支援 Express.js 的 Workflow 模組，也都是基於 Middleware 的觀念來實作。