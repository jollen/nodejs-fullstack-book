# 1.10 其它模式

本章作為入門設計模式的總結與過渡，我們簡要整理了 JavaScript 常見的結構與語意設計方式。從 Constructor 到 Prototype、從 Module 到 Selector，每一種模式都對應著一種「JavaScript 程式語言的內部架構觀」。

當然，這些只是起點。在實務開發中，還有許多關鍵模式值得我們進一步探索與精煉。


## 1.10.1 MVC 模式

MVC（Model-View-Controller）是一種長青且跨語言的設計模式。雖然它源自桌面應用程式開發，但在 Web 開發領域仍被廣泛應用。

在 HTML5+JavaScript 開發中，MVC 可作為組織大型應用的基礎框架，將邏輯、界面與資料分層處理。

### 常見結構：

```
project/
├── model/        # 資料邏輯層
├── view/         # 顯示邏輯層（HTML/CSS）
├── controller/   # 事件控制與協調層
└── media/        # 靜態資源（圖像、影音等）
```

這種結構化的方式，其實與 Python 的 Django 框架相似，也是許多 Web 框架（如 Angular、Backbone）採用的起點。

## 1.10.2 Mixin 混入模式

Mixin 是一種讓物件之間共享行為，而不建立繼承關係的設計技術。它補足了單一原型鏈結構的彈性不足，讓我們可以將多個功能模組合併至一個物件中。

### 範例：

```javascript
const sayHi = {
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking.`);
  }
};

function Person(name) {
  this.name = name;
}

Object.assign(Person.prototype, sayHi, canWalk);

const p = new Person('Alice');
p.greet(); // Hi, I'm Alice
p.walk();  // Alice is walking.
```

## 1.10.3 原型繼承模式（Prototype Delegation）

原型本質上是一種 delegation 的實作方式，也就是「當我沒有這個方法，我就委託給我的原型」。這種機制讓 JavaScript 天生具備物件能力的共享與擴展能力。

可以透過 `Object.create()` 快速實現物件委派：

```javascript
const base = {
  speak() {
    console.log('I can speak.');
  }
};

const sub = Object.create(base);
sub.speak(); // I can speak.
```

## 1.10.4 Revealing Module Pattern

這是一種對 Module Pattern 的優化設計，它將私有邏輯封裝在閉包中，僅公開需要暴露的 API，讓模組更具可讀性與結構一致性。

```javascript
const counterModule = (function () {
  let count = 0;

  function increment() {
    count++;
  }

  function getCount() {
    return count;
  }

  return {
    increment,
    getCount
  };
})();

counterModule.increment();
console.log(counterModule.getCount()); // 1
```

這種寫法清楚區分哪些是內部邏輯、哪些是對外暴露的行為，是模組化開發中的最佳實踐之一。

## 1.10.5 模式與語言結構對照表

| 模式名稱 | 關鍵語言特性 | 是否共享記憶體 | 對應語言 API | 適用情境 |
|----------|----------------|----------------|----------------|------------|
| Constructor Pattern | `this`、`new` | 否（每次實例化） | `function` + `new` | 簡單物件產生 |
| Prototype Pattern | `prototype`、`__proto__` | ✅ 共用方法記憶體 | `Object.create`、`.prototype` | 多實例共用行為 |
| Module Pattern | Closure | ✅ 封閉變數共享 | IIFE（立即函數） | 單體模組（Singleton） |
| Revealing Module | Closure + API 封裝 | ✅ 封裝 API 結構 | `return {}` 形式 | 模組封裝與可讀性 |
| Mixin 混入 | `Object.assign` | ✅ 行為合成 | 任意物件 + 原型擴充 | 多行為組合 |
| Selector Pattern | `querySelector` / `$` | ⛔ | DOM API | UI 操作語意入口 |
| Delegation Pattern | 原型鏈查找 | ✅ 查找傳遞 | `__proto__`、`Object.create` | 行為覆寫與轉發 |
| jQuery Plugin | `$.fn` 原型擴充 | ✅ jQuery 方法共享 | jQuery 原型鏈 | 擴充現有物件能力 |


## 小結：語言不是語法的集合，而是邏輯的結構觀

從 Prototype 到 Module，再到 Mixin、Delegation，每一種模式都在回答同一個問題：

> JavaScript 的語言特性，如何被轉譯為可維護、可擴充的程式設計思維？

我們不是在學語法，而是在習得一種組織與推理結構。這也是為什麼設計模式，不只是「寫法」，而是語言的設計觀。

## JavaScript 的語言架構觀

JavaScript 並非以類別導向為出發點的語言。它以 `function` 為基礎單元，以 closure 結構取代私有屬性，並以原型鏈設計實現行為委派。這意味著：

> 我們不是在模仿 Java，而是在使用 JavaScript 自有的「語言語法觀」。

### 語言觀總覽：

| 語言觀念 | 對應章節 | 問題導向 |
|-----------|-----------|-------------|
| 函數是物件 | 1.1–1.4 | 如何生成與封裝行為？ |
| 模組與封裝 | 1.5–1.6 | 如何管理與限制作用域？ |
| 調用介面 | 1.7–1.8 | 語意操作從哪裡開始？ |
| 記憶體與邏輯共享 | 1.9 | 如何讓實例共用行為？ |
| 行為組合與設計 | 1.10 | 如何建構可重用邏輯架構？ |

這些觀念不只對應語法，也對應我們對語言本質的思考方式。下一章，我們將開始進入 HTML5 軟體開發的概念。

---

Next: [2.1 JavaScript Engine 原理](../chapter2/1-js-engine.md)
