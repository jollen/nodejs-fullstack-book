# 1.6 Module Pattern

如同此設計模式的名字所述，Module Pattern 的目的是將程式碼「模組化」；在 JavaScript 中進行模組化，有其固定做法。模組化的前提，是使用 Closure（封閉性）來建立私有作用域。

接下來，我們將以連續的範例來說明 Module Pattern。在繼續進行之前，請務必熟悉 JavaScript 的物件與作用域觀念。

## 1.6.1 使用 Private/Public 觀念

請不要再使用 Local variable 與 Global variable 的寫法，這在 HTML5+JavaScript 的開發實務中是無法維持良好架構的。以下為一個典型的錯誤範例：

```javascript
// [ES5]
1 var count = 0; // GLOBAL
2
3 function incrementCounter() {
4   count++; // GLOBAL
5   return count;
6 }
7
8 function resetCounter() {
9   var orig; // LOCAL
10  orig = count;
11  count = 0;
12 }
```

這個範例只是用來說明 Local 變數與 Global 變數的基本寫法。我們現在要更進一步，將 Local variable 重構為 Private attribute，而 Global variable 則重構為 Public attribute。如下：

```javascript
// [ES5]
1 var testModule = (function () {
2   var counter = 0; // Private
3
4   return {
5     incrementCounter: function () {
6       return ++counter;
7     },
8     resetCounter: function () {
9       counter = 0;
10    }
11  };
12 })();
```

### 對照寫法：ES6 模組化

```javascript
// [ES6]
1 const testModule = (() => {
2   let counter = 0;
3
4   const incrementCounter = () => ++counter;
5   const resetCounter = () => {
6     counter = 0;
7   };
8
9   return {
10    incrementCounter,
11    resetCounter
12  };
13})();
```

對照分析：
- `var` → `let/const`：明確區分可變與不可變。
- `function` → arrow function：簡潔語法，保留語意一致性。
- `return` 中直接使用變數名稱作為 key/value：ES6 物件速記法。

這段程式碼的重點是：原本使用 function 關鍵字定義的結構，現在被更進一步包裹為一個 module，形成封閉的範圍。此時，區域變數 `counter` 成為 Private attribute，而兩個函式則作為模組的 Public method。

將這段程式碼封裝為 JavaScript module，就是 Module Pattern 的核心精神。Closure 的目的，是為了避免全域變數污染；一個全域變數可能會被其他程式碼任意修改，而將它封閉在 module 裡，則只有模組內部能夠存取與操作。

外部程式碼無法修改封閉程式碼內的變數。從觀念上來看，透過 module 將 attribute 與 method 進行封裝，就是 closure 的應用。

簡單來說，將封閉的程式碼放進 `testModule` 變數裡，使 `testModule` 成為一個可重複使用的模組。JavaScript 沒有明確的物件導向語法，因此這些封裝技巧更多是一種「觀念上的封裝」，而非語法上的強制限制。

軟體工程常常處理的是這類抽象與結構性的思考問題，技術只是這其中的一環。我們要將軟體開發視為一種創作過程，而非僅僅是寫程式的過程。

## 1.6.2 Import Modules

jQuery 是一套功能強大的函式庫，它本身也是一個 module。由於 jQuery 的擴充能力極強，市面上有眾多為其打造的 plugins，因此 jQuery 不僅是函式庫，更像是一個平台，甚至是一個框架（Framework）。

在 Web 開發中，jQuery 幾乎無所不在，因此也有了一套專屬的 jQuery Pattern（後續章節將介紹）。

以下是一個以 jQuery 為參數匯入模組的範例：

```javascript
// [ES5]
1 var testModule = (function (jQ) {
2   var counter = 0;
3
4   function showHTML() {
5     jQ(".header").html("<h1>" + counter + "</h1>");
6   }
7
8   return {
9     incrementCounter: function () {
10      return ++counter;
11    },
12    resetCounter: function () {
13      counter = 0;
14    },
15    setCount: function (val) {
16      counter = val;
17    },
18    showCount: function () {
19      showHTML();
20    }
21  };
22 })($);
```

### ES6 重構版本

```javascript
// [ES6]
1 const testModule = ((jQ) => {
2   let counter = 0;
3
4   const showHTML = () => {
5     jQ(".header").html(`<h1>${counter}</h1>`);
6   };
7
8   return {
9     incrementCounter: () => ++counter,
10    resetCounter: () => { counter = 0; },
11    setCount: val => { counter = val; },
12    showCount: () => showHTML()
13  };
14})($);
```

這種設計方式有兩個優勢：
- 將依賴（如 `$`）作為參數傳入，達到依賴注入的目的，降低耦合度。
- 將所有方法封裝於閉包中，只暴露需要的操作邏輯，強化模組封裝性。

---

Next: [1.7 jQuery Pattern](7-jquery.md)
