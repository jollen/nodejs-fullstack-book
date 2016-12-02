# 22.1 認識 Merkle Tree

Merkle tree 是一種 hash tree，用來表示 hash 值的資料結構。Merkle tree 的發明人是 [Ralph Merkle](https://en.wikipedia.org/wiki/Ralph_Merkle)，當然這就是這個資料結構的名稱由來。

Merkle tree 的基本結構是 binary tree（二元樹），每一個 non-leaf 的節點（node），都被標示一個 hash 值。

圖 22-1 就是一個 binary Merkle Tree 的結構。

![圖 22-1 Merkle Tree（圖片來源：https://commons.wikimedia.org/wiki/File%3AHash_tree.png，By Davidgothberg at English Wikipedia，遵循 Public Domain 授權）](https://upload.wikimedia.org/wikipedia/commons/6/6d/Hash_tree.png)

學習 Merkle tree 資料結構，可以說是「Blockchain 系統開發者」的第 1 堂課。為什麼這麼說呢？

以圖 22-2 來看，所謂的 Block（區塊）是分散（Distributed）的世界各地，並且區塊間是以一個鏈（Chain）串連在一起，這就是 Blockchain（區塊鏈）的概念與名稱由來。

![圖 22-2 Block 與 Chain](../images/figure-22_2.jpg)

## Block #0

每一個區塊都會有一個編號，如圖 22-3。

![圖 22-3 Block #0](../images/figure-22_3.jpg)

當然就一定會有編號為 0 的第一個區塊，這個區塊就稱之為 Genesis Block（創世區塊），學習如何建立 Genesis Block 就是 Blockchain 系統開發者的第 2 堂課。

## Blockchain 與 Merkle Tree

那 Merkle Tree 是 Blockchain 的關係倒底是什麼呢？將 Blockchain、Genesis block 與 Merkle tree 放在一起討論時，它們的關係就是圖 22-4。

![圖 22-4 Blockchain、Genesis block 與 Merkle tree](../images/figure-22_4.jpg)

如果我發展一個叫做 Jollen's Blockchain 系統時，一個粗略的起步應該就是：

* 建立 Genesis block，genesis block 會有自已的一個編號，這個編號是透過 hash 演算法產生，因此也叫做 hash ID

* 利用演算法，經過一段困難的演算法運算，產生 Block #1

* Block #1 也會有自已的 hash ID，並且利用 Block 裡的 *PreviousHash* 欄位，串接到 Genesis block（Block #0）

* 同理，產生 Block #2 與更多 Blocks，這些 block 之間都用 *PreviousHash* 欄位串接，這條鏈就是 Block *chain*

到這邊，還是很好奇 Merkle tree 的用途啊？回顧圖 22-4 發現，每個 Block 裡面都會有 *Merkle Root* 欄位，這個欄位就是一顆 Merkle tree。

區塊倒底能做什麼呢？每一個區塊，都能用來「記帳」，整個 Blockchain 串接來就是一本完整的帳冊，所以說，Blockchain 也叫做 distributed ledger（分散式帳冊）。

更深入技術來看，區塊裡的 Merkle tree 就是負責記帳的欄位。









