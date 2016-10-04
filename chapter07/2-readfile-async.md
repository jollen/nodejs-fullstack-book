## 7.2 非同步式讀取多個檔案

以上是讀取一個檔案的範例。現在，讓我們來改寫程式：

- 讀取 index.txt 檔案，index.txt 列出多個文字檔
- 再讀取 index.txt 裡列出的檔案

例如，index.txt 的內容如下：

~~~~~~~~
chapter1.txt
chapter2.txt
chapter3.txt
chapter4.txt
chapter5.txt
~~~~~~~~

再分別去讀取上述共 5 個檔案的內容。撰寫這個練習題，要先分析幾個觀念：

- 以 Line-by-Line 方式讀取 index.txt
- 讀取 index.txt 的動作，是 Non-blocking IO
- 等到 index.txt 讀取完成後，再開始讀取其它檔案
- 如上，在 Callback Function 裡，撰寫「讀取其它檔案」的程式碼

有一個 Node.js 的模組：Node-BufferedReader，可以協助我們做 Line-by-Line 的讀取。必須先安裝這個模組：

$ npm i buffered-reader

用法如下：

~~~~~~~~
 1 var reader = require ("buffered-reader");
 2 var DataReader = reader.DataReader;
 3 
 4 new DataReader ('index.txt', { encoding: "utf8" })
 5     .on ("error", function (error){
 6         console.log(error);
 7     })
 8     .on ("line", function (line, nextByteOffset){
 9         console.log("[LINE] " + line);
10     })
11     .on ("end", function (){
12         // finish reading
13     })
14     .read();
~~~~~~~~

*buffered-reader* 會逐行讀取 'index.txt'，完成單行讀取後，觸發 *line* 事件，並 Callback 一個函數。這部份實作在第 8 行，Callback Function 的第一個參數 *line* 存放讀取到的內容。

接著，將檔名儲存到陣列裡備用：

~~~~~~~~
 1 // the file list
 2 var files = [];
 3 
 4 new DataReader (path + 'index.txt', { encoding: "utf8" })
 5     .on ("error", function (error){
 6         console.log (error);
 7     })
 8     .on ("line", function (line, nextByteOffset){
 9         files.push({
10             filename: line
11         });
12     })
13     .on ("end", function (){
14         // finish reading
15     })
16     .read();
~~~~~~~~

要如何讀取 *files* 陣列裡的檔案呢？只要撰寫一個迴圈即可：

~~~~~~~~
1 for (var i = 0; i < files.length; i++) {
2 	var filename = files[i].filename;
3 
4     fs.readFile(filename, 'utf8', function(err, data) {
5 	    console.log("[DATA] " + data);
6 	});
7 }
~~~~~~~~

這段程式碼，是本章的另一個重點：

- 第 4 行是 Non-blocking IO
- 所以不會等到 *readFile()* 讀完檔案，會立即往下執行，進入下一個迴圈

這個迴圈並不會因為「讀取檔案」，而花費太多的執行時間，這就是 Node.js 能做到「efficient」與「real-time」的關鍵。完整的程式碼如下：

{title="readfile.js"}
~~~~~~~~
 1 // public modules
 2 var util = require('util');
 3 var fs = require('fs');
 4 var reader = require ("buffered-reader");
 5 var DataReader = reader.DataReader;
 6 
 7 // the file list
 8 var files = [];
 9 
10 /**
11  * Use BufferedReader to read text file line by line.
12  *
13  * See: https://github.com/Gagle/Node-BufferedReader
14  */
15 var getFilelist = function(path, cb) {
16     new DataReader (path + 'index.txt', { encoding: "utf8" })
17         .on ("error", function (error){
18             console.log (error);
19         })
20         .on ("line", function (line, nextByteOffset){
21             files.push({
22                 filename: line
23             });
24         })
25         .on ("end", function (){
26             cb(files);
27         })
28         .read();
29 };
30 
31 // Application
32 getFilelist('manuscript/', function(files) {
33     for (var i = 0; i < files.length; i++) {
34     	var filename = 'manuscript/' + files[i].filename;
35 
36         fs.readFile(filename, 'utf8', function(err, data) {
37     	    console.log("[DATA] " + data);
38     	});
39     }
40 });
~~~~~~~~

以下是執行結果：

~~~~~~~~
[DATA] This is chapter 1.

[DATA] This is chapter 2.

[DATA] This is chapter 3.

[DATA] This is chapter 4.

[DATA] This is chapter 5.

~~~~~~~~

要特別注意的是，上述的訊息順序是「非確定性」。由於 *readFile* 是 Non-blocking IO，所以「先讀取的檔案」，不一定「先完成讀取」。例如，'chapter1.txt' 的檔案很大時，就可能比其它後續的檔案，更晚完成讀取。