## 2.5 Data Push 設計模式

Data Push 的優點之一，就是：處理百萬連線請求。原因很簡單。因為採用的是 Data Push 機制，所以伺服器可以控制用戶數；如果要處理用戶端超過 10 萬個（舉例），就可以將工作分散到其它伺服器。反之，Data Pull 的做法，難處在於，我們很難了解有多少使用者、在什麼時間，同時進行 Refresh。

Server 透過 WebSocket 找到裝置，並以 JSON 格式將資料推送給裝置，這就是 Data Push 的觀念。此外，Server 端應該以什麼技術來實作呢？看來看去，現在最實際的技術就是 NodeJS。以 NodeJS 技術開發一個專用的 Web Server，透過這個 Web Server 將資料包裝成 JSON 後，經由 WebSocket 送出。

Data Push 的設計模式如圖 2.3。

![圖 2.3：Data Push 架構圖](images/figure-2_3.png)

步驟如下：

- Client 建立與 Server 的 Persistent Connection（WebSocket）
- Server 保存此連線
- Server 有新的資料時，將 Data Push 給所有的Client（經由 WebSocket）
- Client 收到資料，並更新 HTML 內容

上述的步驟並不是什麼學問，因為是很典型的機制。不過，HTML5 已經制定標準做法了，就是 WebSocket。

### AJAX Refresh 重要性下降

AJAX 本質上是一種 Data Pull 模式，也就是由用戶端（Client）來拉取資料（因此也稱為 Data pull）。過去，開發者經常使用 AJAX 來實作 Refresh 功能。但是 AJAX Refresh 有以下的技術缺點：

- 可能造成 Server 的負載
- 不夠即時

即便 AJAX 可以不斷更新（Refresh）資料，但還是不夠即時。要打造「Real-time Web Application」不使用 Data Push 模式是辦不到。因為用戶端，也就是瀏覽器，是以「Refresh」方式向 Web Server 要求資料。例如：每隔1秒鐘請求一次資料。

使用 AJAX 與 Refresh 的模式，會讓伺服器端很難預期同時會有多少請求進來。可能在一些熱門時間，忽然有巨量請求，就會讓伺服器負載量提高，甚致有服務中斷的風險。

AJAX 也不夠即時，當伺服器有新內容時，必須依賴用戶端來主動要求，因此會造成一段「Latency」時間。傳統的「聊天室」網站就是這樣設計：必須更新網頁，才能看到新的聊天訊息。

從這個角度來看，NodeJS 的 Data Push 方式，才是好的做法。不過，AJAX 也不是全然沒有用處了。一些「Non Refreshing」的設計需求，AJAX 仍然非常有用，例如：設計「註冊表單」時，當使用者輸入帳號後，以使用 AJAX 向伺服器查詢「使用者帳號是否可用」。

差異是：使用 AJAX 的方式來呼叫 Open API，而不是不斷的 Refreshing 頁面。

另一個重點是，使用 NodeJS 與 Data Push 方式，才能實作真正的 Real-time Web Application。AJAX 搭配 Refresh 方式，顯然已經不合適了。