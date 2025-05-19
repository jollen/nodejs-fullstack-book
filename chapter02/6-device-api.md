## 2.6 Device API 的革命時代

HTML5 應用程式大致可分為：Web App 與 Mobile App。HTML5 起初便是 Web Application 的延伸概念，因此在手機上使用瀏覽器瀏覽 Web App，自然成為其語意延伸。但更重要的是：若能封裝瀏覽器、移除網址列與導覽元素，就能讓 HTML5 Web App 提供近乎 Native App 的使用體驗。

這代表著：Web App 與 Mobile App 的邊界，正在模糊化。只要設計得當（例如具備 Responsive Design 與良好的 Web API 設計），Web App 就能輕鬆轉化為 Mobile App。

要實現這種體驗關鍵是什麼？答案是：HTML5 能否存取 Device API，也就是讓 JavaScript 能呼叫作業系統底層提供的硬體功能。

### 用 JavaScript 做出 Native App？

這正是 PhoneGap 所實現的突破。這項技術的核心概念，就是在 JavaScript 與裝置作業系統之間，建構一個橋梁，讓網頁也能「控制裝置」。PhoneGap 成為 HTML5 App 跨入 Native 行列的語意轉譯器。

這也開啟了一場革命——當設計師也能製作應用程式，當 HTML5 變成 UI 與 UX 的交會語言，當前端能伸入裝置層，那麼：App 的創作權不再專屬工程師。

Adobe 在 2011 年收購 PhoneGap，並將其整合進 Dreamweaver，從此寫 App 的入口，變成一套熟悉的 HTML 編輯器。

### Native Mobile App 的 Binding 模式

PhoneGap 的技術關鍵，在於「JavaScript 如何呼叫 Native API」。以 Android 為例，Android 使用 Webkit 作為 HTML/JS 引擎，並將其封裝成 WebView 元件。這個 WebView 透過 `addJavaScriptInterface()`，讓 JavaScript 能夠存取 Java 層方法。

這是一種 DOM-to-Java Binding 的實作方式。

舉例來說：在 HTML DOM 中註冊一個 JS 物件，並將它對應到 Java 類別，透過這個物件，JavaScript 就能直接呼叫該類別中的方法。這讓 UI 層語言（JS）得以跨越界面存取邏輯層語言（Java）。

PhoneGap 的這個核心機制，在 iOS、BlackBerry、Symbian 等作業系統也有對應實現，透過這種方式，實現 "Write Once, Run Anywhere" 的跨平台開發目標。

### Callback 與 Thread 安全

值得注意的是，在 Android 的執行模型中，JavaScript 呼叫的 Callback method 必須 Thread-safe。Android 採單主線程架構（Main thread 由 DalvikVM 自動建立），若主線程與 Worker thread 同時存取非 Thread-safe 的方法，將導致錯誤或競爭條件。

這也是為何與 UI 操作有關的方法，不能從 Worker thread 呼叫。設計 Callback Object 時，必須特別留意：

* 避免 Long operation
* 避免 Blocking
* 避免 Thread 混用導致非預期行為

### 開放裝置語言的競爭策略：OWD vs. PhoneGap

PhoneGap 提供了一組 JavaScript API，讓開發者透過這些 API 呼叫底層 Device API。但 API 需要標準，PhoneGap 先行制定了這套規格。

B2G（Boot-to-Gecko）是一套 Mozilla 發展的開源作業系統，也採取類似機制，但它不採用 PhoneGap 的規格，而是攜手電信商成立 Open Web Devices (OWD) 計畫，自訂一套 API 標準，作為推廣與競爭策略。

無論是 PhoneGap 或 OWD，背後皆是「語意標準的主權競賽」。誰定義 API，誰就掌握語言與裝置的溝通權。

對設備製造商而言，「Build My Own」也許才是更聰明的選擇。以 Android 為例，自行建構一套 DOM-to-Java Bridge 並不困難，PhoneGap 技術原理本身就是可被解構與仿製的。

所以與其爭論哪個框架該跟，或許更重要的是：你是否能定義你自己的語意結構。

---

Next: [2.7 重要的資訊交換格式：JSON](7-json.md)
