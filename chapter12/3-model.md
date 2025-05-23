## 12.3 認識 Backbone.Model

[Backbone.Model](http://backbonejs.org/#Model) 是 Backbone 初學者的第三關。Backbone.Model 用來表示（存放）資料，這是一個「資料模型」的類別。接下來以幾個步驟，重新實作第 11 章的「顯示留言」功能。

### Step 1：宣告 Model

有了 Backbone.Model 後，才能表示資料。修改 *client/javascripts/app.js* 加入以下程式碼：

```javascript
  app.Message = Backbone.Model.extend({
    defaults: {
      success: false,
      errors: [],
      errfor: {},

      message: 'No message yet.'
    }
  });
```

說明如下：

* 第 1 行：使用 *Backbone.Model.extend()* 宣告（擴充）一個新的 Data Model，命名為 *Message* 並儲放於 *app* 物件
* 第 2 行：使用 *defaults* 為這個 Model 定義預設的資料：

  * *success*：Backbone 框架所定義的欄位，目前暫不使用
  * *errors*：Backbone 框架所定義的欄位，目前暫不使用
  * *errfor*：Backbone 框架所定義的欄位，目前暫不使用
  * *message*：自行定義的欄位，用來儲存訊息

### Step 2：宣告 Template

原本的做法，將程式碼與 HTML5 語法混在一起，非常不好維護。現在改用 Underscore 與 Backbone 後，就可以使用 Template 的方式。以下是原本的實作：

```javascript
const dataMapping = function(data) {
    for (let i = 0; i < data.length; i++) {
        const htmlCode =
            "<div class=\"alert alert-dismissable alert-info\">"
            + "     <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">×</button>"
            + "     <h4>jollen</h4>"
            + data[i].message
            +"</div>";

        $('#message').append(htmlCode);
    }
}
```

將 HTML5 語法的部份，獨立出來，並且宣告成 Template。修改 *chat.html*，加入以下片段：

```html
<script type='text/template' id='tmpl-message'>
	<div class="alert alert-dismissable alert-info">
		<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
			×</button>
		<h4>jollen</h4>
		<%= message %>
	</div>
</script>
```

使用 `<script>` 標籤宣告 Template：

* "type" 必須定義為 "text/template"
* 給予一個名字，上述範例將 Template 命名為 "tmpl-message"
* 使用 `<%= *variable-name* %>` 來取用變數值，變數名稱在上述的 Model 裡定義，Underscore 會將 Model 的變數與 Template 做對應，並且用變數值取代

很明顯，Model 與 Template 是一個「對應關係」，這裡有幾個重要的技術觀念：

* ViewModel：這個對應關係就是 ViewModel 的觀念
* Key-Value Pairs：Model 裡的資料，要用 Key-Value Pairs 的格式表示，JSON 就是 Key-Value Pairs 的格式
* Template：將 Model 裡的資料，顯示到畫面上，是透過 Template，並且是由 Underscore 來完成
* Code Ignorance：如上，顯示資料到畫面上，不需要寫程式；對設計師來說，只要修改 Template 即可，不會有程式碼的困擾

### Step 3：將 Model 加入 View

修改 *client/javascripts/app.js* 加入以下程式碼：

```javascript
    initialize: function() {
        this.model = new app.Message();
        this.template = _.template($('#tmpl-message').html());

        this.model.bind('change', this.render, this);
        this.render();
    },

    render: function() {
        const data = this.template(this.model.attributes);

        this.$el.find('#message').html(data);
        return this;
    },

    save: function() {
        const message = this.$el.find('input[name="message"]').val();

        // 更新 Model 的資料，觸發 View 自動重新渲染
        this.model.set('message', message);

        $.ajax({
            url: '/discussion/' + message,
            type: 'POST',
            dataType: "json",
            success: (data, textStatus, jqXHR) => {
                alert("已儲存成功");
            },
            complete: (data, textStatus, jqXHR) => {
                // 可加入結束後的清除操作
            }
        });
    }
```

程式碼第 2 行，就是在 View 裡面加入 Model 的做法：

* 實例化 View 時，constructor 與 *initialize* 會被叫
* 如上，實作 *initialize* 函數來加入 Model
* 將 Model 的實例化存放到 *View\.model* 裡

有了 Model 後，就可以開始做 "Data Mapping" 了。先使用 jQuery 取得定義好的 Template：

```javascript
$('#tmpl-message').html()
```

接著要在 Backbone.View 裡定義一個 *template* 函數。我們採用的 Template 系統是 Underscore，要為 Backbone.View 定義想要使用的 Template 系統，就要定義 *template*。

如何讓 Backbone.View 使用 Underscore 做為 Template 系統呢？只要將 *Backbone.View\.template* 定義為 *\_.template()* 即可。程式寫法如下：

```javascript
this.template = _.template($('#tmpl-message').html());
```

\*\_ 是 Underscore 的物件（這就是 Underscore 名稱的由來）。將取得的 Template 傳給 \_.template 即可。

最後是 Data Mapping 的部份，根據 Backbone 的說明，必須在 View 裡實作 *render()* 函數。*render()* 會將 Model 與 Template 做對應，對應後的結果就是一份 HTML5 文件。最後把 HTML5 文件顯示在畫面上即可。

以下是 *render()* 的實作：

```javascript
    render: function() {
        const data = this.template(this.model.attributes);

        this.$el.find('#message').html(data);
        return this;
    },
```

先呼叫 *this.template* 函數，這個函數已經被定義為 Underscore Template 系統。*this.model.attributes* 存放的是「Model State」，所謂的 Model State 就是 Model 目前所存放的資料；資料會以 JSON 的格式表示。

簡單來說，*this.model.attributes* 存放了 Model Data，並且是 JSON 格式。上述程式碼的意思就是：將 Data 交給 Template 系統去做 Data Mapping。這行程式碼是 ViewModel 觀念的靈魂。

最後將 Template 系統處理好的 HTML5 文件，放到想顯示的網頁位置即可。以上述範例為例，結果被放到 *#message* 區塊裡。

三個步驟就能入門 Backbone.Model 了。
