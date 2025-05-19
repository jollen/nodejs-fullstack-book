## 3.4 設計 HTTP API

完整的 NoChat 系統將由兩個主要部分構成：

* **Backend（Server-side）**：基於 Node.js，實作 Web Service 與 WebSocket 資料推送。
* **Frontend（Client-side）**：以 HTML5 + PhoneGap 製作的 Web App，運行於手機裝置。

NoChat 提供兩個基本 API，架構如下：

* `/start`：建立 WebSocket 連線，啟動即時通訊。
* `/send`：透過 HTTP 傳送訊息，由 Server 廣播給所有用戶端。

### `/send` API 的 Query String 參數

| 參數 | 值        | 用途說明              |
| -- | -------- | ----------------- |
| m  | 'hello'  | 指定要傳送的訊息（message） |
| u  | 'jollen' | 指定使用者名稱（Username） |

> 表 3-1：/send API 的參數設計（已於第 2 章簡介，現進一步實作）

---

### 測試案例

以下為 Prototype 階段的測試流程設計，用來驗證 NoChat 系統端對端的通訊能力：

1. 啟動 Node.js Server，監聽 localhost:8080
2. 開啟 `client.html` 聊天網頁
3. 在 client.html 中呼叫 `/start` API → Server 回傳 "OK" 並建立 WebSocket 連線
4. 成功建立連線後，Server 可推送訊息至 Client（Data Push）

測試傳送訊息的步驟：

1. 另開一個瀏覽器視窗
2. 呼叫 API：`http://localhost:8080/send?m=hello`
3. Server 收到訊息後，透過 WebSocket 廣播給所有已連線的用戶端

這組流程雖稱不上完整的 Use Case，但足以完成第一個 Prototype，用以驗證整體架構與資料流動邏輯。

---

### 關於 Web Service 與 API 設計

回顧圖 2.2 所示，我們採用的是最簡明的 HTTP API 設計風格。許多主流網站（如 Google、Facebook）皆提供開放式 HTTP API，供開發者串接其平台服務。

NoChat 的 `/start` 與 `/send` 即為此類 API 的縮影，用於與 Server 交換語意資料。Node.js 的重點即在此：**打造 Web Service，作為語意應用的中介層。**

未來這些 API 將重構為 RESTful API 格式，並搭配更嚴謹的 HTTP Method 設計。

> REST 架構風格下，常見的 HTTP Method 包括：GET、POST、PUT、DELETE 等

目前階段，NoChat 採用 Query String 傳遞參數，並以 GET 為主要傳輸方式。但整體架構已為進一步導入 REST API 打下良好基礎。

---

Next: [3.5 解析 Query String](5-query-string.md)
