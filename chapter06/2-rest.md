## 6.2 REST

SOAP 仍然太過於複雜，為了尋求一個更精簡的做法。Roy Fielding 博士於 2000 年提出一種稱為 REST 的 Web Service 軟體架構。[Roy Fielding][1] 是 Apache HTTP Server 專案的共同創辦人，他在 HTTP 協定上有非常重要的貢獻，REST 架構則是他的博士論文題目。

[1]: http://en.wikipedia.org/wiki/Roy_Fielding "Roy Fielding"

REST 本質上是一種軟體架構，採用 REST 來定義 API 並開發 Web Service 軟體時，這個軟體就稱為 RESTful ARchitecture。RESTful Architecture 的 API 風格更為棈簡，並且以「資源」的角度去描述 Web 服務。例如，新增名為 James 的使用者，定義這個服務的思惟邏輯如下：

### Step 1：找出資源項目

以「James 這個使用者」的角度來看，資源的項目應該是「使用者」，所以這個 RESTful Web API 的定義可寫為：

~~~~~~~~
http://www.moko365.com/resource/user
~~~~~~~~

這是一種 URI 的形式，上述的 URL 也是 URI 的一種寫法。RESTful Web API 以 URI 形式定義，並且要遵循 REST 標準的風格，遵循 REST 風格可以讓 API 更精簡。

### Step 2：描述一位使用者

使用者的名稱是 James，所以 RESTful Web API 為：

~~~~~~~~
http://www.moko365.com/resource/user/james
~~~~~~~~

### Step 3：說明請求（CRUD）

所謂的說明請求，就是說明我們想對 "James" 所做的動作。對於一個資源來說，動作不外乎：

- 新增（Create）
- 讀取（Read）
- 更新（Update）
- 刪除（Delete）

以上 4 個動作，就稱為 CRUD。怎麼跟 Web Service 說明動作呢？RESTful Web API 是基於 HTTP 協定，所以就是使用 HTTP 協定裡的 4 個方法（HTTP Method）：

- GET
- PUT
- POST
- DELETE

舉個例子，現在要新增 James 使用者，就要使用 POST 方法。完整的 HTTP 請求如下：

~~~~~~~~
POST http://www.moko365.com/resource/user/james
~~~~~~~~

HTTP 協定所提供的 4 個方法，可以完整地對應到 CRUD。

## CRUD 與 HTTP Method

哪一個 HTTP Method 對應到 Create？整理如表 6.1。

{title="表 6-1 CRUD 的對應"}
|CRUD       |HTTP Method      |用途說明      
|-----------|----------|--------------
|Create     |POST      |新增
|Read       |GET 	   |讀取
|Update     |PUT       |更新
|Delete     |DELETE    |刪除

RESTful Web API 的定義，只有風格，沒有很固定的標準。所以只要依照這個風格，來定義自已的 API 即可。

了解 REST 的觀念後，馬上可以聯想到：要對第 3 章與第 4 章的 NoChat 範例做調整。原本傳送訊息的 API：

~~~~~~~~
http://localhost:8080/send?m=hello
~~~~~~~~

要修改為儲存資源的概念，即 REST 架構：

~~~~~~~~
POST http://localhost:8080/resource/message/hello
~~~~~~~~

用 POST 方法，來描述 "/resource/message/hello" 這項資源，意思是新增 "hello" 訊息。上述的二個 API 是等價的，都是儲存訊息，但概念有很大的不同：

- 定義 "/send" API，這是一個「傳送」的動作，這是以功能為導向的軟體思惟
- 定義 "/resource/message" 項目，這是一個資源
- "/resource/message/hello" 描述 "message" 資源裡的一個資源（項目）
- 用 POST 來描述 "/resource/message/hello" 資源，表示對資源做新增的動作

如果要加入「讀取所有訊息」的 Web 服務，採用先前的觀念，會定義這個 API：

~~~~~~~~
http://localhost:8080/query?type=all
~~~~~~~~

採用 REST 風格的話，寫法為：

~~~~~~~~
GET http://localhost:8080/resource/message
~~~~~~~~

除了 API 風格要改變外，NoChat 裡的「URL Routing」實作，也要一併做修改。

實務上，我們會尋求一個現成的框架（Framework），讓我們更容易處理 URL Routing；除非有特別的原因，通常不會從零自行實作。Web Application Framework（或稱為 Web Service Framework）都具備 URL Routing 的處理能力。

目前搭配 Node.js 最熱門的 Web Application Framework 就是 [Express.js][2]，我們將在第 8 章導入這項重要的技術。

[2]: http://expressjs.com/