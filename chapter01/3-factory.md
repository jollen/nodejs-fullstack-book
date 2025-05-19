# 1.3 使用 Factory Pattern

Instantiable Function 可使用 `new` 關鍵字建立物件，進一步可透過封裝的方式將物件生成過程抽象化。這就是 Factory Pattern 的用途。

Factory Pattern 是一種常見的物件生成設計模式，它在軟體工程領域中用於將物件的建立過程進行封裝抽象化。例如，以下我們將先前的範例改寫成 factory pattern 的實作：

```javascript
// 不可做為 Constructor Pattern
function personFactory(name, job) {
  const o = {};

  o.name = name;
  o.job = job;
  o.queryJob = () => {
    alert(`${name}'s job is ${job}`);
  };

  return o;
}

const person1 = personFactory("Jollen", "Software Developer");
const person2 = personFactory("Paul", "Product Manager");

person2.queryJob();
```

範例中，`person1` 和 `person2` 的物件生成過程被抽象化（封裝）起來。在主程式內，我們看不到 `new` 關鍵字的使用，而是透過 `personFactory()` 函數來封裝物件的生成。然而，使用 factory pattern 的缺點在於無法判斷物件原本的 class type，例如：

```javascript
alert(person1 instanceof Object); // true
```

使用 `personFactory()` 建立的物件實際上是 `Object` 的實例。如果需要明確生成 `Person` 類別的物件，仍建議使用先前介紹的 constructor 模式：

```javascript
// 可做為 Constructor Pattern
function Person(name, job) {
  this.name = name;
  this.job = job;
  this.queryJob = function() {
    alert(this.job);
  };
}

// 將 Person() 視為 constructor
const person = new Person("Jollen", "Software Developer");

alert(person instanceof Person); // true
```

在這個範例中，物件 `person` 確實為 `Person` 類別的實例。將函數 `Person()` 視為 constructor，而非一般函數，能在概念上達到明確判斷 class type 的目的。

## Factory Pattern 的優點與限制

使用 Factory Pattern 建立物件時，有以下的優點與限制：

**優點：**

* 提高物件建立邏輯的封裝性與可重用性
* 能彈性地建立不同結構的物件，適合動態決定物件屬性的情境
* 避免程式碼過度依賴具體的建構函數，提升系統的擴充性與維護性

**限制：**

* 生成的物件無法透過 `instanceof` 判斷原始類型
* 建立物件的方式較為隱晦，可能增加程式碼閱讀的困難度

## 實務範例：動態物件生成

以下提供一個更具實務價值的範例，展示 Factory Pattern 如何動態生成不同屬性的物件：

```javascript
// 動態決定生成物件屬性
function employeeFactory(type, name) {
  const employee = { name };

  if (type === 'Developer') {
    employee.job = 'Software Developer';
    employee.queryJob = () => alert(`${name} writes code.`);
  } else if (type === 'Manager') {
    employee.job = 'Product Manager';
    employee.queryJob = () => alert(`${name} manages products.`);
  } else {
    employee.job = 'Unknown';
    employee.queryJob = () => alert(`Unknown role for ${name}.`);
  }

  return employee;
}

const emp1 = employeeFactory('Developer', 'Alice');
const emp2 = employeeFactory('Manager', 'Bob');

emp1.queryJob(); // Alice writes code.
emp2.queryJob(); // Bob manages products.
```

此範例清楚說明 Factory Pattern 如何透過動態條件，建立具不同屬性與行為的物件，有效提升程式設計上的彈性與抽象化能力。

---

Next: [1.4 Constructor Pattern](4-constructor.md)
