# 4.5 使用 *this* 物件

接下來，要解決 4.4 節範例中的一個 Bug。解掉這個 Bug 後，可以學到「this」的重要觀念。

```html
...
20      ws.onmessage = function (evt) 
21      { 
22         var received_msg = evt.data;
23         this.html(received_msg);
24      };
...
```

上述 4.4 節範例中，第 23 行的 *this* 並不是網頁裡的 'message' 區塊。這和我們想達成的目的不同。所以執行 client.html 並無法看到我們想像中的結果。

上述範例第 23 行中所使用的 this 物件，是 *WebSocket* 類別的實例化，而不是 'message' 區塊。這與我們想實作的結果不同。原本我們期望可以直接使用 *this* 將訊息直接放到 'message' 區塊裡面，但問題出在哪裡？

原來，第 20 行的函數，其實是一個物件。這就是 JavaScript 非常重要的觀念之一：函數即物件。意思是：

* 第 20 行定義了一個 function 給 *onmessage*，而 function 就是物件，所以 *onmessage* 是一個物件
* 因此，在 23 行裡的 *this* 其實是上述的 *onmessage* 物件

要修正這個問題並不難，我們只要想清楚，在程式碼什麼位置，*this* 才是表示 'message' 這個區塊物件實例化即可。

## ✅ 修正版本（ES5 寫法）

```html
<!DOCTYPE html>
<head>
  <script type='text/javascript' src="./jquery.min.js"></script>
</head>
<body>
  <div id="message"></div>

  <script type="text/javascript">
    (function($) {
      $.fn.createWebSocket = function () {
        var div = this; // 🔑 Save this for binding

        if ("WebSocket" in window) {
          alert("WebSocket is supported by your Browser!");

          var ws = new WebSocket("ws://localhost:8888/start");
          ws.onopen = function() {
            // ws.send("Message to send");
          };
          ws.onmessage = function (evt) {
            var received_msg = evt.data;
            div.html(received_msg);
          };
          ws.onclose = function() {
            div.html("<h1>onclose</h1>");
          };
          ws.onerror = function() {
            div.html("<h1>onerror</h1>");
          };
        } else {
          alert("WebSocket NOT supported by your Browser!");
        }
      };
    })($);

    $("#message").createWebSocket();
  </script>
</body>
</html>
```

## ✅ 對應 ES6 重構版本

```javascript
(() => {
  $.fn.createWebSocket = function () {
    const div = this;

    if ("WebSocket" in window) {
      alert("WebSocket is supported by your Browser!");

      const ws = new WebSocket("ws://localhost:8888/start");

      ws.onopen = () => {
        // ws.send("Message to send");
      };

      ws.onmessage = (evt) => {
        const received_msg = evt.data;
        div.html(received_msg);
      };

      ws.onclose = () => {
        div.html("<h1>onclose</h1>");
      };

      ws.onerror = () => {
        div.html("<h1>onerror</h1>");
      };
    } else {
      alert("WebSocket NOT supported by your Browser!");
    }
  };
})();

$("#message").createWebSocket();
```

## 語法差異說明

| ES5 語法          | ES6 對應寫法         | 差異解釋                      |
| --------------- | ---------------- | ------------------------- |
| `var`           | `const` / `let`  | 更安全的變數定義方式                |
| `function() {}` | `() => {}`       | 箭頭函數自動綁定外層 `this`，更符合語意直覺 |
| `+` 字串拼接        | Template Literal | `` `${var}` `` 更簡潔清晰      |

---

## Binding 'this'

上述的觀念，又稱為 Binding *this*。有 JavaScript Framework 開發經驗的開發者，都知道「binding *this*」的重要性。這可是 JavaScript 開發模式的靈魂。

所以，我們用 `var div = this`（ES6 為 `const div = this`）的方式，儲存該 jQuery DOM 實體，並交由閉包後續呼叫，確保 *this* 指向正確。這是避免 *this* 被事件綁定後改寫的實務解法。

這一節示範的「Save this」技巧，也等於替後續的所有事件處理程序「預設好語意範圍」。這正是語意接口的基本功。

---

## 使用 async 的延伸練習

雖然 WebSocket 本身是以事件驅動的模式為主（如 `onopen`、`onmessage` 等），但在某些情境中，仍然能結合 `async/await` 模式，搭配 `Promise` 來強化流程控制。例如：透過 async 封裝 WebSocket 的初始化階段，可讀性更高，對 async/await 熟悉的開發者來說，也更符合現代語言風格。

### 示範：用 async 初始化 WebSocket

```javascript
const createWebSocketAsync = async (url, protocol) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url, protocol);

    ws.onopen = () => resolve(ws);
    ws.onerror = (err) => reject(err);
  });
};

(async () => {
  try {
    const ws = await createWebSocketAsync("ws://localhost:8888/start", ["echo-protocol"]);
    console.log("WebSocket 已連線");
    
    ws.onmessage = (evt) => {
      console.log("收到訊息：", evt.data);
    };
  } catch (err) {
    console.error("WebSocket 發生錯誤：", err);
  }
})();
```

### 延伸說明

* 將原本使用事件註冊的方式，改為使用 `async/await` 封裝連線行為
* 可以提升模組間的語意整合，例如等待連線成功後再初始化 UI 或發送資料
* 雖然仍需用到事件來處理訊息，但結構上可與 `async function` 結合更靈活地控制初始化與錯誤處理流程

這種方式非常適合在更大型的應用程式中推行，讓事件式架構與非同步邏輯並存，提升開發流暢度與可測試性。

---
