# 物聯網架構入門 (尚木完成)

Broker 是一種觀念、模式與架構。過去在我的 Android Framework 培訓課程中，提到 Android Binder IPC 的設計，採用了 Proxy Pattern、Broker Pattern 與 Activator Pattern。

現在，Broker 模式也普遍被使用在 IoT 的架構設計中。要理解 Broker Pattern 的用途與設計，可以從 IoT 應用程式開發層面切入，要切入 IoT 應用程式開發層面，可以從目前知名的 Flux 模式開始。

## 認識 Flowchain 計畫

[Flowchain](https://github.com/flowchain) 是本章節使用的範例程式，它以開源的形式釋出。

Flowchain 最早發源自 [WoT.City](https://wotcity.com) 計畫，WoT 是 Web of Things 的縮寫。要把 Flowchain 說清楚，就必須把 Web of Things 講明白。你可以在[這裡](https://www.w3.org/WoT/IG/wiki/Implementations)找到一份 Web of Things Implementations 的清單，這份清單整理 W3C Web of Things 的相關計畫。

也就是說，WoT.City 是 W3C Web of Things (WoT) 的一個計畫，它也是一個開源項目，也是 WoT 的技術。這就是故事的開始。

WoT.City 主要在處理 *Connectivity*，例如：WebSocket、CoAP 與 Thing Description 等。WoT.City 是 Connecitivity Layer，目前它已經打包成  [wotcity.io](https://www.npmjs.com/package/wotcity.io) 模組，但是你不需要直接使用 wotcity.io 模組。

wotcity.io 被封裝為 [devify-server](https://github.com/DevifyPlatform/devify-server) 模組，devify-server 是一份 IoT server boilerplate，這是什麼呢？簡單說，就是一套給 IoT 用的伺服器程式模板，你可以用 devify-server 很容易寫出一個「負責收集感測器資料」的 IoT server。這套 IoT server 可以執行在 Desktop、Server 或 IoT device 上，它使用的是 Nodoe.js 技術，這表示只要有 Node.js 執行環境的硬體，都可以成為 devify-server 的執行環境。

架構上，devify-server 封裝了 wotcity.io，並且負責 Event Handling、Broker Server 與 Serverless 的角色。不過，你也不需要學習 devify-server 的程式設計。devify-server 再被封裝了，成為 *Flowchain* 技術。

Flowchain 帶來一些好消息，其中之一就是採用 Flow-Based Programming 的物聯網開發模式。

## State Container－狀態的營運外包商

State Container 是我學習[React](https://facebook.github.io/react/) 時得到的觀念。Presentational component 專注在 UI 的部份，而不是「行為」。這個前提帶來的觀念是：presentational component 要避免使用 *state*，這樣的元件就是 *stateless component*。

Presentational component 本身不具備狀態，但是總要「有個東西」來維護這個元件的「行為」。於是，我們使用外部（Global）的狀態系統來完成這件事。這個系統就是 State Container。這類元件的狀態，由 State Container 來維護。Flux 就是一個這樣的「模式」。

## Model 哪裡去了

MVC 架構模式中的 *M* 用來維護數據，因此也稱為 Data Container。如果你撰寫 JavaScript 代碼，請問最「輕量化」的數據容器是什麼呢？答是 *[]* 與 *{}*。使用 JavaScript 的 Arrary 與 Object 來維護數據，是一個最輕量化的做法。如果你這麼這麼做的話，就不需要 MVC 的 M 了。

如果你把 Controller 可以封裝在 View 元件裡，這樣 *C* 也不會「單獨」存在。*C* 被封裝起來了，這個觀念稱為 _controller-view_。這麼一來，MVC 的 *M* 與 *C* 都消失了。也就是說，如果你使用 JavaScript 的 array 與 object 來擺放數據，那你的應用程式就沒有 M。如果你也使用 React 來撰寫應用程式的 *View*，那應用程式也沒有 *C*。

一個使用 MVC 架構模式的 React 應用程式，如果沒有 M 與 C 了，那這個應用程式要叫什麼模式呢？

## Flow-Based Programming

知名的 [Flux](https://facebook.github.io/flux/docs/overview.html) 模式，就是 Flow-Based Programming 的模式。

Flow-Based Programming 是由 [J. Paul Morrison](http://www.jpaulmorrison.com/) 提出的觀念，曾在 KickStarter 上募資成功、知名的開源項目 [NoFlo](https://github.com/noflo/noflo)，也是另一種 Flow-Based Programming 的技術。如果你對 NoFlo 不熟悉，另一個知名的 Flow-Based Programming 技術你一定知道，這個技術就是 IBM 所開發的 Node-RED。

由於「典型」的 Flow-Based Programming（FBP）開始演化出「類似」的系統，因此現在這些 FBP 技術，就稱為 FBP-like system。原始由 J. Paul Morrison 提出的 FBP，就稱為 Classical FBP。NoFlo 與 Node-RED 都是屬於 FBP-like system。

受到 FBP、Flux 與 NoFlo 的啟發，我也開始了自已的 FBP-like for IoT 的項目，稱為 Flowchain。Flowchain 的設計思想，引用 Flux 模式的做法。下圖是知名的 Flux Pattern。

![Flowchain](https://cloud.githubusercontent.com/assets/1126021/17242135/190517ee-55a8-11e6-8207-a936a29fb8f6.png)

以 Flux 架構出來的 *Flux Application* 有以下的特點：

1. flow-based programming (functional reactive programming)
2. single direction data flows (unidirectional)
3. 沒有 two-way data binding
4. Application state 只透過 stores 維護
5. Highly decoupled 架構
6. Stores 是 hierarchy 結構
7. 由 Dispatcher 管理 stores 的更新

## Broker Server 初體驗

如果你已經熟悉 Flux 模式，要了解 [Flowchain](https://github.com/flowchain) 的設計思路，對你來說已經是輕而易舉的事情了。

Flowchain Pattern 就是 Flux Pattern。二者之間的設計相通，例如：single dispatcher、single data flow 等。但每個元件負責的工作略有差異。

Broker Server 也稱為 Service Broker，它負責協助開發人員，完成多項繁複的工作。對 Service Broker 感興趣的話，Microsoft 的 SQL Server Service Broker[1] 是一個值得研究的案例。

通則來說，Broker Server 的設計原則如下：

* 負責訊息處理
* 建立鬆散偶合的應用程式

Broker Server 的設計稱為 Broker Pattern，這是一種設計模式，主要的用途是架構分散式的軟體系統。根據維基上的解釋[2]：

> The Broker architectural pattern can be used to structure distributed software systems with decoupled components that interact by remote service invocations. A broker component is responsible for coordinating communication, such as forwarding requests, as well as for transmitting results and exceptions.

回到 Flux 模式與 Flowchain 範例，如何從 IoT 應用程式的情境，來看 Flux 模式的使用方式呢？以下是幾個重點：

* *Actions* 主要負責將數據傳送給 Dispatcher，actions（例如：數據）的來源是 Websocket Server 或是 CoAP Server
* *Dispatcher* 主要負責將數據分發給 Stores
* *Stores* 就是 Flowchain 的 Component。另外，Flowchain 的底層，有一個稱為 Devify 的 Store，它負責 emit 事件。但是你不需要了解 Devify 這個部份，只要學習如何撰寫 Component 與 Graph 就可以了

Dispatcher 還有一個特別的角色，它也做為「Broker」，這部份現階段你也不必了解。這有什麼用途呢？一個例子是：讓你完全不用寫程式，就可連到 Dashboard（Web Frontend）。

另外，附帶一提：Actions 也扮演 URL Routing 的角色。

> Flowchain 是我的 Flow-Based Programming for IoT 開源項目

Flowchain 模式與 Flux 模式開始不一定的地方是什麼？如下圖，在 Flowchain 模式裡，Dispatcher 加入一個 Broker 的角色。Dispatcher Broker 使用的是 Broker Pattern。

Dispatch broker 負責「對外提供 URI 服務」，一個使用情境是：連接 Dashboard。這有點像是代理者（Proxy）的角色，但在 Flowchain 模式中，Dispatcher 對外「供應數據」的做法，並不是採用 Proxy Pattern 的設計。在這裡特別提到 Proxy Pattern 的原因，是因為，根據 W3C 在 Web of Things 的設計思維中，這個部份則是由 *proxy object* 來完成。

從架構設計的角度來看，proxy object（Proxy 模式）的實作，應該由 Broker Server 負責。

## State Container 與 Flux 模式

在 Flux 模式中，誰來管理 states 呢？

> Stores contain the application state and logic.

總結本章的觀念：在 React 應用程式中，加入 State Container 的做法，已經有一個可依循的架構模式。要學習在 React 應用程式裡，加入 Flux 架構模式，要如何起步呢？從上述的觀念可以知道，實作 *Stores* 應該是第一步，因為它負責儲存 states，並管理 React 元件邏輯。

> Jollen：「學 Flux 從建立商店（Stores）開始」


## 本章總結

如何「開始設計 IoT 架構」呢？從上述的介紹，可以總結具體的方法如下：

1. 從 Web of Things (WoT) 的架構思維開始
2. 在 WoT 的架構中，最重要的是 CoAP 協定，你可以詳細閱讀 ARM IoT Tutorial 這份簡報的內容
3. WoT Servient 是首要的研發工作
4. WoT Servient 的工作很多，因此導入 Broker Pattern 會是一個很好的起步

關於 WoT 與 WoT Servient 的觀念，在 W3C 的 Mailing List 上有一份不錯的簡報：[Web of Things architecture](https://lists.w3.org/Archives/Public/public-wot-ig/2016Jan/att-0042/WoT_architecture_20160127_Panasonic-Fujitsu_.pdf)，你可以閱讀這份簡報內容，相信有很大的幫助。

我在 Web of Things 方面的一些研究與代碼，都會使用在本書做為實例。主要的項目都以開源釋出，項目網址如下：

* [WoT.City](https://github.com/wotcity)
* [DevifyPlatform](https://github.com/DevifyPlatform)
* [Flowchain](https://github.com/flowchain)

## 參考資源

[1] SQL Server Service Broker, https://technet.microsoft.com/zh-tw/library/bb522893(v=sql.105).aspx
[2] Broker Pattern, https://en.wikipedia.org/wiki/Broker_Pattern
[3] ARM IoT Tutorial, https://community.arm.com/servlet/JiveServlet/previewBody/8633-102-2-15471/ARM%20CoAP%20Tutorial%20April%2030%202014.pdf
