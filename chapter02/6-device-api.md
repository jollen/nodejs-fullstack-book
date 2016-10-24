# 2.6 Device API 的革命時代

HTML5 應用程式大致可分為：Web App 以及 Mobile App。HTML5 本來就是「Web Application」的概念，這是它的核心思想。當然，在手機上使用瀏覽器也能執行（瀏覽）Web 應用程式；開發者可以將瀏覽器做適度的封裝，例如：去除網址列，這會讓使用者「好像在使用 Native 應用程式」一樣。沒錯，HTML5 在 Mobile 應用程式的價值，就是提供與 Native應用程式「相同」的體驗。

不過，Web App 與 Mobile App 的概念已經糊模化了。事實上，Web App 可以很容易封裝成 Mobile App：只要有好的 Responsive Design 與 Web Service 設計。

要讓 HTML5 Mobile 應用程式，在手機上表現出 Native 應用程式的體驗，有一個很重要的條件，就是：HTML5 能存取 Device API。更簡單一點，要想辦法使 JavaScript 呼叫底層的手機 API。例如，在 Android 手機上，透過 JavaScript 去呼叫作業系統的 Java API，即 Device API。
這是頭一遭，能使用「做網頁的方式」來做出「手機應用程式」。使用 JavaScript 呼叫 Device API 的技術，幾年前出現了，它叫做 PhoneGap。

PhoneGap 技術的概念，就是填補瀏覽器與手機間的隔闔（Gap）。

這一定是一場革命，如果能用做網頁的方式來做出手機應用程式，代表不久的未來，設計師也能輕易開發手機應用程式。做技術的人來做應用程式，和設計師來做應用程式，不需要多加思考，也能知道設計師比技術人員更適合做出絕佳的應用程式，因為這是 UI 與 UX 當道的時代。

HTML5+JavaScript+PhoneGap 讓這場革命成形了。Adobe Systems 公司看出了 PhoneGap 的未來價值，所以它在 2011 年底，收購了 PhoneGap 的開發商，並且將 PhoneGap 整合至 DreamWaver 軟體裡。從 DreamWaver 5.5 開始，用 HTML5 製作手機應用程式，變得簡單不過了。

### Native Mobile App 設計模式

使用 HTML5 來製作 Native Mobile App 的重點在於：JavaScript 如何呼叫 Native API。Native API 也稱為 Device API，這是由裝置本身的作業系統所提供的API。

從技術的角度來看，採取了一種 DOM 與 Device API 連結（Binding）的方式，來達到上述目的。

接下來以 Android 作業系統為例， 說明 PhoneGap 的實作原理。Android 作業系統內建的瀏覽器，採用的 HTML 引擎稱為 Webkit，這是由蘋果公司（Apple Inc）所貢獻的開源項目。Android 收錄了 Webkit 做為主要的 HTML 與 JavaScript 引擎，並且將 Webkit 封裝成 WebView 元件，整合至 Android 框架內部。目前，Google 已經開發出自已的 JavaScript引擎，稱為 V8。

WebView 元件提供一個稱之為 addJavaScriptInterface() 的 API，這個 API 就是 PhoneGap 的核心

DOM（Documtnt-Object Model）是 JavaScript 存取 HTML 文件的物件模型，簡單來說，透過 DOM，JavaScript 便能存取網頁裡的物件。addJavaScriptInterface() 的原理，就是在 HTML 的 DOM 裡加入一個新物件，並且讓這個物件「Binding」到 Java 程式碼裡。

意思是說，這裡有一個連接 DOM 與 Java 層的物件，JavaScript 透過這個物件，就可以存取到 Java 層。addJavaScriptInterface() 是 DOM-to-Java 的 binding 實作。以下是 addJavaScriptInterface()的實作範例：

同樣的原理也可以應用在其它作業系統，例如：iOS、BlackBerry、Bada、Symbian、Window Mobile等。所以，使用PhoneGap來開發手機應用程式，可以很輕易達到「Write once, run anywhere」的目標。「寫一次、到處都能執行」是PhoneGap的主要價值，因為應用程式是使用HTML5+JavaScript來製作，在任何有搭載瀏覽器與PhoneGap的裝置上都能執行，並不受制於作業系統。

Android 作業系統採取 Callback object 的方式來實作「DOM-to-Java」，也就是，Java 應用程式裡的 Method，都是被 HTML5 裡的 JavaScript 程式碼所呼叫。所以在實作 Callback method 時，需要注意幾個重點：

- 避免 Long operation
- 避免 Blocking operation
- 避免使用 Java thread 來操作 Callback object

Android 應用程式是單線程（Single thread）模式，這個單一的線程稱為 Main thread（主線程），並且是由 Android DalvikVM 自動產生的。由應用程式自行產生的線程，則稱為 Worker thread。所以，如果在 Main thread 與 Worker thread 裡同時去操作相同的的實例（Instance），例如：Method call，這個實例就必須有能力處理重覆進入（Re-entrancy）的問題。

能處理重覆進入的 Method，也被稱為 Thread-safe method。簡單來說，不是 Thread-safe 的 Method，就只能在 Main thread 裡呼叫使用，不能由 Worker thread 來呼叫。在 Android 作業系統裡，與 UI 有關的 API，都不是 Thread-safe method；意思是說，透過 Worker thread 去操作 UI，並不是正確的做法。

將這個觀念呼應到上述的 Callback object。當 JavaScript 呼叫 Callback method 時，這個 method 如果不是 Thread-safe 的實作，就不能有其它的 Worker thread 來呼叫它。概念上，Main thread 與 Worker thread 是併行（Concurrent）的關係，所以這個現象是可能發生的。

### Open Web Devices 計畫

PhoneGap提供許多「API」給JavaScript開發者使用，透過這些API，JavaScript就可以呼叫Device API。所以，這些JavaScript API就要有標準，這是很容易了解的概念。PhoneGap就自已定義了API標準。

還有另外一個開放源碼的作業系統，也擁有與PhoneGap一樣的概念與技術，這個作業系統就是B2G(Boot-to-Gecko)。B2G也要一套這種API標準。然而，B2G並不採用PhoneGap的API標準，而是結盟電信營運商，成立一個開放標準計畫，來定義API標準。這個計畫就是Open Web Devices(OWD)。

使用PhoneGap或追隨OWD計畫，從商業面來看，並不是一個好主意。不過是PhoneGap或OWD，多少都隱含了一些商業企圖，以及競爭策略。身為設備製造商，「Build My Own」也是我的聰明選擇。

以Android作業系統為例，要做出PhoneGap技術，並不是很難，事實上，對熟悉Android技術的開發者來說，這是沒有技術難度的工作。現在，為大家解密PhoneGap的技術原理。

---

Next: [2.7 重要的資訊交換格式：JSON](7-json.md)
