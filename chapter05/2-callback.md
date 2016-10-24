## 5.2 Callback Function

Lambda 本質上是一種表示方法，用來表示 Input 與 Output。所以，要表示一個平方的運算的話，寫法如下：

~~~~~~~~
λx.x*x
~~~~~~~~

這個運算式，也可以做為另一個 Lambda 式子的 Input，請看以下的說明。

### Step 1：撰寫第一個計算平方的 Lambda 表示式

做法如下：

~~~~~~~~
λx.x*x
~~~~~~~~

### Step 2：把上述的式子做為另一個 Lambda 的輸入

有一個 f(x) = x + 2 的函數，用 Lambda 來表示的話，寫法如下：

~~~~~~~~
(λx.x+2)
~~~~~~~~

如果要把 Step 1 的結果，做當上面式子的 *x*（輸入），合併後的寫法為：

~~~~~~~~
(λx.x*x)(λx.x+2)
~~~~~~~~

讓我們來筆算看看：

- x = 3 時，λx.x*x 的 Output 為 9
- 9 做為 λx.x+2 的 Input，成為 9 + 2，Output 為 11
- 答案就是 11

(λx.x*x)(λx.x+2) 等價於 9 + 2。

### Step 3：使用 JavaScript 來實作

怎麼把 (λx.x*x)(λx.x+2) 寫成程式碼呢？非常簡單，由於 Output 就是返回值，所以等於「讓暱名函數的返回值，當做另一個暱名函數的參數」。程式碼如下：

~~~~~~~~
var lambda = function(x) { return x + 2 };
var result = lambda(function(x) { return x * x} (3) );

console.log("Result: " + result);
~~~~~~~~

這個輸出的輸出結果為 11。這可不是在賣弄程式碼，而是實現出 (λx.x*x)(λx.x+2) 這個 Lambda 演算。以暱名函數來表示 Lambda 是很常見的做法，但其實反應出 JavaScript 語法上的不足。如果能有一個更簡易的語法，讓我們表示 Lambda，這段程式碼就會比較精簡。

所以，這需要從修改 JavaScript 語法的角度著手。例如：

~~~~~~~~
function(x) { return x + 2 }  // 複雜的寫法
x => x + 2 					  // 希望可以有這種精簡的語法
~~~~~~~~

再舉一個例子：

~~~~~~~~
var result = (x => x * x) 3;  // 左結合寫法，輸入值 3 放在最右邊，最後 result 為 9 
~~~~~~~~

如果將 Lambda 做為函數的參數：

~~~~~~~~
[1, 2, 3, 4, 5]
	.map(function(x) { return x * x });
~~~~~~~~

未來或許能簡化為：

~~~~~~~~
[1, 2, 3, 4, 5]
	.map(x => x * x);		   // 希望可以有這種精簡的語法
~~~~~~~~

在 ECMAScript 還沒有正式加入相關語法前，我們只能使用暱名函數的寫法。ECMAScript 6（JavaScript 的語法標準）則加入了 Arrow Function 的語法。

---

Next: [5.3 從 TypeScript 談起](3-typescript.md)
