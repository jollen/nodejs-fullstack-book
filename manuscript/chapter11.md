# REST API 應用 - 使用 jQuery

在上一章的 nodejs-chat 專案裡，我們已經實作出基本的 REST API，接下來就是 Client Application 的製作。RESTful 是一種彈性非常大的架構，它讓 Client 端能以更簡單的方式，來整合 Web Service。

使用 jQuery 來製作 Client Application 時，「將不考慮 MVC 架構模式」。為什麼要使用 MVC 模式？以及，為什麼要導入 Backbone.js 呢？相信經由本章的範例製作過程，就可以幫助初學者建立另一個重要的思惟：使用 MVC 架構模式是必要的。

## 呼叫 REST API - 使用 jQuery

上一章也提到，從 REST API 的角度來看，Presentation 的部份是位於 Client 端。Presentation 就是 Client 的網頁（UI）。如果把 Client Application 的觀念延伸到手機 App，Presentation 的觀念就更清楚了：

* 可以使用 Android SDK 來製作 Client Application，此時 Presentation 可以使用 Android 的 View 組件，或是以 HTML5 來製作
* 同理，Client Application 也可以使用 iOS SDK 來製作，當然也可以是 iOS SDK + HTML5

從這個角度來看，Presenetation 自然是位於 Client  端。

以下以幾個步驟，來製作一個簡單 Client Application。

### Step1：建立專案

在 nodejs-chat 專案裡建立 *client/* 目錄，將主要的 HTML5 文件命名為 *chat.html*。同時建立基本的目錄結構：

~~~~~~~
.
├── chat.html
├── images
├── javascripts
└── stylesheets
~~~~~~~

接著使用 Bootstrap 3 來建立 UI，並且使用 jQuery 來呼叫 REST API。將 Bootstrap 3 與 jQuery 安裝至專案目錄下：

~~~~~~~
.
├── chat.html
├── images
├── javascripts
│   ├── app.js
│   ├── bootstrap.min.js
│   ├── jquery.min.js
│   └── jquery.websocket.js
└── stylesheets
    └── bootstrap.min.css
~~~~~~~

### Step 2：製作 UI

Bootstrap 是一個簡單易用的 CSS Framework，也包含字型（Typographics）。目前已經是非常受歡迎的 Web App 製作框架了。除了以文字編輯器，自行撰寫 Bootsstrap 網頁外，網路上有一些所見即所得的 Layout 工具。方便起見，筆者使用 [Layoutit][1] 規劃了一個非常簡單的 UI，如圖 11-1。

[1]: http://www.layoutit.com "Layoutit!"

![圖 11-1 製作 Client Application UI](images/figure-11_1.png)

將 Layoutit 產生的標籤剪貼至 *chat.html*。完整的 *chat.html* 內容如下：

{title="client/00_chat.html"}
~~~~~~~~
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="stylesheets/bootstrap.min.css" />
<script type='text/javascript' src="javascripts/jquery.min.js"></script>
<script type='text/javascript' src="javascripts/bootstrap.min.js"></script>
<script type='text/javascript' src="javascripts/jquery.websocket.js"></script>
<script type='text/javascript' src="javascripts/app.js"></script>
</head>

<body>

<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <h3>
                nodejs-chat
            </h3>
            <div class="alert alert-dismissable alert-info">
                 <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4>
                    jollen
                </h4> 製作聊天室 Client Application
            </div>
        </div>
    </div>
</div>

</body>
</html>
~~~~~~~~

### Step 3：讀取最新訊息

上一章，我們利用了 *curl* 命令來測試 */discussion/latest/<items>* API：

~~~~~~~~
$ curl -X GET http://localhost:3000/discussion/latest/3
[{"message":"hello3"},{"message":"hello4"},{"message":"hello5"}]
~~~~~~~~

現在要將這個測試過程，撰寫成實際的程式碼。因此需要撰寫 JavaScript 程式碼，來呼叫 REST API；我們可使用現有的 JavaScript 程式庫，來進行這項工具。有二個廣受歡迎的 JavaScript 程式庫：

