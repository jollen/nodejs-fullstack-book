# 第 4 章：Node.js 入門 - WebSocket 與 JSON 篇

## 開始閱讀

 * [4.1 第一個 WebSocket 伺服器](1-websocket.md)
 * [4.2 學習 JSON 格式](2-json.md)
 * [4.3 製作 WebSocket 用戶端](3-websocket-client.md)
 * [4.4 使用 jQuery 模式](4-jquery-pattern.md)
 * [4.5 使用 *this* 物件](5-this.md)

 ## 本章小結

透過一個即時聊天室的開發過程，我們初步學會了重要的 WebSocket 基礎知識：

- 開發 WebSocket Server
- 開發 WebSocket Client
- 建立 Server/Client 的 WebSocket 連線
- 使用 WebSocket 做 Real-time Data Push

關於 NoChat 範例，目前還沒有使用資料庫來儲存訊息。後續將介紹 Node.js 如何使用資料庫的，有幾個相關的重要觀念，先整理如下：

- 如果要將即時訊息儲存下來，就要使用到資料庫。目前 Node.js 所使用的資料庫，是一種以 JSON Document 形式儲存資料的技術，並非傳統的 SQL 資料庫（關聯式資料庫）技術
- 這類型的資料庫，是一種 JSON Document-based 資料庫，故名思義，它是一種以 JSON 文件方式來儲存資料的 Database
- 這種不以 SQL 查詢語言為主的資料庫，又稱為 NoSQL（Not Only SQL）
- 較知名的有 MongoDB 與 CouchDB

由於這種資料庫，並不是以傳統的 SQL 查詢與儲存，因此也稱為「NoSQL」的資料庫。