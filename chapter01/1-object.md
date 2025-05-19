# 1.1 Object（物件）

JavaScript 的第一堂課，就是理解「物件生成」這件事。而物件，不只是資料容器，更是語意行為的包裝體。在 JavaScript 裡，我們可以使用 `function` 關鍵字宣告一個可重複使用的物件工廠，搭配 `new` 來生成具備屬性與方法的物件；另一種更直接的方式，是使用 `Object.create()` 或「物件字面量」語法。

```js
var person = {
  name: "Jollen",
  job: "Software Developer",

  queryJob: function() {
    alert(this.job);
  }
};

person.queryJob();
```

在這段範例中：

* `person` 是一個物件（Object）
* `name` 和 `job` 是物件的屬性（attribute）
* `queryJob()` 是一個方法（method），透過 `this` 取得 `job` 的值

這是典型物件導向語言裡的觀念：資料（Data）與行為（Behavior）被包裝在同一個結構中。

## 語法升級對照（ES6）

使用 ES6 的語法，可以更清楚地將資料與方法結構化，以下是等效的語法重構：

```js
const person = {
  name: "Jollen",
  job: "Software Developer",

  queryJob() {
    alert(this.job);
  }
};

person.queryJob();
```

### 差異說明

| 語法面向  | ES5                       | ES6                      |
| ----- | ------------------------- | ------------------------ |
| 宣告變數  | `var`                     | `const`（不可變）             |
| 方法寫法  | `queryJob: function() {}` | `queryJob() {}`          |
| 語意與語境 | 具備 `this` 語境，但無模組封閉       | 建議封裝於模組（Module Pattern）中 |

---

在第 4 章，我們將看到：物件（Object）不只是資料的容器，更是功能與語境封裝的單位。我們透過 jQuery plugin、WebSocket client，實踐了「以物件操作自身」的結構思維。

回過頭來看這個範例，會發現即便簡單如 `person.queryJob()`，也蘊含著物件內部語意行為的綁定與執行語境的切換。

> 關於 Node.js 的 JavaScript 語法標準，後續 3.6 節再進行詳細說明。

下一節，我們將進一步進入以 function 宣告物件行為的寫法 —— Instantiable Function。

---

Next: [1.2 宣告 Class](2-class.md)
