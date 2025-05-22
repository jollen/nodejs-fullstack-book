## 11.1 呼叫 REST API —— 使用 jQuery（重構版）

WebSocket 負責即時通訊，REST API 則專責資料交換——現在是時候從 Client 端出發，完成語言層整合了。

> 在第 9 章，我們透過 Express.js 設計出具結構的 REST API，包括 middleware、route handler 與模組化的 `routes/discussion.js`。這些結構，讓我們得以穩定地接收與傳回資料。
>
> 而現在，我們要把這些後端邏輯「變得可見」——透過前端畫面，讓每一次資料傳遞，成為使用者可參與的互動。

> 在第 10 章，我們定義了清楚的 REST API 架構，但那只是語言協議的第一層。到了這一章，我們開始把 API 呼叫具體實作在「UI 行為」中，讓使用者成為這個資料協議的一部分。
>
> 簡單說：**REST API 不再只是給開發者看的，它開始成為使用者的語意界面。**

我們在上一章的 `nodejs-chat` 專案中，已完成基本的 REST API 設計。接下來要進一步處理的是 Client Application，也就是如何從瀏覽器端呼叫這些 API 並顯示結果。

RESTful 架構之所以重要，關鍵在於它讓 Client 可以用統一方式存取 Web Service。這代表我們能自由選擇 Client 技術，而不需要被伺服器的語言或架構所綁定。

> 本章的目標是讓 `nodejs-chat` 專案真正成為一個能即時互動的聊天室應用。我們將補齊前端頁面，讓它能完整串接 REST API，並為下一步導入 WebSocket 打好基礎。

### 從這一章開始：你就是一位 Fullstack 初學者

> 前十章，你學會了建構 Web 應用的伺服器端邏輯，設計 REST API、處理路由、操作非同步流程……但那還不夠。Fullstack 的門，不是由後端打開的，而是從「能讓使用者操作你的程式」那一刻才算啟動。

在這一章，你開始負責 Client 端畫面、按鈕、事件、資料回傳與渲染。也就是從「背後的工程」走進「眼前的操作」。

Fullstack 開發不是同時學兩種語言，而是學會兩種責任的連接方式——

* **後端是邏輯引擎**
* **前端是語意界面**

這也是為什麼從這一章開始，我們稱你為 **Fullstack Beginner**。

你不是會寫兩邊，而是開始設計「兩邊的語意互通」。

### 為什麼從 jQuery 開始？

本章將採用 jQuery 開發 Client Application，並暫時不採用 MVC 架構。為什麼要這樣做？因為這樣可以先讓讀者觀察一個關鍵現象：**當應用逐漸變複雜時，MVC 架構就成為不可或缺的思惟工具。**

我們不是直接導入架構，而是用「比較與體驗」來強化理解。這樣的過程，正是學習軟體設計的重要一環。

### Client 端的角色：Presentation 層

回顧前一章，我們提到 Presentation 層位於 Client 端，也就是 UI 的呈現與互動邏輯。若將這觀念延伸至 Mobile App，就會發現它更為清楚：

* 在 Android 上，Presentation 可能是 XML Layout 或 HTML5 畫面
* 在 iOS 上，則可能是 UIKit View 或 WebView 裡的 HTML5 頁面

在這樣的語境下，Client Application 就是介於使用者與 REST API 之間的語意中介層。製作 Client Application：六個步驟

### Step 1：建立專案結構

在 `nodejs-chat` 專案中新增 `client/` 子目錄，並建立以下結構：

```
.
├── chat.html
├── images
├── javascripts
│   ├── app.js
│   ├── bootstrap.min.js
│   ├── jquery.min.js
│   └── jquery.websocket.js
└── stylesheets
    └── bootstrap.min.css
```

這是一個典型的 Web Application 前端結構。接下來，我們會將 REST API 呼叫程式碼寫入 `app.js`，並使用 Bootstrap 製作 UI。

### Step 2：建立 UI

Bootstrap 是前端工程常用的 CSS Framework，也包含許多視覺元件與排版樣式。

