# 1.9 Prototype Pattern

每一個 JavaScript 的函數，都內建一個名為 `prototype` 的屬性。這個 `prototype` 是一個物件，用來作為該函數的實例所參照的原型。換言之，所有透過該 constructor 建立的物件，都會指向同一份 `prototype`，並共享其中的屬性與方法。

所謂 Prototype Pattern，就是針對 `prototype` 這個物件進行擴充，達成共用邏輯與記憶體效率的設計目的。

這是一種非常核心的 JavaScript 設計模式，在撰寫大型函式庫與模組時，被廣泛採用。

以下為一個典型範例：

```javascript
// [ES5] 使用 Constructor + Prototype
1 function Person() {
2 }
3
4 Person.prototype.name = 'Jollen';
5 Person.prototype.sayName = function() {
6   alert(this.name);
7 };
8
9 var person = new Person();
10 person.sayName(); // 'Jollen'
```

### 改寫為 [ES6] 寫法

```javascript
1 class Person {
2   constructor() {
3     this.name = 'Jollen';
4   }
5
6   sayName() {
7     alert(this.name);
8   }
9 }

10 const person = new Person();
11 person.sayName(); // 'Jollen'
```

### 差異說明

| 差異項目 | ES5 Prototype Pattern | ES6 Class 寫法 | 說明 |
|-----------|------------------------|----------------|------|
| 原型方法定義 | 掛在 `prototype` 上 | 寫在 class 區塊內 | 本質相同，語法不同 |
| 共用邏輯 | 明確透過 `prototype` 實現 | 隱式由 class 建構 | 都可共享方法定義 |
| 物件初始化 | 手動設定屬性 | 使用 constructor 自動初始化 | 可選擇何時建立屬性 |

---

## Prototype Pattern 的優勢

- 可以在物件實例化之前，就定義好要共用的屬性與方法
- 所有實例共用同一份 `prototype`，節省記憶體空間
- 易於模組化封裝與維護，特別適合 library 設計

這也是 Prototype Pattern 與 Constructor Pattern 最大的差異：

> Constructor Pattern 是每次實例化都建立一份方法；Prototype Pattern 則是所有實例共享方法。

---

## 小結：原型鏈即是記憶體共享的邏輯地圖

Prototype Pattern 不僅是一種效能策略，它其實建立了 JavaScript 物件之間的**行為繼承結構**。這種結構稱為原型鏈（Prototype Chain）。

在實務開發中，只要能清楚理解 prototype 的共享特性，就能設計出既有效率又具彈性的物件系統。

---

Next: [1.10 其它模式](10-misc.md)
