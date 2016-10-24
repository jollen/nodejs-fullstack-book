## 4.2 學習 JSON 格式

第 1 章介紹了 JSON 的主要精神，現在要來學習 JSON 表示方法。

在 NoChat 範例裡，Server 要把收到的訊息，Push 給所有的 Client 端。Server 與 Client 所使用的標準資料交換格式，就是 JSON。如何把訊息打包成 JSON 格式？方式非常簡單。以表 4-1 為例，要將這個資料表，撰寫為 JSON 格式，只需要二個步驟：

### Step 1：以 JavaScript 物件表示一筆資料

例如，第一筆個人資料，以 JavaScript 物件來表示的話，只要用 *var* 來宣告此物件即可：

~~~~~~~~
var obj = {
  "name": "Jollen",
  "score":  80
};
~~~~~~~~

大括號是 JavaScript 表示物件的語法。上述範例，我們宣告了 *obj* 物件。

### Step 2：轉換成標準 JSON 語法

去掉等號，以及等號左邊的物件宣告，結果如下：

~~~~~~~~
{
  "name": "Jollen",
  "score":  80
}
~~~~~~~~

請注意，結尾的分號也要一併去除。上述的表示方法，就是標準的 JSON 語法。這個例子用 JSON 來表示一筆個人資料。JSON 表示方法非常地簡單，只要會 JavaScript 保證 1 分鐘即可上手，不需要特意學習。

### Step 3：用陣列表示多個物件

|"name" 欄位    |"score" 欄位   |說明      
|--------------|---------------|--------------
|"Jollen"      |80             |第 1 筆使用者資料
|"Paul"        |170            |第 2 筆使用者資料
|"Peter"       |250            |第 3 筆使用者資料
|"Ellaine"     |580            |第 4 筆使用者資料
表 4-1 資料表

表 4-1 共有 4 筆個人資料，因此需要撰寫 4 個物件，每個物件之間用逗號隔開。試想，過去撰寫程式的經驗裡，我們用哪一個資料結構（Data Structure）來表示多筆型別（Data Type）相同的資料呢？答案是：陣列（Array）。

JavaScript 的陣列用中括號來宣告，例如：

~~~~~~~~
var string = ['Jollen', 'Paul', 'Peter'];
~~~~~~~~

這個例子宣告 *string* 陣列，裡頭有 3 個字串。用 JavaScript 怎麼表示 4 個物件的陣列呢？答案如下：

~~~~~~~~
var persons = [
  {
    "name": "Jollen",
    "score": 80
  },
  {
    "name": "Paul",
    "score": 170
  },
  {
    "name": "Peter",
    "score": 250
  },
  {
    "name": "Ellaine",
    "score": 580
  }
];
~~~~~~~~

我們只要把上述的 4 個物件，用陣列「群組」起來即可。和 Step 2 相同，保留以下的寫法即可：

~~~~~~~~
[
  {
    "name": "Jollen",
    "score": 80
  },
  {
    "name": "Paul",
    "score": 170
  },
  {
    "name": "Peter",
    "score": 250
  },
  {
    "name": "Ellaine",
    "score": 580
  }
]
~~~~~~~~

這就是表 4-1 的 JSON 表示方式了。將上述的 JSON 儲存為純文字，這個純文字檔就叫做 JSON Document，這就是 JSON Document 資料庫的概念。

同理，NoChat Server 收到訊息後，只要把訊息表示成 JSON 後，傳送給 Client 端即可。JSON 相當簡單易學，更是優秀的輕量級資料交換格式。

## JSON Stringify

請注意，上述的 JSON 是一個型別（Type），是一個 Array Type。我們不能儲存或傳送「Type」，所以要將 Type 轉成字串（String）後，才能儲存或傳送。例如，對電腦來說，這是一個物件（Object）：

~~~~~~~~
{ "name": "James" }
~~~~~~~~

我們把這個物件轉成字串：

~~~~~~~~
"{ \"name\": \"James\" }""
~~~~~~~~

對電腦來說，這才是字串。所以，將 JSON 物件（Object）轉成字串後，才能儲存或傳送。這個動作就叫 JSON Stringify（字串化）。當然，字串化過的 JSON 字串，要使用時，也要解析（Parse）回物件。

在 Node.js 裡如何做 JSON Stringify 呢？只要呼叫 JSON.stringify() 函數即可。例如：

~~~~~~~~
var obj = { "name": "James" };    // 一個物件
var str = JSON.stringify(obj);    // 字串化
~~~~~~~~

下面是簡約的寫法：

~~~~~~~~
var str = JSON.stringify({ "name": "James" });    // 字串化
~~~~~~~~

沿續第 3 章的 NoChat 實作，將 requestHandler.js 加入 JSON Stringify 的處理。完整程式碼如下：

{title="07-websocket-data-push/requestHandler.js"}
~~~~~~~~
 1 var querystring = require('querystring'); 
 2 
 3 /**
 4  * Global variables
 5  */
 6 var history = [ ];
 7 
 8 function start(response, query, clients) {
 9     console.log("Handler 'start' is started.");
10     console.log("Query string is: " + query);
11 }
12 
13 function send(response, query, clients) {
14     console.log("Handler 'send' is started.");
15     console.log("Query string is: " + query);
16 
17     var parsedstring = querystring.parse(query); 
18 
19     var obj = {
20         message: parsedstring.m,
21         username: parsedstring.u,
22         timestamp: (new Date()).getTime()
23     };
24 
25     history.push(obj);
26 
27     //////// DEBUG ////////
28     for (var i = 0; i < history.length; i++) {
29         console.log("["+i+"]: " + history[i].message);
30     }
31 
32     var json = JSON.stringify({ type: 'message', data: obj });
33 
34     // Data push to all clients
35     for (var i = 0; i < clients.length; i++) {
36         clients[i].sendUTF(json);
37     }
38 }
39 
40 exports.start = start;
41 exports.send = send;
~~~~~~~~

第 19 行到第 23 行，將訊息封裝到物件裡，同時也加入使用者名稱，以及時間戳記（Timestamp）。第 32 行將物件字串化，這就是一個標準的 JSON 資枓了。接著，第 35 行到第 37 行，將這筆 JSON 資料，傳送給所有的 WebSocket Client 端。

---

Next: [4.3 製作 WebSocket 用戶端](3-websocket-client.md)
