# 5.1 Lambda

Lambda（λ）原是一個希臘字母，但在不同領域中具有不同的意義：

- 在物理學中，它代表波長
- 在數學中，它有時代表空字串
- 在電腦科學中，它則用來表示「暱名函數（Anonymous Function）」

在程式語言裡，Lambda 代表一種沒有名稱的函數，目的是簡化運算表示法。在電腦科學中，這種設計源於對「簡單運算符號」的追求。

## Step 1：定義具名函數

以下是一個簡單的加法函數：

```javascript
function sum(x) {
  return x + 2;
}
```

這是一個標準的具名函數（Named Function），用 `sum` 當作名稱。

## Step 2：改寫為暱名函數（Anonymous Function）

Lambda 核心觀念是「捨棄名稱，只留下運算邏輯」。同樣的運算若以 Lambda 表示，數學符號如下：

```
λx.x + 2
```

在 JavaScript 中，我們可用立即函數（Immediately-Invoked Function Expression, IIFE）來模擬這種語法：

```javascript
(function(x) {
  return x + 2;
})(5); // 回傳 7
```

這段程式碼運用了第 1 章介紹過的 Closure：使用括號包裹暱名函數，並立即執行它。

## Step 3：將暱名函數賦值給變數

透過變數，我們可以儲存這個暱名函數的執行結果：

```javascript
var lambda = (function(x) {
  return x + 2;
})(3);

console.log(lambda); // 5
```

但更常見的寫法，是將暱名函數本身指定給變數（Function Expression）：

```javascript
var lambda = function(x) {
  return x + 2;
};

console.log(lambda(10)); // 12
```

這是一種函數表達式（Function Expression），常見於 JavaScript 的模組、事件處理與函數式寫法中。

## 正名觀念：lambda 是變數，不是函數宣告

以下這兩種寫法，在語意上完全不同：

```javascript
// 函數表達式：lambda 是變數
var lambda = function(x) {
  return x + 2;
};

// 函數宣告：lambda 是函數名稱
function lambda(x) {
  return x + 2;
}
```

第一種寫法中，`lambda` 是一個變數，這點非常關鍵，因為 **JavaScript 中的函數可以被當成值處理**，這讓它具備高度的語言彈性。

> JavaScript 並不是傳統的類別語言，它的函數即物件，這正是 Lambda 思維得以落地的語言基礎。

## JavaScript 語言的控制流程：從 Lambda 到 async/await

JavaScript 是一門語言——但它的語言特性，與我們習慣的語法語言不同。

它不像 Java 那樣重視類別與繼承，也不像 C 那樣線性同步。它的邏輯控制，是「非同步」的；它的行為封裝，是「函數式」的。也因此，理解 JavaScript 的流程控制，不是從 if/else 開始，而是從 **Lambda 開始**。

> 在 JavaScript 裡，函數不只是語法單位，而是語言的控制節點。

### 我們將走過這條路徑：

1. **Lambda**：函數即值，匿名函數可以即時定義與執行（IIFE）。這不是語法技巧，而是封裝運算邏輯的起點。
2. **Callback Function**：將函數作為參數傳入另一個函數，是非同步流程控制的第一層設計。也是函數「可組合」語意的開端。
3. **Promise**：解決 Callback 地獄的語言結構。它不是時間解法，而是語意包裝的契約結構（Deferred Composition）。
4. **async/await**：將非同步操作「語意同步化」，使流程控制重回可讀性與可推理性，回應了語言設計的人性化訴求。

這不是從語法出發的學習路線，而是從「流程的語意組織」出發，去學會用 JavaScript 操控事件、封裝邏輯、處理錯誤與組合行為。

> 控制流程不是邏輯的跳板，而是語言的架構層。

下一節，讓我們從 JavaScript 中最基本的「傳遞函數」開始，走進 Callback 的世界。

### 延伸閱讀

推薦閱讀 [The Happy Lambda](https://leanpub.com/happylambda)，一本以 Ruby 為範例語言的 Lambda 思維入門書。雖然未完稿，但其內容涵蓋了從函數抽象到運算模型的完整視角，對理解 JavaScript 中的 Lambda 模型也有極大幫助。

---
  
Next: [5.2 Callback Function](2-callback.md)
