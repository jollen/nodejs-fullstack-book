## 11.2 認識 Key-Value Pairs 觀念

Backbone.js 如何解決上一節 Step 4 所提到的問題呢？分述如下：

* 宣告 HTML5 Template：Backbone.js 內建 Underscore，我們可以使用 Underscore 來宣告 Template
* 將 JSON「套用」到 Template：使用 Key-Value Pairs 來做對應

JSON 的資料格式，又稱為是 "Key-Value Pairs" 的格式，例如：

~~~~~~~~
{ "name": "jollen"}
~~~~~~~~

與 Key-Value Pairs 的關係說明如下：

* *name* 是 "Key"，又可視為「變數」
* *jollen* 是 "Value"，也就是 *name* 這個 Key 的值

所以，在製作 Template 時，只要把 "Key" 當做變數的觀念，到時就可以直接「對應」了。例如：

~~~~~~~~
<div>
 <p>$name</p>
</div>
~~~~~~~~

並且有一份 JSON 資料如下：

~~~~~~~~
[
	{ "name": "Peter"},
	{ "name": "Paul"},
	{ "name": "John"}
]
~~~~~~~~

此時，Template Engine 就能直接把 Template 和 JSON 對應成以下的結果：

~~~~~~~~
<div>
 <p>Peter</p>
 <p>Paul</p> 
 <p>John</p>
</div>
~~~~~~~~

這麼方便的做法，是導入 Backbone.js 的第一個目的。這種將以 JSON 來表示 Key-Value Pairs 資料，並將 Key-Value Pairs 對應到 HTML5 Template 的觀念，就是一個被稱為「 ViewModel」的觀念。ViewModel 能解決的問題不止於此，這只是 View Model 觀念的一部份。

ViewModel 可以強化 MVC 模式中的 C（Controller），因此把它叫做 MVVM 模式。[MVVM 模式][4]是由微軟所提出的新概念，MVC & MVVM 也經常被放在一起討論。

[4]: http://en.wikipedia.org/wiki/Model_View_ViewModel "MVVM"

從軟體工程的角度，把 MVC 架構模式加入了 Key-Value Pairs 觀念，可以達到以下目的：

* 讓 MVC 模式更為完整
* 用 View Model 來串連 Model 與 View，而不是用 Controller
* 如上，儘可能讓 View 與程式碼無關，又稱為 Code Ignorance
* 如上，讓 UI 設計是 Code Ignorance：讓做 UI 不用寫程式

簡單說，從上述的例子可以發現，UI 設計師只需要把 HTML5 Template 設計好即可，不需要寫程式，就可以將 Server 回傳的資料，顯示在畫面上。