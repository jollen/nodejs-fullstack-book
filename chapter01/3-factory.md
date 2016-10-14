# 1.3 使用 Factory Pattern

Instantiable Function 可以利用 new 關鍵字生成它的物件，我們可以進一步將生成物件的過程封裝起來。這就是 Factory Pattern 的用途。

Factory Pattern 是很常用的一種物件生成設計模式，在軟體工程的領域裡，它用來將建立物件的過程抽象化。例如，將上述的例子重構，改以 factory pattern 來實作：

~~~~~~~~
// 不可做為 Constructor Pattern
function personFactory(name, job) {
	var o = new Object();
	
	o.name = name;
	o.job = job;
	o.queryJob = function() {
		alert(name + "'s job is " + job);
	};
	
	return o;
}
 
var person1 = personFactory("Jollen", "Software Developer");
var person2 = personFactory("Paul", "Product Manager");

person2.queryJob();
~~~~~~~~

範例中，person1 以及 person2 物件的生成被抽象化了，也就是被封裝了起來。在主程式裡，我們看不到 new 關鍵字的使用，利用了 personFactory() 函數將真正的物件生成封裝起來。不過，使用 factory pattern 的話，就沒有辦法判斷物件原本的 class type 了。例如：

~~~~~~~~
alert(person1 instanceof Object); // true
~~~~~~~~

在 personFactory() 裡生成的物件，實際上是 Object 的實例化。實作時，如果需要明確地生成 Person 類別的物件，還是要以先前的做法為主：

~~~~~~~~
// 可做為 Constructor Pattern
function Person(name, job) {
	this.name = name;
	this.job = job;
	this.queryJob = function() {
		alert(this.job);
	};
}
 
// 將 Person() 視為 constructor
var person = new Person("Jollen", "Software Developer");

alert(person instanceof Person); // true
~~~~~~~~

在這個例子裡，物件 person 確實是 Person 類別的實例化。將 Person() 視為 constructor，而不是函數，觀念上就能達成上述的目的（判斷物件原本的 class type）。

---

Next: [1.4 Constructor Pattern](4-constructor.md)
