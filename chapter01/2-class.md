# 1.2 宣告 Class

同樣地，JavaScript 沒有類似 Class 這樣的語法（直到 ES6），所以在 ES5 中，我們是以 function 關鍵字來實作所謂的「Class」，也就是 Instantiable Function，這種寫法本質上是函數宣告：

```js
 1 function Person(name, job) {
 2     this.name = name;
 3     this.job = job;
 4     this.queryJob = function() {
 5         alert(this.job);
 6     };
 7 }
```

將 Function 當作類別使用，代表我們也可以使用 `new` 關鍵字將其實例化（instantiate）成一個物件。

上述函數內部使用 `this` 來定義屬性與方法。當透過 `new` 關鍵字呼叫這個函數時，就會生成一個新的物件實例，並綁定到這個 `this` 上。

以下是一個完整的例子：

```html
 1 <!doctype html>
 2 <html lang="en">
 3 <head>
 4     <meta charset="UTF-8">
 5     <title>MokoCrush</title>
 6 </head>
 7 <body>
 8 <script>
 9 function Person(name, job) {
10     this.name = name;
11     this.job = job;
12     this.queryJob = function() {
13         alert(name + "'s job is " + job);
14     };
15 }
 
17 var person = new Person("Jollen", "Software Developer");
18 person.queryJob();
19 </script>
20 </body>
21 </html>
```

在這個例子中，`person` 是 `Person` 類別的實例。當執行 `person.queryJob()` 時，瀏覽器會顯示該工作職稱。

---

## ✦ 語法升級對照：ES5 vs ES6

JavaScript 自 ES6 起，正式導入了 `class` 語法，讓語意與封裝更接近物件導向設計。

| 概念      | ES5 語法                             | ES6 語法                              |
| ------- | ---------------------------------- | ----------------------------------- |
| 類別宣告    | `function Person(...) { ... }`     | `class Person { constructor(...) }` |
| 方法定義    | 在 constructor 裡手動賦值                | 直接定義在 class 區塊內                     |
| 繼承      | 使用 `Object.create()` / `prototype` | 使用 `extends`                        |
| this 綁定 | 需手動保存 `var self = this`            | 使用箭頭函數或 class 方法                    |

### 對照示例：ES6 寫法

```js
class Person {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }

  queryJob() {
    alert(`${this.name}'s job is ${this.job}`);
  }
}

const person = new Person("Jollen", "Software Developer");
person.queryJob();
```

---

## ✦ 進階 Class 繼承：extends / super

ES6 提供了 `extends` 與 `super()` 語法，使得繼承變得直覺可用。

以下是 `Person` 類別的延伸範例：

```js
class Developer extends Person {
  constructor(name, job, language) {
    super(name, job); // 呼叫父類別的 constructor
    this.language = language;
  }

  introduce() {
    console.log(`Hi, I code in ${this.language}`);
  }
}

const dev = new Developer("Jollen", "Software Developer", "JavaScript");
dev.queryJob(); // 繼承自 Person
dev.introduce();
```

這種語法結構，在第 4 章中我們可以用來封裝不同的前端元件行為（例如：WebSocketClient 的繼承擴展），並明確使用 `super()` 呼叫基礎行為。

---

## ✦ this 綁定與原型鏈：從 ES5 到 ES6

在第 3 章與第 4 章的 WebSocket 程式碼裡，我們將會看到 `this` 綁定與封裝（Closure）帶來的實務挑戰。例如：

* `this` 在 callback 裡會指向錯誤的上下文 → 需使用變數保存 (`var self = this`)
* 將函數封裝為 jQuery plugin 時，需將 `this` 綁定為 DOM 節點 → 強化封閉性

這些問題，在 ES6 的 class 與箭頭函數下得以改善：箭頭函數不會綁定自己的 this，會自動指向外層作用域的 this。

---

## ✦ 本書策略說明：從 ES5 出發，導向 ES6 應用

為了幫助初學者理解 JavaScript 的語意結構與執行脈絡，本書前幾章範例皆採用 ES5 語法做為起點，逐步導入：

* **模組化**（require vs export）
* **物件導向建構**（constructor pattern）
* **callback / closure 思維**

從第 4 章後期開始，將同步提供 ES6 改寫版本，並逐步導入：

* `class` 語法
* `const` / `let` 替代 `var`
* 箭頭函數（Arrow Functions）
* 模組語法（`import` / `export`）

這種階段式過渡的寫作策略，目的在於：讓讀者先理解 JavaScript 的底層語意，再逐步適應新語法帶來的簡潔與強大。

---

JavaScript 裡生成物件的做法：

* 使用 `var`（或 `let`, `const`）宣告物件
* Instantiable Function（ES5）
* class 語法（ES6）

---

Next: [1.3 使用 Factory Pattern](https://chatgpt.com/g/g-p-6811aa177e0c8191979dc2bc0f44abbf-node-js-llm/c/3-factory.md)
