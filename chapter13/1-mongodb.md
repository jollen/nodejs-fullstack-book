## 13.1 關於 MongoDB

MongoDB 是一種 NoSQL（Not-only SQL）的資料庫系統。NoSQL[1] 有別於典型的 SQL 關鍵式資料庫，它採用 JSON 的格式儲存資料，並以文件的形式儲存。文件（Document）可以看做一種純文字檔。

JSON（key-value pair）、文件式儲存與分散式，是 NoSQL 資料庫所強調的特色。NoSQL 資料庫與 SQL 資料庫有著很大的差別，NoSQL 的起源，是為了提出分散式資料庫系統，也就是能分散式儲存資料的 data store。

正因為 NoSQL 是分散式資料庫系統的概念，現今已被廣泛應用在 big data 與 real-time Web application 的領域。技術上，NoSQL 除了不採用 SQL 查詢語法外，也不支援真正的 ACID。此外，也不強調固定的資料表定義（table definition）。

MongoDB 正是一個熱門的 NoSQL 資料庫系統，現今也是一家商業公司。以 MongoDB 為例，可採取定義或不定義資料表，即使採取定義的資料表做法，也可以隨時變更；這樣的觀念稱為 flexiable schema design，後文將會有相關說明。

[1]: http://zh.wikipedia.org/wiki/NoSQL