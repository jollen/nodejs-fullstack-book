## 8.5 Middleware 的觀念

Middleware 的觀念與插件（Plugins）很像，開發者可以在 URL Routing 的「中間」加入一個 Middleware。這個架構可以做到 2 個功能：

- 開發者可以為這個 URL 加入額外的處理程序，也就是 URL Plugins 的觀念
- 更簡潔地控制程式邏輯

URL Plugins 是筆者為了說明 Express Middleware 觀念，自行創造的說法，實際上在正規的軟體架構理論中，並沒有這樣的說法。URL Plugins 可以讓開發人員「無限量」地為每一個 URL 加入額外的處理程序。

關於上述的處理程序，最典型的應用案例（Use Case）就是使用者系統（User System）。例如，用戶請求 '/admin' 文件時，可以先透過一個 Middleware 來檢查登入狀態，再交給最後的 Handler Function 處理。

Middleware 的實作分為二個部份：

- 針對所有 URL 加入 Middleware，方式是呼叫 *app.use()* 函數
- 針對特定 URL 加入 Middleware，方式是透過 *app.get()* 函數的第二個參數

關於 Middleware 的觀念與實作，將在第 9 章做介紹。