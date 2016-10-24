## 2.4 JavaScript 也能開發雲端服務

時間到了 2012 年，在 HTML5 時代正式啟動的今天，JavaScript 成為軟體工程師的必修語言，也是程式設計初學者的最佳選擇。從去年大約 1.5％ 的使用率，飆升到這個月的 3.3％ 左右的使用率。再者，被熱烈炒作的「雲端運算」概念，現在也可以使用 JavaScript 來開發 Server-side 的雲端服務；這就是近二年爆起的新技術「NodeJS」。

所以，不管是 Client-side 或 Server-side，無論是網頁或雲端服務，都可以使用 JavaScript 一統天下了，接下來「All in JavaScript」將成為軟體開發的主流。雖然 JavaScript 還不是當今最受歡迎的程式語言，但是在「Browser & Cloud」的領域，頗有王者的感覺。JavaScript 無疑是王者再臨的代表。

### HTML5 + CSS3 + JavaScript

JavaScript 之所以在網頁設計上佔有重要地位，很重要一個原因是 jQuery 的流行。jQuery 是一個以 JavaScript 技術開發的框架（JS Framework)，並且簡單易學、又易用。使用 jQuery 讓網頁變得活潑、美觀、又具備高度互動性，是簡單不過的事情了。jQuery 是一個框架，網路上有眾多 JavaScript 程式設計師，為它編寫了數以萬計的插件（Plugings），這是 jQuery 能成功的重要原因。

例如，我想要設計一個有「淡入淺出」效果的「投影片撥放」網頁，利用 jQuery 以及相關插件，就可以在幾分鐘內完成。現在，瀏覽網頁就好像在使用應用程式一樣，就像我們瀏覽 Gmail 時，使用經驗跟應用程式已經不向上下了。所以，網頁不再只是網頁（Web pages），網頁是應用程式了；這就是 Web 應用程式。

### 為 HTML 加入應用程式特性

有哪些技術是 Web 應用程式的主要元素？首先，當然是 HTML 標籤。「以前」，最新版本的 HTML 標準是 HTML 4.0，但是它沒有「Web 應用程式」的特性，意思是說，HTML 4.0 其實不包含應用程式方面的標籤。然而，HTML 5.0 把這部份加入了，所以，HTML 5.0 是真正能支援應用程式特性的 HTML 標籤，HTML 5.0 是支援 Web 應用程式的第一個 HTML 版本。事實上，HTML5 完全就是朝 Web 應用程式的方向去制定。

HTML5 本身是標籤。標籤的核心精神是描述資料（Data），例如：文字內容、圖形、顏色等等，要有互動的 UI、要有動態效果，或是進行計算等「程式語言」的工作，就要在網頁裡加上程式碼，這個程式碼就是 JavaScript。如果覺得寫 JavaScript 很麻煩，jQuery 提供更簡便的方式，讓我們在網頁裡加上這些功能。

所以，要製作 HTML5 應用程式，除了 HTML5 標籤外，也要使用 jQuery，並且也要學習 JavaScript 程式設計。另外，我們也知道，HTML 將外觀樣式（Style）分開了，外觀樣式以 CSS 描述；目前 CSS 的最新標準是 3.0 版。

總結來說，HTML5+CSS3+JavaScript 就是 HTML5 應用程式的靈魂。初學者，就是要先掌握這三大技術元素。

### Over HTTP

用戶端與服務器是透過HTTP協定溝通，所以 Open API 的形式就是URL。例如：

```
http://<your-domain-name>/1/post
```

伺服器以 API 形式提供服務，供用戶端呼叫使用。API 也可以附加參數，稱為 Query String，如圖 2.2。

![圖 2.2：API 與 Query String](../images/figure-2_2.png)

沒錯，這就是過去在學習 CGI 時的觀念。前面的部份是API，問號後接的就是 API 的參數，稱為 Query string。一串 Query strin g裡包含多個參數，以這個例子來說，用戶端在呼叫此 API 時，傳遞給服務器的參數如表 2-1。

