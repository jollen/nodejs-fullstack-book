# 10.3 Presentation 在 Client 端

延續上一節所介紹的 3-Tier 架構與 REST API 設計思維，本節將重心轉向最上層的介面層（Presentation Tier），並從一位 Node.js 開發者的角度來理解：**為何 HTML5 文件應該交由 Client 渲染？而非由 Server 動態生成？**

### REST 架構下的 Client 角色再定義

過去，我們經常以 Server-Side Rendering 的方式回應請求，也就是當使用者輸入網址時，伺服器不只回傳資料，還同步產出完整的 HTML 網頁。但在 REST API 架構中，這樣的做法會讓邏輯混合、耦合提高。

REST 強調的核心精神是：**Server 僅提供資料，Client 負責呈現與互動邏輯。**

因此，整體開發邏輯將出現以下轉變：

* HTML Template 由 Server 提供，但不包含資料
* 資料以 JSON 格式透過 API 傳輸給 Client
* Client 使用 JavaScript 框架（如 Vue、React）進行頁面渲染（Client-Side Rendering）

這種分工方式，才能真正落實 3-Tier 架構中 Presentation 與 Logic 的責任分離。

### 實作觀點：即時聊天室 App 的兩種版本

當我們以 RESTful 架構重構「即時聊天室 App」，將不再由伺服器輸出包含資料的 HTML，而是改為：

1. Server 提供基本的 HTML5 模板（空殼）
2. Client 於畫面載入後發送 AJAX / fetch 請求，取得聊天室歷史訊息
3. JavaScript 將資料插入頁面中的 DOM 元素，完成畫面顯示

同樣的應用邏輯，若以傳統 PHP 結構撰寫，其流程將會是：

1. Client 發送 URL 請求
2. Server 端撈取資料、生成 HTML 字串
3. 將包含資料的完整 HTML 回傳
4. Client 瀏覽器直接顯示網頁

這兩者的差異，就是 Web Page（PHP 式）與 Web App（REST 式）在架構上的分水嶺。

| 架構思維        | 傳統 Web Page        | 現代 Web App（REST） |
| ----------- | ------------------ | ---------------- |
| Server 工作內容 | 查資料 + 組 HTML       | 提供資料（JSON）       |
| Client 角色   | 顯示 Server 組好的 HTML | 組合畫面 + 呈現資料      |
| 資料與畫面耦合     | 高（混在 HTML 中）       | 低（畫面與資料分離）       |

### API 架構下的通則：Server 不產生畫面

回到核心觀念，在 API 架構下（無論是否嚴格遵循 REST 規範），有一個通則：

> **Presentation 層應由 Client 負責，而非 Server。Server 僅負責邏輯與資料。**

這不只是一種效能考量，更是一種工程分工原則，也正是 Service-Oriented Computing 的基本信念。

若以 Express.js 架構設計，即可實現這種邏輯分離。伺服器端僅提供 `/api/messages`、`/api/user` 等資料 API，而前端透過 fetch API 在畫面初始化後，主動取得資料並渲染畫面。

### 實務應用：nodejs-chat 專案

若你已完成前 9 章的學習，建議可以參考以下範例：

GitHub：[http://github.com/jollen/nodejs-chat](http://github.com/jollen/nodejs-chat)

此專案即為一個以 Express.js 為底層、採用 API 架構方式設計的簡易即時聊天室系統。它的基礎框架為：[http://github.com/jollen/nodejs-express](http://github.com/jollen/nodejs-express)

透過這個專案，你將看到如何將 Client 與 Server 明確分工，並透過 API 進行資料互動與畫面更新。

## Presentation 架構模式：Passive View × MVP 思維

MVC 是最耳熟能詳的 Presentation 架構模式，在學習 Web Fullstack 時，我們還需要進一步認識其延伸模式——MVP（Model-View-Presenter）。

尤其是其中的「Passive View」觀念，極具實務啟發性：

* View 僅負責畫面呈現，不直接操作 Model
* 所有邏輯由 Presenter 控制，實作上可對應為 Controller / handler function
* Passive View 可視為一種輕量、模組化的 UI 元件架構

這種結構將頁面轉為「純顯示」，讓資料綁定與邏輯處理交給 JavaScript 管理，是現代 SPA（Single Page Application）框架的設計基礎。

進一步閱讀參考：[Presentation Patterns: MVC, MVP, PM, MVVM](https://manojjaggavarapu.wordpress.com/2012/05/02/presentation-patterns-mvc-mvp-pm-mvvm/)

---

Next: [10.4 Express.js 與 REST API](4-rest-api.md)
