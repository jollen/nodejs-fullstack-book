# 1.9 Prototype Pattern

每一個 JavaScript 的函數，都內建一個名為 `prototype` 的屬性。這個 `prototype` 是一個物件，用來作為該函數的實例所參照的原型。換言之，所有透過該 constructor 建立的物件，都會指向同一份 `prototype`，並共享其中的屬性與方法。

所謂 Prototype Pattern，就是針對 `prototype` 這個物件進行擴充，達成共用邏輯與記憶體效率的設計目的。

這是一種非常核心的 JavaScript 設計模式，在撰寫大型函式庫與模組時，被廣泛採用。Prototype Pattern 是從 Constructor Pattern 自然延伸的結構演化——當物件行為需要共用時，Constructor 不再足夠，這時就要將方法「上提」到 prototype 層。

## 1.9.1 範例：建立共用方法

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

### 差異說明表

| 差異項目 | ES5 Prototype Pattern | ES6 Class 寫法 | 說明 |
|-----------|------------------------|----------------|------|
| 原型方法定義 | 掛在 `prototype` 上 | 寫在 class 區塊內 | 本質相同，語法不同 |
| 共用邏輯 | 明確透過 `prototype` 實現 | 隱式由 class 建構 | 都可共享方法定義 |
| 物件初始化 | 手動設定屬性 | 使用 constructor 自動初始化 | 可選擇何時建立屬性 |

## 1.9.2 原型鏈（Prototype Chain）

每一個 JavaScript 物件（除了 base object）都有一個內部屬性 `[[Prototype]]`（也可透過 `__proto__` 存取），它指向 constructor 的 `prototype`，形成一條查找路徑，稱為原型鏈（Prototype Chain）。

### 原型鏈圖解：

```
person.__proto__ → Person.prototype
                   ↓
           Object.prototype
                   ↓
                   null
```

當我們呼叫 `person.sayName()` 時，JavaScript 引擎會：

1. 先在 `person` 自己身上找 `sayName`
2. 找不到，就往 `person.__proto__` 查找（也就是 `Person.prototype`）
3. 若仍找不到，再往 `Object.prototype` 查找，直到 `null` 為止

這套查找機制，就是 JavaScript 的繼承模型。

## 1.9.3 Prototype Pattern 的優勢

- 可以在物件實例化之前，就定義好要共用的屬性與方法
- 所有實例共用同一份 `prototype`，節省記憶體空間
- 易於模組化封裝與維護，特別適合 library 設計

這也是 Prototype Pattern 與 Constructor Pattern 最大的差異：

> Constructor Pattern 是每次實例化都建立一份方法；Prototype Pattern 則是所有實例共享方法。

## 1.9.4 延伸應用：從 Prototype 到行為組合

原型的可擴展性，使得 JavaScript 能在不使用 class inheritance 的前提下實現行為重用。以下為常見延伸模式：

- **原型鏈繼承**：透過 `Child.prototype = Object.create(Parent.prototype)` 建立層層委派關係
- **混入（Mixin）**：將多個物件的方法合併至 prototype 上，實現「多重能力」
- **Delegation Pattern**：透過 prototype 的查找鏈，將執行權交由上層物件

這些模式雖在本節不細談，但將在進入進階設計模式章節時深入探討。

## 小結：原型是記憶體的共用地圖，也是邏輯的繼承起點

Prototype Pattern 不僅是一種效能策略，它其實建立了 JavaScript 物件之間的**行為繼承結構**。這種結構稱為原型鏈（Prototype Chain），它讓程式具備延伸性、組合性與記憶體效率。

> 理解 prototype，不只是懂得「共享方法」，而是進入 JavaScript 語言架構設計的深層入口。

---

Next: [1.10 其它模式](10-misc.md)
