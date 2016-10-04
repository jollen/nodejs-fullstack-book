# 2.3 Web Fullstack 軟體開發的概念

HTML5 不只是技術，它是 Mobile + Cloud 的全新時代。HTML5 重新發明了 Web，現在的 Web 已不同以往。對完全不懂 HTML5 的創業人，本章內容將對您有很大的幫助。  

![圖 2.1：Web Service 導向架構](images/figure-2_1.png)

圖 2.1 把 HTML5 與 Cloud 的關係，做了很簡單的說明。圖 2.1 同時也是 HTML5 軟體開發的起點，這是一張「系統」架構，而不是「應用程式」架構。因為廣意的 HTML5 包含用戶端與伺服器端；目前的用戶端，大多是行動裝置。所以 Mobile + Cloud 正好表達了 HTML5 中心哲學。

HTML5 系統架構屬於 Web Application 的做法，技術上來說，這是 Web 導向架構（WOA, Web-Oriented Architect）。圖 2.1 的重點整理如下：

- Presentation 就是 View，也就是 App UI 的部份。用戶端使用 HTML5/CSS/JS 來打造 UI。
- UI 可以透過瀏覽器，來呼叫底層的 Device API。目前這個部份，需要在瀏覽器引擎裡，整合額外的軟體。目前最知名的 Device API 就是：PhoneGap。
- PhoneGap 技術，讓 JavaScript 可以呼叫到 Device API，HTML5 App 使用 JavaScript 就可以控制硬體。可以想像成：透過網頁來控制硬體。
- 最重要的軟體是瀏覽器，它是應用程式的 Runtime。
- 伺服器端以 NodeJS 打造專用的 Application Server。
- NodeJS Application Server 提供 API：即 Web Service。這些 API 採用 URL 的形式呈現，也稱為 Open API、HTTP API 或 Platform API。技術上，正式的名稱為 RESTful API。
- 用戶端呼叫 Server 的 RESTful API 來存取服務。
- NodeJS 使用 JavaScript，但能存取 I/O，例如：資料庫、檔案等。這是NodeJS 的主要特點之一。
- 用戶端使用 JavaScript，伺服器也用 JavaScript，所以開發者，都用 JavaScript 程式語言：這是一個 All in JavaScript 的時代。
- 以 JSON 格式來交換資料，降低頻寬的使用。

## 從 Web Page 到 Web App

現在，我們可以使用 HTML5+JavaScript 來編寫應用程式，並且以瀏覽器來瀏覽。因此，HTML5 應用程式，說白了就是一種 Web 應用程式，透過瀏覽器來「瀏覽」它。這種使用案例已經存在已久，例如：用瀏覽器打開 Gmail 應用程式，收發郵件。所以，HTML5 應用程式並不是新鮮技術，就是我們所熟悉的 Web 應用程式。

Web 應用程式的執行環境就是瀏覽器。以 Web 技術來製作應用程式的概念、價值與優點就不必多說了，例如：跨平臺、跨裝置等等，就是大家熟悉的優點。試想，不管我是用個人電腦、手機或平板電腦，甚致是電視，只要有瀏覽器、有網路，就可以隨時隨地收發 Gmail。正因為這樣的優點，Web 應用程式有相當大的優點，以及潛在的商業價值。而 HTML5 就是 Web 應用程式的標準，這就是為什麼 HTML5 將成為主流技術、為什麼 HTML5 會走紅，以及為什麼各行各業的每個人，都要學習 HTML5 的原因。

### HTML5 時代來臨

HTML5 的前身，其實是一份稱為 [Web Applications 1.0][5] 的網路標準草案，HTML5 的用途，不言而諭。HTML5 的身世說來可憐，在 HTML5 標準制定將近七年的時間，不太被網路界重視。還好，蘋果已故執行長 Steve Jobs 的高膽遠矚，讓 HTML5 在 2010 年有了強出頭的機會。這是大家知道的知名事件，Apple 官方宣佈不支援 Adobe Flash。

[5]: http://www.whatwg.org/specs/web-apps/2005-09-01/ "Web Applications 1.0"

HTML5 希望未來網路世界，有更加豐富的 Web Applications，這個願景即將成真。有二個原因。第一、HTML5 第一個正式的候選草案版本，將在今年，也就是2012年推出，這代表所有的瀏覽器 (Broswer) 軟體製造商，將會有一份可共同依循的開發標準。這就是業界的鐵則，任何技術標準化後，都能成為「產業標準」。科技業不用懷擬，HTML5 時代來了。

第二個原因、手機。HTML5 是標準的乞丐命、皇帝運，當初提出 HTML5 建議的 Opera Software 萬萬沒想到，2010 年 Steve Jobs 公開支持 HTML5，2011 年智慧型手機又大爆發，這些 iOS & Android 手機對於 Web 的熱切需求，促使 HTML5 有了大躍進的發展。我們不用再懷擬，這一切來的很突然，不過都是真的。

另一波的手機與網路革命展開了，產業生態巨變，一波未平、一波又起。前一波，被來勢兇兇的 Android 作業系統敲得頭昏腦漲嗎？還來不及反應過來的話，繫好安全帶，因為 HTML5 來了。

### All in JavaScript 的時代

歡迎來到「All in JavaScript」的程式樂園。JavaScript 過去曾經在動態網頁製作上紅極一時，後來有一段時間，因為開發人員重視 Server-side 技術的程度，遠勝於 Client-side，因此 JavaScript 又迅速沈寂。

2003 到 2007 年這段時間，應該是 JavaScript 最谷底的時候。而後在 2007 到 2009 年，因為Web 2.0 風格網頁，以及 jQuery 的盛行，再度得到開發者的重視。2010 到 2011 年因為 Mobile Native App 的大量流行，使得眾多開發者不再以 JavaScript 做為首選，再度走入低潮。

### 學好 JavaScript 程式語言

但是，HTML5 來了。jQuery 被大量使用在網頁設計上，不管是視覺效果、特效或使用者介面，因為 jQuery 相當便利的開發模式，讓 JavaScript 再度被重視了起來。再加上 HTML5 在後推了一把，JavaScript 儼然成為今年最受矚目的程式語言。所以，JavaScript 是「王者再臨」的最佳代言人。

現在，JavaScript 的主要用途，已經由過去的動態網頁（Dynamic Webpages），轉為開發 HTML5 App 角色；也就是 HTML5 的應用。我們不僅僅使用 JavaScript 製作有動態效果的網頁，還藉助它來開發大量的 UI interactive、使用者體驗的設計，以及最重要的雲端服務整合。

還有一個很重要的應用，就是「JavaScript in Browser」，也就是利用 JavaScript 來增強瀏覽器的功能，最為大家所熟悉的例子，就是 Google Chrome。Google Chrome 為了增強對 JavaScript 的支援與效能，開發了新的 JavaScript 引擎；在日記「HTML5 在手持裝置將開始爆發式成長」就提到了，「JavaScript 引擎的成熟度是關鍵」。

所以，測試 JavaScript 的使用案例（Use Cases）在各大瀏覽器的效能，更為一項重要的工程工作。更進一步地，由於 JavaScript 現在搭配 HTML5 來開發「軟體」，而不只是用來製作動態網頁，所以研究 JavaScript 的軟體設計模式，當然也就變成一門顯學；目前被廣為推薦的就是「Essential JavaScript Design Patterns」一書。