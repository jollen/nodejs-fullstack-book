# 8.5 Middleware 的觀念

在 Express.js 中，Middleware（中介處理器）是一種在「請求」與「回應」之間插入邏輯處理的機制。這個概念類似於插件（Plugins），但其運作方式更具有流程導向與層層堆疊的架構設計。

Middleware 架構能帶來兩個核心優勢：

* 允許開發者在特定 URL 的處理流程中插入額外的前置邏輯（如驗證、記錄、轉換等）
* 讓程式邏輯更具模組性與可控性，形成可重用的功能鏈（Function Chain）

### URL Plugins？

「URL Plugins」是筆者為說明 Middleware 概念所創的比喻性說法。實際上，在正統軟體架構理論中並無此詞。不過，它能幫助我們理解：Express 允許為單一路由「無限量」疊加處理邏輯，就像在 URL 上掛載多個插件一樣。

這樣的架構，對於像使用者系統（User System）這類應用特別有用。例如：

當用戶請求 `/admin` 頁面時，系統可以先通過一層 Middleware 驗證使用者是否登入，若成功，才進一步交由該路由的主處理函式（Handler Function）繼續處理。

### Middleware 的兩種實作方式

Middleware 的最大特性，是具備「可組合的執行鏈」：每一層 Middleware 處理完畢後，若呼叫 `next()`，控制流程便會繼續傳遞給下一層。

以下為 Middleware 的基本流程圖：

```
[Request] 
   ↓
Middleware A
   ↓ next()
Middleware B
   ↓ next()
Route Handler
   ↓
[Response]
```

每一層都可以選擇：要不要處理？要不要往下傳？這種語意性設計，就是 Express 架構的靈魂之一。

Express 提供兩種主要的 Middleware 註冊方式：

#### 1. 全域 Middleware

使用 `app.use()` 函數來註冊對所有請求生效的 Middleware。

```js
app.use(function(req, res, next) {
  console.log('這是一個全域 Middleware');
  next();
});

📌 **注意：** Middleware 若未呼叫 `next()`，且也未送出回應（如 `res.send()` 或 `res.render()`），請求流程將會中斷，導致瀏覽器無法獲得回應。每個 Middleware 必須明確「處理」或「傳遞」。
  console.log('這是一個全域 Middleware');
  next();
});
```

#### 2. 區段 Middleware

使用 `app.get()`（或 `app.post()` 等）在特定路由中插入 Middleware，作為處理鏈中的第二個參數：

```js
function checkLogin(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

app.get('/admin', checkLogin, function(req, res) {
  res.render('admin');
});

📌 **順序原則：** Express 中的 Middleware 會依註冊順序依序執行，這表示前置驗證邏輯（如登入檢查）應位於靠前位置，而錯誤攔截等可放於流程後段。順序即邏輯，這是 Middleware 的工程美學之一。
  res.render('admin');
});
```

上述程式中，`checkLogin` 函式就是一個 Middleware。當請求進入 `/admin` 路由時，它會先執行 `checkLogin`，通過驗證後才交由下個處理函數渲染畫面。

Middleware 架構讓我們可以用堆疊式邏輯構建處理流程，既符合工程結構，也提升可維護性。

📌 **觀念統整：**
在 Express 架構中，`res.render()` 是負責輸出畫面的行為，而 Middleware 則是處理請求語境（如登入狀態、資料驗證、權限過濾）的中介層。這兩者分工清晰——**一者是輸出結果，一者是決定是否能進入該輸出。**

📌 **系統觀提醒：**
`app.js` 不只是應用主程式，它同時也是 Middleware 註冊的中控中心。從 `app.use()` 到每一條 `app.get()` 的 Handler，每一層 Middleware 都是透過這個檔案串連整個應用的語意處理鏈。

---

### 小結：從 MVC 看 Middleware 的角色

在 MVC 架構中：

* **Model** 處理資料
* **View** 呈現畫面
* **Controller（或 Routing + Middleware）** 處理流程與決策

Middleware 正是 Controller 的延伸——**它不負責資料與畫面，而是守住語境與流程的關卡。**

理解這層責任邊界，將有助你設計出結構清晰、語意穩定的 Web 應用。

下一章將深入實作 Middleware，包含自定義驗證邏輯、資料轉換、錯誤攔截等進階應用。
