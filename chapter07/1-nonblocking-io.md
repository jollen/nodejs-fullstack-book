# 7.1 認識 Non-blocking IO

要繼續深入 Node.js 開發，許多 Node.js 的觀念必須陸續建立起來。對初學者來說，最重要的莫過於 Non-blocking IO 的觀念。

Node.js 的網站上，以精簡的 2 個特色來說明其技術特色：

- Event-driven
- Non-blocking IO

第一個特色，在第 1 章做過介紹，以 Event Loop（Event-driven）的觀念來取代 Multi-thread。第二個特色，則是 Node.js 最重要的技術。要了解 Non-blocking IO 的觀念，只要練習做一個題目即可：檔案讀取。

![圖 7-1：Node.js 官網](../images/figure-7_1.png)

用 Node.js 撰寫二個範例：

- 讀取一個檔案
- 讀取多個檔案

看似簡單的二個題目，思惟邏輯卻經常困擾 Node.js 的新手，特別是從 C/PHP/Java 語言，進入 Node.js 程式設計的初學者。

範例程式可由 Github 取得：

https://github.com/jollen/nodejs-readfile

再繼續進行前，大家不妨使用 C/PHP/Java 任何一個語言，撰寫「讀取多個檔案」的程式，並搭配本章的範例，進行觀念的探討。

## Node.js File System

Node.js 提供 File System 模組，支援檔案的讀取等功能。參考 Node.js 的 API 手冊，找到 [*fs.readFile()* 函數][1]：

~~~~~~~~
fs.readFile(filename, [options], callback)
~~~~~~~~

*readFile()* 的第三個參數，是一個 Callback Function，這就是第 5 章所介紹的 Lambda 觀念。為什麼要傳遞 Callback Function 做為參數呢？這要從 Non-blocking IO 的觀念說起。

[1]: http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback

典型的 C/PHP/Java 語言，都支援同步式的 File System 操作。例如，從 C/PHP/Java 語言進到 Node.js 開發的初學者，可能會寫出這段程式碼邏輯：

~~~~~~~~
fs.readFile('hello.txt', data);
console.log(data);
~~~~~~~~

請注意，這只是一段虛擬碼，並不能執行。這段虛擬碼的想法如下：

- 呼叫 readFile() 來讀取 'hello.txt' 檔案
- 讀取的內容放到 *data* 變數
- 然後將 *data* 變數的內容（檔案內容）送出

這是一個循序邏輯（Procedure）的觀念。Node.js 的 *readfile()* 是非同步式操作，也就是 Non-blocking IO 的觀念。Node.js 並不會等到 *readFile()* 完成工作後，「才繼續往下執行」，而是「立即往下一行執行」。

也就是說，當下一行執行時，*readFile()* 可能還在讀取 'hello.txt' 檔案。所以 *console.log()* 不一定能印出完整內容。*data* 變數也有可能是空的。

Node.js 的特色是支援 Non-blocking IO：它不會等到 IO 完成後，才往下執行。所以，完成檔案讀取時，很可能程式碼已經執行到非常後面了。要如何知道檔案已讀取完成呢？*readFile()* 完成工作後，就會 Callback 我們指定的函數。如此一來，就知道檔案已經讀取完成了。

正確的程式實作如下：

~~~~~~~~
var fs = require('fs');

fs.readFile(filename, 'utf8', function(err, data) {
    console.log("[DATA] " + data);
});
~~~~~~~~

Callback Function 是一個暱名函數（Lambda），當它被呼叫時，表示已完成檔案讀取，並且收到二個參數。根據 Node.js 的手冊，第二個參數存放讀取到的內容。

了解 Non-blocking IO 的觀念後，就會知道以下是一個錯誤寫法：

~~~~~~~~
var fs = require('fs');

fs.readFile(filename, 'utf8', function(err, data) {
});

console.log("[DATA] " + data);  // 錯誤寫法
~~~~~~~~

這就是 Node.js 最重要的觀念：Non-blocking IO，實作上，搭配 Callback Function 的觀念。

---

Next: [7.2 非同步式讀取多個檔案](2-readfile-async.md)
