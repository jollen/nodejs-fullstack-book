## 12.4 認識 Backbone.Model.fetch

[Backbone.Model.fetch][10] 是 Backbone 初學者的第四關。它的用途是：reset the model's state from the server。

怎麼從 Server 取得資料？這就是 *Backbone.Model.fetch()* 的主要用途。接下來，為 nodejs-chat 加上顯示訊息的功能。目前為止的範例，仍有幾個部份需要加強：

* 使用 *$.ajax()* 來呼叫 REST API 雖然是可行的做法，但是有一個缺點：處理 Response data 的架構不夠嚴謹
* 使用 *$.ajax()* 來呼叫 REST API 時，是直接把 API 當做 *ajax()* 的參數，這個做法有一個缺點：API 與 Response data 是一種比較鬆散的關係

以上二個缺點，都可以用 Backbone.js 的架構來解決：

* 使用 Model fetch 的關係，讓 Response data 的處理更嚴謹
* 使用 Data model 的關係，讓 Data 與 API 偶和（Aggregation）在一起

接下來，繼續重構 nodejs-chat 專案，讓它的架構更加嚴謹。

### Step 1：加入 Backbone.Model.fetch

修改 *client/javascripts/app.js* 加入以下程式碼：

~~~~~~~~
this.model.fetch({
    success: function(model, response, options) {
    }
});
~~~~~~~~

說明如下：

* 呼叫 *fetch()* 重置 Model State
* *fetch()* 應該要呼叫 REST API－*/discussion/latest/:items*，來取得最新的訊息
* *fetch()* 的參數中，包含一個 *success* 的 Callback Function
* 呼叫 REST API 成功後，會呼叫 *success* callback，第二個參數 *response* 存放的就是 Server 回傳的資料

要如何指定 *fetch()* 所要呼叫的 REST API 呢？方式是修改 Model。

### Step 2：修改 Model

*Backbone.Model.fetch* 會根據 *this.model* 裡的 *url* 定義，來呼叫 REST API。因此，修改 Data model 的程式碼如下：

~~~~~~~~
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
~~~~~~~~

對初學者來說，現階段並不需要太深入 Data model 的理論面，只需要學會定義 Model 即可。

### Step 3：設定 Data Model

呼叫 *Backbone.Model.fetch* 後，Backbone 會幫我們呼叫 REST API，並且取得 Response data。如果可以成功取得 Response data，*Backbone.Model.fetch* 就會 Callback *success* 函數。

我們只要實作 *success* callback 函數，並且將 Response data「套用」到 Data model 裡即可。程式碼如下：

~~~~~~~~
this.model.fetch({
    success: function(model, response, options) {
        self.model.set('messages', response);
    }
});
~~~~~~~~

Backbone 將取得的 Response data 存放在 *response* 參數。接著，我們必須重新設定 Data model。

*self.model.set* 的意思是，將取得的 response data 儲存到 Data model裡。由於 Data model 有了變動，所以 Backbone 便會呼叫 *render()* 函數。在 *render()* 函數裡，再 Render 出新的內容。

學會 *Backbone.Model.fetch* 後，就可以很容易感受到 Backbone 的優點：

* 透過 Data model 整合 REST API，以及 Response data
* 將 REST API 與 Response data 封裝成 Data model
* 在 Data model 變動時，重新 Render 畫面

[10]: http://backbonejs.org/#Model-fetch "fetch"