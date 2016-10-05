## 12.2 認識 *View.$el*

[View.$el][5] 是 Backbone 初學者的第二個關卡。根據 Backbone 官方文件的說明，*View.$el* 的用途為：

A cached jQuery object for the view's element.

簡單說，這就是一個 jQuery 物件。所以，應該把以下的程式碼：

~~~~~~~~
var message = $('input[name="message"]').val();
~~~~~~~~

重構為：

~~~~~~~~
var message = this.$el.find('input[name="message"]').val();
~~~~~~~~

*this* 是一個物件，代表「這個 View」的意思。*this* 物件就是 *Backbone.View* 類別。

[5]: http://backbonejs.org/#View-$el "View.$el"

使用 *this.$el* 而不是直接使用 *$* 物件的原因，是為了避免不必要的 DOM 操作。另外，是不是也要把 *$.ajax* 改成 *this.$el.ajax* 呢？答案是否定的。正確的做法，應該是用 Model 的方式來取代。