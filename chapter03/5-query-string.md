# 3.5 解析 Query String

Client 端呼叫 Server 所提供的 Web Service API。所以，現在的關鍵是如何解析 Query String。如圖 2.2，Node.js 使用 querystring 模組來解析 Query String。先將 querystring 模組匯入，接著呼叫 parse() 函數：

~~~~~~~~
var querystring = require('querystring'); 
var parsedstring = querystring.parse(“m=hello&u=jollen”); 
~~~~~~~~

解析後的結果存放於 parsedstring 物件，回傳結果：

~~~~~~~~
{ m: 'hello', u: 'jollen' } 
~~~~~~~~

parse() 函數有三個參數：

~~~~~~~~
querystring.parse(str, [sep], [eq])
~~~~~~~~

- str 是 Query String
- sep 是「Separator」，也就是字串的分隔字元，預設是 '$'，通常不做變數
- eq 則是字串與值的對應字元，預設是 '='，通常不做變數

了解如何解析 Query String 後，就可以開始進行後續的工程了。再次修改 requestHandlers.js，如下：

~~~~~~~~
 1 var querystring = require('querystring'); 
 2 
 3 /**
 4  * Global variables
 5  */
 6 var history = [ ];
 7 
 8 function start(response, query) {
 9     console.log("Handler 'start' is started.");
10     console.log("Query string is: " + query);
11 }
12 
13 function send(response, query) {
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
31 }
32 
33 exports.start = start;
34 exports.send = send;
~~~~~~~~

這裡利用一個全域陣列 *history* 來儲存訊息。將收到的訊息封裝成物件後， 再使用標準的陣列操作將物件放到陣列裡。另外，我們也將一個時間記號（Timestamp）一併封裝至該物件，用來紀錄接收到訊息的時間。
