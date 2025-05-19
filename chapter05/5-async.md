# 5.5 async/await：語意同步化

Promise 為 JavaScript 帶來了非同步邏輯的語言結構，讓我們可以用 `.then()` 與 `.catch()` 來描述「未來的流程」。但對開發者來說，這依然不夠直觀 —— 因為閱讀一段非同步程式碼時，我們仍然無法用「同步邏輯」的眼光來理解整段邏輯。

這正是 async/await 的設計初衷：**讓非同步的語意，變得像同步一樣可讀與可推理。**

> async/await 不是語法糖，而是語意重構：讓時間流程也有語言層級的編排能力。

## 5.5.1 Promise 語法的限制：語意跳躍

以 then/catch 結構為例：

```ts
fetchData()
  .then(parseData)
  .then(saveData)
  .then(() => console.log("Done"))
  .catch(err => console.error(err));
```

雖然邏輯上是線性的，但每一段 `.then()` 實際上是獨立的 callback。這讓錯誤處理、變數作用域與中斷控制變得困難。

我們需要的是語法上的線性結構，也就是 async/await。

## 5.5.2 語法簡介：async 與 await 是什麼？

- `async`：宣告此函數將回傳一個 Promise
- `await`：暫停該函數的執行，等待一個 Promise 完成

這並不代表程式真的「暫停」，而是將後續的執行邏輯封裝為下一個微任務（microtask），等待事件循環執行。

## 5.5.3 async/await 重寫 Promise 範例

### 使用 Promise

```ts
function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("data received"), 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 使用 async/await

```ts
async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

main();
```

這段邏輯看起來幾乎像同步寫法，但實際上仍是非同步 —— 只是透過語法重組，將非同步行為內嵌進同步的語言結構裡。

## 5.5.4 語意對照：then vs await

| 特性 | then/catch | async/await |
|------|-------------|---------------|
| 可讀性 | callback 鏈接，語意斷裂 | 流程線性，接近同步 |
| 錯誤處理 | .catch() 分段處理 | try/catch 區塊一致處理 |
| 執行模型 | 微任務排程 | 同樣是微任務，但語法更直覺 |

## 5.5.5 語言觀總結：語言 × 時間 × 控制權

JavaScript 的非同步設計史，是語言逐步學會「如何處理時間」的歷程：

- Lambda：定義邏輯
- Callback：封裝事件觸發
- Promise：建構未來邏輯鏈
- async/await：將時間等待，語法化為可推理的流程

> async/await 是語言將控制權交還給開發者的過程。它不是讓非同步變簡單，而是讓非同步變得可閱讀。

## 5.5.6 語意流程控制模型比較表

| 語言機制     | 控制權屬性         | 執行時機        | 語法表現       | 優點                           | 限制                          |
|--------------|--------------------|------------------|----------------|------------------------------|------------------------------|
| Lambda        | 自主                | 定義即生效        | `x => x + 1`   | 簡潔、可作為值               | 無法描述流程                  |
| Callback      | 他方控制            | 事件觸發後執行    | `fn(() => …)`  | 適用於事件驅動               | 結構鬆散，易陷入 callback hell |
| Promise       | 他方控制 → 語意封裝 | 非同步結果抵達時  | `.then().catch()` | 支援鏈式邏輯、錯誤傳遞       | 閱讀困難、語意分段            |
| async/await   | 開發者顯式控制       | 遇到 await 時中斷 | `await fn()`   | 可讀性高、錯誤處理統一       | 需在 async 函數中使用         |

> 語法不是表面結構，而是語意控制的設計觀點。你選用什麼語法，就等於你選擇了如何與「時間」與「控制權」互動。

## 本章小結：從函數到語意，從流程到結構

整個第 5 章，其實是 JavaScript 語言觀的一次縱深探索：

- **Lambda**：從函數是值開始，進入語意組合的世界
- **Callback**：交出控制權，描述事件觸發後的語法位置
- **Promise**：將未來變成語意物件，建立控制流程的鏈式介面
- **async/await**：語法化未來，重構可讀的邏輯時間軸

我們不是在學語法，而是在設計邏輯流。
