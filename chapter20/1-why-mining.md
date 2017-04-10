# 20.1 為什麼要 Mining？

交易（transaction）確認後的資訊以 Merkle tree 來做紀錄，所以就要有 Block 來儲存這個 Merkle tree。這個時候就需要有新的區塊。

在 Bitcoin 的生態中，mining（挖礦）的主要目的就是「產生新的區塊」，當區塊產生時，就會產生另一個「副作用」：新 Bitcoin 被產生出來。

簡單說，產生新的 Bitcoin 並不是挖礦的主要目的，這只是挖礦的副作用。挖礦的主要目的，是生產區塊來確認並紀錄新的交易資訊。本章的目標，在學習挖礦的基本知識，內容以簡單易懂為原則，並不是介紹如何重新實作 Bitcoin 的挖礦技術。但教學內容會以 Bitcoin 做為實例，輔助說明 mining 技術。

## Difficulty

眾所皆知，Bitcoin 的挖礦難度是非常高的。這個意思是：產生新的 Block 是一件非常困難的事情。Bitcoin 將挖礦設計的非常困難，其實是有一個很重要的原因：避免有人任意產生區塊。

要產生新的區塊，就會有所謂的 difficulty（難度），這個 difficulty 的作用是什麼呢？主要目的是：決定新的 hash 值產生條件。

要產生新的區塊前，必須先計算出這個區塊的 Block Hash，區塊的 hash 值如何決定呢？這點後續再談。因為，這裡有一個更重要的問題：如何決定這個 hash 值是否可用？

例如，根據新的交易與其它資訊，運算出一個 double SHA-256 的 hash 值如下：

```
18AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4F8E4
```

新的區塊是否就能直接使用這個 hash 值呢？如果可以，表示新的 hash 值已成功（success）建立，如果不行，表示新的 hash 值產生失敗。系統必須不斷進行運算，「直到成功得到新的 hash 值」。

不如用一個簡單的方法，來「定義什麼是 success」：當產生的 hash 值前面「有足夠的零」時，就是 success。例如，「前面至少要有 2 個零」，上述的 hash 值就是失敗的運算。以下的這個 hash 值，則是 success：

```
0018AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4F8
```

這個條件就是 difficulty 會儲存在最後一個區塊上，所以修改 22.1 節的範例，加入 difficulty 欄位，並且在 Genesis Block 裡，設定最原始的 difficulty 為「前面至少有 2 個零」。

```
function Block(block) {
	this.hash = block.hash || '';
	this.previousHash = block.previousHash || '';
	this.timestamp = block.timestamp || new Date();
	this.merkleRoot = block.merkleRoot || {};
	this.difficulty = block.difficulty || '00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
}
```

以 JavaScript 來實作時，只要以字串比對方式，就可以知道 hash 值是否為 success 了。例如：

```
if ('CD18AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4' <'00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF') {
	// success
} else {
	// failed
}
```

## 越來越難

新的區塊產生後，會「重新調整」這個 difficulty。例如，將 difficulty 調整為「前面至少有 3 個零」，這時，可以將新區塊的 difficulty 欄位設定為：

```
000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
```

Difficulty 的條件設定，由每一個區塊鏈系統的設計者所制定。但是有一個基本原則就是：難度必須越來越高，以上述例子來說，要產生「前面 3 個零」的 hash 值，其難度大於「前面 2 個零」的 hash 值。

## 小結

認識為什麼要 mining 以及什麼是 difficulty 後，就可以開始設計 mining 的演算法了。