* jQuery
* Backbone.js

採用 jQuery 是簡單方便的方式，初學者可以先使用 jQuery 程式庫來實作 Client Application；感受一下 RESTful 架構的精神。Backbone.js 則是一個 MVC 架構的實作框架，它可以讓 Client Application 的程式碼結構更清楚、易於維護與擴充。

使用 jQuery 的 *ajax* 函數來呼叫 REST API。開啟 app.js，加入以下程式碼：

{title="client/01_app.js"}
~~~~~~~~
// 等候 HTML 文件完成載入
$(document).ready(function(){
	initSubmitForm();
});

var initSubmitForm = function() {
    // 使用 ajax() 來呼叫 REST API
    $.ajax({
        url: 'http://localhost:3000/discussion/latest/3',
        type: "GET",
        dataType: "json",
        complete: function(data, textStatus, jqXHR) {
            console.log(textStatus);
        },
        success: function (data, textStatus, jqXHR) {
            console.log(data);
        }
    });
    
    return false;
};
~~~~~~~~

關於 *ajax()* 的重點說明如下：

* *ajax()* 的 *success* 屬性是一個 Callback Function，我們可以在這個 Callback Function 的第 1 個參數取得傳回值。
* 在 API 呼叫完成後，則是 Callabck *complete*，可以在這個 Callback Function 的第 2 個參數，取得狀態值（成功或失敗）。

可以先使用 Firebug 進行測試，如圖 11-2。觀察 Node.js 的 Console 訊息，也可以知道 Client Application 是否有成功呼叫 REST API。

![圖 11-2 測試 Client Application](images/figure-11_2.png)

### Step 4：處理 JSON 資料

接著，遇到一個小問題：如何將 REST API 回傳的 JSON 資料，轉換成 HTML5 標籤，並顯示在 UI 上。

要解決這個問題，就需要一個 MVC 框架，這類框架能提供以下的重要功能：

* 製作 HTML5 Template
* 將 JSON 資料「套用」到 Template

下一章將正式引用 Backbone.js 來優化 Client Application。目前，暫時使用 Dirty 的方式來進行；也藉此感受 MVC 架構的優點。

先從 *chat.html* 裡，將顯示留言的 HTML5 片段取出，並修改 *app.js* 加入 *dataMapping()* 函數，將 JSON 裡的資料「對應」到 HTML5 裡。完整的 *app.js* 如下：

{title="client/app.js"}
~~~~~~~~
// 等候 HTML 文件完成載入
$(document).ready(function(){
	initSubmitForm();
});

var initSubmitForm = function() {
    // 使用 ajax() 來呼叫 REST API
    $.ajax({
        url: 'http://localhost:3000/discussion/latest/3',
        type: "GET",
        dataType: "json",
        complete: function(data, textStatus, jqXHR) {
            console.log(textStatus);
        },
        success: function (data, textStatus, jqXHR) {
            dataMapping(data);
        }
    });
    
    return false;
};

var dataMapping = function(data) {
    for (i = 0; i < data.length; i++) {
        var htmlCode = 
            "<div class=\"alert alert-dismissable alert-info\">"
            + "     <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
            + "     <h4>jollen</h4>"
            + data[i].message
            +"</div>";

        $('#message').append(htmlCode);
    }
}
~~~~~~~~

再修改原始的 *chat.html* 文件如下：

* 刪除測試訊息
* 在原來顯示訊息的位置，加入一個名為 *message* 的 <div> 區塊
* 後續會以 jQuery 將取得的訊息，放進上述區塊

完整的 *client/chat.html* 內容如下：

{title="client/chat.html"}
~~~~~~~~
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="stylesheets/bootstrap.min.css" />
<script type='text/javascript' src="javascripts/jquery.min.js"></script>
<script type='text/javascript' src="javascripts/bootstrap.min.js"></script>
<script type='text/javascript' src="javascripts/jquery.websocket.js"></script>
<script type='text/javascript' src="javascripts/app.js"></script>
</head>

