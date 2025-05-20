# 8.2 MVC 與 HTML Template Engine

MVC 模式，全名 Model-View-Controller，是一種常見的軟體架構設計方法。我們透過 MVC 的觀念，重新設計 NoChat 的用戶端網頁時，能更直接體會其精神所在。當中的 "V" 指的是 View，代表「使用者所見的畫面」。

一般來說，View 對應的是 Web UI；但更精確地說，View 是 Presentation（呈現層）。UI 與 Presentation 在概念上並不全然等同——這一點，我們將在後續探討 MVP 模式時再行深入。以下章節中，皆以 Presentation 作為 View 的語意描述。

MVC 的核心精神是將程式邏輯與呈現層（Presentation）分離。Express 框架中預設產生的 `views/` 目錄，就是為了存放 View 的內容。這樣的結構，有助於維持乾淨、模組化的程式架構，使程式設計者能更有效地管理與維護專案。

MVC 架構在軟體工程中扮演著重要角色，它不僅提升程式碼的可讀性，也強化了整體專案的邏輯組織，例如：更清晰的目錄階層與責任分工。

Express.js 是一個支援 MVC 模式的 Web Application 框架。若要充分展現其 MVC 精神，首要工作就是導入 Template 的觀念，並透過 Template Engine 撰寫 HTML5 View。

### 認識 Pug Template 語言

市面上有多種 HTML Template Engine，Express.js 支援的選項包括：

* hjs
* hbs
* Pug（原名 Jade）

NoChat 專案採用 Pug 作為預設的 Template Engine。Pug 是 Jade 的繼任者，不僅延續其簡潔易懂的語法，也修正了命名與套件管理上的衝突。Pug 提供優雅且具結構性的方式來撰寫 HTML 模板，非常適合 MVC 架構下的 View 開發。

Pug 的基本語法相當直觀，以下將透過三個練習範例，快速掌握其核心概念。如需進一步學習，可參考官方網站：

[https://pugjs.org](https://pugjs.org)

（圖 8-2 Pug 是一個 Template Engine）

### 練習 1：`<h1>` 大標題

以下是範例 HTML5 標籤：

```html
<h1>Hello World!</h1>
```

改寫為 Pug 語法後：

```pug
h1 Hello World!
```

請將這段內容儲存為 `views/hello.pug`。這個範例展示 Pug 對 HTML5 結構的簡化效果，無需書寫結尾標籤，讓開發更為快速簡潔。

### 練習 2：段落 `<p>` 標籤

加入段落標籤的 HTML5 寫法如下：

```html
<h1>Hello World!</h1>
<p>這是一個文章段落。</p>
```

改寫為 Pug 語法：

```pug
h1 Hello World!
p 這是一個文章段落。
```

Pug 的設計理念是：只要你熟悉 HTML5 標籤，就能快速掌握它的轉換方式。

### 練習 3：完整 HTML5 文件

一個完整的 HTML5 文件，應包含 `doctype` 宣告、`html` 主結構、`head` 與 `body` 區塊，這些都能以 Pug 精簡表達。

以下為 `hello.pug` 的完整範例：

```pug
1 doctype html
2 html
3   head
4     title= title
5   body
6     h1 Hello World!
7     p 這是一個文章段落。
```

（圖 8-3 `hello.pug` 輸出結果）

透過 Express.js 渲染後，對應的 HTML 原始碼會是：

```html
<!DOCTYPE html><html><head><title>學習 Pug</title></head><body><h1>Hello World!</h1><p>這是一個文章段落。</p></body></html>
```

Express.js 預設會輸出最小化（minified）版本的 HTML 文件。

---

### Jade 與 Pug 的語法對照表

Pug 為 Jade 的後繼版本，兩者語法高度相容，但命名與部份細節略有差異。以下為常見語法的對照表：

| 功能      | Jade 語法            | Pug 語法             |
| ------- | ------------------ | ------------------ |
| Doctype | `doctype 5`        | `doctype html`     |
| HTML 標籤 | `html`             | `html`             |
| 標題      | `h1 Hello`         | `h1 Hello`         |
| 屬性設定    | `a(href="/") Link` | `a(href="/") Link` |
| 變數輸出    | `title= title`     | `title= title`     |

NoChat 專案全面採用 Pug。若你參考舊版教學或範例程式碼為 Jade，建議更新為 Pug 並參考 [https://pugjs.org](https://pugjs.org) 提供的官方文件。

---

### Express Template 的渲染流程簡介

當使用者透過瀏覽器發出請求時，Express 的 Routing 機制會將該請求導引至對應的 `handler` 函式。而 `handler` 中若執行了 `res.render('hello', { title: '學習 Pug' })`，Express 將會：

1. 前往 `views/` 目錄中尋找 `hello.pug` 檔案
2. 將變數 `{ title: '學習 Pug' }` 傳入 Template 中
3. 由 Template Engine 編譯為 HTML5 文件
4. 最終輸出 HTML 至瀏覽器

這就是 Template Engine 的作用流程，它是實踐 MVC 架構中 View 層分離的關鍵技術。

下一節將探討現階段 app.js 的實作細節，協助你完成前後端整合的完整流程。
