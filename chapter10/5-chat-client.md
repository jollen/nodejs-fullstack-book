## 10.5 Node.js Chat Client

Client Application 的部份，應實作以下功能：

- 輸入即時訊息
- 呼叫 REST API，傳出訊息給 Server
- 經由 WebSocket 接收即時訊息
- 呼叫 REST API，取得最新的 *n* 則訊息

接下來，請依以下步驟，練習實作 nodejs-chat 專案。

### Step 1：定義 REST API

假設主機名稱為 chatservice.org，接著定義 nodejs-chat 專案的 CRUD 操作，如表 10-2。

{title="表 10-2 REST API 定義"}
|CRUD       |HTTP Method      |URI 格式      
|-----------|----------|--------------
|Create     |POST      |http://chatservice.org/discussion/{message}
|Read       |GET 	   |http://chatservice.org/discussion/latest/{items}
|Update     |PUT       |無
|Delete     |DELETE    |無

這是一份最低消費的定義：僅支援新增與讀取訊息的功能。例如，現在要傳送 "Hello" 訊息，Client 端應呼叫的 API 為：

	http://chatservice.org/discussion/hello

如果要讀取最新 10 筆訊息，應呼叫的 API 為：

	http://chatservice.org/discussion/latest/10

請注意幾個重要觀念：

- 儘可能避免使用 Query String
- 不要使用空白字元（Space）
- 全部小寫

此外，REST API 的 URI 類似於目錄結構，所以我們可以這樣解釋：

~~~~~~~~
$ mkdir discussion
$ cd discussion
$ mkdir 5d41402abc4b2a76b9719d911017c592
$ cd 5d41402abc4b2a76b9719d911017c592
$ echo "hello" > db.txt
~~~~~~~~

接著，會得以下的 Tree-Structure：

~~~~~~~~
.
└── discussion
    └── 5d41402abc4b2a76b9719d911017c592
        └── db.txt
~~~~~~~~

上述的數字串，是一個 MD5 編碼，用來做為這筆資料的「ID」。如果第二筆資料，這個樹狀結構會成長成這樣：

~~~~~~~~
.
└── discussion
    ├── 5d41402abc4b2a76b9719d911017c592
    │   └── db.txt
    └── 7d793037a0760186574b0282f2f435e7
        └── db.txt
~~~~~~~~

一開始學習 REST API 定義的初學者，經常犯的錯誤，就是誤解了 REST API 的「Resource」意義。比如說，以下這個結構是不好的：

~~~~~~~~
.
├── discussion1
│   └── db.txt
├── discussion2
│   └── db.txt
└── discussion3
    └── db.txt
~~~~~~~~

REST API 的根節點（root node），也就是 */discussion*，它 是一個資源名稱（Resource）；而這個資源在整個系統裡，應該只有一個（一份）。理論上，root node 要符合 Singleton 設計模式的要求。

![圖 10-3 Root Node 是 Singleton](images/figure-10_3.png)

### Step 3：實作 URL Routing

修改 app.js，加入以下程式碼：

~~~~~~~~
var discussion = require('./routes/discussion'); // ./routes/discussion.js

app.post('/discussion/:message', discussion.create);
app.get('/discussion/latest/:items', discussion.read);
~~~~~~~~

參考表 10-1 與表 10-2，得到以下結論：

- 建立訊息要使用 POST Method，因此使用 *app.post()* 函數來建立 URL Routing
- 讀取訊息要使用 GET Method，因此使用 *app.get()* 函數來建立 URL Routing

URL Routing 的實作部份，只需要將 URI 的變數讀出，再放入資料庫即可。由於尚未介紹 Node.js 與資料庫的應用，因此現階段暫時以 Global Array 來存放。*discussion.js* 目前的實作如下：

~~~~~~~~
/*
 * URL Routing Handlers
 */
 
exports.create = function(req, res){
  console.log("CREATE: " + req.params.message);
};

exports.read = function(req, res){
  console.log("ITEMS: " + req.params.items);
};
~~~~~~~~

如果要新增 'hello' 訊息，就要呼叫這個 API：

	http://localhost:3000/discussion/hello

但是，如果直接使用瀏覽器去開啟的話，會出現「404」找不到網頁的錯誤，為什麼呢？因為瀏覽器是以 GET Method 來做請求，這可以由 Node.js 的 Console 訊息得知：

~~~~~~~~
$ node app.js 
Express server listening on port 3000
GET /discussion/hello 404 9ms
~~~~~~~~

所以，現在我們改用另外一個工具 *curl* 來做測試：

~~~~~~~~
$ curl -X POST http://localhost:3000/discussion/hello
~~~~~~~~

使用 *-X* 參數即可指定 HTTP Method。測試時，可以看到以下的 Console 訊息：

~~~~~~~~
$ node app.js 
Express server listening on port 3000
CREATE: hello
POST /discussion/hello 200 120013ms
~~~~~~~~

程式碼框架完成後，就可以進行實作工作了。以下是 *discussion.js* 的完整程式碼。

