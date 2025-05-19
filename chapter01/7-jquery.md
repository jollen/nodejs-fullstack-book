# 1.7 jQuery Pattern

在軟體工程領域裡，jQuery 創造了一個獨特的觀念：知名的 "$"（Dollar sign），也就是「Selector」。

而 jQuery Pattern 指的是撰寫 jQuery 插件（plugin）的一種標準設計方式。雖然技術上它看起來只是語法包裝，但在軟體工程觀點中，它代表了一種「可擴充平台」的設計哲學。

其核心概念是：

- 將功能封裝為模組
- 將模組掛載到 `$` 的原型鏈上（即 `$.fn`）
- 使用者得以透過直覺的鏈式呼叫來使用擴充功能

例如，這是最常見的 jQuery pattern 用法：

```javascript
$("div#news").html("<h2>News Today</h2>");
```

這行語法背後的哲學是：將 HTML DOM 的操作，封裝成簡潔的 API，讓程式碼結構更具可讀性與表達性。

---

## 1.7.1 模組化 + 插件註冊 = jQuery Pattern

假設我們希望透過 WebSocket 與伺服器互動，並將訊息即時顯示在某個 `div` 上，我們可以：

1. 建立一個 WebSocket 功能模組
2. 將它以插件方式掛載至 jQuery
3. 使用 `$().createWebSocket()` 來啟用該功能

### [ES5] Plugin 設計範例

```javascript
1 (function ($) {
2   $.fn.createWebSocket = function () {
3     if ("WebSocket" in window) {
4       alert("WebSocket is supported by your Browser!");
5       var ws = new WebSocket("ws://<your-ip-address>:8888/start");
6
7       ws.onopen = function () {
8         // 連線開啟
9       };
10
11      ws.onmessage = function (evt) {
12        // 收到訊息
13      };
14
15      ws.onclose = function () {
16        // 關閉連線
17      };
18
19      ws.onerror = function () {
20        // 發生錯誤
21      };
22    } else {
23      alert("WebSocket NOT supported by your Browser!");
24    }
25  };
26 })($);
```

### [ES6] 重構寫法

```javascript
1 (($) => {
2   $.fn.createWebSocket = function () {
3     if ('WebSocket' in window) {
4       alert('WebSocket is supported by your Browser!');
5       const ws = new WebSocket(`ws://localhost:8888/start`);
6
7       ws.onopen = () => console.log('WebSocket opened');
8       ws.onmessage = (evt) => {
9         console.log(`Received: ${evt.data}`);
10        this.html(`<p>${evt.data}</p>`);
11      };
12      ws.onclose = () => console.log('WebSocket closed');
13      ws.onerror = (err) => console.error('WebSocket error:', err);
14    } else {
15      alert('WebSocket NOT supported by your Browser!');
16    }
17  };
18})(jQuery);
```

### 差異說明表

| 差異點 | ES5 寫法 | ES6 重構 | 說明 |
|--------|----------|-----------|------|
| 變數宣告 | `var` | `const` | 明確不可變語意 |
| 函式 | `function` | arrow function | 保留 `this`，語法簡潔 |
| 字串操作 | 拼接字串 | template literal | 可讀性提升 |

---

## 1.7.2 插件開發規則與範式

良好的 jQuery 插件，應該滿足以下條件：

- 支援 **鏈式操作**（return `this`）
- 支援 **多元素處理**（透過 `this.each()`）
- 可設定預設參數與使用者覆寫（使用 `$.extend()`）

### 範例：帶參數的簡易插件

```javascript
$.fn.sayHi = function (options) {
  const settings = $.extend({
    message: 'Hi there!'
  }, options);

  return this.each(function () {
    $(this).text(settings.message);
  });
};
```

呼叫方式：

```javascript
$('div.welcome').sayHi({ message: 'Hello, world!' });
```

---

## 1.7.3 與現代框架設計的連結

jQuery pattern 不只是語法技巧，更啟發了許多現代框架設計中的「擴充點」概念：

| jQuery Pattern 概念 | 現代框架中的對應 | 範例 |
|--------------------|--------------------|------|
| Plugin 封裝 | Vue component、React hook | `useWebSocket()` |
| 鏈式操作 | RxJS、Lodash FP | `pipe()`、`chain()` |
| 原型擴充 | Vue.directive、Class.prototype | `Vue.directive()` |

---

> jQuery Plugin Pattern 是 JavaScript 生態系中第一批真正「框架化」的設計行為。它不只是方便使用，更是一種工程封裝邏輯的啟蒙。

---

Next: [1.8 選擇器模式](8-selector.md)
