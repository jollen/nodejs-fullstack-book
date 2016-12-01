# 1.8 選擇器模式

我們在實作 Web Socket 連線生成時，利用了 jQuery pattern，這是一種選擇器模式。為什麼要使用選擇器模式，除了程式碼的組織較好外，另一個原因就是效能。事實上，讓程式碼組織更良好是次要的理由，真正的、主要的、最重要的原因是：使用選擇器方式可以讓 JavaScript 程式碼效能更好。

根據不同瀏覽器的實作，選擇器模式可以達到超過十倍以上的效能。再回顧一次上節的寫法：

~~~~~~~~
<div id="message"></div>

<script type="text/javascript">  
$("#message").createWebSocket();
</script>
~~~~~~~~

總計利用了三個模式：

- 以 Closure 模式將類別封閉，這與 static class 有關係，在這裡先不做討論
- 使用選擇器模式，範例採用目前最流行的 jQuery selector "$"
- Read/Write Div Pattern

選擇器模式的效率取決於瀏覽器本身的實作，不過，以選擇器模式來代替直接存取 DOM，一般相信是最好的做法。因此，現代的 JavaScript 程式庫，幾乎都利用選擇器模式來實作（jQuery 一直都是最佳例子）；當我們實作自已的 JavaScript 程式庫時，也該善用選擇器模式。

典型的選擇器模式，是直接呼叫 DOM 的 API：

~~~~~~~~
document.querySelector(“#header”);
~~~~~~~~

不過，使用 jQuery 的選擇器「$」是目前的主流做法。

## 1.8.1 jQuery Pattern 實作 (jQuery 插件開發)

簡單來說，jQuery pattern 就是撰寫 jQuery Plugins。要開發 jQuery 的插件，是相當輕鬆愉快的工作，這都歸功於 jQuery 的優良架構。

### Step 1：加入新增函數

在 $.fn 物件裡，加入新的函數屬性。範例：

~~~~~~~~
$.fn.hello = function() {
	// your code here
};
~~~~~~~~

### Step 2：將程式碼 Closure

~~~~~~~~
(function($) {
	$.fn.hello = function() {
		// your code here
	};
}) ($);
~~~~~~~~

為什麼要將程式碼 Closure（封閉）的原因，前文已做過說明。

### Step 3：儲存為獨立檔案使用

將上述程式碼，儲存為獨立檔案，例如：jquery.foo.js，並在 HTML5 裡使用。例如：

~~~~~~~~
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>

    <script type='text/javascript' src="./jquery.min.js"></script>
    <script type='text/javascript' src="./jquery.foo.js"></script>
</head>

<body>
	<div class="content">
	</div>
<script>
$(".content").hello();
</script>
</body>
</html>
~~~~~~~~

上述的做法，是將自已的實作，設計成 jQuery Plugin 的形式。制作 jQuery 插件是非常簡單的，只要以上三個步驟即可完成。

---

Next: [1.9 Prototype Pattern](9-prototype.md)
