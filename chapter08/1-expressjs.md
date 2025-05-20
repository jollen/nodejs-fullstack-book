# 8.1 Express.js 初體驗

Express.js 是目前最受歡迎的 Node.js Web Framework，不僅是 REST API 開發的主力工具，也是許多大型專案（如：Ghost、KeystoneJS）背後的核心元件。

經過前幾章的基礎學習後，接下來開始進入 Node.js 的進階主題。首要課題就是導入一個 Web Application Framework，以協助開發者發展 Web Application。現在，我們需要一個 Web Application Framework，來簡化 URL Routing 的開發，一個很好的選擇是 Express.js。

Express.js 除了支援 URL Routing 的功能外，也提供很完整的 Web Application 支援。Express.js 的功能強大，對 Express.js 的初學者來說，要先學好以下 3 個主題：

- 使用 Express.js 做 URL Routing
- Express.js 與 HTML Template 的結合
- 學習 Jade Programming Language

> Jade 自 2016 年因商標問題改名為 Pug，本書範例使用 Jade，但實作建議使用新版 Pug。

本章的範例可由 Github 取得：

```
http://github.com/jollen/nodejs-express
```

接下來，透過一個連貫性的實例，學習 Express.js、HTML Template 與 Jade 程式語言。

## Step 1：安裝 Express 專案產生器

Express 提供一個專案產生器工具，可快速建立應用骨架，節省初期設定時間。我們可透過下列指令全域安裝此工具：

```bash
$ npm install -g express-generator
```

安裝完成後，可使用 `express -h` 檢視所有可用選項。

## Step 2：建立 Express.js 專案

先建立一個新的專案目錄，在這個目錄下，使用以下指令快速建立專案原型：

```bash
$ express myapp
```

這會自動產生一套包含 `app.js`、`routes/`、`views/`、`public/` 等目錄的專案架構。

接下來，安裝所需的模組並啟動伺服器：

```bash
$ cd myapp
$ npm install
$ npm start
```

> 提醒：首次執行 npm install 可能會顯示部分警告訊息，這是相依模組版本的提示，通常可略過。確保最後顯示 'added xxx packages' 即代表成功安裝。

Express application generator 自動幫我們生成了 Node.js 的專案架構，`app.js` 是主要的 Web Application 主程式，開發人員只要基於 app.js 來做擴充即可。

![圖 8-1 啟動第一個 Express App](../images/figure-8_1.png)

利用瀏覽器開啟 http://localhost:3000/ 即可看到 Express 啟動的預設頁面。

Express.js 是一個 Web Application Framework，也可以很方便地協助我們發展 Web Service API。基本上，Express.js 並不是一個 Web Server 的模組，因此不要誤解 Express.js 只是一個輕量級的 Web Server；Express.js 的本質是一個 Web Application 開發框架。

此外，要學好 Express.js，就要了解它的基本精神。Express.js 的基本精神，是提供了一個基於 URL Routing 機制的應用程式框架。此外，基於 Express.js 所發展的 Web 應用程式，會以 API 的形式呈現出來。這裡所指的 API 可以是典型的 URL（CGI）形式，也可以是 REST 的標準。

總結來看，Express.js 並不只是一個提供網頁服務的 Web Server，即使這也是 Express.js 其中一個功能。

## Step 3：認識 Express 專案結構與 MVC 模式

以下是 Express 所生成的專案結構（Structure）：

- `app.js`：Web Application 原型與主程式
- `package.json`：NPM 套件設定檔
- `public/`：放置靜態文件，如 CSS、JS、圖片
- `routes/`：處理 URL Routing 的程式碼
- `views/`：放置 Jade View 模板

Express 預設使用 Jade 作為 HTML Template Engine（現稱為 Pug）。

此外，Express 採用的是 MVC 架構設計：Model–View–Controller。

- View：以 Jade 撰寫的模板，定義畫面外觀（儲於 `views/`）
- Controller：以 JavaScript 撰寫的 routing 控制器（儲於 `routes/`）
- Model：可由後端資料邏輯或 JSON 結構支援

這種分層方式，有助於將「資料處理邏輯」與「畫面表現」做出明確區分。

目前的首頁畫面並非由 `index.html` 提供，而是由 `views/index.jade` 動態產生。

## Step 4：佈署靜態文件

Express 預設使用 `public/` 作為靜態資源資料夾。你可將 Bootstrap 等前端框架的 CSS、JS 放置於 `public/stylesheets/` 與 `public/javascripts/` 中。

例如佈署 Bootstrap：

```bash
$ cd myapp/public/stylesheets
$ wget http://netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css

$ cd ../javascripts
$ wget http://netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min.js
```

此後，只需在 Jade 檔內正確引用，瀏覽器便能載入這些樣式與腳本。

