# 8.4 Express URL Routing

Express.js 框架基本上，幫助開發者解決了四個核心問題：

* URL Routing
* REST API 定義與實作
* Middleware（中介軟體）
* Template Engine（樣板引擎）

本節聚焦於第一項：URL Routing。

學完本節後，你將能夠自行定義新的 URL 路由，並將請求導向對應的 Handler 與樣板，完成從瀏覽器請求 → 程式處理 → 頁面輸出的完整流程。

我們將延續前一節的範例，示範如何讓使用者瀏覽 `http://localhost:3000/hello`，並透過 Express 渲染出 `views/hello.pug` 頁面。請依照以下兩個步驟實作。

### Step 1：新增 `routes/hello.js`

以下將同時建立 Controller 與對應樣板內容：

根據前文所述的 MVC 架構邏輯，建立一個新的 Handler Function 是新增 Routing 的第一步。在 `routes/` 目錄中建立 `hello.js`，內容如下：

```js
1
2 /*
3  * GET hello page.
4  */
5
6 exports.index = function(req, res){
7   res.render('hello');
8 };
```

程式碼第 7 行透過 `res.render('hello')` 呼叫樣板引擎，將對應的 `views/hello.pug` 樣板轉譯為 HTML。由於 Express 專案已在 `app.js` 中透過 `app.set('views', …)` 指定樣板目錄，故此處無需指定完整路徑。

📌 **注意：** Express.js 採 MVC 架構，請務必將 `hello.js` 放置於 `routes/`，而 Pug 樣板 `hello.pug` 放置於 `views/`，以符合專案目錄結構慣例。

💡 **補充：路由與樣板名稱無強制對應**

範例中的 `/hello` 對應 `hello.pug` 是一種常見慣例，但實際上只要 `res.render()` 所指定的樣板名稱正確，並存在於 `views/` 目錄中，即可自由命名，與 URL 並無強制一致的對應關係。

### 補充：對應的樣板檔案 `views/hello.pug`

```pug
doctype html
html
  head
    title Hello from NoChat
  body
    h1 Hello Route Page
    p 這是由 /hello 路由所渲染的頁面。
```

此樣板將在 `/hello` 被請求時，由 `res.render('hello')` 呼叫，並透過 Pug 引擎產生對應 HTML 回應。，請務必將 `hello.js` 放置於 `routes/`，而 Pug 樣板 `hello.pug` 放置於 `views/`，以符合專案目錄結構慣例。

---

### Step 2：修改 `app.js`

以下為修改後的 `app.js` 範例內容：

```js
 6 var express = require('express');
 7 var routes = require('./routes');
 8 var user = require('./routes/user');
 9 var http = require('http');
10 var path = require('path');
11 var hello = require('./routes/hello');

13 var app = express();

16 app.set('port', process.env.PORT || 3000);
17 app.set('views', path.join(__dirname, 'views'));
18 app.set('view engine', 'pug');

31 app.get('/', routes.index);
32 app.get('/users', user.list);
33 app.get('/hello', hello.index);

34 http.createServer(app).listen(app.get('port'), function(){
35   console.log('Express server listening on port ' + app.get('port'));
36 });
```

在此，我們進行了兩項變更：

* **第 11 行**：匯入剛新增的 `hello.js` 路由模組
* **第 33 行**：註冊新的 URL 路由 `/hello`，對應 `hello.index()`

當使用者瀏覽 `http://localhost:3000/hello`，Express 會觸發 `hello.index()` 函式，而該函式將會渲染並回應 `views/hello.pug` 的內容。

### 總結

只需兩個步驟，即可完成一個新的路由設定：

1. 建立對應的 Handler（Controller）模組
2. 在 `app.js` 註冊 URL 對應關係

這正體現了 Express.js 強調的輕量與模組化設計理念，也是其作為 Web 開發框架的最大特色之一。

### 延伸閱讀：動態路由簡介

除了靜態路由（如 `/hello`）外，Express 也支援帶參數的動態路由，例如：

```js
app.get('/user/:id', function(req, res) {
  res.send('使用者 ID 是 ' + req.params.id);
});
```

當使用者瀏覽 `/user/42` 時，系統會回傳「使用者 ID 是 42」。動態參數可透過 `req.params` 存取，這讓 Express 路由更具彈性與應用深度。

下一節將深入解析 Express 的 Middleware 系統。
