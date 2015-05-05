# 15. Single-Page Application

雖然真正的（好的）SPA 有諸多細節要考慮，但以 MVC 框架所實作的一頁式網頁（One-page landing page，或稱為 Single-page、單頁式網頁），廣義上來看也是 SPA。也就是說，使用本書所介紹的 Node.js、Backbone.js、Underscore、REST API、one-page frontend 等技術，來打造一個 Web 應用程式的話，就是一個 SPA 的原型。關於 SPA 的觀念，第 16 章會再做歸納整理。

SPA 就是以 one-page 的方式，達到 desktop application 的使用者體驗。但 one-page landing page 不一定是 SPA 的觀念。比如說，美工設計師以 Dreamweaver 匯出的網頁，雖然是 one-page landing page，但卻不是 SPA。

同樣是單頁的網頁，為什麼這樣做就不是呢？第 15 章與第16 章的內容，或許可以幫你找到答案。

SPA 並不是一個技術，而是一種開發模式（model）。開發模式是一套觀念，所以可以整理成一份設計原則（design principles）。接下來，從數個層面，來討論 SPA 的設計原則。

## 原則一：使用 REST 架構



# 16. Web Trends 2015

Web 技術的更迭，是一段精采的歷史。University of Illinois at Urbana-Champaign 在 1993 年發表 NCSA Mosaic 瀏覽器後，人們認為，這是點燃網際網路熱潮的火種。接下來的 Internet、WWW 與 Web 開始改變人類的生活，以及社會文化。

在這 21 年的時間裡，人類發展出非常多與 Web 相關的技術，其中一個里程碑，就是 JavaScript 程式語言。JavaScript 是一種直譯式程式語言，於 1995 年出現，首次發表是內建在 Netscape Navigator 瀏覽器裡。Netscape Navigator 是非常知名的瀏覽器，在這段網路發展史中，有著重要地位。Netscape Navigator 由瀏覽器公司網景（Netscape）所開發，一些人認為 NCSA Mosaic 就是 Netscape Navigator 的前身，但二者的程式碼並不相同。

與 JavaScript 同樣在 1995 年出現的重要程式語言，就是 PHP。這是一個 server-side 的技術，用來內置 script 語言至網頁裡，這也是 PHP 名稱的由來－Personal Home Page。在 1998～2009 的這十年間，是 PHP 發展最驚人的期間，版本從 PHP3、PHP4 到了現在的 PHP5。

這段期間的 Web 開發很多元，除了 PHP 外也有很多 server-side 技術出現，像是：ASP 等。但目前來看，較廣為熟知，並且仍被廣泛使用的技術有：

* 瀏覽器（Chrome、Firefox 與 Safari）
* PHP（主要是 5.x）
* Apache
* MySQL（關聯式資料庫）
* HTML4 標籤語言
* JavaScript
* CSS 2.1 and CSS3
* jQuery and AJAX

大約是 2009~2014 年的五年間，Web 開發技術出現許多轉折。AJAX 技術（實際上是一種觀念）的出現，就是 Web 開發的一個重要轉折，這讓網頁設計師更重視 user interactive 與 user experience。

這五年的技術轉折，更直白的說，是一個過渡時間，更是網際網路的時代交替，讓我們簡單回顧幾個重要的歷史事件：

* 手持裝置時代到來，smart phone 取代 feature phone
* PC 時代結束
* HTML5 規格的制定，與角力戰
* 瀏覽器大戰，最後由 Chrome、Firefix 與 Safari 三分天下

更多的技術轉折：

* JavaScript 進入 server-side 領域，即 Node.js 技術
* HTML5 規格定案
* 三大瀏覽器開始支援 Canvas、WebSocket、WebRTC 等 HTML5 標準
* Frontend 進入 MVC 框架時代
* 創新創業潮，直接帶著更多的新技術出世，例如：Twitter 工程師發表 Bootstrap 框架

近期因為 Microsoft 在其開發工具裡入了 MVP 與 MVVM 架構模式，讓 MVP 與 MVVM 架構成為 Frontend 開發的主流觀念。許多重要的 MVC 框架也在這段期間發表，例如：Backbone.js、Ember.js、Angular.js 等等。MVP 與 MVVM 也可以視為是一種 MVC 架構（或是 MVC 的演進）。

