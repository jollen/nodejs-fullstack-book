# 第 7 章：軟體思惟 - Non-blocking IO 篇

## 開始閱讀

 * [7.1 認識 Non-blocking IO](1-nonblocking-io.md)
 * [7.2 非同步式讀取多個檔案](2-readfile-async.md)

## 本章小結

根據筆者的教學觀察，Non-blocking IO 與 Callback Function 的觀念，是原本 C/PHP/Java 程式設計者，跨入 Node.js 開發的一個障礙。要克服這個障礙，就要建立 Non-blocking IO 的觀念，並訓練程式設計邏輯。這和 Procedure 式的執行行為有很大的不同。

Non-blocking 的觀念，也稱做 Wait-free。利用 Wait-free 的觀念來實作 Web Service 的話，可以達到較佳的 Concurrency 處理能力；例如：提昇「Requests per Second」，增進 Server 的處理性能。
