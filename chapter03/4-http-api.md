## 3.4 設計 HTTP API

完整的 NoChat 分為二個部份：

- Backend（Server-side）將基於目前的 Node.js 程式碼繼續完善
- Frontend（Client-side）手機端的 App 將以 HTML5 + PhoneGap 來製作

NoChat 提供二個API，現在將 API 詳細定義如下。

- /start，建立與 Client 的 WebSocket 連線
- /send，送出訊息。

'/send' API 的 Query String 參數定義如表 3-1。這部份在第 2 章已做過說明。

{title="表 3-1 API 的參數"}
|參數    |值       |用途說明      
|-------|---------|--------------
|m      |'hello'  | 指定要傳送的訊息 (message)
|u      |'jollen' | 指定 Username

### 測試案例

以下設計一個簡單的測試案例，在完成第一個 NoChat 的 Prototype 後，將以下列步驟進行測試：

1. 在 localhost 啟動 Node.js

2. 打開 client.html 聊天網頁

3. client.html 呼叫 API：http://localhost:8080/start，Server 回傳 "OK" 訊息

4. client.html 與 Server 建立 WebSocket 連線

5. clieht.html 開始接收 Node.js 推送（Data Push）的即時訊息

傳送訊息給 Node.js 的測試步驟：

1. 開啟一個新的瀏覽器視窗

2. 使用瀏覽器呼叫 API：http://localhost:8080/send?m=hello

3. Node.js 收到訊息，並透過 WebSocket 將訊息 Push 給所有的用戶端

這還不算是一個真正的使用案例(Use Case)，但至少可以幫助我們實作出第一個Prototype。

### 關於 Web Service

圖 2.2 是大家所熟悉的 HTTP API 形式。許多網站，像是：Google、Facebook 等，都有開放 HTTP API 供開發者存取它們的服務。以 NoChat 來說，透過上述二個 API 可以向 Server 請求服務。因此，Node.js 的重心，就是在發展 Web Service。

Web Service 的 API 定義，未來將重構為 REST 標準。基於 HTTP 的 Web Service API，是目前為止，我們所學到的重要觀念。

此外，呼叫 HTTP API 的方式，可使用 GET 與 POST 二種 HTTP 方式（HTTP Method），這二種方式都是定義在 HTTP 裡的標準。REST 標準，也引用了其它的 HTTP Method。

目前，NoChat 仍暫時以 Query String 的方式來傳遞參數。