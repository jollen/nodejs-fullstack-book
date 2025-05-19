## 3.5 解析 Query String

當 Client 端呼叫 Server 所提供的 Web Service API，關鍵在於：如何解析 URL 中的 Query String。正如我們在圖 2.2 所見，Node.js 提供 `querystring` 模組，專門處理這個任務。

首先，匯入 `querystring` 模組，並使用 `parse()` 函數進行解析：

```javascript
1 var querystring = require('querystring');
2 var parsedstring = querystring.parse("m=hello&u=jollen");
```

解析結果如下：

```javascript
1 { m: 'hello', u: 'jollen' }
```

### `parse()` 函數說明

```javascript
querystring.parse(str, [sep], [eq])
```

* `str`：要解析的 Query String
* `sep`：參數之間的分隔符號（預設為 `&`）
* `eq`：鍵值對的對應符號（預設為 `=`）

這些預設值通常無需修改。

---

### 修改 `requestHandlers.js`

現在我們可以實作具備 Query String 解析能力的 `requestHandlers.js` 模組：

```javascript
 1 var querystring = require('querystring');
 2 
 3 // 全域變數：訊息歷史記錄
 4 var history = [];
 5 
 6 function start(response, query) {
 7     console.log("Handler 'start' is started.");
 8     console.log("Query string is: " + query);
 9 }
10 
11 function send(response, query) {
12     console.log("Handler 'send' is started.");
13     console.log("Query string is: " + query);
14 
15     var parsedstring = querystring.parse(query);
16 
17     var obj = {
18         message: parsedstring.m,
19         username: parsedstring.u,
20         timestamp: (new Date()).getTime()
21     };
22 
23     history.push(obj);
24 
25     ////// DEBUG //////
26     for (var i = 0; i < history.length; i++) {
27         console.log("[" + i + "]: " + history[i].message);
28     }
29 }
30 
31 exports.start = start;
32 exports.send = send;
```

在這段程式中：

* 使用 `querystring.parse()` 將字串轉為物件
* 利用 `history[]` 陣列儲存每筆訊息（含時間戳記）
* 每則訊息包含：`message`、`username`、`timestamp`

這樣的封裝不僅讓資料結構更具語意，也為後續功能（如歷史訊息查詢、推播等）奠定基礎。
