# 7.3 深入 Node.js 非同步錯誤處理

非同步程式的挑戰，不只在流程，而在「錯誤發生時，你怎麼辦？」

當我們呼叫十次 `fs.readFile()`，你能保證十個檔案都存在嗎？或者，在一個 REST API 回應的過程中，一個資料來源失效時，整個伺服器該如何反應？

從這一節開始，我們不再只關心「程式能正常執行」，而是要進一步思考「當錯誤發生時，Node.js 程式怎麼應對？」

## Step 1：callback 的錯誤傳遞邏輯

在 callback 寫法中，錯誤的處理通常是這樣：

```javascript
1 fs.readFile('chapter1.txt', 'utf8', (err, data) => {
2   if (err) {
3     console.error('[ERROR]', err);
4     return;
5   }
6   console.log('[DATA]', data);
7 });
```

這段邏輯的本質是「偵錯中斷」。只要發生錯誤，就停止往下執行。這種方式適合處理單一檔案任務，錯誤與回應的邏輯綁定在一起，語意清晰。

### 但問題來了：

如果將這段邏輯置入非同步流程中，例如多檔案讀取迴圈，錯誤會被切割成多個事件處理器，分散在各處：

```javascript
1 const files = ['a.txt', 'b.txt', 'c.txt'];
2
3 files.forEach((file) => {
4   fs.readFile(file, 'utf8', (err, data) => {
5     if (err) {
6       console.error(`[ERROR] ${file}`, err.message);
7       return;
8     }
9     console.log(`[DATA] ${file}`, data);
10   });
11 });
```

這樣是不好的程式碼邏輯結構，原因：
  
- 每個 callback 處理自己的錯誤，沒有集中點
- 錯誤紀錄、成功件數統計等無法統一管理
- 例如要「等所有任務完成後顯示總結」，變得非常複雜

這正是 callback 思維在複雜任務中面臨的極限 —— 不適合協調多任務流程。

## Step 2：Promise 的錯誤處理與鏈結機制

回顧 7.2 的 `readFileAsync()` 函式：

```javascript
1 const readFileAsync = (filepath) => {
2   return new Promise((resolve, reject) => {
3     fs.readFile(filepath, 'utf8', (err, data) => {
4       if (err) reject(err);
5       else resolve(data);
6     });
7   });
8 };
```

透過 Promise 將 callback 封裝成邏輯可組合的單位，讓我們能像拼積木一樣組合非同步流程。若使用 `Promise.all()` 組合後，錯誤怎麼處理？

```javascript
1 const files = ['chapter1.txt', 'chapter2.txt', 'notfound.txt'];
2
3 Promise.all(files.map(readFileAsync))
4   .then((contents) => {
5     contents.forEach((c, i) => console.log(`[${i}] ${c}`));
6   })
7   .catch((err) => {
8     console.error('[FATAL]', err.message);
9   });
```

### 問題：Promise.all 是「全或無」策略

- 只要有一個任務失敗，整個 `.then()` 就不會執行
- 這在任務之間具相依性的場景很好（例如五筆資料必須全部到齊），但對於「盡量完成多數」的情境就不夠彈性

這就是語意層次的選擇：你是要強一致性，還是要高可用性？

## Step 3：使用 Promise.allSettled 實現容錯設計

除了紀錄每筆成功或失敗，你也可以統計整體結果：

```javascript
1 let success = 0, fail = 0;
2 results.forEach((result) => {
3   if (result.status === 'fulfilled') success++;
4   else fail++;
5 });
6 console.log(`完成 ${success} 筆，失敗 ${fail} 筆`);
```

如果你的目標是「只要能完成多少就完成多少，剩下的記錄錯誤」，那麼 `Promise.allSettled()` 就非常適合：

```javascript
1 Promise.allSettled(files.map(readFileAsync))
2   .then((results) => {
3     results.forEach((result, i) => {
4       if (result.status === 'fulfilled') {
5         console.log(`[${i}] OK`, result.value);
6       } else {
7         console.warn(`[${i}] FAIL`, result.reason.message);
8       }
9     });
10   });
```

這種「一口氣處理所有非同步任務，分別紀錄成功或失敗」的語意，在現代微服務架構與 API 整合中非常常見。

這樣的邏輯可以直接用在 dashboard、報表、爬蟲、快照產製等情境。

## Step 4：async/await 與 try/catch 的使用模式

回顧第 5 章的進程：從 Lambda → Callback → Promise → async/await，其實就是從「語法技巧」逐步進化為「語意流程控制」的歷程。在這一節，我們不只是學語法，而是學如何選擇「語意模型」，針對錯誤事件進行語義編排。這是一種思維上的轉換，不只是工具替換。

