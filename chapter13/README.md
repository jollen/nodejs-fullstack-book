# NoSQL 資料庫應用 - 使用 MongoDB

## 開始閱讀

 * [13.1 關於 MongoDB](1-mongodb.md)
 * [13.2 安裝 MongoDB 資料庫伺服器](2-mongolab.md)
 * [13.3 使用 Mongoose Driver](3-mongoose.md)
 * [13.4 CRUD 實作](4-crud.md)

## 本章小結

本章是 Node.js 結合 NoSQL 資料庫的第一課，並且學習使用 Mongoose 來操作 MongoDB 資料庫。MongoDB 資料庫的基本知識廣圍廣大，因此仍有許多需要學習的入門知識：

* Aggregation
* Reference Model
* MapReduce

本章只是 MongoDB 資料庫技術的起點。此外，未來 REST API 的實作，會涉及更多的處理過程，因此必須學習 Node.js 的流程處理（Workflow）。Nodejs 實作流程控制時，應使用 workflow 的觀念，而不是邏輯判斷的方式。其差別如下：

* 邏輯判斷是使用程式語言的特性與語法，例如：if...else...
* 邏輯判斷使用流程圖（flow chart）來設計
* workflow 是有限狀態機（finite state machine）的設計，不是流程圖設計
* workflow 是一種與邏輯解離（decouple，無直接相關的意思）的設計，更易於重用

這部份在後續章節進行說明。此外，對 web app 來說，會員系統是不可或缺的功能。目前的主流做法，是使用 OAuth 技術，讓使用者透過 social accounts（例如：Facebook）來進行會員註冊與登入。這部份會使用 passport.js 模組。