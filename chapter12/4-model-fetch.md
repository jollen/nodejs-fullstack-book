## 12.4 認識 Backbone.Model.fetch

[Backbone.Model.fetch](http://backbonejs.org/#Model-fetch) 是 Backbone 初學者的第四關。它的用途是：**重設 Model 的狀態，使其與 Server 同步**（reset the model's state from the server）。

怎麼從 Server 取得資料？這正是 `Backbone.Model.fetch()` 的主要用途。接下來，將為 nodejs-chat 加上顯示訊息的功能。

目前為止的實作中，仍有幾個需補強之處：

* 使用 `$.ajax()` 雖然可以呼叫 REST API，但 Response 資料的處理與 Model 並無嚴謹綁定
* 使用 `$.ajax()` 會將 API 直接嵌入參數中，導致資料結構與 Model 綁定關係鬆散

這些問題都可以透過 Backbone 的 `Model.fetch()` 解決：

* 使用 fetch() 從 REST API 同步更新 Model 狀態
* REST API 與 Model 綁定成資料聚合單元，提高模組一致性

---

### Step 1：呼叫 Backbone.Model.fetch

以下展示 ES5 與 ES6 寫法對照：

```javascript
// ES5
this.model.fetch({
  success: function(model, response, options) {
    self.model.set('messages', response);
  }
});
```

```javascript
// ES6
this.model.fetch({
  success: (model, response, options) => {
    this.model.set('messages', response);
  }
});
```

| 語法項目        | ES5 語法                          | ES6 語法                          | 語意說明                 |
| ----------- | ------------------------------- | ------------------------------- | -------------------- |
| callback 寫法 | function                        | arrow function `=>`             | 保留 `this` 指向 View 實例 |
| 資料更新        | model.set('messages', response) | model.set('messages', response) | 將取得的資料更新進 Model 中    |

**說明：**

* 呼叫 `fetch()` 後，Backbone 將主動發送 GET 請求至該 Model 指定的 `url`
* 成功回應後將觸發 `success` callback，其中 `response` 參數即為伺服器返回資料
* 使用 `set()` 將資料寫入 Model，可觸發重新渲染（例如 render())

---

### Step 2：定義 Model 的 url 欄位

`Backbone.Model.fetch()` 會根據 Model 中的 `url` 欄位發出請求，因此需先設定 API 來源位置。

```javascript
// ES5
app.Message = Backbone.Model.extend({
  url: '/discussion/latest/5',
  defaults: {
    success: false,
    errors: [],
    errfor: {},
    message: 'No message yet.',
    messages: []
  }
});
```

```javascript
// ES6
app.Message = Backbone.Model.extend({
  url: '/discussion/latest/5',
  defaults: {
    success: false,
    errors: [],
    errfor: {},
    message: 'No message yet.',
    messages: []
  }
});
```

| 語法項目     | ES5 / ES6 寫法                  | 語意說明                        |
| -------- | ----------------------------- | --------------------------- |
| url      | `url: '/discussion/latest/5'` | 指定資料來源 API，fetch 時自動呼叫此 URL |
| message  | `message: 'No message yet.'`  | 初始訊息欄位，用於畫面渲染               |
| messages | `messages: []`                | 預留資料欄位，用於儲存回傳訊息清單           |

---

### Step 3：整合 fetch 與 render 流程

將資料更新流程完整整合至 View 實作中，示例如下：

```javascript
// ES6 寫法（整合 render 與 fetch）
initialize() {
  this.model = new app.Message();
  this.template = _.template($('#tmpl-message').html());

  this.listenTo(this.model, 'change', this.render);
  this.model.fetch({
    success: (model, response, options) => {
      this.model.set('messages', response);
    }
  });
},

render() {
  const data = this.template(this.model.attributes);
  this.$el.find('#message').html(data);
  return this;
}
```

> 備註：實際應用中，你也可以將 `fetch()` 呼叫移至使用者互動後再執行（例如點擊按鈕時），而不是在 `initialize()` 階段執行。

重點觀念說明：

1. 呼叫 *Backbone.Model.fetch* 後，Backbone 會幫我們呼叫 REST API，並且取得 Response data。如果可以成功取得 Response data，*Backbone.Model.fetch* 就會 Callback *success* 函數。
2. 我們只要實作 *success* callback 函數，並且將 Response data「套用」到 Data model 裡即可。程式碼如下：
3. Backbone 將取得的 Response data 存放在 *response* 參數。接著，我們必須重新設定 Data model。
4. 由於 Data model 有了變動，所以 Backbone 便會呼叫 *render()* 函數。在 *render()* 函數裡，再 Render 出新的內容。

學會 *Backbone.Model.fetch* 後，就可以很容易感受到 Backbone 的優點：

* 透過 Data model 整合 REST API，以及 Response data
* 將 REST API 與 Response data 封裝成 Data model
* 在 Data model 變動時，重新 Render 畫面

\\

---

### 小結

學會 `Model.fetch()`，即可掌握以下核心能力：

* 讓 Model 自動對應遠端資料來源（RESTful API）
* 回應資料變化，驅動 View 重新渲染
* 建立資料流與 API 的聚合模型

Backbone 並不是只是事件監聽工具，而是資料 × 界面聯動的架構設計。下一節將介紹 `Model.save()`，處理資料的「送出」邏輯，與本節的「取得」形成完整互補。
