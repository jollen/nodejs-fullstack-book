# 5.2 Callback Function

Lambda 本質上是一種「以函數封裝邏輯運算」的表示方法。它可以表達輸入與輸出，也可以被作為輸入本身。

例如，以下是代表平方運算的 Lambda 表示式：

```
λx.x * x
```

這個函數可以被視為「可以被其他函數接收的值」，這就是 Callback 的起點：

> 一個函數，被作為另一個函數的參數進行運算。

## Step 1：定義平方函數

```javascript
function(x) { return x * x }
```

或者寫成 Lambda 符號：

```
λx.x * x
```

## Step 2：定義另一個函數，並傳入上面的函數作為參數

假設我們有一個加二函數：

```javascript
function(x) { return x + 2 }
```

要將前者的結果作為後者的輸入，我們就得到以下結構：

```javascript
(function(x) { return x + 2 })( (function(x) { return x * x })(3) )
```

我們來筆算：

- `(function(x) { return x * x })(3)` → 9
- 再帶入上層：`(function(x) { return x + 2 })(9)` → 11

這其實就是 Lambda 計算式：

```
(λx.x + 2)(λx.x * x)(3) → 11
```

## Step 3：在 JavaScript 中實作 Lambda 傳遞

```javascript
var lambda = function(x) { return x + 2 };
var result = lambda(function(x) { return x * x }(3));
console.log("Result: " + result); // 11
```

這段程式不是為了炫技，而是為了「讓函數變成值」的概念具體呈現。

## Callback 的語意轉向：從資料到流程

當我們將函數作為參數傳入另一個函數，就開啟了流程控制的語言能力 —— 也就是非同步事件發生時，誰負責「被呼叫」。

```javascript
setTimeout(function() {
  console.log('Hello after 1 second');
}, 1000);
```

這段就是典型的 Callback：當 `setTimeout` 倒數結束後，它會呼叫你所提供的函數。這不是你主動執行的，是「事件觸發」後，語言幫你自動執行的。這就是 callback 的語言本質：

> 你不是呼叫它，而是你提供它，等它被呼叫。

## 語法的進化：Arrow Function

以上程式過於冗長，是因為 JavaScript 在 ES6 之前，並沒有為 Lambda 語法設計簡潔語法糖。因此出現了 Arrow Function：

```javascript
x => x + 2
```

可以簡化以下寫法：

```javascript
function(x) { return x + 2 } // 傳統寫法
```

再舉一個常見應用：

```javascript
[1, 2, 3, 4, 5].map(function(x) { return x * x });
// 可簡化為：
[1, 2, 3, 4, 5].map(x => x * x);
```

## Callback 的限制與下一步

不過，Callback 在實務中也有它的問題。當多個非同步事件需要串聯時，就會出現所謂的「Callback Hell」：

```javascript
doSomething(function(result1) {
  doSomethingElse(result1, function(result2) {
    doThirdThing(result2, function(result3) {
      // ...
    });
  });
});
```

這樣的程式難以閱讀、難以維護，也難以攔截錯誤。這促使語言設計者尋找一種「結構化非同步邏輯」的方法 —— 也就是下一節將介紹的 **Promise**。

## 語言觀總結：Callback 是函數作為資料，也是控制流程的起點

Lambda → Callback 的過渡，其實是從「函數做為定義」走向「函數做為輸入值」的思維。這正是 JavaScript 的函數式特性，也是非同步流程控制的第一塊基石。

> Callback 不是工具，而是一種語言模式：將控制權交出，等待語言幫你完成。

在下一節，我們將走向更進一步的結構化設計：使用 Promise 將 Callback 轉為可組合的語意契約。

Next: [5.3 從 TypeScript 談起](3-typescript.md)