## Step 5：擴充 app.js

在第 7.3 節中，我們學會如何用 `Promise` 與 `async/await` 管理非同步錯誤，Express.js 也提供相容的方式來承接這類錯誤。在 `app.js` 裡設定的錯誤中介層（error-handling middleware），會自動攔截來自非同步流程中 `next(err)` 所拋出的錯誤，這與我們前一章提到的 `try/catch` 或 `.catch()` 機制在語意上一致。

`app.js` 是整個 Web Application 的主控制器，其核心包含：

- 匯入所需模組（例如 `http`, `path`, `express`）
- 設定中介層（Middleware），例如 body-parser、logger、靜態服務等
- 設定 URL Routing
- 錯誤處理機制（404 與一般錯誤處理）

以下為範例片段解說：

```javascript
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// 處理 404 未匹配的路由
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 錯誤處理中介層：統一攔截錯誤
app.use((err, req, res, next) => {
  console.error('[Express Error]', err.message);
  res.status(err.status || 500);
  res.send('Server Error');
});

module.exports = app;
```

透過 Step 5 範例程式碼，我們學會 Express.js 與 7.3 節非同步錯誤處理的觀念應用：

| 機制位置           | 作用說明                               | 對應 7.3 概念      |
|--------------------|----------------------------------------|-------------------|
| next(err)          | 非同步中斷流程並觸發錯誤中介層         | reject() / throw |
| app.use((err...))  | 統一處理所有異常，集中處理訊息與回應   | catch / try/catch |
  
### app.use 與錯誤處理中介層

Express.js 的 `app.use()` 方法，用來掛載（mount）中介層（middleware）函數（callback function）。這些函數可攔截請求，進行前處理、路由分派、錯誤回應等。

錯誤處理中介層包含四個參數（`err, req, res, next`）：

```javascript
app.use((err, req, res, next) => {
  // err：錯誤物件，由 next(err) 傳入
  // req：HTTP Request 請求物件
  // res：處理 HTTP Response 物件
  // next：下一個 middleware 函式
});
```

這是 Express 專門設計用來「處理錯誤」的中介層（middleware）。只要呼叫 `next(err)`，Express 就會自動跳出當前的 middleware，進入下一個 middlware。

常見用途如下：

- 統一格式化錯誤訊息回傳（如 JSON 結構）
- 自訂 HTTP status code 與錯誤內容
- 記錄錯誤日誌、送出告警通知
- 與外部系統（如 APM）整合

使用錯誤處理中介層，我們可視需求進行錯誤日誌記錄、回傳格式調整（如 JSON）、整合 APM（Application Performance Monitoring）等進階功能。這類結構化的錯誤控制，正是大型應用系統的必要能力。

這種結構式的錯誤控制設計，不僅提升應用程式的可靠性，也能幫助開發者快速除錯與擴充邏輯。這與第 7.3 節的觀念相對應，在 `callback → Promise → async/await` 的流程中，我們會將錯誤集中於 `.catch()` 或 `try/catch` 裡，Express 也提供類似的「集中攔截機制」。而不像 callback 模式下，錯誤可能分散在不同函式中。

總結來說，錯誤中介層是大型系統中的必備機制，能讓你明確地掌握系統每一個失敗節點。這也正是現代 Web Framework 比 CGI 編碼模式更具工程性的重要基礎。

## NoChat 專案：整合實戰

在後續章節中，NoChat 將使用 `async/await` 處理 WebSocket 與 REST API 的非同步請求，並結合 Express 的錯誤中介層，打造一個具備容錯能力的 Web 應用骨架，完整實踐 7.3 節所介紹的錯誤管理策略。

從這一章開始，我們開啟了貫穿本書的整合實作：NoChat 專案。它是一個簡易但完整的聊天室系統，具備以下能力：

- 使用 Express.js 建構 REST API 與畫面框架
- 客戶端使用 HTML5 + WebSocket 與伺服器連線
- 所有資料以 JSON 格式傳輸
- 非同步流程以 Promise 與 async/await 控制

NoChat 不只是練習範例，它將成為你實戰 Node.js 應用的第一個完整作品。

## Express.js 的學習建議

初學者可以依照以下階段循序學習 Express.js：

- Stage 1：學會建立新的 Express.js 專案
- Stage 2：了解 Express.js 專案的目錄結構
- Stage 3：練習加入 Bootstrap
- Stage 4：學習 Jade 語法並撰寫第一個 View
- Stage 5：練習新增 URL Routing

截至目前，我們已經完成 Stage 1～3。下一節將說明 Stage 4 與 Stage 5 的實作，正式進入 View 建構與 Routing 開發核心。

---

Next: [8.2 MVC 與 HTML Template Engine](2-template.md)
