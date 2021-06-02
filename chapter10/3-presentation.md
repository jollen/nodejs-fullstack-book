# 10.3 Presenetation 在 Client 端

有了 3-Tier 與 REST API 架構的觀念後，再重新實作「即時聊天室 App」時，我們會發現整個思惟邏輯都不一樣了。主要的思考重點如下：

- Presentation 儲存在 Client 端，而不是 Server 端
- Express.js 僅負責提供 Presentation 文件，但不進行 Server-Side Rendering
- 透過 REST API 取得 Response Data 後，進行 Client-Side Rendering
- Client 與 Server 透過 API 形式連結，這就是 API Architecture 的觀念

再舉一個例子：實作即時新聞 App。典型的 PHP 開發者，是以「網頁」的概念來架構這個軟體，打造出來的軟體，Scenario 會是這樣：

1. Client 輸入 URL（網址）
2. Server 取得即時新聞
3. Server 將即時新聞 Parse 成 HTML 語法
4. 將完整的 HTML 文件送出
5. Client 端的瀏覽器顯示這份 HTML 文件

但以 REST API 架構觀念重構後，Scenario 應該是：

1. Client 端向 Server 請求 HTML 文件
2. Server 送出模板文件（Template）
3. Client 端瀏覽器顯示模板文件
4. Client 端呼叫 REST API，向 Server 取得即時新聞
5. Server 端以 JSON 格式返回即時新聞
6. Client 端解析收到的 JSON 資料，並顯示新聞至 UI 上的對應位置（這個觀念就叫做 ViewModel）

後者才是 REST API 架構的觀念，也是 3-Tier 架構的正確實作方法。這又是 Web Page 與 Web App 的另外一個重要差異：

- Web App 要考慮軟體架構，即 3-Tier 與 API Architecture
- Web Page 只是一份文件，而不是「軟體」

最後，經由以上的討論，可以知道一個很重要的細節：REST API 架構下，Client 與 Server 是經由 API 來連結，Presenetation（也就是 HTML5 文件）的部份，主要是放置在 Client 端。這才是正確的 REST API 架構觀念。當然 API 的定義與實作，並不一定要遵循 REST API 的規範，但重要的觀念是相同的，其通則如下：

- 任何以 API 架構來連接 Client 與 Server 端的實作，都要將 Presentation 放置在 Client 端
- Server 只做運算與服務供應，這就是 Service-Oriented Computing 的觀念
- 在 SOA 模式下，Server 理論上不供應「網頁文件」

思考清楚 REST API、SOA 與 Web Service 的觀念後，就讓我們來重新實作即時聊天室：nodejs-chat。範例可由 Github 取得：

	http://github.com/jollen/nodejs-chat

nodejs-chat 的開發是基於 http://github.com/jollen/nodejs-express，因此請在完成前 9 個章節的學習後，再繼續往下閱讀。

### Presentation 架構模式

MVC 是最耳熟能詳的 Presentation 架構模式，在學習 Web Fullstack 時，第一個要知道的觀念如下[1]：

* 有一種稱為 Passive View 的 View
* Passive View 非常輕量化，例如以元件形式呈現
* Passive View 與 Model 沒有關係

這樣的觀念，就是 MVP 模式所要強調的重點。MVC 的 View 偏重於「display data to users」的觀念，而 MVP 則是更精進 View 與 Model 的設計。在 MVP 中的 View，強調的是 Passive View 的觀念。

[1] Presentation Patterns : MVC, MVP, PM, MVVM, https://manojjaggavarapu.wordpress.com/2012/05/02/presentation-patterns-mvc-mvp-pm-mvvm/

---

Next: [10.4 Express.js 與 REST API](4-rest-api.md)