|參數    |值       |用途說明      
|-------|---------|--------------
|m      |'hello'  | 指定要傳送的訊息 (message)
|u      |'jollen' | 指定 Username
表 2-1 API 的參數

NodeJS 的重要技術之一，就是解析並且處理 API 與 Query String。NodeJS 使用了非常巧妙的機制來處理 API 與 Query String，後續會進行詳細的介紹。

另外，上述定義 API 的方式，是典型的 CGI 做法。這樣的 API 是基於 HTTP 協定，因此也稱為 HTTP API。目前定義 Web Service API 的做法，已經有標準了，稱為 REST。這部份後續再做說明。

## Web-Oriented Architect

Web 導向架構（WOA, Web-Oriented Architect）的精神一張圖就能講明白了。Web 導向架構著重幾個觀念：

- Device-Server 設計模式
- Device 端使用 Browser，以 Browser 做為執行環境（Runtime）
- Server 端提供 APIs，即 PaaS 概念
- Device-Server 採用非同步通訊（Asynchronous communication）

事實上，非同步通訊大家都使用過，就是 AJAX；AJAX  的第一個 A 就是 Asynchronous。但是考量 Server 端的負載（Loading），以及百萬連線（Millions requests）等級的處理能力需求，應該儘量少用 AJAX 機制。這就是 Device-Server 與 Client-Server 的差別，大家可能還不太明白。所以，將二者的差別簡單整理如下：

- Client-Server 做法：在瀏覽器裡（Client）主動向 Server 請求內容，Client 定時（如：每隔5秒鐘）發出請求，持續更新內容。
- Device-Server 做法：在裝置端（Device）和 Server 建立連線，Server 主動將更新內容推送（Push）給裝置端，更明確地說，裝置裡的瀏覽器，瀏覽器再將新內容刷新。

這樣就很清楚了，傳統的 Client-Server 做法是「Data Pull」，即主動去拉資料；Device-Server 的做法是「Data Push」，即推送資料，由 Server 在必要時才將資料推送給 Device。Data Push 的經典代表作就是 BlackBerry（黑莓機）的郵件服務。

為什麼 AJAX 不好用？因為 Server 要冒著「不知道有多少 Client、不知道同時有多少 Requests」的風險。畢竟，主動權在 Client 端，突然一個時間，幾十萬個 Client 來請求資料，每個人又是發瘋似地，每隔一秒來要一次，Server 豈不掛點了。

要達成 Data Push 的目的，有解決二個技術問題：

- Device 端要與 Server 建立永續性（Persistent）連線，也就是 Socket Connection
- Server 推送出去的資料，格式要有統一標準，且輕量化

要解決這二個問題，就是要使用我們在前一章所介紹到的二項技術：WebSocket 與 JSON。所以，總結目前的說明：HTML5 不只是 HTML5，廣義的 HTML5 應用程式，由眾多技術交互形成。

並且，Web 導向架構是 Client-Server 或 Device-Server。哪一種架構會是主流？這並沒有肯定的答案，不過大略可以區分如下：

- 從 Web Page 角度來看，以 Client-Server 為主，這像是傳統 PC 時代的使用案例
從 Web App 角度來看，將 Device-Server 為主

- Web App 的開發思惟，與 Web Page 有很大的不同。目前 Web App 的 UI 製作，採是強調跨螢幕與裝置的特性，這種設計稱為 Responsive Design。並且，Responsive Design 進向以行動裝置為預設值的做法，也就是「Mobie First」

再次總結這二種模式的重點，Client-Server 是 Data Pull 的概念，而 Device-Server 是 Data Push。Data Push 也稱為 Client Pull，表示用戶端主動更新（Refresh）資料；Data Push 則是 Server Push，由伺服器主動推送資料。

---

Next: [2.5 Data Push 設計模式](5-data-push.md)