## AJAX 與 SPA

重要的技術轉折之一是 AJAX，它更是重點中的重點。AJAX 的精神在於提升使用性，到了 2006 年時，一個更重要的觀念叫 single-page application 開始被重視。Single-page application 是為了讓 Web application 的使用經驗更像是 desktop application 的觀念，這是一個觀念，而不是新技術。

Single-page application 簡稱 SPA，同樣也是為了提升使用性，而且也是為了解決 AJAX 仍有的一些問題。SPA 讓 Web 從網頁製作（Web pages）的時代，轉變成為 Web 應用（Web applications）的時代。

認識 HTML5 歷史的開發者一定知道，HTML5 先身其實是一份名為 Web Application Standard 的標準，所以 HTML5 同樣也象徵著 Web pages（HTML4）到 Web application 的時代轉換。

更多的新觀念與技術在 2014 年出現，例如：ReactJS、Virtual DOM 等，這讓 Web 開發開始進入後成熟時代，正式脫離上述的「轉折期」。

## 認識 SPA

網站製作已經不只是寫寫 HTML 文件了，而是要用 Web 技術（Web-enabling technologies）來製作應用程式。

關於 Single Page Application（SPA）的討論，較早的學術文章，可以追溯到由 Delft University of Technology 的 Software Engineering Research Group，所發表的一份技術報告：Migrating Multi-page Web Applications to Single-page Ajax Interfaces[1]。Ali Mesbah 與 Arie van Deursen 在這份 2006 年的技術報告裡，提出一個很重要的問題：

"web applications have suffered from poor interactivity and responsiveness towards end users"

這個問題來自傳統的 Web Site 設計模式：「Multi-page」。為解決「poor interactivity and responsiveness」的問題，Single Page Application（以下簡稱 SPA）的設計模式（model）就被提出。從軟體工程（Software Engineering）的角度來看，SPA 必須有一個軟體框架，讓開發者以這個框架為基礎，來進行 Web Site 的開發；從這裡，可以很容易歸納出 2 個結論：

1. 傳統的 Web site 採取多頁式（Multi-page）做法

2. 現在的 Web site 開始轉移到 SPA 的觀念，採單頁式（Single-page）做法

從 Multi-page 到 Single-page，不只是將多個頁面，拼成一個頁面而已，而是提供 User 更偏向 Desktop application 的使用經驗[2]。實際上，將 Single-page 看做「把多個頁面組成一頁就好」是錯誤的觀念。怎麼讓 Single-page 的使用經驗，更像是 Desktop application 呢？第一個步驟，就是要把 UI 從 Server-side 移到 Client-side；第二個步驟，在 Client-side 實作 Application Logic。

這二個步驟就是學習 SPA 的第一課。學習 SPA 最好的方式，就是選擇一套適合自已的 SPA 框架，經由學習這個框架的過程，來理解上述這二個步驟的意義。SPA 觀念的提出，源自 AJAX 技術的流行；這麼多年來，有非常多能幫助我們實作 Single-page 的技術，甚致只用 jQuery AJAX 也可以做出 SPA。使用 jQuery AJAX 是一個做法，而且不需要學習像是 Backbone.js 或 AngularJS 的框架，但前提是，你要能接受不斷長高的 Callback Hell。當然，也有人把 Callback Hell 當做一個藝術，而樂此不彼。

無論如何，選擇一套 SPA 框架是比較建議的做法。好消息是，現在有許多優雅好用的方案，上述提及的 Backbone.js 與 AngularJS 是當中最知名的框架。

如果你不想殺雞用牛刀，也喜歡 Callback Hell 的自然美，其實可以在 Backbone.js（或其它框架）或 AJAX 之間做選擇。但差別在哪裡呢？以 Backbone.js 為例，它提供一些重要的機制：

1. Client-side URL Routing

2. Data Model

3. Model State

4. 整合 REST API

5. etc.

現在 Frontend 都要整合 REST API，所以使用 Backbone.js 會讓開發工作更便利、也更簡省時間。

