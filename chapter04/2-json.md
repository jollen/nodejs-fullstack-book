## 4.2 學習 JSON 格式

第 1 章介紹了 JSON 的主要精神，現在要來學習 JSON 表示方法。

在 NoChat 範例裡，Server 要把收到的訊息，Push 給所有的 Client 端。Server 與 Client 所使用的標準資料交換格式，就是 JSON。如何把訊息打包成 JSON 格式？方式非常簡單。以表 4-1 為例，要將這個資料表，撰寫為 JSON 格式，只需要二個步驟：

### Step 1：以 JavaScript 物件表示一筆資料

例如，第一筆個人資料，以 JavaScript 物件來表示的話，只要用 `const` 來宣告此物件即可：

```javascript
1 const obj = {
2   "name": "Jollen",
3   "score": 80
4 };
```

大括號是 JavaScript 表示物件的語法。上述範例，我們宣告了 `obj` 物件。

### Step 2：轉換成標準 JSON 語法

去掉等號，以及等號左邊的物件宣告，結果如下：

```json
{
  "name": "Jollen",
  "score": 80
}
```

請注意，結尾的分號也要一併去除。上述的表示方法，就是標準的 JSON 語法。這個例子用 JSON 來表示一筆個人資料。JSON 表示方法非常地簡單，只要會 JavaScript 保證 1 分鐘即可上手，不需要特意學習。

### Step 3：用陣列表示多個物件

| "name" 欄位 | "score" 欄位 | 說明         |
| --------- | ---------- | ---------- |
| "Jollen"  | 80         | 第 1 筆使用者資料 |
| "Paul"    | 170        | 第 2 筆使用者資料 |
| "Peter"   | 250        | 第 3 筆使用者資料 |
| "Ellaine" | 580        | 第 4 筆使用者資料 |

表 4-1 資料表

表 4-1 共有 4 筆個人資料，因此需要撰寫 4 個物件，每個物件之間用逗號隔開。

```javascript
1 const persons = [
2   {
3     "name": "Jollen",
4     "score": 80
5   },
6   {
7     "name": "Paul",
8     "score": 170
9   },
10   {
11     "name": "Peter",
12     "score": 250
13   },
14   {
15     "name": "Ellaine",
16     "score": 580
17   }
18 ];
```

和 Step 2 相同，若只保留 JSON 純資料格式如下：

```json
[
  { "name": "Jollen", "score": 80 },
  { "name": "Paul",   "score": 170 },
  { "name": "Peter",  "score": 250 },
  { "name": "Ellaine","score": 580 }
]
```

這就是表 4-1 的 JSON 表示方式了。

將上述的 JSON 儲存為純文字，這個純文字檔就叫做 JSON Document，這就是 JSON Document 資料庫的概念。

同理，NoChat Server 收到訊息後，只要把訊息表示成 JSON 後，傳送給 Client 端即可。JSON 相當簡單易學，更是優秀的輕量級資料交換格式。

## JSON Stringify

請注意，上述的 JSON 是一個資料型別（Type），我們不能直接傳送 Type 結構，因此需先將其轉換成字串（String）。例如：

```javascript
1 const obj = { "name": "James" };
2 const str = JSON.stringify(obj);
```

這會轉換成：

```json
"{ \"name\": \"James\" }"
```

在電腦眼中，這才是一個可以傳輸的字串格式。字串化後，若需重新操作，也必須再解析（parse）回物件。

## JSON Parse

當接收到字串化的 JSON 資料時，需要透過解析的方式，才能還原為 JavaScript 物件。這個動作稱為 JSON Parse。

使用 `JSON.parse()` 函數，即可將字串還原為 JavaScript 的資料型別。例如：

```javascript
1 const jsonString = '{ "name": "James" }';
2 const obj = JSON.parse(jsonString);
3 console.log(obj.name); // 輸出 James
```

此方式對於從 HTTP 或 WebSocket 收到的資料尤其重要，因為所有資料都是以字串格式傳輸，必須透過 parse 還原為可操作的 JavaScript 結構。

## 應用於 NoChat：修改 requestHandler.js

```javascript
 1 const querystring = require('querystring'); 
 2 
 3 const history = [ ];
 4 
 5 function start(response, query, clients) {
 6     console.log("Handler 'start' is started.");
 7     console.log("Query string is: " + query);
 8 }
 9 
10 function send(response, query, clients) {
11     console.log("Handler 'send' is started.");
12     console.log("Query string is: " + query);
13 
14     const parsedstring = querystring.parse(query); 
15 
16     const obj = {
17         message: parsedstring.m,
18         username: parsedstring.u,
19         timestamp: (new Date()).getTime()
20     };
21 
22     history.push(obj);
23 
24     // DEBUG: Print all messages
25     for (let i = 0; i < history.length; i++) {
26         console.log("[" + i + "]: " + history[i].message);
27     }
28 
29     const json = JSON.stringify({ type: 'message', data: obj });
30 
31     // Push to all clients
32     for (let i = 0; i < clients.length; i++) {
33         clients[i].sendUTF(json);
34     }
35 }
36 
37 exports.start = start;
38 exports.send = send;
```

第 16 行到第 20 行，將訊息封裝到物件裡，同時也加入使用者名稱，以及時間戳記（Timestamp）。第 29 行將物件字串化為標準 JSON 格式，這樣就可以在 Web 上傳輸。接著，第 32 行到第 34 行的迴圈，將這筆 JSON 資料，即時推送（Push）給所有連線中的 WebSocket Client 端。

這樣的處理流程，就完成了資料封裝、序列化與即時推送的整合操作。
