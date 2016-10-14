# 1.4 Constructor Pattern

以上的觀念，可以用一個觀念來總結：函數（functions）就是物件（objects）。這是 JavaScript 極為重要的觀念，實務上，大量被應用在 Callback function 的實作上。上述的例子，將 Person() 視為 constructor 來使用；這個觀念亦稱為 Constructor Pattern。

上述二個例子，只有第二個寫法，才能做為 Constructor Pattern 的觀念。其差異如下：

* 不需要明確地產生物件
* 直接使用 *this* 物件來指定屬性（properties）與方法（method）
* 不需要 *return* 敍述

另外，根據物件導向的觀念，Constructor 函數的命名，要以大寫字元開頭。

---

Next: [1.5 Design Pattern for Front-End](5-frontend.md)