O'Reilly 不久前出版了一本書，書名為：Developing Backbone.js Applications－Building Better JavaScript Applications[3]，更是直接了當地介紹，如何使用 Backbone.js 來製作 Single-page Application (SPA) Model 的 Web frontend。

美工設計師以 Dreamweaver 匯出的網頁，為什麼這樣做就不是 SPA？例如，如果需要與 server-side 的資料同步，這樣的網頁並沒有 data binding 的能力。要有 data binding 的能力，就要有一個 data model 的框架。這個例子就是一個很好的解釋。

所以，只有平面設計的技能，現在並不足以幫助我們製作 SPA；換個角度來說，frontend 製作，並不是用 Photoshop 等平面設計的工具，將設計好的 UI 製作成 HTML 文件。frontend 與 art design 工作內容不同。比如說，frontend 需要以 JavaScript 來撰寫 application logic，或是呼叫 REST API；正因為 frontend 開發需要整合 REST API，所以最好能懂一點 backend 的知識。這就是為什麼近年來，full stack 開發受到重視的原因。Art design 的工作可能只涉及美術設計。

Frontend 的製作，並不是規定一定要使用 single-page 的模式，但是從 user experience 的角度來看，讓 frontend 的操作就像是 desktop application，似乎是一個很棒的選擇。如果 frontend 的 user experience 就像是 desktop application，更可以使用打包工具，將 Web frontend 打包成手機 App，還可以上架到商店。

所以，想要學習網站製作嗎？不如直接以 SPA 模式，開始你的第一個 Web app（Web site）吧。網站製作，已經不是以前的網站製作觀念了。

## 認識 React

React 是由 Facebook 與 Instagram 團隊共同推出的技術，用來製作 UI。與 UI 有關的框架已經這麼多了，為什麼還要再做一個新技術？這個問題，涉及到 MVC 框架技術的演進與改良，後文另行說明。

React 是 MVC 框架中的 V，也就是 View 的部份，並且採用一個稱之為 virtual DOM 的技術。

## JavaScript 應用程式架構的發展

從架構層面來看，使用 JavaScript 開發 large-scale applications 的方式，過去幾年至少有一個根本的做法改變了[2]。這是出自 Addy Osmani 文章上的說明。Addy Osmani 是 Google 的資深工程師，也是非常知名的開發者，Google 的 Web Starter Kit 就是出自 Addy Osmani 之手。

[2]: https://medium.com/@addyosmani/javascript-application-architecture-on-the-road-to-2015-d8125811101b

Addy Osmani 說：

On an architectural level, the way we craft large-scale applications in JavaScript has changed in at least one fundamental way in the last few years. 

這裡提到的「at least one fundamental way」，意思是根本觀念的改變。更直白一點，就是捨棄舊觀念。不但是過去幾年發生一些根本觀念的改變，接下來幾年還會有更多根本觀念被革新。其中一些重要的觀念，像是：virtual DOM、UI composition、data-binding 等，都將在 2015 年成為打造 Web 應用程式的根本做法（fundamental way）。

典型的 MVC 或 MVVM 框架（其體差異後文說明），都是以 template（模板）觀念來實作 V（View），但接下來會轉換為 component（組件）的觀念。主要差異如下：

* Template 是一段 HTML5 的定義，再透過 C（controller）或 VM（ViewModel）來套用
* Template 的套用過程，是一種取代（variable replace）與擴展（for-loop）的觀念
* Component 是一段 meta data 的定義，再透過 C（controller）來顯示
* Component 的顯示過程，是一種 UI 貼合（composition）的觀念

以 Backbone.js 為例，開發者會搭配 Underscore 來使用。Underscore 除了處理 data binding 外，也提供 template 系統。也就是說，如果能把 Underscore 換成 React，就能升級至 component 的觀念。

實務上確實如此，而且將 Underscore 換成 React 的過程並不困難。Widget 採用 meta data 的方式來定義元件，採用自訂 XML 標籤是最容易的方式，這就是 React 的做法。

從實作的角度來看，也可以想像成是把 template 封裝為可重用（reusable）的組件。組件不但可重用，而且還是貼合的觀念。另外，component 與 widget（一般翻譯為元件）在軟體架構的層次，仍有一些差異，所以嚴格來說是不同的觀念。

