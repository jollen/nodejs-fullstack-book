# 9.2 使用 `app.use()` 撰寫全域 Middleware

在上一節我們學會了如何為單一路由加入 Middleware，現在，我們要進一步掌握 `app.use()` 的全域特性——讓 Middleware 成為所有請求的前哨站。

### 為所有 URL 加入驗證流程

Express 提供的 `app.use()`，可以讓我們攔截所有傳入的請求，不論其 URL 是 `/hello`、`/users`，還是 `/style.css`。這意味著，我們可以為整個應用統一設置「使用者驗證」、「日誌紀錄」、「API 權限控管」等預處理流程。

以下是修改後的 `app.js`，加入了全域驗證的例子：

### ES5 寫法

```js
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hello = require('./routes/hello');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.basicAuth('jollen', '654321'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hello', hello.config);
app.get('/hello', hello.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
```

### ES6 寫法

```js
const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');
const hello = require('./routes/hello');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.basicAuth('jollen', '654321'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hello', hello.config);
app.get('/hello', hello.index);

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
```

### 差異說明

| 對照項目 | ES5 寫法                      | ES6 重構                                |
| ---- | --------------------------- | ------------------------------------- |
| 變數宣告 | `var`                       | `const`（不可變）                          |
| 匿名函數 | `function () {}`            | `() => {}`（箭頭函數）                      |
| 字串串接 | `'port ' + app.get('port')` | `` `port ${app.get('port')}` ``（模板字串） |
| 條件運算 | `==`（鬆散比較）                  | `===`（嚴格比較）                           |

透過這個對照範例，讀者可理解 Express.js 專案架構如何從 ES5 過渡到 ES6，並且掌握語法升級所帶來的可讀性與結構改善。

### `app.use()` 的語法形式

`app.use()` 可以有不同的使用方式，依照其參數決定應用範圍：

| 語法範例                               | 功能描述                           |
|----------------------------------------|------------------------------------|
| `app.use(middleware)`                  | 全域攔截所有請求                  |
| `app.use('/admin', middleware)`        | 僅攔截路徑以 `/admin` 開頭的請求 |
| `app.use('/static', express.static(...))` | 設定靜態檔路徑前綴              |

這些寫法讓你能靈活控制不同路徑進入應用時所需經過的處理階段。

### 語意流程解析

讓我們來拆解上方程式碼中幾個關鍵點：

- 第 20 行：`app.use(express.basicAuth(...))` 表示所有進入應用的請求，會先通過這個 Middleware
- 第 21 行：`app.router` 是 Express 的路由系統，會處理 `/hello`、`/users` 等動態路徑
- 第 22 行：`express.static()` 是靜態資源處理器，用來提供 public/ 資料夾下的內容

⚠️ 請注意 Middleware 的「書寫順序」非常關鍵。

Express 的執行流程是**線性且串接式的**，你寫在哪裡，就會按順序執行。因此，第 20 行的 `basicAuth` 必須寫在 `app.router` 前面，才能成功攔截所有頁面，否則就會出現「路由已處理但未驗證」的邏輯錯誤。

## Static Files 與 Middleware 的順序

當 `app.router` 無法處理 `/style.css` 這類請求時，Express 會將該請求傳遞給 `express.static()`。這時，系統會到 `public/` 子目錄下搜尋對應的檔案，並回應該靜態資源。例如：

```

GET /style.css

````

若有對應的 `public/style.css` 檔案，就會直接送出給用戶端。這就是 Express 中靜態檔案處理的邏輯流程。

靜態檔案（Static Files）指的是：

- CSS 樣式表
- JavaScript 檔案
- 圖片（.png、.jpg 等）
- 影片、音訊
- HTML 文件

這種檔案通常不需進入程式邏輯處理，因此我們希望用最短路徑將其送出。

### Middleware 的順序會影響靜態檔處理與日誌紀錄

所有 Middleware 都會依照撰寫順序依序被呼叫。

以 `express.logger()` 為例，這個 Middleware 是一個請求紀錄器，會將所有經過的請求印出在 console 上。當它被放在 `express.static()` 之前，代表靜態檔案的請求也會被紀錄。

若你不想讓這些 CSS、圖片請求干擾 log 訊息，可以調整順序如下：

```js
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
````

這樣一來，logger 只會紀錄那些「未被 static() 處理」的請求。

假設使用者直接請求 `/style.css`，這是一個靜態資源：

```
GET /style.css
```

流程會是：

1. 通過 basicAuth（若驗證失敗則被擋下）
2. 通過 app.router（此路徑未定義 route）
3. 落入 express.static → 查找 `public/style.css` → 回應

若你希望「靜態資源」不被 Middleware 驗證（例如開放圖片或 CSS），你應該**將 static() 提前**，如下：

```js
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.basicAuth('jollen', '654321'));
```

這樣請求 `/style.css` 就不會經過認證。

## `app.use()` 與 `app.get()`：Middleware 的兩種掛載方式

在上一節（9.1），我們學到可以透過 `app.get(path, middleware, handler)` 為特定路徑加入中介處理；而本節聚焦於 `app.use()` 的全域攔截。

兩者的主要差異如下：

| 使用方式                                    | 執行時機            | 適用情境            |
| --------------------------------------- | --------------- | --------------- |
| `app.get('/path', middleware, handler)` | 僅當請求符合 path 時觸發 | 特定頁面流程控制        |
| `app.use(middleware)`                   | 每一請求都會觸發        | 日誌、驗證、資料預處理（全域） |

兩者的搭配使用，能讓應用既具備彈性邏輯，又維持清晰結構。

## Middleware 的順序：誰先寫，誰先執行

這是 Express 的基本原則，也是許多開發者最常忽略的問題。

### 預設順序（全面攔截）

```js
app.use(express.logger('dev'));
app.use(express.basicAuth(...));
app.use(app.router);
app.use(express.static(...));
```

### 限制 logger 紀錄範圍（靜態資源不紀錄）

```js
app.use(express.static(...));
app.use(express.logger('dev'));
app.use(app.router);
```

這樣 log 內容會減少，因為 CSS、JS、圖片等請求早已被 static() 處理掉，不再進入 logger。

## 小結：`app.use()` 是語意預設，而非語法特例

`app.use()` 看似是 express 提供的語法糖，實則代表你設計系統「語境入口」的起點。

> 這裡不是寫 middleware，而是在定義：應用的語意防線從哪裡開始。你希望所有請求在進入邏輯前，要經過哪些檢查與處理？`app.use()` 就是這個定義的場域。

很多人以為 `app.use()` 是 express 特有語法，其實它是語意上的設計——「預設所有請求都先經過這裡」。

這讓我們能在一個地方，掌控整個 Web App 的語境入口，不管是身份驗證、API 權限、統一前處理等實作，都是 `app.use()` 的責任。

---

Next: [9.3 常用的 Middleware](3-use-middleware.md)
