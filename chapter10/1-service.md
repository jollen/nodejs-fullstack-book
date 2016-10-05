## 10.1 服務導向架構

REST API 架構（或稱為 RESTful 架構）是[實作 Web Service 的一個方法][1]。Web Service 採用 SOA 設計模式，它的精神在於「Server 要以提供服務的形式存在」，至於提供服務的方式，就是對外公開 API。

[1]: http://www.ibm.com/developerworks/webservices/library/ws-restful/ "RESTful Web services: The basics"

所以，可以這樣歸納：RESTful 架構是實作 SOA 模式的一個好方法。技術上，RESTful 就是在定義與實作公開（Open）的 API。

很多時候，RESTful 架構與 SOA 是被劃上等號的，但這其實沒有衝突：

- RESTful 是技術上的說法，著重在技術的角度
- RESTful 是定義與實作 Web Service，即 Open API
- SOA 是偏向商業的說法，SOA 所討論的服務（Service）偏向在策略與商業邏輯

[REST 的目標就是要支援 Service-Oriented 的架構][2]。

[2]: http://www.zdnet.com/7-reasons-service-oriented-architecture-and-rest-are-perfect-together-7000007706/ "7 reasons service oriented architecture and REST are perfect together"

在繼續往下閱讀之前，請先了解以下內容：

- 了解圖 2.1（Web Service 導向架構），以及圖 2.1 的重點整理
- 關於 Web Service 技術面的本質，請參考第 6 章的說明
- 有關 REST 的基本概念，請參考 6.2 節的說明。

另外，第 8.5 節提到 Express.js 框架，能幫助開發者解決 4 個基本問題，其中之一就是「REST API 定義與實作」。