## Composition


## Shadow DOM

Shadow DOM 可以取代典型的 iframe 觀念。要理解 shadow DOM，或許可以從 iframe 的角度切入。


## mBaas

mBaas：改變開發生態、也創造新的 Business 思惟[3]。

[3]: https://www.mokoversity.com/post/mBaas：改變開發生態、也創造新的%20Business%20思惟

mBaas 雖然不是新的概念，但它改變了應用程式開發的思惟。比如說：

* Real-time WebHooks
* Integrate with REST APIs
* Application scalability

WebHooks 是一個 Backend-to-backend 的好模式，例如：在 Github 上的 commits 提交，就可以透過 WebHooks 的方式，通知 Deploy server 做即時的 pull。WebHooks 更可以經由 RESTful 與手機的 Notification 機制整合。

mBaas 對 Mobile app 開發模式，產生有一些重要的改變。當然，也間接影響了 Business model，或創造了更新的 Business model。mBaas 不只是技術上的觀念，也不只是 Infrastructure，更影響了 Business Plan 的方向。

「Change of mobile app」是對 MBaaS 最佳的注解。思考 mBaas 對 Business model 的影響，是創新創業者應具備的新思惟。筆者創辦的 Mokoversity，與大陸的 Bmob 達成一些戰略合作，Bmob 就是提供 mBaas 服務的新創公司。App 開發者是 mBaas 的 User，Bmob 或其它新創公司則是 mBaas 的 Provider，二者的合作，可能會造就新的 Mobile App 生態。

比如說，採用 mBaas 服務，application 立即能享有更大的 scalability：能支撐巨量的流量。

### mBaaS 與 IoT

根據筆者的觀察，mBaaS 商業模式，未來可能在 IoT 領域取得大規模的成功。現在的 mBaaS 供應商，往 IoT 服務平台發展，已經成為一個標準策略。一個 mBaaS + IoT 的平台，應該具備哪些基本功能呢？以下是筆者的一些匯整，供大家參考。

第一、Smart Push Notification。智能手機將 Push Notification 機制運用到極緻，手機用戶也已經很習慣這樣的推送通知機制。從技術的角度來看，Push Notification 在 IoT 架構中，是一種 Physical to Mobile 的使用案例。將 Physical（裝置實體）的數據，推送到手機上，中間需要一個「IoT 通道」。除了現有的 mBaaS 供應商外，未來應該會有大量的新創公司，提供這類型的的服務。

第二、Social Integration。讓 IoT 裝置與社交網路整合也是一個趨勢，例如：Facebook、WeChat、Twitter 等。從技術的角度來看，與社交網路整合是為了加入 OAuth 認證機制，以及將訊息推送至個人社交平台上。另外，筆者認為，IoT 與 Social Networks 的結合，可能會是另外一個 IoT Apps 的呈現形式。

第三、Small Data Analytics。小量資料分析技術，大多實作於裝置端（In-place analysis）。進行小量資料分析的目的，大致可分為：Filtering、Real-Time Notfitication 與 Time-Series Data Push。將一些無效或無用的資料捨棄，技術上並不太困難，可以安裝一個固定的演算模式或模型（Pattern and Models）在裝置上。小量分析與即時推送的結合，比較偏向於警示性質的訊息（Alert），但未來也可能應用在 LWM2M（Lightweight M2M）的情境中。至於 Time-Series Data 則是應用在連續資料的推送，在推送的過程式，可以為資料加註訊息（例如：Timestamp）或記號等。

第四、REST API Broker。IoT 裝置本身會提供一些簡單的 REST API，或是經由「通道」來「代理提供」，因此筆者也認為，REST API Broker（Proxy）服務，未來也將扮演重要的角色。REST API Broker 的另一個重責大任，就是進行 Backend-to-Backend 的整合。例如，知名的 Firebase 服務，就是一個 Backend-to-Backend 整合的平台。未來這樣的平台，也將延伸到物聯網裝置。

