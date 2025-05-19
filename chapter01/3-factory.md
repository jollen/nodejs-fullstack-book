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

---

Next: [1.4 Constructor Pattern](4-constructor.md)