筆者使用 [Layoutit](http://www.layoutit.com) 產生了初版 UI，讀者也可自行設計。下圖為 UI 初稿：

>

將產生的 HTML 貼入 `chat.html`。程式碼略過，此處不重述。

> UI 建議補強：請在 `chat.html` 中預留一個輸入欄位與送出按鈕，以便後續實作「送出訊息」功能。例如：

```html
<input id="input-message" type="text" placeholder="輸入訊息...">
<button id="btn-send">送出</button>
<div id="message"></div>
```

### Step 3：呼叫 REST API 取得訊息

我們使用 jQuery 的 `ajax()` 函數來呼叫 `GET /discussion/latest/3`。原本在終端機用 `curl` 測試：

```
$ curl -X GET http://localhost:3000/discussion/latest/3
[{"message":"hello3"},{"message":"hello4"},{"message":"hello5"}]
```

現在，我們將其改寫為程式碼，放入 `initSubmitForm()` 中：

```javascript
const initSubmitForm = () => {
  $.ajax({
    url: 'http://localhost:3000/discussion/latest/3',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      $('#message').empty();
      dataMapping(data);
    },
    error: (xhr, status, err) => {
      console.error(`讀取訊息時發生錯誤：${status}`, err);
    }
  });
};
```

### Step 4：處理 JSON 與套用 HTML5

為了完整呈現留言內容，我們將 API 回傳的 JSON 映射至頁面上的 `<div id="message">` 區塊。

```javascript
const dataMapping = (data) => {
  const reversed = [...data].reverse();
  reversed.forEach(item => {
    const htmlCode = `
      <div class="alert alert-dismissable alert-info">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h4>jollen</h4>
        ${item.message}
      </div>`;
    $('#message').append(htmlCode);
  });
};
```

> 小提醒：若留言順序顯示為由舊到新，可在 `dataMapping()` 中使用 `reverse()` 顯示最新在上方。

### Step 5：補上 HTTP Header 的 Content-Type

在進入 HTTP Header 之前，我們需要先理解什麼是 MIME-type。

#### 認識 MIME-type

MIME 的全名是「Multipurpose Internet Mail Extensions」，原本是為了讓電子郵件能傳送圖片、聲音等多媒體資料所設計，但現在已廣泛用於 HTTP 通訊協定中，作為「告訴瀏覽器或用戶端：這是什麼格式」的標準方式。

每當伺服器回傳資料時，它會在 HTTP 回應標頭（Header）中加入 `Content-Type`，說明傳回的是：

* 純文字？（text/plain）
* HTML 文件？（text/html）
* 圖片檔案？（image/png）
* JSON 格式？（application/json）

如果伺服器沒有正確告知，瀏覽器可能就不知道如何解析這份資料，甚至會誤判為檔案下載或錯誤訊息。

#### 為什麼需要加上 Content-Type？

在我們的 REST API 中，回傳的資料是 JSON 格式，因此瀏覽器端（jQuery 的 `dataType: 'json'`）需要伺服器明確告訴它：「這是一段 JSON」。

為了讓這個語意協議正確發生，我們需要在 Express 的程式中補上：

請確保 `routes/discussion.js` 中的所有 API 都正確加入：

```javascript
res.writeHead(200, {"Content-Type": "application/json"});
```

這能讓瀏覽器清楚解析 JSON，也為後續跨平台互通打好基礎。

### Step 6：送出訊息的功能

我們在 UI 中已加入輸入欄位與按鈕。現在要為它加入 jQuery 事件處理，並呼叫 REST API `POST /discussion/:message`：

```javascript
$(document).ready(() => {
  initSubmitForm();

  $('#btn-send').click(() => {
    const msg = $('#input-message').val();
    if (!msg) return;
    $.ajax({
      url: `http://localhost:3000/discussion/${encodeURIComponent(msg)}`,
      type: 'POST',
      dataType: 'json',
      success: () => {
        $('#input-message').val("");
        initSubmitForm(); // 重新載入留言
      },
      error: (xhr, status, err) => {
        console.error(`送出訊息時發生錯誤：${status}`, err);
      }
    });
  });

  // 使用 Enter 鍵觸發送出
  $('#input-message').keypress(e => {
    if (e.which === 13) {
      $('#btn-send').click();
    }
  });
});
```

### Step 7：如果想要即時功能，該怎麼做？

目前為止的 `nodejs-chat` 並不具備「即時」的能力。所有訊息的更新都來自手動觸發 REST API，這屬於「輪詢式」的互動方式。

如果想要讓聊天室具備即時性（Real-Time），其實只需要加入 WebSocket 機制即可：

* Client Application 在開啟時，與 Server 建立 WebSocket 連線
* Server 在收到新訊息後，透過 WebSocket 發出通知（Notification）給所有 Client
* Client Application 接收到通知後，再呼叫 REST API，取得最新訊息並顯示於畫面上

這樣一來，Client 就不用頻繁地手動刷新，而是由 Server 主動發出「有新資料了！」的事件。

這也讓我們看到 REST API 與 WebSocket 的角色分工：

* **REST API 負責資料的交換與邏輯控制**
* **WebSocket 則作為觸發通知與即時同步的機制**

WebSocket 的加入，將會在下一章開始實作。

## 小結：從 jQuery 到 MVC 思惟

我們完成了一個重要的任務：從 REST API 呼叫，到 Client Application 呈現，並完成了「送出與接收留言」的基本互動流程。

這也標誌著 `nodejs-chat` 專案，正式升級為可運作的聊天室應用。

但這段過程也讓我們感受到：

* HTML 與 JavaScript 混合維護困難
* 缺乏資料映射的統一邏輯（目前 `dataMapping()` 只是最初級的語意映射層）
* 缺少元件化與事件導向設計

這正是 MVC 架構要解決的問題。下一章，我們將導入 Backbone.js，重新思考 Client Application 的結構與邏輯。

我們不是在堆砌程式碼，而是在準備一種語言的邏輯框架 —— MVC，不只是模式，而是維護邏輯的最小單元。
