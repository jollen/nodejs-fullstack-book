# 23.2 簡單易懂的 Mining 演算法設計

## Mining 演算法初體驗

表 23-1 是截至目前為止，範例所設計的 Block 資料結構。假設這是「最新的 Block」內容，根據 23.1 節的介紹，要如何計算出 Hash 值呢？如果這個 Hash 值是「success」的話，表示「挖礦成功」了：一個新的區塊被計算出來了。

|欄位       |範例      |用途說明 
|--------|--------|--------
|hash     |dd0e2b79d79be0dfca96b4ad9ac85600097506f06f52bb74f769e02fcc66dec6      |Block Hash
|previousHash       |0000000000000000000000000000000000000000000000000000000000000000 	   |前一個 Block 的 Hash 值
|timestamp     |Tue Dec 06 2016 15:14:58 GMT+0800 (CST)       |區塊建立的時間
|merkleRoot     |851AE7D7390A76384ACA2D7CC29BE820918CA900071FC22F41F5C399BE065558    |區塊的 Merkle Root
|Difficulty     |00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF    |挖礦的困難度

表 23-1 Block 資料結構

一個簡單的挖礦演算法實作步驟如下。

### Step 1：建立新的 Merkle Tree

假設現在有一筆交易資訊，正等著被紀錄在區塊裡，這筆交易的狀態目前就是「待確認」。挖礦機就要先取得這筆「待確認」的交易資訊，再建立這筆交易的 Merkle tree。

多筆待確認交易的做法也相同：挖礦機先取得這些待確認的交易資訊，並建立它們的 Merkle tree。

以 Bitcoin 的網路來說，Bitcoin network 裡一個稱為「unverified pool」的地方，就是存放這些「待確認」的交易。因此，unverified pool 的設計與實作，是區塊鏈開發者的另一個課程，本教學暫不涉及 unverified pool 的介紹。

延續第 22 章的教學，為一筆交易建立 Merkle tree 的程式碼實作如下：

```
// 一筆待確認的交易
var tx = [‘Created by Jollen’];

// Merkle root hash
var hashMerkleRoot;

merkleRoot.async(tx, function(err, tree){
    // 取得 Merkle Root 的 Hash
    hashMerkleRoot = tree.level(0)[0];
});
```

### Step 2：定義本文

這裡所講的「本文」，就是用來進行 SHA-256 計算的資料內容。一個簡單的本文定義，需要 3 個項資訊：

* *merkleRoot*：由前一個步驟產生
* *previousHash*：最後一個區塊的 block hash，未來產生的新區塊，要往前「鏈接」到這個區塊
* *nonce*：number once 的簡寫，在加密學裡，nonce 指的是只能使用一次的任意數

為簡化演算法的設計，可以將 *nonce* 定義為一個「流水號」。因為 *nonce* 只能使用一次，所以流水號只能「持續遞增」，不能歸零重算。

以 JavaScript 的物件語法，來定義本文如下：

```
var nonce = 0;

var header = {
	nonce: nonce,
	previousHash: ‘dd0e2b79d79be0dfca96b4ad9ac85600097506f06f52bb74f769e02fcc66dec6’,
	merkleRoot: hashMerkleRoot
};
```

本文的定義由區塊鏈開發者自行決定，例如：把 timestamp 也加入到本文裡。

### Step 3：Double SHA-256 運算

使用這個「文件」做為本文：將物件 stringify（轉換為文件）後，進行 SHA-256 雜湊運算。方便起見，直接將這個文件做為 secret 使用：

```
var hash1 = crypto.createHmac(‘sha256’, JSON.stringify(header))
		                   .digest(‘hex’);
```

再將得到的 hash 值，做為新的 secret，進行第 2 次運算：

```
var hash2 = crypto.createHmac(‘sha256’, hash1)
		                   .digest(‘hex’);
```

現在，```hash2``` 存放的就是 Block Hash 的「候選人」。

### Step 4：Difficulty 運算

候選人的意思是：它還不一定是成功的 hash 值。必須比對 difficulty 的條件設定，才能決定這個 hash 值是否能使用。

