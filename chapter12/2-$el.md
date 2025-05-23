## 12.2 認識 View.\$el

`View.$el` 是 Backbone 初學者常見的第二個學習瓶頸。根據 Backbone 官方文件的定義：

> A cached jQuery object for the view's element.

簡單說，這是一個已快取的 jQuery 物件，對應於此 View 綁定的 DOM 元素（也就是 `el` 所指定的 DOM 節點）。這代表你不需要每次用 `$()` 全域搜尋，而是可以用更精準、範圍受限的方法來選取畫面元素。

### 一般寫法與 View.\$el 寫法的差異

假設你在 View 中撰寫以下程式碼：

```javascript
const message = $('input[name="message"]').val();
```

這樣會觸發一次全頁的 DOM 查詢，可能會選到其它頁面不相關的 input。

改為使用 `this.$el.find()`，即可限定只在 View 管理的區域中搜尋：

```javascript
const message = this.$el.find('input[name="message"]').val();
```

更進一步，Backbone 提供了一個語法糖：`this.$()`，相當於 `this.$el.find()`，可以進一步簡化程式碼：

```javascript
const message = this.$('input[name="message"]').val();
```

這段程式碼的語意變得更清楚了：我不是在全頁面亂抓，而是在「我這個 View 所管的畫面區塊中」找到 input。

> `this` 是一個物件，代表「這個 View」的實例。`this.$el` 則是這個 View 綁定的 DOM 區塊，並已轉為 jQuery 物件，可直接呼叫 jQuery 方法，例如：

```javascript
this.$el.hide();
this.$el.addClass('active');
```

這是 Backbone 將 DOM 操作語法納入 MVC 的一種「語意模組化」策略。

### 提醒：不是所有 `$` 操作都能換成 `this.$el`

初學者常會問：那是不是 `$.ajax()` 也要改成 `this.$el.ajax()`？

答案是：**否定的。**

`$.ajax()` 是 jQuery 提供的全域工具函式，與 DOM 節點無關，因此不屬於 `this.$el` 的操作範圍。

如果你希望整個操作流程更語意化，正確的方向是：

* 使用 `Backbone.Model` 提供的 `save()` 方法
* 讓 View 與 Model 之間的資料互動更符合 MVC 架構

### 重新 12.1 節實作範例：Step 6 的 save()

以下展示我們在 12.1 使用全域 jQuery 的寫法，如何改為 `this.$()`：

```javascript
save() {
  const message = this.$('input[name="message"]').val();
  if (!message.trim()) {
    alert('請輸入訊息');
    return;
  }
  this.$('input[name="message"]').val('');
  $('#message').append(`<p>${message}</p>`);
}
```

這樣做有三個好處：

1. 僅操作此 View 所管理的 DOM 範圍，避免全頁干擾
2. 增強可讀性與語意一致性
3. 提升效能（快取 jQuery 物件）

### 結語：View.\$el 是封裝視覺區塊邏輯的第一步

學會使用 `this.$el` 或 `this.$()`，意味著你開始理解：View 不只是畫面，而是一種封裝邏輯、控制區域、負責互動的模組。

> `View.$el` 是語意上的「控制權範圍」。它讓你不再從整個頁面去抓東西，而是只處理屬於自己的 DOM 區塊。

在下一節，我們將進一步接觸 Model，讓資料與畫面之間的互動更有邏輯與結構感，也讓 `save()` 這樣的操作邁向語意一致的資料層設計。
