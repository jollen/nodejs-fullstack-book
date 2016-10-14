## 1.1 Object

JavaScript 第一個觀念，就是「物件生成」。利用 function 關鍵字來宣告類別，並且利用 new 關鍵字來實例化，是生成物件最簡單的寫法。另外一個做法是利用 ```Object.create()``` 方法。

在 JavaScript 裡，也可以直接宣告物件。利用一對大括號所宣告出來的變數，都是物件。

JavaScript 不是強型別（Strong data type）的程式語言，任何的變數宣告，只要使用 var 關鍵字即可。要生成（Create）物件時也一樣，以下是一個範例：

~~~~~~~~
var person = {
	name: "Jollen",
	job: "Software Developer",
	
	queryJob: function() {
		alert(this.job);
	}
};
~~~~~~~~

上述的表示式執行後，可以得到 person 物件。如同典型的物件導向觀念，在物件裡會有 attribute 與 method。

在 person 物件裡，有二個 attribute 與一個 method。例如，要呼叫 person 物件的 queryJob() method：

~~~~~~~~
var person = {
	name: "Jollen",
	job: "Software Developer",
	
	queryJob: function() {
		alert(this.job);
	}
};

person.queryJob();
~~~~~~~~

直接宣告物件是一種寫法，另外一種寫法是稱為 Instantiable Function，於下節說明。
