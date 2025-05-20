# 10.2 關於 SOA 與 3-Tier 架構

延續上一節對 RESTful 架構的介紹，我們將更深入從系統觀角度思考：「Web Application 究竟應該如何設計成為一種可模組化、可維運、可擴充的服務？」這正是 Service-Oriented Architecture（SOA）要解決的問題，也是現代 Web Service 發展的主流方向。

SOA（Service-Oriented Architecture）並不是一套工具，而是一種軟體設計與部署的結構模式（Design Pattern）。它的核心精神在於：將應用系統拆解為一組可獨立部署、可重複使用的服務（Service），這些服務透過標準化的介面（如 REST API）對外暴露功能，形成鬆耦合的系統組件。

Node.js 之所以在近年來成為 SOA 實作的重要技術，正是因為其非同步、事件驅動（Event-Driven）架構，天然地適合處理分散式與微服務型的應用情境。許多新創公司也因此選擇以 Node.js 為基礎，打造輕量級、高延展性的服務平台。像是知名團購網站 Groupon，就曾公開說明他們將網站架構遷移至 Node.js 的實作經驗。[參考來源][3]

[3]: https://engineering.groupon.com/2013/node-js/geekon-i-tier/ "Geekon: I-Tier"

Event-Driven 是 SOA 中常見的程式設計模式，與過去常見的循序式（Procedure Programming）不同，它更偏向於「狀態轉移 × 行為觸發」的思維，與狀態機（State Machine）邏輯高度契合。Node.js 開發者若能將 State Machine 的觀念結合至 Express.js 應用，將能進一步掌握複雜應用邏輯的處理方式。本節雖不深入探討狀態機，但在設計思維上，這是一個值得記下的發展方向。

## 3-Tier 架構：SOA 的系統分層實踐

SOA 並非憑空架構，它需要具體的系統結構來支撐服務的配置與邏輯分工。最常見也最具代表性的結構形式之一，就是 3-Tier 架構（Three-Tier Architecture）。

3-Tier 是 Multi-Tier（多層式）架構中的一種典型實作方式，將應用系統分為三個邏輯層：

* **Presentation Tier**（介面層）：與使用者互動，負責畫面與 UI 顯示邏輯。
* **Logic Tier**（邏輯層）：處理應用邏輯，例如判斷條件、執行流程控制與資料轉換。
* **Data Tier**（資料層）：負責資料儲存、讀寫與查詢，可對應到資料庫或檔案系統。

這三層之間的分工，讓系統在開發、維護與測試上具備更清晰的責任界線。以下為 Wikipedia 所提供的標準 3-Tier 架構圖：

![圖 10-1 Three-tiered Application（圖片來源：http://en.wikipedia.org/wiki/Multitier\_architecture，遵循 Public Domain 授權）](../images/figure-10_1.png)

### 從開發者角度看 3-Tier 架構

在 Node.js + Express 的開發流程中，三層架構可對應如下：

| 架構層級              | 對應模組 / 技術                  | 範例描述                             |
| ----------------- | -------------------------- | -------------------------------- |
| Presentation Tier | HTML / Frontend Frameworks | 使用者透過瀏覽器發送 HTTP 請求               |
| Logic Tier        | Express.js 路由與 handler     | `app.get('/api/items', handler)` |
| Data Tier         | MongoDB / File System      | handler 中透過 DB 取出資料，並傳給使用者       |

這樣的分工，也意味著：

* 使用者無法直接存取資料庫（隔離）
* 所有資料存取邏輯必須經過中介層（handler function）處理
* 有利於 API 測試、自動化部署與邏輯重構

### 與 MVC 的差異

許多初學者會將 MVC（Model-View-Controller）與 3-Tier 架構混淆，因為兩者都有「分層設計」的特色。但兩者的本質差異在於：

* 在 MVC 中，View 層是可以直接調用 Model 層的
* 在 3-Tier 架構中，Presentation 層**無法**直接操作 Data 層，必須透過 Logic 層轉譯與串接

這種「隔層存取」的設計，正是為了實現高內聚、低耦合的系統架構，讓應用更容易維護與擴展。

> 關於 MVC 模式，將於第 11 章介紹 Backbone.js 框架時進一步說明。

---

Next: [10.3 Presenetation 在 Client 端](3-presentation.md)
