# 1.7 jQuery Pattern

jQuery pattern 就是開發 jQuery 插件（Plugin）的方式，所以技術上倒也沒有什麼學問。不過，jQuery pattern 有很高深的哲學道理，意思是說，在軟體工程領域裡，它創造了一個獨特的觀念。這個觀念就是 jQuery 知名的 "$"（Dollar sign），也就是「Selector」。

以下的例子，就是 jQuery pattern：

~~~~~~~~
$(“div#news”).html(“<h2>News Today</h2>”);
~~~~~~~~

從 jQuery 設計模式的角度思考，上述的寫法似乎不太好。從 jQuery 設計模式的角度思考，如果今天我們想要透過 WebSocket 與伺服器溝通，並且在一個 "div" 裡來顯示結果，應該怎麼設計呢？想法如下：

- 將 WebSocket 的功能寫成一個 function
- 將 JavaScript function 封裝成 module
- 在 jQuery 裡擴充新的函數，簡單說，就是製作一個 jQuery 插件（Plugin）

以下是一段程式碼樣板：

~~~~~~~~


~~~~~~~~

上述的寫法，採用暱名模組來實作。接者，再將程式碼儲存為 jquery.websocket.js。使用方法如下：

~~~~~~~~
<!DOCTYPE html>
<head>
<script type='text/javascript' src="./jquery.min.js">
<script type='text/javascript' src="./jquery.websocket.js">
</head>
<body>
<div id="message"></div>
　
<script type="text/javascript">  
$("#message").createWebSocket();
</script>
</body>
</html>
~~~~~~~~

這是採用 jQuery pattern 的寫法。這種做法可以良好地組織 HTML5 與 JavaScript 程式碼。此外，JavaScript 的 module 具備「Closure」的特性，即封閉性，可以避免一些衍生問題。

由於 HTML5+JavaScript 的設計思想，和 Natvie App 的作法有很大的不同，所以了解 HTML5+Javascript 的應用程式「如何設計」，會是重要的一門課。了解設計模式，除了能有效組織 HTML5+JavaScript 程式碼外，也能做出正確的設計。

---

Next: [1.8 選擇器模式](8-selector.md)
