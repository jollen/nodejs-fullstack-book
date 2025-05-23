## 12.1 Backbone Way

現代的 Web App 開發，是以 Web Service 為主軸，以 API 的方式整合 Client（Device）與 Server。其中又以 RESTful 架構最受到矚目，預期將成為 Web Service 的主流形式。RESTful 架構具備簡潔的 URL 設計與標準化的 HTTP 方法，方便各種裝置整合應用，例如：Desktop、Phone、Tablet 與 TV 等。

在前一章節中，我們學到幾個重要觀念：

* 以 JSON 做為主要的資料交換格式
* Client 端使用樣板（Client-side HTML Template）
* Key-Value Pairs

有了這些觀念之後，就能開始導入 Backbone 框架，並將 nodejs-chat 專案進一步完善。首先，為 `/discussion/:message` API 製作一個輸入介面，並採用 Backbone 來呼叫 REST API。

本章節採用 jQuery 的 `$.ajax()` 呼叫方式，是為了讓初學者更容易掌握資料流程。實務上亦可改用原生 `fetch()` 或第三方套件如 `axios`，概念相同。

### Step 1：安裝 Underscore 與 Backbone

先到 Underscore 網站下載 `underscore-min.js`：

[http://underscorejs.org/underscore-min.js](http://underscorejs.org/underscore-min.js)

再到 Backbone 網站下載 `backbone-min.js`：

[http://backbonejs.org/backbone-min.js](http://backbonejs.org/backbone-min.js)

將上述檔案放入 nodejs-chat 專案的 `client/javascripts/` 目錄下。Backbone 必須搭配 Underscore 使用。

### Step 2：將函式庫正確掛載至頁面

在 `chat.html` 中加入以下兩行：

```html
<script type='text/javascript' src="javascripts/underscore-min.js"></script>
<script type='text/javascript' src="javascripts/backbone-min.js"></script>
```

幾個重要事項：

* 載入順序不能顛倒，必須先引入 Underscore，然後才是 Backbone，否則會出現錯誤
* Backbone 是一個 MVC 架構，其中 View 的部分由 Underscore 提供支援，像是 `_.template()` 函式

### Step 3：重新撰寫 `client/javascripts/app.js`

將原本 `client/javascripts/app.js` 裡的內容全數刪除，並加入以下程式碼：

```javascript
// ES5
var app = app || {};

app.MessageView = Backbone.View.extend({
  events: {},
});

$(document).ready(function() {
  app.messageView = new app.MessageView();
});
```

```javascript
// ES6
const app = app || {};

app.MessageView = Backbone.View.extend({
  events: {},
});

$(document).ready(() => {
  app.messageView = new app.MessageView();
});
```

| 語法差異     | ES5   | ES6     |
| -------- | ----- | ------- |
| 變數宣告     | `var` | `const` |
| ready 寫法 | 傳統函式  | 箭頭函式    |

這是撰寫 Backbone 的起點，幾個重要觀念如下：

* Backbone 採用 MVC 架構，一開始先定義 Model 與 View
* Model 表示資料的模型，也就是畫面上會顯示的資料
* View 處理 Template 與 Model 的對應，需熟悉 Key-Value Pair 的觀念
* View 也負責處理事件控制，例如 Button 的 click 事件

### Step 4：文字輸入欄位與按紐

在 `chat.html` 裡加入文字輸入欄位與按鈕。使用 Bootstrap 的 Grid System 與 Button 樣式。

```html
 1 <!DOCTYPE html>
 2 <html>
 3 <head>
 4 <link rel="stylesheet" href="stylesheets/bootstrap.min.css" />
 5 
 6 <script type='text/javascript' src="javascripts/jquery.min.js"></script>
 7 <script type='text/javascript' src="javascripts/bootstrap.min.js"></script>
 8 <script type='text/javascript' src="javascripts/jquery.websocket.js"></script>
 9 <script type='text/javascript' src="javascripts/underscore-min.js"></script>
10 <script type='text/javascript' src="javascripts/backbone-min.js"></script>
11 <script type='text/javascript' src="javascripts/app.js"></script>
12 </head>
13 
14 <body>
15 
16 <div class="container">
17 	<div class="row">
18 		<div class="col-md-9">
19 			<input class="form-control" type="text" name="message">
20 		</div>
21 		<div class="col-md-3">
22 			<button class="btn btn-large btn-primary btn-message-save">送出</button>
23 		</div>
24 	</div>
25     <div class="row clearfix">
26         <div class="col-md-12 column">
27             <h3>
28                 nodejs-chat
29             </h3>
30             <div id="message"></div>
31         </div>
32     </div>
33 </div>
34 
35 </body>
36 </html>
```

重點說明如下：

* 第 19 行：輸入欄位使用 name="message"，後續以 jQuery 選取此欄位
* 第 22 行：按鈕加上 class 名稱 `btn-message-save`
* 不使用 `<form>` 方式提交，而改用 Backbone 的事件處理機制

### Step 5：Backbone.View 事件處理

Backbone 對初學者而言，看似困難，但若從觀念切入，其實非常有系統。學習 Backbone 的第一步，是理解 `Backbone.View.extend()` 的概念。

在 `chat.html` 中的輸入與按鈕區塊，是單純的 HTML。若要加入互動邏輯（例如按鈕點擊），就需要 View 的協助。按下按紐後，要進行一些動作，這個部份稱為 Logic。因此，View 可以再細分為 2 個觀念：

* View：單純眼睛看到的畫面
* Logical View：隱藏在畫面下的控制邏輯，通常是程式碼的部份簡單說，

Backboone.View 就是用來表示 Logical View 的元件。更白話一點，就是 View 裡面的程式碼。所以，現在我們想要為以下的區塊，加入 Logic：

```
	<div class="row">
		<div class="col-md-9">
			<input class="form-control" type="text" name="message">
		</div>
		<div class="col-md-3">
			<button class="btn btn-large btn-primary btn-message-save">送出</button>
		</div>
	</div>
```

就要將這個區塊，表示成 Backbone.View。先為這個區塊加入名字：

```
	<div class="row" id="message-save">
		<div class="col-md-9">
			<input class="form-control" type="text" name="message">
		</div>
		<div class="col-md-3">
			<button class="btn btn-large btn-primary btn-message-save">送出</button>
		</div>
	</div>
```

加入「id="message-save"」表示這個區塊叫做 "message-save"。接著修改 *client/javascripts/app.js* 如下：

```
// ES6
1 app.MessageView = Backbone.View.extend({
2  el: '#message-save',
3  events: {
4    'click .btn-message-save': 'save'
5  },
6  save() {
7    alert("Saving...");
8  }
9 });
```

重要觀念說明：

* 第 1 行：呼叫 *Backbone.View\.extend()* 來宣告（即擴充出）一個新的 Logical View，名字叫做 *MessageView* 並存放於 *app* 物件裡
* 第 2 行：*el* 欄位是 "Element" 的意思，表示這個 View 綁定的 DOM 元素
* 第 3 行：*events* 宣告事件與處理函式的對應關係
* 第 4 行：是當按鈕點擊後會呼叫的邏輯，當 *.btn-message-save* 元件的 'click' 事件觸發時，便呼叫 *save()* 函數，*.btn-message-save* 是一個 Button，使用者按下 Button 時，*save()* 函數就會被呼叫；Backbone.View 的做法，取代了典型的 與 Submit Button

### Step 6：呼叫 REST API

最後一個步驟：

* 讀取網頁上輸入欄位的值
* 呼叫 REST API /discussion/\:message 以儲存聊天訊息

對初學者來說，由於使用 jQuery 來呼叫 REST API 較為簡單理解，因此先暫時採用此寫法。實作上述的 *save()* 函數如下：最後一步是整合輸入欄位與 REST API：

```javascript
save() {
  const message = $('input[name="message"]').val();
  $.ajax({
    url: `/discussion/${message}`,
    type: 'POST',
    dataType: 'json',
    success(data) {
      alert('已儲存成功');
    },
    complete() {}
  });
}
```

測試時，需透過 Web Server 開啟 `chat.html`。測試前，先修改 Express 主程式－*app.js*，將 "static" 的目錄改為 *client/*：

```javascript
app.use(express.static(path.join(__dirname, 'client')));
```

接著，使用瀏覽器瀏覽網頁：

```
http://localhost:3000/chat.html
```

輸入 "hello" 並送出後，Console 將顯示：

```
CREATE: hello
POST /discussion/hello 200 4ms
```

目前雖能運作，但 `save()` 仍使用 jQuery，並非 Backbone 原生方式。我們將在下一節中重構此段，導入真正的 Model 邏輯。
