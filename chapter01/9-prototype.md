# 1.9 Prototype Pattern

每一個 JavaScript 的函數，都包含一個 *prototype* 的屬性。*prototype* 是一個物件，並且該函數的實例化，都能共用 *prototype*。所謂的 Prototype Pattern，就是擴充 *prototype* 物件。

Prototype Pattern 是非常重要的 JavaScript 設計模式，在開發程式庫時，被大量使用。以下是一個實例：

~~~~~~~~
// 可做為 Constructor Pattern
function Person() {
}
 
Person.prototype.name = 'Jollen';
Person.prototype.sayName = function() {
	alert(this.name);	
};

// 將 Person() 視為 constructor
var person = new Person();
person.sayName();	// 'Jollen'
~~~~~~~~

Prototype Pattern 的優點：

* 可以在實例化前，就定義好物件的 property 與 method；Constructor Pattern 的做法則是在實例化時，透過 Constructor 來定義
* 實例化之間共用 *prototype*

實例化之間是共用同一份 *prototype*，這是 Prototype Pattern 與 Constructor Pattern 最大的不同。

---

Next: [1.10 其它模式](10-misc.md)
