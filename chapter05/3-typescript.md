# 5.3 使用 TypeScript

在深入了解 Lambda 的觀念後，就能知道根本之道在於「新的 JavaScript 語法」。目前有一些 Open Source 程式庫，就試著在解決這個問題。唯有透徹底了解 Lambda 的觀念，才能知道這些程式庫目地何在。

筆者推薦的解決方案是：TypeScript。這是一個由 Microsoft 所開發的工具，實際上是一個 Compiler。TypeScript 提供了擴充的 JavaScript 語法，可藉由 TypeScript 編譯為標準的 JavaScript 語法。

首先，必須先使用 npm 安裝 TypeScript 工具：

~~~~~~~~
$ npm install -g typescript
~~~~~~~~

接著，以 TypeScript 的語法撰寫 JavaScript 程式碼。TypeScript 的語法就是 JavaScript 語法，只是提供了許多好用的擴充語言，因此學習上並沒有障礙。以下是一個 TypeScript 範例：

{title="l.ts"}
~~~~~~~~
var square = (x) => x * x
console.log(square(3));
~~~~~~~~

將程式碼儲存為 l.ts 後，再利用 TypeScript 編譯：

~~~~~~~~
$ tsc l.ts
~~~~~~~~

編譯後可以得到 l.js 檔案，以下是 l.js 的內容：

~~~~~~~~
var square = function (x) {
    return x * x;
};
console.log(square(3));
~~~~~~~~

看到編譯後的程式碼後，馬上可以反應出這個觀念：TypeScript 提供一個簡單好用的 Lambda 語法。當然，TypeScript 的功能很豐富，這只是牛刀小試。