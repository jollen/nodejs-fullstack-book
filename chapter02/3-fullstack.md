## 2.3 Web Fullstack 軟體開發的概念

HTML5 不只是技術，它是一場 Mobile + Cloud 世代的語意變革。它重新定義了 Web 的角色與語境，也讓「Web 應用程式」這個詞有了全新的生命力。本章內容將協助您理解，HTML5 如何引導 Web Fullstack 的思維成形。

![圖 2.1：Web Service 導向架構](../images/figure-2_1.png)

圖 2.1 展示了 HTML5 與 Cloud 的基本關係圖，這不僅是 HTML5 軟體開發的起點，更是一張「系統」架構圖，而非僅止於「應用程式」本身。因為 HTML5 涵蓋了用戶端與伺服器端，尤其是在行動裝置崛起之後，「Mobile + Cloud」成為這場語言轉向的核心座標。

HTML5 架構對應的是 Web Application 的思維，其技術精神可歸納為 Web-Oriented Architecture（WOA）。圖中關鍵如下：

* **Presentation（View）**：即 App 的 UI，使用 HTML5/CSS/JS 實作
* **Device API**：可透過 JavaScript 呼叫裝置功能，PhoneGap 是代表性實作
* **瀏覽器（Browser）**：成為 HTML5 應用程式的 Runtime 核心
* **Server（以 Node.js 為例）**：提供 RESTful API，即 Web Service。這些 API 通常以 URL 呈現，也稱 Open API、HTTP API 或 Platform API
* **雙端皆為 JavaScript 語言環境**：用戶端與伺服器共用 JavaScript，這是 All in JavaScript 的時代
* **資料交換格式**：以 JSON 為主，提升效能並降低頻寬耗用

### 從 Web Page 到 Web App

HTML5 讓我們以 JavaScript 開發應用程式，並透過瀏覽器來運行它。換句話說，HTML5 App 本質上是 Web App，只是其功能與語境早已跳脫傳統網頁的框架。

Gmail 就是經典案例：我們用瀏覽器登入、操作、收發信件，這不是「網頁」，而是一種 Web Layer 上的語意應用。也因此，HTML5 的真正價值，不只是跨平臺與裝置的方便，而是它將 Web 推進為「應用載體」——一種能夠裝載語意邏輯的容器。

HTML5 作為 Web App 的標準，理應被所有行業關注。因為這已不是純前端技術，而是應用設計、資料交換、裝置通訊三者的交集之處。

### HTML5 時代來臨

HTML5 的起源，是來自 [Web Applications 1.0][5] 的標準草案。起初它並不被業界重視，直到 Apple 在 2010 年公開表態拒用 Flash，HTML5 才真正進入市場視野。

[5]: http://www.whatwg.org/specs/web-apps/2005-09-01/ "Web Applications 1.0"

2012 年，HTML5 終於推出第一個正式草案版本，為各大瀏覽器廠提供共同開發標準。這類標準一旦被認可，通常就是「語言進場的產業契約」，它不是問世，而是參戰。

再者，智慧型手機的快速普及更讓 HTML5 有了落地舞台。它原本是個草根標準，卻在 iOS 與 Android 的推波助瀾下，成為支配 App 語境的引擎。這不是偶然，而是語言需求壓力推動的必然。

### All in JavaScript 的時代

JavaScript 曾是網頁的小特效，如今卻成了 Web App 的主力兵器。從 2003 至 2007 年的低潮，到 2008 年之後因 Web 2.0 與 jQuery 再次走紅，JavaScript 經歷了從 UI 裝飾者到 App 建構者的身份轉變。

進入 HTML5 時代，JavaScript 更成為語意運算的主角。你不只用它製作動態效果，更用來管理 UI 流程、整合雲端服務、實作裝置 API 控制邏輯。

Google Chrome 的 JavaScript 引擎演進，亦是這股變革的代表。提升引擎效能，是為了讓 JavaScript 可以承擔更重的應用責任，不再只是前端點綴，而是成為語言與使用者互動的中介器。

### 學好 JavaScript 程式語言

在「HTML5 + JavaScript」的結構裡，JavaScript 就是語言主軸。它不只是讓頁面會動，更讓「語意會走」。從 UI 設計模式，到非同步資料交換，再到模組化架構與設計模式的運用，JavaScript 已經從語法升格為架構思想。

學好 JavaScript，不再是學會怎麼寫，而是理解它如何成為語言與裝置、使用者與雲端之間的邏輯橋梁。

---

Next: [2.4 JavaScript 也能開發雲端服務](4-js.md)
