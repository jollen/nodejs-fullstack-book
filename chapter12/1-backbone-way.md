## 12.1 Backbone Way

現代的 Web App 開發，是以 Web Service 為主軸，以 API 的方式整合 Client（Device）與 Server。API 為主軸的架構中，又以 RESTful 最受到矚目，RESTful 將可能成為是未來的 Web Service 主流架構。RESTful 易於 Web Service 與不同裝置的整合，例如：Desktop、Phone、Tablet 與 TV 等

前一個章節，我們學到幾個重要觀念：

* 以 JSON 做為主要的資料交換格式
* Client 端使用樣板（Client-side HTML Template）
* Key-Value Paris

有了這幾個觀念後，就能開始導入 Backbone 框架，並且將 nodejs-chat 發展的更完善。首先，先為 */discussion/:message* API 製作一個輸入介面，並且採用 Backbone 框架來呼叫 REST API。

### Step 1：安裝 Underscore 與 Backbone

先到 Underscore 網站下載 *underscore-min.js*：

~~~~~~~~
http://underscorejs.org/underscore-min.js
~~~~~~~~

再到 Backbone 網站下載 *backbone-min.js*：

~~~~~~~~
http://backbonejs.org/backbone-min.js
~~~~~~~~

將上述檔案存放至 nodejs-chat 專案的 *client/javascripts/* 目錄下。Backbone 必須與 Underscore 搭配使用。

### Step 2：修改 *chat.html*

加入以下二行：

~~~~~~~~
<script type='text/javascript' src="javascripts/underscore-min.js"></script>
<script type='text/javascript' src="javascripts/backbone-min.js"></script>
~~~~~~~~

將 Underscore 與 Backbone 加入 Frontend 頁面。幾個重要事項：

* 順序不能改變，必須先引入 Underscore 後，再引入 Backbone 才不會出錯
* Backbone 是一個 MVC 框架，其中 View 的部份由 Underscore 支援

### Step 3：重新撰寫 *client/javascripts/app.js*

將原本 *client/javascripts/app.js* 裡的內容全數刪除，並加入以下程式碼：

~~~~~~~~
/**
 * SETUP
 **/
  var app = app || {};

/**
 * MODELS
 **/


/**
 * VIEWS
 **/
  app.MessageView = Backbone.View.extend({
    events: {
    },
  });

/**
 * BOOTUP
 **/
  $(document).ready(function() {
    app.messageView = new app.MessageView();
  });
~~~~~~~~

這是撰寫 Backbone 的起點，幾個重要觀念解說如下：

* Backbone 是一個 MVC 框架，一開始先定義 Model 與 View
* Model 就是「表示資料的模型」，也就是將會顯示在畫面上的資料
* View 的部份將負責處理 Template 與 Model 的對應，必須先了解 Key-Value Paris 觀念
* View 的部份，也負責處理控制的部份，例如：Button 的 click 事件

### Step 4：文字輸入欄位與按紐

在 *chat.html* 裡加入文字輸入欄位與按紐。使用到 Bootstrap 的 [Grid System][1] 與 [Buttons][2] 樣式。

[1]: http://getbootstrap.com/css/#grid "Grid system"
[2]: http://getbootstrap.com/css/#buttons "Buttons"

以下是 *chat.js* 的完整內容：

{title="client/chat.html"}
~~~~~~~~
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
~~~~~~~~

重點說明如下：

* 第 19 行：給輸入欄位的 *name* 是 "message"，後續將以 jQuery 選擇器搭配 *name* 屬性來找出這個物件
* 第 22 行：額外給予這個 <button> 元件一個 class name 'btn-message-save'
* 不使用典型的 <form> 表單方式來處理「送出」的動作，將使用 Backbone 的事件處理框架

### Step 5：Backbone.View 事件處理

對初學者來說，Backbone 似乎是一個堅深難懂的 MVC 框架，但如果從觀念的角度來討論，Backbone 不但變的簡單易學，而且也能感受到它的強大威力。筆者認為，學習 Backbone 的第一個步驟，應該是了解 [Backbone.View.extend][3] 的觀念。

在 *chat.html* 裡有一個 <div> 區塊，包含輸入欄位與按紐，這裡是單純的 HTML5 語法，在瀏覽器裡開啟後，可以看到圖 12.1 的畫面。

