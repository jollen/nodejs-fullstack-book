# Node.js Fullstack《從零到一的進撃》

本書正在進行第 4 版（2025 年最新版）的改版工程。

![](images/cover.jpg?1024)

## 關於本書

這是一本 Node.js Fullstack 的入門電子書，它的目標是成為優質的 Beginner to Beginner 教材。

本書內容定位為《從零到一》的基礎教學，並使用在[我的 Node.js Fullstack 培訓課程](https://github.com/jollen/blog)。這更是一本「初學者寫給初學者」的教材：

* 每個主題都從基本觀念（Zero）開始講述，並介紹到能撰寫簡單的程式為止（One）
* 希望在學習的過程中，培養同學「寫程式的修煉」

## Learn to Think

**寫程式的修煉**是本書的宗旨，也是一直以來我做培訓的理念。這份教材使用在我的培訓課程，內容多以步驟化方式引導入門，但更重要的是，希望在 zero-to-one 的過程，培養「[Thinking](http://www.ybrikman.com/writing/2014/05/19/dont-learn-to-code-learn-to-think/)」的能力，而不是只學習如何照本宣科地寫程式。有了 Thinking 的能力後，會有另一個重要的收獲：能開始閱讀豐富的網路文件，還能在拜讀優質電子書的過程中，對大神分享的內容產生共鳴。

## 關於作者

Jollen（陳俊宏），Moko365 Inc 創辦人暨講師、Mokoversity Inc 開放創新學院創辦人與 Devify Inc 發起人。興趣是 Web Fullstack 技術、Android Framework、Linux 驅動程式、軟體架構設計、研發管理與產品規劃。近期的研究計畫有 [WoT.City](https://github.com/wotcity)、[DevifyPlatform](https://github.com/DevifyPlatform) 與 [Flowchain](https://github.com/flowchain)，目前參與 2 個 Blockchain 相關新創團隊。

 * Email：<jollen@jollen.org> 
 * Blog：http://www.jollen.org/blog
 * Github：https://github.com/jollen

## v4 時桯

* 預計 2025 年 6 月完成
* 預計 2025 年 6 月底電子書上市
* 改版要點
  * 簡化原本的文字描述
  * 更新與刪除過時內容
  * 更新 JavaScript 範例片斷（ES5/ES6）
  * 補齊遺漏內容
  * 加強內容排版（電腦書）
    
## 發行紀錄

* 2025-05-18：開始進行第 4 版改版工程
* 2016-10-04：開始進行第 3 版改版工程
* 2015-12-23：開始進行第 2 版改版工程

# 目錄

## Part 0：Fundamentals

### 第 1 章：JavaScript 設計模式

* 1.1 [Object](chapter01/1-object.md)
* 1.2 [宣告 Class](chapter01/2-class.md)
* 1.3 [使用 Factory Pattern](chapter01/3-factory.md)
* 1.4 [Constructor Pattern](chapter01/4-constructor.md)
* 1.5 [Design Pattern for Front-End](chapter01/5-frontend.md)
* 1.6 [Module Pattern](chapter01/6-module.md)
* 1.7 [jQuery Pattern](chapter01/7-jquery.md)
* 1.8 [選擇器模式](chapter01/8-selector.md)
* 1.9 [Prototype Pattern](chapter01/9-prototype.md)
* 1.10 [其它模式](chapter01/10-misc.md)

### 第 2 章：HTML5 軟體開發的概念

* 2.1 [HTML5 的 Runtime 是瀏覽器](chapter02/1-html5-runtime.md)
* 2.2 [從 Chrome 瀏覽器談起](chapter02/2-chrome.md)
* 2.3 [Web Fullstack 軟體開發的概念](chapter02/3-fullstack.md)
* 2.4 [JavaScript 也能開發雲端服務](chapter02/4-js.md)
* 2.5 [Data Push 設計模式](chapter02/5-data-push.md)
* 2.6 [Device API 的革命時代](chapter02/6-device-api.md)
* 2.7 [重要的資訊交換格式：JSON](chapter02/7-json.md)

### 第 3 章：Node.js 入門 - URL Routing 篇

* 3.1 [Hello, World](chapter03/1-hello-world.md)
* 3.2 [製作 Node.js 模組](chapter03/2-module.md)
* 3.3 [URL Routing](chapter03/3-url-routing.md)
* 3.4 [設計 HTTP API](chapter03/4-http-api.md)
* 3.5 [解析 Query String](chapter03/5-query-string.md)
* 3.6 [Node.js 語法標準](chapter03/6-es5-es6.md)

### 第 4 章：Node.js 入門 - WebSocket 與 JSON 篇

* 4.1 [第一個 WebSocket 伺服器](chapter04/1-websocket.md)
* 4.2 [學習 JSON 格式](chapter04/2-json.md)
* 4.3 [製作 WebSocket 用戶端](chapter04/3-websocket-client.md)
* 4.4 [使用 jQuery 模式](chapter04/4-jquery-pattern.md)
* 4.5 [使用 *this* 物件](chapter04/5-this.md)

## Part 1：Basic Concepts

### 第 5 章：軟體思惟 - Lambda 篇

 * 5.1 [Lambda](chapter05/1-lambda.md)
 * 5.2 [Callback Function](chapter05/2-callback.md)
 * 5.3 [從 TypeScript 談起](chapter05/3-typescript.md)
 * 5.4 [使用 Promise 封裝非同步處理流程](chapter05/4-promise.md)
 * 5.5 [async/await：語意同步化](chapter05/5-async.md)

### 第 6 章：軟體思惟 - Web Service 篇

* 6.1 [再探 HTTP API](chapter06/1-http-api.md)
* 6.2 [REST](chapter06/2-rest.md)
* 6.3 [REST + JSON 範例](chapter06/3-rest-json.md)

### 第 7 章：軟體思惟 - Non-blocking IO 篇

* 7.1 [認識 Non-blocking IO](chapter07/1-nonblocking-io.md)
* 7.2 [非同步式讀取多個檔案](chapter07/2-readfile-async.md)
* 7.3 [深入 Node.js 非同步錯誤處理](chapter07/3-error-handling.md)

## Part 2：Getting Started

### 第 8 章：Node.js 應用 - Express.js 入門

* 8.1 [Express.js 初體驗](chapter08/1-expressjs.md)
* 8.2 [MVC 與 HTML Template Engine](chapter08/2-template.md)
* 8.3 [解析 app.js](chapter08/3-app.md)
* 8.4 [Express URL Routing](chapter08/4-url-routing.md)
* 8.5 [Middleware 的觀念](chapter08/5-middleware.md)

### 第 9 章：Express.js 應用 - Middleware 

* 9.1 [Express.js 初體驗](chapter09/1-middleware.md)
* 9.2 [MVC 與 HTML Template Engine](chapter09/2-use.md)
* 9.3 [解析 app.js](chapter09/3-use-middleware.md) 

### 第 10 章：REST API 架構 - 使用 Express.js

* 10.1 [服務導向架構](/chapter10/1-service.md)
* 10.2 [關於 SOA 與 3-Tier 架構](chapter10/2-use.md)
* 10.3 [Presenetation 在 Client 端](chapter10/3-use-middleware.md)
* 10.4 [Express.js 與 REST API](chapter10/4-rest-api.md)
* 10.5 [Node.js Chat Client](chapter10/5-chat-client.md) 
* 10.6 [WebSocket 即時推播](chapter10/6-websocket.md) 

## Part 3：Fullstack Beginner

### 第 11 章：REST API 應用 - 使用 jQuery

* 11.1 [呼叫 REST API - 使用 jQuery](chapter11/1-rest-jquery.md)
* 11.2 [認識 Key-Value Pairs 觀念](chapter11/2-key-value.md)

### 第 12 章：MVC 架構實作 - Backbone.js 入門

* 12.1 [Backbone Way](chapter12/1-backbone-way.md)
* 12.2 [認識 *View.$el*](chapter12/2-$el.md)
* 12.3 [認識 Backbone.Model](chapter12/3-model.md)
* 12.4 [認識 Backbone.Model.fetch](chapter12/4-model-fetch.md)
* 12.5 [認識 Backbone.Model.save](chapter12/5-model-save.md) 

### 第 13 章：NoSQL 資料庫應用 - 使用 MongoDB

* 13.1 [關於 MongoDB](chapter13/1-mongodb.md)
* 13.2 [安裝 MongoDB 資料庫伺服器](chapter13/2-mongolab.md)
* 13.3 [使用 Mongoose Driver](chapter13/3-mongoose.md)
* 13.4 [CRUD 實作](chapter13/4-crud.md)

### 附錄

* A [練習用專案](projects)

## 培訓課程

* [Mokoversity Fullstack IoT 2017](https://www.mokoversity.com/iotschool)

## Contributors

感謝 [@Hierom](https://github.com/Hierom)、[@benshiue](https://github.com/benshiue) 提交的貢獻與協助錯誤修正。

## 授權方式

<a rel=“license” href=“http://creativecommons.org/licenses/by-nc/4.0/“><img alt=“創用 CC 授權條款” style=“border-width:0” src=“https://i.creativecommons.org/l/by-nc/4.0/88x31.png” /></a><br />本著作係採用<a rel=“license” href=“http://creativecommons.org/licenses/by-nc/4.0/“>創用 CC 姓名標示-非商業性 4.0 國際 授權條款</a>授權