<body>

<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <h3>
                nodejs-chat
            </h3>
            <div id="message"></div>
        </div>
    </div>
</div>

</body>
</html>
~~~~~~~~

測試前，先利用 *curl* 寫入幾筆訊息：

~~~~~~~~
$ curl -X POST http://localhost:3000/discussion/你好
{"status":"OK"}
$ curl -X POST http://localhost:3000/discussion/測試中
{"status":"OK"}
$ curl -X POST http://localhost:3000/discussion/Hello
{"status":"OK"}
~~~~~~~~

請注意，使用 Firefox 可能無法成功取得 REST API 的回傳資料。如果有問題，請先使用其它瀏覽器。以下是使用 Safari 7.0 的測試畫面。

![圖 11-3 使用 Safari 7.0 測試 Client Application](images/figure-11_3.png)

到這裡，我們已經完成一個重要的里程碑了：整合 REST API 與 Client Application。

經由上述的範例，我們看出了幾個問題：

* JavaScript 與 HTML5 混雜在一起，維護或擴充都是個大問題
* 需要一個良好的框架，讓我們可以解決上述問題，Backbone.js 就是一個不錯的解決方案
* 需要一個更簡單的方式，將 JSON 資料「對應」到 HTML5 裡，同樣 Backbone.js 可以幫助我們解決這個問題

### Step 5：說明 MIME Types

使用 *ajax()* 時，我們指定 *dataType* 屬性的值為 "json"：這代表期望 Server 回傳的資料是 JSON 格式。為了讓 Server 在回傳資料時，能「明確」告知「資料類型」，所以最好能加入「Content-Type」的 HTTP Header。

例如，以下是目前的 REST API 回應檔頭：

~~~~~~~~
$ curl -I -X GET http://localhost:3000/discussion/latest/3
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Thu, 05 Dec 2013 05:45:25 GMT
Connection: keep-alive
Transfer-Encoding: chunked
~~~~~~~~

最好可以加入一行「Content-Type」檔頭如下：

~~~~~~~~
$ curl -I -X GET http://localhost:3000/discussion/latest/3
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json
Vary: Accept-Encoding
Date: Thu, 05 Dec 2013 05:45:05 GMT
Connection: keep-alive
Transfer-Encoding: chunked
~~~~~~~~

"Content-Type" 是標準的 HTTP Header，用來說明回應的資料類型。資料類型稱為 [MIME types][2]，根據 [RFC 4627][3] 的定義，JSON 的 MIME types 字串為 "application/json"。

要回應 HTTP Header，只需要呼叫 *writeHead()* 函數即可：

~~~~~~~~
response.writeHead(200, {"Content-Type": "application/json"});
~~~~~~~~

修改 *routes/discussion.js* 如下：

{title="routes/discussion.js"}
~~~~~~~~
/*
 * URL Routing Handlers
 */

var history = [];	// 存放訊息

exports.create = function(req, res){
  console.log("CREATE: " + req.params.message);

  // 先打包為 JSON 格式
  var obj = {
  	message: req.params.message
  };

  // 再儲存至 history 陣列
  history.push(obj);

  // 製作 Response 訊息 (JSON 格式)
  var response = {
  	status: "OK"
  }

  // HTTP 檔頭
  res.writeHead(200, {"Content-Type": "application/json"});

  // 回傳 Response 訊息
  res.write(JSON.stringify(response));
  res.end();
};

exports.read = function(req, res){
  console.log("ITEMS: " + req.params.items);

  // 取出最新的 {req.params.items} 筆訊息
  var latest = history.slice(0 - req.params.items);

  // HTTP 檔頭
  res.writeHead(200, {"Content-Type": "application/json"});

  // 回傳
  res.write(JSON.stringify(latest));
  res.end();
};
~~~~~~~~