第五、Code Generation。對一個以 MCU 為主的 IoT 裝置，自動代碼產生相對應的代碼，可能是一個重要的機制。例如，Temboo 就提供這樣的服務。從「物聯網裝置」的角度來看，Code Generation 的重要性，應該略大於「視覺化編程」；因為物聯網裝置，不只有 GPIO 控制的功能，也會有網路與演算法的能力。因此，Code Generation 其實是一種 Code Template 的服務，等於是開發者的「懶人包」。另一個需要 Code Generation 的原因是，IoT 裝置會與 mBaaS 或 REST API 做整合，這些程式碼直接由系統產生即可。

第六、IoT Apps Hosting。將 Physical 包裝為 App 將是一個潮流，目前提供相關服務的供應商還不多，但許多新創公司正在往這個方向前進。像是，built.io 就提供 IoT Apps 的代管服務。

以上都是由技術的角度出發，以及過去的收集與觀察，所進行的整理。其中，物聯網應用程式代管服務，是筆者認為最重要，也是最具商業潛力的領域。從上述的分析，可以歸納出一個結論：未來的物聯網新創團隊，勢必要具備 Full Stack 的技術能力，以及 End-to-End 商業模式的策略思考能力。


### Server-free 的開發環境

自從 Amazon 的 AWS 盛行後，便大幅降低了伺服器的成本。過去，專用伺服器（ Dedicated Server ）費用高昂，對新創公司來說，是相當沈重的負責。如今，只要一張信用卡，以及便宜的費用，就能擁有高運算能力，以及充足頻寬的伺服器。這讓創業成本更低。

Joseph Anthony 提出的五個 Startup 評估成本的建言中，其中一點便 開宗明義說「時間就是金錢」。Joseph 從最基本的公司營運「辦公室」來說明這個觀念。新創公司應當設法減少辦公室的租金成本，因為這是「每個月」的固定費用。如果辦公室的固定費用，當然也包含水電等日常固定支出，在 Startup 階段過高，而且，對於 Startup 的時間評估失準，公司的固定成本就會因為這個時間而增加，這產生了資金的風險。

時間就是金錢的概念，就是所謂的「機會成本」。這個機會成本 ，泛指產品開始開發，到能開啟營運的這段時間。在進入營運階段前，要設法正確評估 Startup 的時間，並減少固定成本的支出。 從機會成本的角度來看，mBaas 便是一種很好的降低成本做法。

例如，開發會員系統，開發者可能需要學習這些技術：Node.js、MongoDB、RESTful Architecture 等等，即使伺服器的租金已經很便宜了，但「機會成本」仍高。所以，如果有一家公司，能提供一套 SDK，把這些 Backend 的技術封裝起來，讓開發者「一個 API 在伺服器上建立會員資訊」、「一個 API 讀取會員資訊」等，就能大幅縮短開發時間。

Android App 利用 mBaas 服務後，就能以 Java APIs 來儲存資料到伺服器上。當然，伺服器的開發、維護與管理，都是 mBaas 供應商的責任。

這以上二個角度來說，mBaas 帶來的衝擊是開發思惟的開發、機會成本的改變，當然，就會直接影響新創事業的 Business Plan 內容。有了 mBaas，相對的，我們也需要新的 Business Plan 規劃思惟。

### Webhook

Webhook 的概念由 Jeff Lindsay 於 2007 年提出。Hook 這個名詞，過去出現在程式設計、除錯技巧與架構設計等領域，並且都有不同的意思。以架構設計來說，Hook 代表「擴充插座」的意思。例如，要在 Android Framework 裡擴充客製化的 Android Service，就要重用 IInterface 設計。

Webhook（或者寫做 WebHook）延續了 Hook 的精神。Webhook 是一「HTTP Callbacks」的機制。例如上述提到的 Github，它提供了 Webhook 機制，當你把程式碼提交到 Github 後，可以透過 Webhook 讓 Github 來 Callback 你的一個 HTTP API。這感覺有點像，把自已的 HTTP API 接到 Github 上。

mBaas 與 Webhook 又有何關聯呢？mBaas 把 Backend 封裝成一套 SDK，所以 mBaas 的服務供應商，理論上都應該提供很有彈性的 Webhook 機制。