{title="routes/discussion.js"}
~~~~~~~~
 1 /*
 2  * URL Routing Handlers
 3  */
 4 
 5 var history = [];	// 存放訊息
 6 
 7 exports.create = function(req, res){
 8   console.log("CREATE: " + req.params.message);
 9 
10   // 先打包為 JSON 格式
11   var obj = {
12   	message: req.params.message
13   };
14 
15   // 再儲存至 history 陣列
16   history.push(obj);
17 
18   // 製作 Response 訊息 (JSON 格式)
19   var response = {
20   	status: "OK"
21   }
22 
23   // 回傳 Response 訊息
24   res.write(JSON.stringify(response));
25   res.end();
26 };
27 
28 exports.read = function(req, res){
29   console.log("ITEMS: " + req.params.items);
30 
31   // 取出最新的 {req.params.items} 筆訊息
32   var latest = history.slice(0 - req.params.items);
33 
34   // 回傳
35   res.write(JSON.stringify(latest));
36   res.end();
37 };
~~~~~~~~

可以利用以下的連續命令進行測試：

~~~~~~~~
$ curl -X POST http://localhost:3000/discussion/hello1
$ curl -X POST http://localhost:3000/discussion/hello2
$ curl -X POST http://localhost:3000/discussion/hello3
$ curl -X GET http://localhost:3000/discussion/latest/2
$ curl -X GET http://localhost:3000/discussion/latest/1
$ curl -X POST http://localhost:3000/discussion/hello4
$ curl -X POST http://localhost:3000/discussion/hello5
$ curl -X GET http://localhost:3000/discussion/latest/3
$ curl -X GET http://localhost:3000/discussion/latest/5
~~~~~~~~

以下是相對應的 Console 訊息：

~~~~~~~~
$ node app.js 
Express server listening on port 3000
CREATE: hello1
POST /discussion/hello1 200 30ms
CREATE: hello2
POST /discussion/hello2 200 2ms
CREATE: hello3
POST /discussion/hello3 200 1ms
ITEMS: 2
GET /discussion/latest/2 200 1ms
ITEMS: 1
GET /discussion/latest/1 200 1ms
CREATE: hello4
POST /discussion/hello4 200 2ms
CREATE: hello5
POST /discussion/hello5 200 0ms
ITEMS: 3
GET /discussion/latest/3 200 1ms
ITEMS: 5
GET /discussion/latest/5 200 9ms
~~~~~~~~

一切就續後，就可以開始製作 Front-end 了。在這之前，可以開始試著建立測試程式，並加入簡單的 Test Case。否則，等到 API 數量更多，以及 Use Scenario 更複雜時，測試工作就更費勁了；因為將會有更多、更複雜的測試命令等著我們 Key In。

### Step 4：實作 Test Case

Test Case 是軟體開發很重要的一環，上述以 *curl* 指令進行測試，基本上這是比較不正式的做法。如果能撰寫一些測試程式，未來在開發的過程，就能很方便而且快速地測試新版本軟體。Test Case 一般是在軟體的開發過中，不斷地累積，並且隨著我們的專案釋出；因此，一開始就養成撰寫 Test Case 的習慣，絕對會比事後補上更好。

筆者建議持續以 Node.js（JavaScript）來為 nodejs-chat 專案開發 Test Case。要將上個步驟的 *curl* 指令，取代為 Test Case，就要知道如何以 Node.js 來製作 HTTP Client：方式是使用 Node.js 的 *http* 模組。不過，還有更簡便的解決方案：使用 [Requestify][5]。

[5]: http://ranm8.github.io/requestify/ "Simplifies node HTTP request making."

開啟 nodejs-chat 專案下的 *package.json* 檔案，加入 *requestify* 模組：

~~~~~~~~
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.4.4",
    "jade": "*",
    "requestify": "*"
  }
}
~~~~~~~~

安裝相依模組：

~~~~~~~~
$ npm i
~~~~~~~~

新增 *tests/* 字目錄，用來存放 Test Case：

~~~~~~~~
$ mkdir tests
$ cd tests
~~~~~~~~

在 *test/* 目錄下建立第一個測試程式，將檔案命名為 *01-test-discussion-create.js*；*requestify* 的使用方式非常簡單，完整程式碼如下。

{title="tests/01-test-discussion-create.js"}
~~~~~~~~
1 var requestify = require('requestify'); 
2 
3 requestify.post('http://localhost:3000/discussion/hello', {
4     // POST 的 Request Body，例如：訊息夾帶的圖片。目前為空。
5 })
6 .then(function(response) {
7     // 取得 Response Body
8     response.getBody();
9 });
~~~~~~~~

上述步驟，說明了實作 nodejs-chat 的重要觀念，完整的 REST API 實作，請參考完整的範例程式。關於 nodejs-chat 的完整程式碼，可由 *http://github.com/jollen/nodejs-chat* 取得。這個範例僅只是簡單的 Test Case，各位可以試著自行撰寫更多的測試程式，並設計更完整的 Test Case。