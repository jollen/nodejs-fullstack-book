# 8.2 MVC 與 HTML Template Engine

MVC 模式全名為 Model-View-Controller，是一種軟體架構設計模式。透過 MVC 的觀念來重構 NoChat 用戶端網頁，可以實際體會 MVC 所強調的模組分離精神。其中 "V" 代表 View，意指「可視畫面」，即使用者所能看到的內容。

一般而言，View 指的是 Web UI，但更精確地說，它代表 Presentation（視覺呈現層）。UI 是人機介面的一部分，而 Presentation 則是更廣義的呈現概念。這兩者的差異，會在後續探討 MVP 模式時再詳細說明。本節中，將統一使用 Presentation 來代表 View。

MVC 的核心在於「分離呈現層與邏輯程式碼」。在 Express 專案中，`views/` 目錄正是專責存放 Presentation 的位置。這樣的結構設計有助於維護良好的程式邏輯與模組化。

採用 MVC 架構能讓整體程式碼組織更為清晰，開發流程更具可維護性。對大型專案而言，MVC 所帶來的結構性管理優勢特別明顯，例如清楚的檔案分層與目錄階層設計。

Express.js 是一個典型支援 MVC 架構的 Web 應用框架。要實現 MVC 的精神，首要步驟就是導入 Template 概念，並利用 Template Engine 來撰寫 View（HTML5 文件）。

### 學習 Jade 程式語言

目前 Express.js 支援多種 HTML Template Engine，例如：

* hjs
* hbs
* Jade（已更名為 Pug）

在本書的範例中，使用 Jade 作為預設的 Template Engine。Jade 語法簡潔、直覺且易於上手，是撰寫 HTML 結構的極佳選擇，也可視為一種 HTML Template 程式語言。建議讀者熟悉其基本語法。

以下透過三個練習，快速掌握 Jade 的語法特性。完整語法可參考官方文件：
[http://jade-lang.com](http://jade-lang.com)

![圖 8-2 Jade 是一個 Template Engine](../images/figure-8_2.png)

### Exercise 1：<h1> 大標題

首先，新增一個 HTML 頁面。原始 HTML 寫法如下：

```
<h1>Hello World!</h1>
```

改寫為 Jade 語法：

```
h1 Hello World!
```

將上述內容儲存為 `views/hello.jade`。可以看出，Jade 使用縮排語法來代表 HTML 標籤，省去了結尾標籤的繁瑣，語法極為簡潔。

### Exercise 2：<p> 段落

若要加入段落文字，HTML 寫法為：

```
<h1>Hello World!</h1>
<p>這是一個文章段落。</p>
```

改寫為 Jade：

```
h1 Hello World!
p 這是一個文章段落。
```

只要熟悉 HTML 標籤，便能快速理解 Jade 的對應語法。

### Exercise 3：完整 HTML5 文件

標準的 HTML5 文件需包含 doctype 宣告、`<html>`、`<head>`、`<body>` 等元素。在 Jade 中，也能以簡潔語法完成。

修改 `hello.jade`，內容如下：

```
1 doctype 5
2 html
3   head
4     title= title
5   body
6     h1 Hello World!
7     p 這是一個文章段落。
```

![圖 8-3 hello.jade 輸出結果](../images/figure-8_3.png)

圖 8-3 為 Jade 輸出的 HTML 結果。若檢視原始碼，將會看到如下內容：

```
<!DOCTYPE html><html><head><title>學習 Jade</title></head><body><h1>Hello World!</h1><p>這是一個文章段落。</p></body></html>
```

Express.js 預設會輸出經過最小化處理的 HTML 文件。

至於如何使用瀏覽器開啟這個 Jade 檔案，則需先學會設定 URL Routing，這將在下一節說明。

---

Next: 8.3 解析 app.js