延續 23.1 節的介紹，假設困難度是「有足夠的零」時，就要進行困難度的確認：

```
		if (hash2 < ‘00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF’) {
			console.log(‘success: ‘ + id);
		}
```

當 ```hash2``` 不滿足目前的 difficulty 條件時，就要重新計算，直到成功為止。

以上述的範例來說，當 hash 值不滿足 difficulty 條件時，就變更 nonce 值後，再重新運算。本文範例，使用流水號的方式來產生 nonce 值。

### Step 5：完整範例

根據前個的步驟，實作一段簡單的 mining 演算法如下：

```
var crypto = require(‘crypto’);
var merkle = require(‘merkle’);
var merkleRoot = merkle(‘sha256’);

// Unverified pool
var tx = [‘Created by Jollen’];

merkleRoot.async(tx, function(err, tree){
    // Merkle Root 的 Hash
    var hashMerkleRoot = tree.level(0)[0];
    var nonce = 0;

    var hash = function(nonce) {
	    var header = {
			nonce: nonce,
			previousHash: ‘dd0e2b79d79be0dfca96b4ad9ac85600097506f06f52bb74f769e02fcc66dec6’,
			merkleRoot: hashMerkleRoot
	    };

		var hash1 = crypto.createHmac(‘sha256’, JSON.stringify(header)).digest(‘hex’);

		var hash2 = crypto.createHmac(‘sha256’, hash1)	.digest(‘hex’);

		return hash2;
    };

    while (1) {
    	var id = hash(nonce++);
    	console.log(nonce + ‘: ‘ + id);
		if (id < ‘000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF’) {
			console.log(‘success: ‘ + id);
			break;
		}
    }
});
```

輸出結果：

```
…
1336: f5ef49fc0fc191b58be51b02226a97e7f00d7214ad797e40c32753616d54e6bf
1337: 71dead3fe3af4d871c7e167cf11ba30276ecb390dfae21ed6c40b05d821036b8
1338: 14ba54dbfdb27cb16e0a05d9b57985ff148afb4571c8261fc6335ff623b91c0c
1339: c4937104b85868f2573f185adddbd7f7e4d4ad4df39c3614918a3d2edbd95c5b
1340: 005ded265d90ac28e9c6a98cd97c3ef97ff2562700cf326cedada10fbf1db111
success: 005ded265d90ac28e9c6a98cd97c3ef97ff2562700cf326cedada10fbf1db111
```

由這個結果發現，總計 mining 了 1340 次才得到成功的 hash 值。當 difficulty 提升時，mining 所花的時間也會更多。

例如，當困難度為「前面至少 3 個零」時，mining 的次數就增加到 3093 次。挖礦的困難度在於，產生的 hash 值有一定程度的「隨機」性，通常是不太可預期的。

### Step 6：難度調整

難度調整是 mining 的重要技術。本節暫不涉及這個部份，現階段，可以採用「前面有足夠的零」做為難度設定條件，並使用上述的範例進行練習。

## 更多 Mining 觀念

本節所實作的 mining 演算法，僅只是用來測試的粗淺程式（dirty code）。但透過這 30 行的程式碼，還能很快了解「如何開始設計 mining 的演算法」。

還有更多 mining 的觀念，正等待區塊鏈開發者學習：

1. 前面有足夠的零：這意味著 difficutly 會到一個極限，也就是當前面的零夠多時，表示這個數字可能是最小了，再也無法算出更小的數值了，這表示區塊的數量是有限的，總有一天會挖完所有的礦
2. 挖礦機：執行這段挖礦演算法的電腦（正式說法為節點：node），稱為挖礦機
3. Proof-of-Work：這是來自 Bitcoin 的觀念，大略的意思就是，「大家都同意你真的挖到礦了」，此外還有很多工作要做，像是挖礦機如何彼此間更新並同步資料庫等

Proof-of-work 是一個複雜的系統，除了上述提及的功能外，它還涉及 Peer-to-Peer 的網路技術，這個部份，是區塊鏈開發者的真正挑戰「之一」。

## 小結

下一個階段是加入資料庫功能，並且將目前為止的區塊鏈系統實作成伺服器。





