## 12.5 認識 Backbone.Model.save

[Backbone.Model.save](http://backbonejs.org/#Model-save) 是 Backbone 初學者的第五關，也是資料「送出流程」的核心元件。

這個方法有三個特色：

* **神奇之處**：同時支援 RESTful 的 POST 與 PUT 操作
* **好用之處**：自動判斷是新增資料（POST）還是更新資料（PUT）
* **關鍵之處**：操作的是 Model 本身，而非繞過 Model 發送請求

### Step 1：理解 save() 的運作邏輯

this.model.save() 執行後，Backbone 會以 POST 方法呼叫 REST API。
這裡有一個常見的疑問：Backbone 如何知道現在是要新增資料（POST），還是更新資料（PUT）？答案非常簡單：

* 如果傳入的資料包含 `id` 欄位，表示該資料已存在，Backbone 視為更新，會以 PUT 方法呼叫 REST API
* 反之，若未包含 `id`，則視為新增資料，會以 POST 方法呼叫 REST API

簡單說：

```javascript
// PUT（更新）
this.model.save({ id: id, message: message });

// POST（新增）
this.model.save({ message: message });
```

Backbone 採用 RESTful 設計模式，因此會根據是否含有 `id` 屬性，自動決定呼叫的 HTTP 方法：

```javascript
// POST：新增
this.model.save({ message: message });

// PUT：更新（若已有 id）
this.model.save({ id: 10, message: message });
```

| 條件         | 傳入資料中是否包含 `id` 欄位 | HTTP 方法 | 用途     |
| ---------- | ----------------- | ------- | ------ |
| 新增（Create） | 否                 | POST    | 建立新資料  |
| 更新（Update） | 是                 | PUT     | 更新既有資料 |

> Backbone 的這項設計讓資料送出與資料模型綁定，不需要另外維護 API 呼叫邏輯。

### Step 2：原始 AJAX 實作（未使用 Model）

以下是先前 nodejs-chat 範例中使用 jQuery 的 AJAX 模式：

```javascript
// ES5
save: function() {
  var message = this.$el.find('input[name="message"]').val();

  $.ajax({
    url: '/discussion/' + message,
    type: 'POST',
    dataType: 'json',
    success: function(data, textStatus, jqXHR) {
      alert('已儲存成功');
    },
    complete: function(data, textStatus, jqXHR) {}
  });
}
```

缺點：

* 無法重用 Model 的 `url` 與資料格式
* 無法觸發 Model 綁定的事件，如 `change`、`sync`
* API 邏輯與 Model 分離，難以擴充與測試

### Step 3：重構為 Backbone.Model.save 寫法

為了讓儲存資料與畫面整合更清楚，我們先準備一段 Template，將送出的訊息即時顯示在畫面上：

```html
<script type='text/template' id='tmpl-message'>
  <div class="alert alert-success">
    <strong>留言內容：</strong> <%= message %>
  </div>
</script>
```

這段 Template 使用 `message` 作為資料欄位，對應到我們呼叫 `save()` 時傳入的欄位名稱。

```javascript
// ES6
save() {
  const message = this.$el.find('input[name="message"]').val();

  this.model.save({ message }, {
    success: (model, response) => {
      const html = this.template(model.attributes);
      this.$el.find('#message').html(html);
    },
    error: () => {
      alert('儲存失敗，請重試');
    }
  });
}

const message = this.\$el.find('input\[name="message"]').val();

this.model.save({ message });
}
````

匯整目前為止的觀念如下：

| 語法特性     | ES5 寫法            | ES6 重構             | 語意對照說明                       |
|--------------|---------------------|----------------------|------------------------------------|
| 資料來源     | jQuery input 讀值   | `const` + template   | 使用現代語法簡化變數定義             |
| API 呼叫方式 | $.ajax              | `model.save()`       | 使用資料驅動方式送出，與 Model 結合 |
| HTTP 方法    | 手動指定 POST       | 自動決定 POST / PUT | 根據是否含有 `id` 自動切換          |

在這裡，我們不再關心是 POST 還是 PUT，而是交由 Backbone 根據 Model 狀態自動判斷。

### Step 4：網頁畫面自動

Backbone 的 `save()` 也能在伺服器成功回應後自動觸發 `sync` 或 `change` 事件，因此可以搭配 `listenTo()` 進一步更新畫面。

```javascript
this.listenTo(this.model, 'sync', this.render);
````

這表示：資料送出成功後，伺服器回傳的新資料會更新至 Model，而畫面也會隨之更新。

### Step 5：整合 fetch() + save()

到目前為止，我們已經掌握了 `fetch()` 負責從伺服器讀取資料、`save()` 負責將資料送出到伺服器這兩個 Backbone Model 的核心方法。

我們可以將兩者整合，建立一個最基本的 CRUD 操作流程。以下展示完整的初始化與事件註冊邏輯：

```javascript
initialize() {
  this.model = new app.Message();
  this.template = _.template($('#tmpl-message').html());

  this.listenTo(this.model, 'sync', this.render);
  this.model.fetch(); // 初始讀取最新訊息
},

save() {
  const message = this.$el.find('input[name="message"]').val();

  this.model.save({ message }, {
    success: (model, response) => {
      const html = this.template(model.attributes);
      this.$el.find('#message').html(html);
    },
    error: () => {
      alert('儲存失敗，請重試');
    }
  });
}
```

> 說明：`initialize()` 阶段先呼叫 `fetch()` 讀取初始資料，後續使用者送出訊息則觸發 `save()`。

這樣的寫法不僅簡化了 API 管理，也統一了資料來源與 UI 渲染的資料來源，讓前端結構更清晰。

### Step 6：整體資料流結構圖

以下是 Backbone MVC 架構在 nodejs-chat 中的實際資料流示意：

```
User ↔ View (DOM + Event)
       ↓            ↑
     Model ←→ REST API
       ↓
    Template → UI 渲染
```

這張圖展示了從使用者互動開始，到資料送出與畫面更新的完整循環：

* View 綁定 DOM 與事件，接收使用者輸入
* Model 作為資料中介，負責處理資料狀態與 REST 通訊
* Template 將資料渲染至畫面，保持邏輯分離

### Step 7：三關 × 二技 × 一結語

| 類別  | 說明                                      |
| --- | --------------------------------------- |
| 三關  | `View.extend()` / `View.$el` / `Model`  |
| 二技  | `Model.fetch()`（讀取）+ `Model.save()`（送出） |
| 一結語 | Backbone 是「資料 × 視覺 × 通訊」三向邏輯的語意骨架設計工具   |

### 小結

掌握 `Model.save()` 之後，資料就不再只是「送出」，而是**由模型主導的狀態更新流程**。這代表：

* View 不再控制 API 邏輯，Model 成為資料與通訊的中介層
* Model 的狀態改變（新增／修改）可被監聽並觸發畫面刷新
* RESTful 操作與 HTTP 方法切換不再需要人工判斷

到這裡為止，我們已不只是「學會了 Backbone」，而是走過了資料驅動設計的一整條路徑。
從 View 的事件控制、到 Model 的資料邏輯、再到 Template 的畫面組裝，每一步都不再是硬寫 HTML 或串接 API，而是一種語意結構的建構。

這就是 Backbone.js：不是 UI 框架，而是前端邏輯的語意骨架。