在說明語法前，我們先釐清一個常見誤解：

```javascript
1 try {
2   setTimeout(() => {
3     throw new Error('這會直接 crash');
4   }, 100);
5 } catch (err) {
6   console.log('這裡 catch 不到');
7 }
```

此段無法捕捉錯誤，因為 try/catch 僅能攔截同步錯誤或 await 錯誤；非同步內部的 throw 仍需 Promise 包裝。


async/await 寫法將非同步語意平坦化，並透過 try/catch 提供類似同步世界的錯誤控制：

```javascript
1 const run = async () => {
2   for (const file of files) {
3     try {
4       const content = await readFileAsync(file);
5       console.log(`[OK] ${file}`, content);
6     } catch (err) {
7       console.warn(`[ERROR] ${file}`, err.message);
8     }
9   }
10 };

11 run();
```

這樣的寫法：
- 適合錯誤邏輯需要根據不同檔案做不同處理的場合
- 錯誤與成功路徑並列，邏輯清晰、調試容易

### 延伸技巧：結合 allSettled 與 async/await

你仍可將 `Promise.allSettled()` 結果包裝進 async 函式中：

```javascript
1 const results = await Promise.allSettled(files.map(readFileAsync));
```

## JSON 與 REST API 錯誤回應的語意設計

在第 6 章我們設計過 JSON 格式的回應與 RESTful API，若你記得當時的格式：

```json
{
  "status": "ok",
  "data": {...}
}
```

那麼你現在就能明白：一旦非同步操作中有部分任務失敗，如何以語意清楚的方式傳遞錯誤資訊給前端，或記錄在伺服器端。例如：

```javascript
1 const output = {
2   status: 'partial',
3   success: success,
4   fail: fail,
5   errors: errorDetails
6 };
```

這種結構，能幫助我們用一致的回應格式，處理非同步批次任務的結果，並提供使用者一個清楚的失敗回報機制。

## 呼應事件驅動與多來源非同步整合的挑戰

在第 3 與第 4 章的 NoChat 範例中，我們實作過 URL Routing 與 WebSocket 傳訊功能。你是否思考過：如果聊天室伺服器在某一條訊息送出失敗時，要如何錯誤補償？要不要重試？是否中斷後續操作？

這一節的所有處理策略，都能套用在這些問題上，例如：

- callback 時代：難以重試或記錄錯誤
- Promise + catch：中斷式、fail-fast
- allSettled：非阻斷式、容錯性高
- async/await：針對特定 message 做 retry or skip

這就是所謂「語意驅動的非同步邏輯」。從流程控制變成語意設計，才是真正理解 Node.js 的關鍵。

我們總結各種錯誤控制策略的語意特性如下：

| 控制策略       | 錯誤處理語意         | 是否中斷流程 | 適用場景                       |
|----------------|----------------------|--------------|-------------------------------|
| callback       | 分散處理，每筆各自處理 | 否           | 單點任務、不需要全局統計         |
| Promise.all    | 全或無，任一錯誤即中止 | 是           | 強一致性任務、批次匯入需原子性   |
| allSettled     | 容錯、每筆個別紀錄     | 否           | dashboard、快照、爬蟲類任務     |
| async/await    | 明確 try 區塊、語意清楚 | 否           | 需根據錯誤類型自訂行為的應用場景 |


| 技術          | 控制單位       | 容錯能力 | 適用場景                   |
|---------------|----------------|----------|----------------------------|
| callback      | 單一任務       | 分散     | 極簡任務、單點操作         |
| Promise + all | 批次、失敗中止 | 無       | 任務彼此依賴、需原子性     |
| allSettled    | 批次、可失敗   | 高       | 部分成功可接受的情境       |
| async/await   | 自定 try 區塊  | 高       | 易讀性高、錯誤需自訂反應   |

從這一節開始，Node.js 程式設計者要學會思考：「當非同步失敗時，我是要攔截、報錯？還是繼續完成其餘部分？」

根據筆者的教學觀察，Non-blocking IO 與 Callback Function 的觀念，是原本 C/PHP/Java 程式設計者，跨入 Node.js 開發的一個障礙。要克服這個障礙，就要建立 Non-blocking IO 的觀念，並訓練程式設計邏輯。這和 Procedure 式的執行行為有很大的不同。

Non-blocking 的觀念，也稱做 Wait-free。利用 Wait-free 的觀念來實作 Web Service 的話，可以達到較佳的 Concurrency 處理能力；例如：提昇「Requests per Second」，增進 Server 的處理性能。

完成第 7 章後，我們已經具備完整的 Node.js 基礎了。接下來，將進入「非同步 Web API」的領域，看看這套思維如何延伸到伺服器設計的世界。
