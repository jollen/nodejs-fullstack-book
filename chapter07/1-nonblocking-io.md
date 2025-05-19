# 7.1 認識 Non-blocking IO

## 7.1.1 Node.js 是事件驅動的語言

從第 6 章我們所寫的 `server.mjs` 程式中，出現了這樣的寫法：

```javascript
req.on('data', chunk => {
  body += chunk;
});
```

這不是平常同步語言中常見的寫法。這段程式代表了一個核心觀念：Node.js 是事件導向（Event-Driven）架構的語言。它不使用傳統的「一行一行、等資料回來再往下執行」的思維，而是透過事件註冊與非同步回呼來處理 I/O。

這樣的設計來自於 Node.js 的兩大特性：

- Event-driven（事件導向）
- Non-blocking I/O（非阻塞輸入輸出）

## 7.1.2 初探 Non-blocking IO

若要深入理解 Non-blocking I/O，只要從一個日常任務出發就好：**檔案讀取**。

Node.js 提供 File System 模組（`fs`）來處理檔案讀取。查閱官方 API 說明文件，我們會找到這個函數：

```javascript
fs.readFile(filename, [options], callback)
```

這個 `callback` 就是我們在第 5 章所熟悉的 Lambda（暱名函數）。為什麼讀檔案不直接 return 結果？為什麼要給一個 callback？這就是 Non-blocking I/O 的精髓。

### 同步 vs 非同步：觀念比較

從傳統 C / PHP / Java 的思維來看，初學者常常會寫出這樣的程式結構（虛擬碼）：

```javascript
fs.readFile('hello.txt', data);
console.log(data); // 想像這行可以直接印出結果
```

這是同步式邏輯 —— 呼叫 `readFile()`，等它回傳結果，再印出。

然而，在 Node.js 中這樣寫會失敗，因為：

> Node.js 的 I/O 操作預設是非同步進行的，並不會「等」檔案讀完才執行下一行。

也就是說，當執行 `console.log(data)` 時，檔案可能尚未讀完，`data` 仍是 undefined。

### 正確實作：使用 Callback

```javascript
import fs from 'fs';

fs.readFile('hello.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log("[DATA]", data);
});
```

當 `readFile` 讀取完成時，Node.js 會主動「回呼」這個 Lambda 函數，並傳入結果。

### 錯誤示範：將非同步當同步用

```javascript
let data;
fs.readFile('hello.txt', 'utf8', (err, result) => {
  data = result;
});

console.log("[DATA]", data); // 錯誤！此時 data 尚未被賦值
```

這是初學者最容易遇到的問題：**尚未理解事件與非同步執行順序的差異**。

### 圖像輔助：Non-blocking I/O 思維

```
主程式執行 → 呼叫 readFile()
              ↓
        建立 callback 等待完成
              ↓
     下一行立即繼續執行
              ↓
     （完成後才觸發 callback）
```

### 小結

> Non-blocking I/O 就是：不要卡住主線程，讓事件完成後通知我。

這樣的設計，讓 Node.js 特別適合高併發、即時應用、網路伺服器等場景。

在下一節，我們將進一步探討：非同步寫法如何進化為 Promise 與 async/await，進而改善 callback 地獄的可讀性與維護性。
