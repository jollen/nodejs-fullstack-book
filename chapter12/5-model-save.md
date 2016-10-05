## 12.5 認識 Backbone.Model.save

*Backbone.Model.save* 是一個很神奇、好用與重要的觀念。神奇的地方是：它可以同時支援 RESTful 的 POST 與 PUT 操作。好用的地方是，Backbone 可以自動處理資料的新增（POST）或更新（PUT）。重要的地方是，它緊密結合 Data Model。

檢視 nodejs-chat 範例，目前儲存留言的程式碼實作，仍然是採用 jQuery AJAX 模式：

~~~~~~~~
    save: function() {
        var message = this.$el.find('input[name="message"]').val();

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
~~~~~~~~

這段實作，必須重構為 Backbone way。程式碼如下：

~~~~~~~~
    save: function() {
        var message = this.$el.find('input[name="message"]').val();

        this.model.save({ message: message});
    }
~~~~~~~~

*this.model.save()* 執行後，Backbone 會以 POST 方法，呼叫 REST API。這裡有一個疑問，Backbone 怎麼知道現在是要新增訊息，而不是更新訊息？方式非常簡單：

* 如果傳入的 Data 包含 *id* 欄位，表示這筆資料已存在，Backbone 就視為更新資料；透過 PUT 方法呼叫 REST API
* 反之，沒有 *id* 欄位，視為新增資料；以 POST 方法呼叫 REST API

簡單說：

~~~~~~~~
// PUT（更新）
this.model.save({ id: id, message: message});

// POST（新增）
this.model.save({ message: message});
~~~~~~~~