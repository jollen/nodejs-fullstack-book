# 5.3 從 TypeScript 談 Promise

上一節我們提到 callback 是函數可以被當作「值」傳遞的語言特性，這種特性雖然強大，但也可能導致 callback hell。為了解決這個問題，語言需要一個能更清楚表達非同步邏輯的結構 —— 這也是 Promise 語法出現的背景。

但在進入 Promise 的語意之前，我們先來看看另一個幫助我們「先一步編寫語言未來」的工具：**TypeScript**。

## 為什麼從 TypeScript 談起？

JavaScript 語法的演化，其實非常受限。過去幾年，我們看到 ECMAScript 每隔數年才更新一次語法，而開發者的需求早已遠遠超前。因此，許多開發者轉向更有彈性的語言 —— 例如 TypeScript —— 來「預先使用未來的語法」。

> TypeScript 是一種語法增幅器，一種讓你提早操作未來 JavaScript 能力的語言。

它由 Microsoft 開發，是一套可以將 TypeScript 程式碼轉譯為純 JavaScript 的編譯器，支援靜態型別、類別、介面等語法擴充，最重要的是，它也支援更清楚、更結構化的非同步程式設計：**Promise**。

## 安裝 TypeScript 編譯器

使用 npm 安裝 TypeScript：

```bash
$ npm install -g typescript
```

## TypeScript 語法範例

以下是一個簡單的 Arrow Function 範例：

```typescript
var square = (x) => x * x;
console.log(square(3));
```

儲存為 `l.ts`，再使用 TypeScript 編譯：

```bash
$ tsc l.ts
```

編譯後產生的 JavaScript：

```javascript
var square = function (x) {
  return x * x;
};
console.log(square(3));
```

看到編譯後的程式碼後，馬上可以反應出這個觀念：TypeScript 提供一個簡單好用的 Lambda 語法。當然，TypeScript 的功能很豐富，這只是牛刀小試。

從這裡我們可以看出：

> TypeScript 不只是語法糖，它幫助你以更語意化的方式撰寫 JavaScript，並最終生成 ES5 語法以便瀏覽器執行。

## 語法只是開始，結構才是重點

TypeScript 支援的不僅是 Arrow Function，還包括 **Promise、async/await** 等更具結構化語意的非同步語法。這些語法的本質，是為了解決 callback 模式在控制流程上的混亂。

接下來，我們就要正式進入 Promise 的世界。

- Callback 是「將函數作為資料」
- Promise 則是「將未來的結果作為資料」

> Promise 是 JavaScript 語言設計對非同步流程做出的第一個正式語意化承諾。

下一節，我們將透過 TypeScript，認識 Promise 的語法與它背後的語言觀。

Next: [5.4 使用 Promise 封裝非同步處理流程](4-promise.md)
