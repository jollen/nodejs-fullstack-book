# 軟體思惟 - Lambda 篇

本章的目標，是提昇初學者的開發功力。經過前面 4 個章節的介紹，學習到許多基本觀念與技術。接下來，將從三個不同的層面，深化目前所學到的觀念與技術：

- JavaScript 語言
- Web Service 架構
- Node.js 觀念

本章先從 JavaScript 語言開始。JavaScript 最重要的觀念是 Closure，這可以說是 JavaScript 初學者的第 1 堂。Closure 與暱名函數有很緊密的關係，這要由 Lambda 的觀念開始講起。

## Lambda

Lambda（λ）是一個希臘字母（Λ 是它的大寫字母），用來表示許多觀念：

- 物理學家用來表示波長的符號
- 數學家用來表示空字串的符號
- 電腦科學家用來表示暱名函數（Anonymous Function）的符號

Lambda 在電腦科學領域，用來表示暱名函數，目的是進行運算。為了尋找一個語法簡易的運算表示方式，電腦科學家會這麼做。

### Step 1：取得一個具名的函數

例如一個加法函數：

~~~~~~~~
sum(x) = x + 2
~~~~~~~~

函數 sum() 是具名函數，利用 JavaScript 來實作的話，寫法如下：

~~~~~~~~
function sum(x) {
	return x + 2;
}
~~~~~~~~

### Step 2：改寫為暱名函數

Lambda 希望可以找到一個能運算的表示方法，而且要簡單，去除掉函數名稱，就是一個方式。沒有具體名稱的函數，就稱為暱名函數（Anonymous Function）。如果表示暱名函數呢？上述範例，以 Lambda 來表示的話，只要改寫成：

~~~~~~~~
λx.x + 2
~~~~~~~~

用 JavaScript 來實作的話，要如何撰寫呢？方式如下：

~~~~~~~~
(function(x) {
	return x + 2;
})();
~~~~~~~~

這就是第 1 章介紹的 Closure 觀念，最後加上的一對括號，稱為立即函數，意思是立即執行此暱名函數的意思。立即函數，以物件導向的角度來看，也可以解釋為立即實例化。

### Step 3：使用 *var* 來宣告暱名函數

JavaScript 的 *var* 關鍵字用來宣告變數，所以也可以把暱名函數做為運算子（Operator）來宣告變數。例如：

~~~~~~~~
var lambda = (function(x) {
	return x + 2;
})();
~~~~~~~~

變數 *lambda* 被指定（Assign）為一個暱名函數。從 JavaScript 語言的角度來看，Closure 用來封裝出 Module，所以 *lambda* 變數也可以解釋成「一個模組」。宣告一個暱名函數的變數時，可以不需要 Closure。也可以採用以下的寫法：

~~~~~~~~
var lambda = function(x) {
	return x + 2;
};
~~~~~~~~

事實上，這個寫法更為普遍。一些文章也把這種寫法，稱做 Function Expressions。

有一個重要的觀念要釐清，上述的寫法，正規的解釋方式是「宣告暱名函數的變數」，所以 *lambda* 是一個變數，不能解釋為函數。如果說 *lambda* 是一個函數宣告，觀念上就不對了。不能單就 JavaScript 語法的角度來做解釋。

以 JavaScript 來說，函數宣告的寫法為：

~~~~~~~~
function lambda(x) {
	return x + 2;
};
~~~~~~~~

這個時候，*lambda* 就是一個函數。那一種寫法比較好呢？理論上，採用暱名函數宣告的方式較佳，因為 JavaScript 本身是一種 Lambda 的程式語言。

## Callback Function

Lambda 本質上是一種表示方法，用來表示 Input 與 Output。所以，要表示一個平方的運算的話，寫法如下：

~~~~~~~~
λx.x*x
~~~~~~~~

這個運算式，也可以做為另一個 Lambda 式子的 Input，請看以下的說明。

### Step 1：撰寫第一個計算平方的 Lambda 表示式

做法如下：

~~~~~~~~
λx.x*x
~~~~~~~~

### Step 2：把上述的式子做為另一個 Lambda 的輸入

有一個 f(x) = x + 2 的函數，用 Lambda 來表示的話，寫法如下：

~~~~~~~~
(λx.x+2)
~~~~~~~~

如果要把 Step 1 的結果，做當上面式子的 *x*（輸入），合併後的寫法為：

~~~~~~~~
(λx.x*x)(λx.x+2)
~~~~~~~~

讓我們來筆算看看：

- x = 3 時，λx.x*x 的 Output 為 9
- 9 做為 λx.x+2 的 Input，成為 9 + 2，Output 為 11
- 答案就是 11

(λx.x*x)(λx.x+2) 等價於 9 + 2。

### Step 3：使用 JavaScript 來實作

怎麼把 (λx.x*x)(λx.x+2) 寫成程式碼呢？非常簡單，由於 Output 就是返回值，所以等於「讓暱名函數的返回值，當做另一個暱名函數的參數」。程式碼如下：

~~~~~~~~
var lambda = function(x) { return x + 2 };
var result = lambda(function(x) { return x * x} (3) );

console.log("Result: " + result);
~~~~~~~~

這個輸出的輸出結果為 11。這可不是在賣弄程式碼，而是實現出 (λx.x*x)(λx.x+2) 這個 Lambda 演算。以暱名函數來表示 Lambda 是很常見的做法，但其實反應出 JavaScript 語法上的不足。如果能有一個更簡易的語法，讓我們表示 Lambda，這段程式碼就會比較精簡。

所以，這很可能要從修改 JavaScript 語法的角度，來做強化。未來，新的 ECMAScript（JavaScript 的語法標準）或許可以讓我們這樣寫程式：

~~~~~~~~
function(x) { return x + 2 }  // 複雜的寫法
x => x + 2 					  // 希望可以有這種精簡的語法
~~~~~~~~

再舉一個例子：

~~~~~~~~
var result = (x => x * x) 3;  // 左結合寫法，輸入值 3 放在最右邊，最後 result 為 9 
~~~~~~~~

如果將 Lambda 做為函數的參數：

~~~~~~~~
[1, 2, 3, 4, 5]
	.map(function(x) { return x * x });
~~~~~~~~

未來或許能簡化為：

~~~~~~~~
[1, 2, 3, 4, 5]
	.map(x => x * x);		   // 希望可以有這種精簡的語法
~~~~~~~~

在 ECMAScript 還沒有正式加入相關語法前，我們目前還是只能使用暱名函數的寫法。

## 使用 TypeScript

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