# 10.1 服務導向架構

經過前幾章的學習，你已經掌握了 JavaScript 的基本語法與語意結構，熟悉了 Express.js 的應用模式，並學會如何建立路由、處理請求與回應。本章將進一步探討這些技術在實務開發中如何組合成一套具有服務特性的應用邏輯，也就是所謂的 Web Service 架構。

REST API 架構（也常稱為 RESTful 架構）是實作 Web Service 的方法之一。它背後所承接的設計理念，屬於一種服務導向架構（SOA, Service-Oriented Architecture）。換句話說，Web Service 並不是一種「功能模組」，而是以「服務提供者」的姿態對外開放使用。

公開 API，就是讓服務被存取的標準方式。

從這個角度來看，我們可以這樣理解：RESTful 架構是實現 SOA 思維的一種技術路徑。它強調的，不只是介面的開放性，而是一種以 HTTP 為媒介的服務描述與存取協議。

許多人會將 RESTful 與 SOA 畫上等號。雖然兩者的核心不盡相同，但其實並不衝突：

* RESTful 是技術導向的術語，著重在 API 設計與實作
* REST 是 Web Service 的技術實踐方式之一
* SOA 是偏向商業與系統策略的思維，強調模組化與服務抽象

你也可以這樣記住：RESTful 是讓 SOA 在技術面具體落地的方法之一。

正如 [ZDNet 的專文所指出](http://www.zdnet.com/7-reasons-service-oriented-architecture-and-rest-are-perfect-together-7000007706/)，REST 的設計目標之一，就是支援服務導向架構。

在第 8 章中，我們已經學會使用 Express.js 建立基本的 Web 路由功能，透過 `app.get()`、`app.post()` 等方法對外提供資料或接收用戶請求。這些方法的實作，其實已經具備了 RESTful 架構的雛形。

本章將進一步強化這樣的架構思維，讓我們能以「服務」為單位，設計清楚、模組化的 Web Application。

舉例來說，在第 8 章我們曾建立一個 `/hello` 路由，當用戶透過瀏覽器或 API 工具（如 Postman）發出 GET 請求時，伺服器就會回應一段文字。這樣的寫法，其實已具備 RESTful 架構的基本元素：「使用 HTTP 方法（GET）、結合路徑（/hello）、回傳資料（文字或 JSON）」。這正是所謂的「服務提供者角色」，讓使用者能透過特定規則存取應用程式內的功能與資料。

ES5 範例：
```javascript
01 var express = require('express');
02 var app = express();
03 app.get('/hello', function (req, res) {
04   res.send('Hello, World!');
05 });
```

ES6 重構版本：
```javascript
01 const express = require('express');
02 const app = express();
03 app.get('/hello', (req, res) => {
04   res.send('Hello, World!');
05 });
```

語法差異對照：

| 語法項目 | ES5                         | ES6                   | 語意說明             |
| ---- | --------------------------- | --------------------- | ---------------- |
| 變數宣告 | `var`                       | `const`               | 使用 const 確保不可變參考 |
| 函數寫法 | `function (req, res) {...}` | `(req, res) => {...}` | 使用箭頭函數簡化語法       |
| 輸出格式 | `'Hello, World!'`           | `'Hello, World!'`     | 無差異，保持一致         |

在繼續閱讀本章之前，建議先複習以下內容，以利理解：

* 圖 2.1：「Web Service 導向架構」的圖解與其概念重點
* 第 6 章中對 Web Service 技術本質的說明
* 第 6.2 節中關於 REST 的核心概念

此外，在第 8.5 節我們已介紹過 Express.js，它協助開發者解決了四個核心問題，其中一項便是「REST API 的定義與實作」，而這正是我們這一章所要延伸深入的方向。

接下來的幾節，我們將更深入探討 SOA 的設計原則，理解 REST 與 3-Tier 架構的關聯，並透過具體範例練習如何用 Express.js 實作一個符合服務導向設計的 Web Service。

---

Next: [10.2 關於 SOA 與 3-Tier 架構](2-soa.md)
