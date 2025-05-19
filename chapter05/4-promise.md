# 5.4 使用 Promise 封裝非同步處理流程

JavaScript 是一門事件驅動的語言，但一直以來，非同步控制的語法顯得原始且混亂。從 setTimeout 到 callback，我們雖然可以操作非同步，但始終缺乏一個語言層級的「結構描述工具」。直到 Promise 出現。

> Callback 是事件的應對，Promise 是語言的承諾。

## 5.4.1 Callback 的語意瓶頸

我們先從一段常見的 callback hell 開始：

```javascript
doSomething(function(result1) {
  doSomethingElse(result1, function(result2) {
    doThirdThing(result2, function(result3) {
      console.log("All done.");
    });
  });
});
```

這樣的結構讓錯誤難以處理、邏輯難以維護，開發者很難追蹤非同步流程中的異常與中斷點。

我們需要的是一種更結構化的寫法 —— 一種能表達「這件事完成後，做下一件事」的語言語意。

## 5.4.2 Promise 是什麼？

Promise 是 ECMAScript 6 引入的語法結構，用來封裝「未來會得到的結果」。它的核心在於：

- 將非同步操作的結果，以物件封裝
- 提供 `.then()` 與 `.catch()` 的接續介面

Promise 有三種狀態：

- `pending`：尚未完成
- `fulfilled`：已成功完成
- `rejected`：失敗，帶有錯誤資訊

基本語法如下：

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("data loaded");
  }, 1000);
});

promise.then(data => {
  console.log(data);
}).catch(error => {
  console.error(error);
});
```

## 5.4.3 then / catch：語意鏈式接續

`.then()` 是語言設計上的一個突破，它讓我們可以用串接的方式，描述非同步步驟：

```javascript
loadData()
  .then(parseData)
  .then(saveData)
  .then(() => console.log("All done"))
  .catch(err => console.error(err));
```

這不只是語法上的方便，而是語言控制結構的轉向：非同步變得像是同步邏輯一般，可以推理與閱讀。

## 5.4.4 在 TypeScript 中使用 Promise

TypeScript 可以為 Promise 帶來更強的型別描述能力。範例如下：

```typescript
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    resolve("data received");
  });
}

fetchData().then((data: string) => {
  console.log(data);
});
```

這裡 `Promise<string>` 表示此函數會在未來回傳一個 string 值。這讓程式的預期行為更明確，也有助於編譯器與 IDE 分析。

## 5.4.5 Promise 是語言的語意契約

Promise 並不會讓非同步變同步，它也不是效能上的優化工具。但它提供了一種語言層級的「流程封裝能力」，讓我們可以用語法形式描述尚未發生的邏輯。

> Promise 是 JavaScript 對未來事件的結構化預言。

在下一節，我們將介紹 async/await —— 它不是替代 Promise，而是讓 Promise 更像「可閱讀的同步語法」。

Next: [5.5 async/await：語意同步化](5-async.md)
