# 1.4 Constructor Pattern

以上的觀念，可以用一句話來總結：

> 函數（functions）就是物件（objects）

這是 JavaScript 極為關鍵的語言設計特性，尤其在實務開發中，廣泛應用於 callback function、事件綁定與 constructor function 的建立。

在前一節的範例中，我們將 `Person()` 當作 constructor 來使用，這種設計模式即為 **Constructor Pattern**。它透過 `new` 關鍵字配合函數語法，實現物件的初始化與封裝，具有高度可讀性與擴充性。

上述兩個範例中，只有第二個（使用 `new Person()` 的寫法）才符合 Constructor Pattern 的語意。其具備以下三個語法特徵：

- 不需要手動產生物件（不使用 `new Object()`）
- 直接使用 `this` 關鍵字指定屬性與方法
- 函數內不需要明確 `return` 物件

此外，依循物件導向的慣例，constructor 的命名建議使用大寫字母開頭（如 `Person`），以區分與一般函數的用途。

以下為範例：

```javascript
// Constructor Pattern 範例
function Person(name, job) {
  this.name = name;
  this.job = job;
  this.queryJob = function() {
    alert(`${this.name}'s job is ${this.job}`);
  };
}

const person1 = new Person("Jollen", "Software Developer");
const person2 = new Person("Paul", "Product Manager");

person2.queryJob();
```

### 為什麼 Constructor Pattern 更接近類別語意？

使用 `new` 關鍵字時，JavaScript 會隱式執行以下操作：

1. 建立一個新的空物件 `{}`
2. 將 `this` 綁定到該新物件
3. 將函數內的屬性與方法掛載到該物件上
4. 回傳這個物件（即便沒有寫 `return`）

這一連串語意行為，使得 Constructor Pattern 成為模擬「類別初始化」的典型方式，亦是 JavaScript 進入以類別為基礎結構的起點。

### 延伸補充：ES6 class 的語法轉譯

ES6 提供了 `class` 語法糖，其實本質上仍是 constructor pattern 的語法包裝。例如：

```javascript
class Person {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }

  queryJob() {
    alert(`${this.name}'s job is ${this.job}`);
  }
}

const person = new Person("Alice", "Engineer");
person.queryJob();
```

雖然語法看似「類別」，但在語意上仍是基於原型鏈的 constructor 機制。

---

### 深入比較：Factory Pattern vs Constructor Pattern

| 面向 | Factory Pattern | Constructor Pattern |
|------|------------------|----------------------|
| 是否使用 `new` | 否 | 是 |
| 類型判斷支援 | `instanceof` 無法判斷自定類別 | 可使用 `instanceof` 判斷類別 |
| 建立過程封裝彈性 | 高，適合動態條件分支 | 中，較為明確但缺乏動態決策能力 |
| 原型鏈（Prototype）支援 | 否，無法共享方法 | 是，可透過 `prototype` 節省記憶體 |
| 記憶體效能 | 每個實例各自擁有方法拷貝（高成本） | 可透過 `prototype` 共用方法（低成本） |

### 技術建議：何時選用 Constructor？

- 當需要建立明確的類別型別與結構時
- 當需搭配原型鏈設計與方法共享機制（如多人共用 `queryJob()` 方法）
- 當希望能明確辨識物件來源（如 `instanceof Person`）

反之，若建立的是靜態物件、一次性使用或需高度客製化屬性時，可考慮採用 Factory Pattern。

---

Next: [1.5 Design Pattern for Front-End](5-frontend.md)
