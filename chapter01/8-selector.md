# 1.8 選擇器模式

我們在前一節使用 jQuery pattern 實作 WebSocket 呼叫時，實際上也同時運用了「選擇器模式（Selector Pattern）」。這是一種以語意為核心、效能為導向的 DOM 查詢與操作策略。

## 為什麼使用選擇器模式？

除了能讓程式碼更具可讀性與結構清晰，選擇器模式的最大價值在於 **效能優化**。

在現代瀏覽器的實作中，選擇器模式（尤其是 ID selector）通常可以比傳統 DOM API 提供更快的存取速度。有研究指出，選擇器模式甚至可達到 **數倍到十倍以上的查詢效能**。

以下為實作範例：

```html
<div id="message"></div>

<script>
  $("#message").createWebSocket();
</script>
```

上述簡短程式碼中，實際融合了三種設計模式：

- 使用 **Closure 模式** 封閉變數作用域（模擬 static class 行為）
- 使用 **選擇器模式** 呼叫 jQuery selector `$()`
- 使用 **Read/Write Div Pattern**，將訊息輸出到指定 DOM 元素

---

## 1.8.1 Selector 效能分級與選用建議

| Selector 類型 | 範例 | 效能 | 備註 |
|---------------|------|------|------|
| ID Selector | `#header` | ★★★★★ | 直接對應 DOM 索引，高效能 |
| Class Selector | `.box` | ★★★☆☆ | 需遍歷整棵樹，效率中等 |
| Tag Selector | `div` | ★★☆☆☆ | 易選中過多元素，效率偏低 |
| Descendant Selector | `div .content` | ★☆☆☆☆ | 多層結構解析，效率最差 |
| Attribute Selector | `input[type=text]` | ★☆☆☆☆ | 複雜解析，適用於特定需求 |

**開發建議：** 儘量使用 ID 與 Class 為主的 selector，避免使用嵌套與屬性選擇器做為常態邏輯基礎。

---

## 1.8.2 鏈式操作與語法語感

jQuery 的選擇器不只是一種 DOM 查詢機制，它還支援鏈式操作語法：

```javascript
$('.item')
  .addClass('active')
  .fadeIn()
  .html('Ready');
```

這種語法設計讓我們可以把一連串操作串接起來，像是語言的動詞堆疊，使程式更貼近人類邏輯：**誰（selector）做什麼（method）**。

這樣的設計稱為「語意流程式語法（semantic fluent syntax）」，有以下優勢：

- 減少中斷與中介變數
- 提高閱讀流暢性
- 模擬人類語言結構（主詞 + 動作鏈）

> 選擇器是語意流程的起點，鏈式操作是語言風格的延伸。

---

## 1.8.3 jQuery Selector 與原生 API 對照表

| jQuery 語法 | 對應原生 API |
|-------------|------------------|
| `$('#id')` | `document.getElementById('id')` |
| `$('.class')` | `document.querySelectorAll('.class')` |
| `$('div')` | `document.getElementsByTagName('div')` |
| `$(this)` | `event.target`（事件中使用） |

這張表有助於開發者理解 jQuery 封裝背後實際呼叫的 DOM API，也利於後續過渡至框架或使用原生語法開發。

---

## 1.8.4 Plugin 製作流程（三步驟）

### Step 1：新增函式到 `$.fn`

```javascript
$.fn.hello = function() {
  // 插件主邏輯
};
```

### Step 2：使用 Closure 封裝模組

```javascript
(function($) {
  $.fn.hello = function() {
    // 插件主邏輯
  };
})(jQuery);
```

### Step 3：作為獨立模組匯入

將上述程式儲存為 `jquery.foo.js`，並在 HTML 中使用：

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="./jquery.min.js"></script>
  <script src="./jquery.foo.js"></script>
</head>
<body>
  <div class="content"></div>

  <script>
    $(".content").hello();
  </script>
</body>
</html>
```

---

## 小結：Selector 是語言的入口，不只是 DOM 的指標

選擇器的本質，是「指定語意操作的目標」，這不僅讓我們避開低效能的 DOM 操作，也讓程式更貼近自然語言思維。這樣的模式，是語言層級的 API 設計，不只是技術結構，更是一種開發哲學：

> 選擇器不是查 DOM，而是呼叫語意結構。它是語言層的第一層 API。

---

Next: [1.9 Prototype Pattern](9-prototype.md)
