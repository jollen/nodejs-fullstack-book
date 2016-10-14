# 1.6 Module Pattern

如同此設計模式的名字所述，module pattern 的目的是把程式碼「模組化」；將 JavaScript 的程式碼模組化，有其固定的做法。要將程式碼模組化，前提是將程式碼 Closure，即封閉性。接下來，以一個連續的範例，來說明 Module Pattern。在繼續進行下去前，請務必熟讀並了解 JavaScript 物件的觀念。

## 16.1 使用 Private/Public 觀念


請不要再使用 Local variable 與 Global variable 的寫法了，這在 HTML5+JavaScript 的世界裡行不通。以下是一個標準的錯誤示範：

~~~~~~~~
var count = 0;                    //GLOBAL

function incrementCounter() {
   count++;                       //GLOBAL
   return count;
}

function resetCounter() {
   var orig;                      //LOCAL
   
   orig = count;
   count = 0;
}
~~~~~~~~

這個例子只是讓大家瞧瞧 Local variable（區域變數）與 Global variable（全域變數）的寫法。現在，我們更上一層樓，把 Local variable 重構為 Private attribute，並把 Global variable 重構為 Public attribute。如下：

~~~~~~~~
var testModule = (function () {

	var counter = 0;					// Private
		
	return {
		incrementCounter: function() {	// Global
			return ++counter;
		},
		
		resetCounter: function() {		// Global
			counter = 0;
		}
	};
	
}) ();
~~~~~~~~

原本只是利用 function 關鍵字來定義一個類別（Class），現在更進一步以 Module 的方式將類別「封閉」。結果是，原本的區域變數 counter 變成了 Private attribute；原本的二個函數，現在成為了 Global method。將原本的程式碼，製作成 JavaScript module，這就是 Module pattern 的基本精神。

Closure 的目的，在避免全域變數的污染。變數污染，指的是自已的全域變數，被外部的程式碼做修改。以上述例子來看，如果 counter 沒有在 Closure 裡的話，其它地方的 JavaScript 就可以任意修改其值：因為 counter 是全域變數。為了避免這個問題，將程式碼 Closure 起來：只有 Closure 裡的程式碼，能修改 counter 變數。

外部程式碼，無法修改「封閉」程式碼裡的變數。概念上，以 module 將 attribute 與 method 進行封裝，這個關念就是「closure」。簡單說，將封閉的程式碼，放進 testModule 變數：testModule 成為一個模組。模組可被使用。

JavaScript 沒有明顯的物件導向語法，所以上面的一切都是觀念問題，而不是語法問題。軟體工程領域，很多時候都是在處理這樣的哲學思想；技術面只是整個軟體工程的一小部份。

所以，我們要把軟體開發當做一個創作過程，而不是寫程式（Coding）的過程。

## 1.6.2 Import Modules

jQuery 是很好用的程式庫，它也被製作成 module。不過，由於 jQuery 強的擴充性，讓 jQuery 擁有為數可觀的「plugins」。所以，jQuery 本身就是一個平臺（Platform），或是一個開發框架（Framework），再加上有如空氣般，jQuery 在 Web 相關領域真是無所不在，所以就有 jQuery pattern 的出現，後續將會介紹 jQuery pattern。

jQuery 在 JavaScript 領域已經自成一格。

jQuery 本身是一個 module，module 可以匯入（Import）使用。以下是一個範例：

~~~~~~~~
var testModule = (function (jQ) {

	var counter = 0;
	
	// Private
	function showHTML() {
		jQ(".header").html("<h1>" + counter + "</h1>");
	};
		
	return {
		incrementCounter: function() {
			return ++counter;
		},
		
		resetCounter: function() {
			counter = 0;
		},
		
		setCount: function(val) {
			counter = val;
		},
		
		showCount: function() {
			showHTML();
		}
	};
	
}) ($);
~~~~~~~~

---

Next: [1.7 jQuery Pattern](7-jquery.md)
