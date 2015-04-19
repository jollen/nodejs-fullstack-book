# 軟體思惟 - Web Service 篇

延續第 5 章，在 Web Service 架構的部份，將會介紹 RESTful Architecture。要了解 RESTful Architecture 的精神，就要從 HTTP API 講起。

## 再探 HTTP API

說明 Web Service 觀念的最快方式，就是透過 HTTP API。例如：

~~~~~~~~
http://www.moko365.com/api/query?t=users
~~~~~~~~

利用 HTTP 協定來呼叫這個 API（最簡單方式是用瀏覽器），Server 會以 JSON 格式回應這個請求。例如，上述 API 向 Server 請求「查詢上線人數」的服務，Server 將以這個 JSON 來回應「目前有 10 個人上線」：

~~~~~~~~
{
	"online": 10
}
~~~~~~~~

JSON 格式是由我們自定。這是截至目前為止，我們所學到的觀念。這樣的 API 形式，就是典型的 CGI 程式設計觀念，這部份在前面的章章已做過介紹。

上述的 HTTP API 例子，問號後的字串稱為 Query String。這個例子，瀏覽器要傳遞 *t=users* 的字串給 Server。傳遞 Query String 的方式有 2 種：

- 使用 HTTP 協定的 GET 方法
- 使用 HTTP 協定的 POST 方法

HTTP API 採用 URL 的形式，瀏覽器傳送 URL 請求的做法可分為二種：GET 或 POST。然而，這種 HTTP API 的格式，過於複雜，而且它是從「功能」的角度來描述 API。如果 Web Service 採用這種 API 的寫法，它的軟體架構就會較為複雜，而且也不易於描述「網路上的資源」。

例如，我想開發一個 Web Service 的 API，功能是：新增名為 James 的使用者。要如何定義這個 API 呢？寫法如下：

~~~~~~~~
http://www.moko365.com/api/add_user.php?username=james&type=admin&email=who@anywhere.com
~~~~~~~~

上述這個 API 必須以 HTTP 的 GET 方法來呼叫，所以整個 HTTP 請求會變成：

~~~~~~~~
GET http://www.moko365.com/api/add_user.php?username=james&type=admin&email=who@anywhere.com HTTP/1.1
~~~~~~~~

它的缺點：

- API 形式不夠精簡
- Web Service 軟體架構複雜且不夠嚴謹
- 功能導向的描述，不易於描述資源（使用者為一個資源）

這個例子，是實作 Web Service 的幾種方法之一，當然這種方式仍有存在的價值。因此，這裡並非要推翻這個做法，而是要尋找更多的實作技術。

後來出現一些更嚴謹的 Web Service 實作技術，例如：SOAP（Simple Object Access Protocol）。SOAP 的請求與回應，都採用 XML 的文件形式，這讓 API 形式較為精簡，而且 Web Service 軟體架構也更為嚴謹。

SOAP 的另一個貢獻是：標準化了交換格式。Client 與 Server 之門的資料交換，都採用 SOAP 的標準。這不像典型的 CGI 開發，交換格式沒有一定的標準。資料交換格式標準化後，就易於系統間的整合。例如，每家公司的 Web Service 資料格式都是自訂的，這種百家爭鳴的情況，會造成彼此間互換資料的困擾，當然整合與維護就會是個大問題。

## REST

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

## 結論

最後，可以這樣說，RESTful 是一種雲端（Client/Server）軟體架構。實作 Web Service（Back-end）的技術很多，現今最熱門的就是 Node.js。開發 RESTful Architecture 的 Web Service，只需要 2 個大步驟：

- 描述每一個資源
- 實作每一個資源的 CRUD

描述並實作每一個資源的 CRUD，並且以 JSON 格式交換資料，就是 REST + JSON 的觀念。