[2]: http://en.wikipedia.org/wiki/Internet_media_type "MIME types"
[3]: http://tools.ietf.org/html/rfc4627 "The application/json Media Type for JavaScript Object Notation (JSON)"

如果想達到即時性（Real-Time）的功能呢？只需要再加入 WebSocket 的機制即可：

* Client Application 開啟時，與 Server 建立 WebSocket 連線
* Server 收到新訊息時，透過 WebSocket 發出通知（Notification）給 Client Application
* Client Application 呼叫 REST API 取得最新資訊

## 認識 Key-Value Pairs 觀念

Backbone.js 如何解決上一節 Step 4 所提到的問題呢？分述如下：

* 宣告 HTML5 Template：Backbone.js 內建 Underscore，我們可以使用 Underscore 來宣告 Template
* 將 JSON「套用」到 Template：使用 Key-Value Pairs 來做對應

JSON 的資料格式，又稱為是 "Key-Value Pairs" 的格式，例如：

~~~~~~~~
{ "name": "jollen"}
~~~~~~~~

與 Key-Value Pairs 的關係說明如下：

* *name* 是 "Key"，又可視為「變數」
* *jollen* 是 "Value"，也就是 *name* 這個 Key 的值

所以，在製作 Template 時，只要把 "Key" 當做變數的觀念，到時就可以直接「對應」了。例如：

~~~~~~~~
<div>
 <p>$name</p>
</div>
~~~~~~~~

並且有一份 JSON 資料如下：

~~~~~~~~
[
	{ "name": "Peter"},
	{ "name": "Paul"},
	{ "name": "John"}
]
~~~~~~~~

此時，Template Engine 就能直接把 Template 和 JSON 對應成以下的結果：

~~~~~~~~
<div>
 <p>Peter</p>
 <p>Paul</p> 
 <p>John</p>
</div>
~~~~~~~~

這麼方便的做法，是導入 Backbone.js 的第一個目的。這種將以 JSON 來表示 Key-Value Pairs 資料，並將 Key-Value Pairs 對應到 HTML5 Template 的觀念，就是一個被稱為「 ViewModel」的觀念。ViewModel 能解決的問題不止於此，這只是 View Model 觀念的一部份。

ViewModel 可以強化 MVC 模式中的 C（Controller），因此把它叫做 MVVM 模式。[MVVM 模式][4]是由微軟所提出的新概念，MVC & MVVM 也經常被放在一起討論。

[4]: http://en.wikipedia.org/wiki/Model_View_ViewModel "MVVM"

從軟體工程的角度，把 MVC 架構模式加入了 Key-Value Pairs 觀念，可以達到以下目的：

* 讓 MVC 模式更為完整
* 用 View Model 來串連 Model 與 View，而不是用 Controller
* 如上，儘可能讓 View 與程式碼無關，又稱為 Code Ignorance
* 如上，讓 UI 設計是 Code Ignorance：讓做 UI 不用寫程式

簡單說，從上述的例子可以發現，UI 設計師只需要把 HTML5 Template 設計好即可，不需要寫程式，就可以將 Server 回傳的資料，顯示在畫面上。

## 結論

學習 MVC 架構模式，先了解它的必要性，會有很大的幫助。如果 MVC 架構模式，在 HTML5 開發方面並沒有太大的必要性，或許可以忽略不學。但經由本章的開發思惟，可以了解到 MVC 架構模式的必要性。

從第 10 章與第 11 章的開發過程中，還可以了解 REST API 的精神，以及它和 Client 端的整合觀念。在本章的最後，透過 Client Application 的開發過程，我們總結一件重要的事情：MVC 與 MVVM 架構模式是必要的。在第 12 章，將針對 MVC 架構模式做討論，也將正式引入 Backbone.js 框架。第 12 章開始，將進入 Frontend 的領域，也是本書「入門篇」的最後一個章節。

本章範例可由 *http://github.com/jollen/nodejs-chat* 取得。