# 1.5 Design Pattern for Front-End

用白話文來說，「設計模式」就是撰寫程式碼與解決重複問題的一種固定方法。它不是語法，也不是 API，而是一種經過驗證的「思維模板」。在前端開發的領域裡，設計模式扮演著極為關鍵的角色。

隨著 HTML5 與 JavaScript 的普及，開發者在構建大型、模組化的應用時，必須面對複雜的結構與維護成本。這時候，設計模式就不再是選修，而是必修。

在 HTML5+JavaScript 世界中，最核心的兩個設計模式分別是：

- 模組模式（Module Pattern）
- jQuery 插件模式（jQuery Plugin Pattern）

這兩者不僅是「程式碼風格」，更是建構大型前端應用的骨架與規範。沒有這些模式，再多的語法技巧都無法撐起一個穩健可維護的系統。

### 為什麼語法不夠？

要強調一個觀念：只會 JavaScript 語法，是無法寫出高品質前端程式的。會寫 `for`、`if`、`function`，就像會用鋸子跟釘子，還不等於蓋得出一棟好房子。

設計模式正是這些「建築藍圖」，幫助你把語法組合成有結構、有彈性、可維護的工程作品。

這也就是為什麼我們說：

> JavaScript 的設計模式，才是從語法到架構的關鍵橋梁。

---

### 延伸補充：現代前端框架仍以設計模式為根基

即便你日後進入 React、Vue、Svelte 等框架世界，你仍會發現這些框架背後的元件設計、狀態管理、事件機制，本質上仍建立在幾種核心設計模式之上，例如：

- Module Pattern：對應 ES6 modules、Vue 的單檔元件
- Observer Pattern：對應 React 的 useEffect、Redux 的訂閱機制
- Composite Pattern：React 元件樹的合成模型
- Strategy Pattern：狀態管理中的行為切換策略（如 reducer function）

學會這些設計模式，不只是為了寫 jQuery，更是為了理解框架背後的設計哲學與工程抽象。

---

Next: [1.6 Module Pattern](6-module.md)
