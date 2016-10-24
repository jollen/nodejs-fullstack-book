# 5.1 Lambda

Lambda（λ）是一個希臘字母（Λ 是它的大寫字母），用來表示許多觀念：

- 物理學家用來表示波長的符號
- 數學家用來表示空字串的符號
- 電腦科學家用來表示暱名函數（Anonymous Function）的符號

Lambda 在電腦科學領域，用來表示暱名函數，目的是進行運算。為了尋找一個語法簡易的運算表示方式，電腦科學家會這麼做。

### Step 1：取得一個具名的函數

例如一個加法函數：

~~~~~~~~
sum(x) = x + 2
~~~~~~~~

函數 sum() 是具名函數，利用 JavaScript 來實作的話，寫法如下：

~~~~~~~~
function sum(x) {
	return x + 2;
}
~~~~~~~~

### Step 2：改寫為暱名函數

Lambda 希望可以找到一個能運算的表示方法，而且要簡單，去除掉函數名稱，就是一個方式。沒有具體名稱的函數，就稱為暱名函數（Anonymous Function）。如果表示暱名函數呢？上述範例，以 Lambda 來表示的話，只要改寫成：

~~~~~~~~
λx.x + 2
~~~~~~~~

用 JavaScript 來實作的話，要如何撰寫呢？方式如下：

~~~~~~~~
(function(x) {
	return x + 2;
})();
~~~~~~~~

這就是第 1 章介紹的 Closure 觀念，最後加上的一對括號，稱為立即函數，意思是立即執行此暱名函數的意思。立即函數，以物件導向的角度來看，也可以解釋為立即實例化。

### Step 3：使用 *var* 來宣告暱名函數

JavaScript 的 *var* 關鍵字用來宣告變數，所以也可以把暱名函數做為運算子（Operator）來宣告變數。例如：

~~~~~~~~
var lambda = (function(x) {
	return x + 2;
})();
~~~~~~~~

變數 *lambda* 被指定（Assign）為一個暱名函數。從 JavaScript 語言的角度來看，Closure 用來封裝出 Module，所以 *lambda* 變數也可以解釋成「一個模組」。宣告一個暱名函數的變數時，可以不需要 Closure。也可以採用以下的寫法：

~~~~~~~~
var lambda = function(x) {
	return x + 2;
};
~~~~~~~~

事實上，這個寫法更為普遍。一些文章也把這種寫法，稱做 Function Expressions。

有一個重要的觀念要釐清，上述的寫法，正規的解釋方式是「宣告暱名函數的變數」，所以 *lambda* 是一個變數，不能解釋為函數。如果說 *lambda* 是一個函數宣告，觀念上就不對了。不能單就 JavaScript 語法的角度來做解釋。

以 JavaScript 來說，函數宣告的寫法為：

~~~~~~~~
function lambda(x) {
	return x + 2;
};
~~~~~~~~

這個時候，*lambda* 就是一個函數。那一種寫法比較好呢？理論上，採用暱名函數宣告的方式較佳，因為 JavaScript 本身是一種 Lambda 的程式語言。

這裡有一本關於 Lambda 觀念的好書 [The Happy Lambda](https://leanpub.com/happylambda)，雖然這本書還沒有完稿，而且還是以 Ruby 程式語言為主，但裡面的觀念很值得一讀。

---

Next: [5.2 Callback Function](2-callback.md)