![圖 12-1 chat.html 瀏覽畫面](images/figure-12_1.png)

按下按紐後，要進行一些動作，這個部份稱為 Logic。因此，View 可以再細分為二個觀念：

* View：單純眼睛看到的畫面
* Logical View：隱藏在畫面下的控制邏輯，通常是程式碼的部份

簡單說，[Backboone.View][4] 就是用來表示 Logical View 的元件。更白話一點，就是 View 裡面的程式碼。

[3]: http://backbonejs.org/#View-extend "Backbone.View.extend()"
[4]: http://backbonejs.org/#View "Backbone.View"

所以，現在我們想要為以下的 <div> 區塊，加入 Logic：

~~~~~~~~
	<div class="row">
		<div class="col-md-9">
			<input class="form-control" type="text" name="message">
		</div>
		<div class="col-md-3">
			<button class="btn btn-large btn-primary btn-message-save">送出</button>
		</div>
	</div>
~~~~~~~~

就要將這個區塊，表示成 Backbone.View。先為這個區塊加入名字：

~~~~~~~~
	<div class="row" id="message-save">
		<div class="col-md-9">
			<input class="form-control" type="text" name="message">
		</div>
		<div class="col-md-3">
			<button class="btn btn-large btn-primary btn-message-save">送出</button>
		</div>
	</div>
~~~~~~~~

加入「id="message-save"」表示這個區塊叫做 "message-save"。接著修改 *client/javascripts/app.js* 如下：

~~~~~~~~
1  app.MessageView = Backbone.View.extend({
2    el: '#message-save',
3    events: {
4        'click .btn-message-save': 'save'
5    },
6    save: function() {
7        alert("Saving...");
8    }
9  });
~~~~~~~~

重要觀念說明：

* 第 1 行：呼叫 *Backbone.View.extend()* 來宣告（即擴充出）一個新的 Logical View，名字叫做 *MessageView* 並存放於 *app* 物件裡
* 第 2 行：*el* 欄位是 "Element" 的意思，指定這個 Logical View 的 View
* 第 3 行：*events* 欄位用來定義 Logical View 裡的事件觸發函數
* 第 4 行：當 *.btn-message-save* 元件的 'click' 事件觸發時，呼叫 *save()* 函數，*.btn-message-save* 是一個 Button，使用者按下 Button 時，*save()* 函數就會被呼叫；Backbone.View 的做法，取代了典型的 <form> 與 Submit Button
* 第 7 行：測試程式碼，按下 Button 會出現圖 12.2 的畫面

![圖 12-2 測試畫面](images/figure-12_2.png)


### Step 6：呼叫 REST API

最後一個步驟：

* 讀取輸入欄位的值
* 呼叫 */discussion/:message* 儲存訊息

使用 jQuery 來呼叫 REST API 比較容易理解，目前先暫時採用這個寫法。實作上述的 *save()* 函數如下：

~~~~~~~~
  app.MessageView = Backbone.View.extend({
    el: '#message-save',
    events: {
        'click .btn-message-save': 'save'
    },
    save: function() {
        var message = $('input[name="message"]').val();

        $.ajax({
            url: '/discussion/' + message,
            type: 'POST',
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                alert("已儲存成功");
            },
            complete: function (data, textStatus, jqXHR) {
            }
        });
    }
  });
~~~~~~~~

測試時，請記得透過 Web Server 方式來開啟 *chat.html*，直接開啟「檔案」的話，*jQuery.ajax()* 將無法成功呼叫 REST API。可以修改 Express 的主程式－*app.js*，將 "static" 的目錄改為 *client/*：

~~~~~~~~
app.use(express.static(path.join(__dirname, 'client')));
~~~~~~~~

並瀏覽以下網址：

~~~~~~~~
http://localhost:3000/chat.html
~~~~~~~~

輸入訊息 "hello" 並按「送出」後，可以看到以下的 Node.js Console 訊息：

~~~~~~~~
CREATE: hello
POST /discussion/hello 200 4ms
~~~~~~~~

雖然測試後沒有什麼問題，不過感覺好像只是把 jQuery 的程式碼，用 Backbone 框起來而已。當然，這還不是正確的 Backbone 做法；所以，接下來將開始重構 *save()* 程式碼。