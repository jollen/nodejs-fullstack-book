## 2.7 重要的資訊交換格式：JSON

筆者借用了 PaaS（Platform as a Service）這個行銷名詞，來介紹一個實用的語意交換技術：JSON。PaaS 是雲端概念的縮影，它將後端邏輯封裝成平台，而 JSON 則將資料結構封裝成語意最小單位。

過去的 Web 應用，Client 從 Server 端取得的多是 HTML 文件，也就是整包渲染好的畫面。但這樣的格式並不利於資料重用。舉例來說，若 Google 搜尋結果傳回的是純 HTML，開發者必須額外解析文件、擷取有用內容，才能儲存、再運用（例如轉成 CSV 檔）。

從語言邏輯來看，這叫做：沒有提供資料的語意 API，而只是回傳了畫面。

### 為什麼我們需要 JSON？

軟體工程師一開始試圖使用 XML 作為資料交換格式，因其結構明確、語意完整。然而 XML 過於冗長。例如：

```xml
<Telephone>
  <Item>0911-111-111</Item>
  <Item>0900-000-000</Item>
</Telephone>
```

這段資料明明只有兩筆電話號碼，但包裝過後，卻多出大量標籤文字。實際應用中，常見情況是：原始資料 1MB，轉成 XML 後變成 10MB。這就像在語言裡加了太多贅詞，讓傳遞成本暴增。

因此，我們需要一種語意精簡、結構清晰、格式統一的交換標準。這正是 JSON（JavaScript Object Notation）的核心價值所在。

JSON 的語法極其貼近 JavaScript 語言本身，因此能夠無痛整合於 Web 開發流程中，成為 Client/Server 資料交換的事實標準。

### JSON 的角色：語言中介格式

在 HTML5 + JavaScript 架構中，JSON 是語言與資料的共通接口。用來：

* 將資料從 Server 傳送至 Client
* 將語意結構嵌入前端元件
* 作為 API 回傳格式，提升可讀性與可重用性

這是一種語言本位的資料設計方式，它讓 UI 可以專注於互動，後端專注於資料，而 JSON 成為語言邏輯交換的橋梁。

### 延伸語意技術盤點

除了 JSON，本章也簡單提及幾個在語意架構中扮演要角的技術：

* **PhoneGap**：Device API 的 JavaScript 封裝方案。由 Nitobi 公司開發，後被 Adobe 收購，成為 HTML5 × 裝置整合的語言接點。

* **WebSocket**：HTML5 規範中的通訊協定，提供雙向、持久化的語言通道。是語意推送（Data Push）的基礎。

* **Node.js**：使用 JavaScript 開發專用 Web Service 的框架，跳脫 Apache 的靜態頁面思維，成為 Cloud Native Web API 的建構骨幹。

這些技術共同支撐起 PaaS 的語意基礎，使得前後端能以統一語言運作，資料與語境無縫流動，開發效率與語意一致性同步提升。

### All in JavaScript 語意工程時代

現在的前端使用 JavaScript，Server-side 也以 Node.js 執行 JavaScript，資料格式是 JSON，語言邏輯是非同步、事件驅動，這一切標誌著我們正身處於「All in JavaScript」的語意工程時代。

Web 不再只是內容載體，而是語意驅動的應用平台；JSON 則是這場語意交換中的通用貨幣。

---

Next: [2.8 結語：HTML5 是雲端技術](8-summary.md)
