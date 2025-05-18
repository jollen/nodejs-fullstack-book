## 2.4 JavaScript 也能開發雲端服務

時間來到 2012 年，HTML5 時代正式啟動，JavaScript 不再只是前端玩具，而是成為軟體工程師的必修語言、初學者的最佳起點。從去年僅約 1.5% 的使用率，到本月已接近 3.3%，成長速度驚人。此時，「雲端運算」的熱潮也讓 JavaScript 成為 Server-side 開發的新寵，這場革命的關鍵，就是 Node.js。

從 Client-side 到 Server-side，從 Web UI 到 API 設計，「All in JavaScript」成為當代主流。雖然它尚未是最受歡迎的語言，但在 Browser 與 Cloud 的語境中，JavaScript 已坐擁語意樞紐地位，可謂王者再臨。

### HTML5 + CSS3 + JavaScript：語意三元組

JavaScript 在網頁設計中地位的崛起，jQuery 是一大推手。這個 JavaScript 框架簡潔、好上手，並透過龐大的插件社群累積了實用的工具庫。例如要實現「淡入淡出」的投影片播放，使用 jQuery 插件數分鐘就能完成。

Web page 開始演化為 Web App，UI 的互動性與使用體驗幾可媲美桌面應用。這也讓我們重新定義「網頁」：它早已不只是資料呈現，而是一種應用環境的展現。

### 為 HTML 加入語意功能

HTML5 相較 HTML 4 最大的差異，在於它加入了「應用程式特性」。HTML4 是資料容器，而 HTML5 是語意容器。標籤仍然是 HTML 的骨架，但要讓標籤動起來，讓使用者與資料互動，必須加入 JavaScript。

CSS3 負責樣式，JavaScript 負責邏輯，HTML5 負責語意描述。三者合體，形成 Web App 的完整語意層。這就是初學者必須掌握的核心技術組合：HTML5 + CSS3 + JavaScript。

### Over HTTP：API 作為語言的呼喚通道

Web App 的 Client 與 Server 透過 HTTP 溝通，API 通常以 URL 呈現：

```
http://<your-domain-name>/1/post
```

![圖 2.2：API 與 Query String](../images/figure-2_2.png)

API 可以附加參數（Query String），例如：

| 參數 | 值        | 用途說明        |
| -- | -------- | ----------- |
| m  | 'hello'  | 指定要傳送的訊息    |
| u  | 'jollen' | 指定 Username |

Node.js 在處理這類 API 與 Query String 時，展現出優雅的設計哲學與模組機制，是它受歡迎的重要原因之一。

目前 Web Service API 的標準形式是 REST，這些 API 建立在 HTTP 之上，也被稱為 HTTP API。我們將在後續章節詳細介紹 REST 的語意風格。

### Web-Oriented Architecture：WOA 的語言結構觀

Web 導向架構（WOA）是一種語意架構的設計思想，重點在於：

* Device-Server 設計模型
* 裝置端（Device）以 Browser 為 Runtime
* Server 端提供 API，即 PaaS 層邏輯
* 雙方採用 Asynchronous 通訊機制

AJAX 就是最早的 Asynchronous 實踐，但在高併發與長連線需求下，傳統 AJAX 容易讓 Server 掛掉。因此，我們需轉向 Data Push 模型：

* **Client-Server（Data Pull）**：Client 定時向 Server 請求更新
* **Device-Server（Data Push）**：Server 在資料更新時主動推送給 Device

黑莓機的郵件服務是經典 Data Push 實作。

### 解鎖 Data Push：WebSocket + JSON

要實現 Data Push，需解決兩大技術挑戰：

* 建立 Persistent Socket Connection
* 採用輕量化、標準化的資料格式（如 JSON）

這正是 WebSocket 與 JSON 所扮演的角色：

```ascii
Device ─ WebSocket ─ Server
       ◀──── JSON Payload ───▶
```

HTML5 不再只是 HTML5，而是語言在 Client × Server × Device 之間協作的整體語意結構。

### Web App ≠ Web Page

從 Web Page 到 Web App，不只是樣式的改變，而是執行邏輯、語言中介層與架構思想的轉變。

* Web Page = Client-Server（Data Pull），適合 PC 時代的內容刷新
* Web App = Device-Server（Data Push），適合 Mobile 時代的語意同步

Web App 強調 Responsive Design，並預設「Mobile First」為設計起點。

再次總結：Client-Server 是由 Client 主動更新（Pull），Device-Server 則是由 Server 推送更新（Push）。這背後的語意邏輯不同，開發架構也將截然不同。

---

Next: [2.5 Data Push 設計模式](5-data-push.md)
