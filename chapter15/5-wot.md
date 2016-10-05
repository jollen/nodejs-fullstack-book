## 15.5 WoT 裝置的 Use Case

物聯網產品的使用情境，目前仍呈現宇宙級的渾沌狀態，主要的原因是，尚未有普及的殺手級產品。不過，依據 WoT 裝置使用的通訊協定技術，可以大致規納出一套一般用途用途（General Purpose）的 Use Case。或許這可以說是不同協定的 WoT 設計模式。

本書將以 HTTP、Websocket 與 CoAP 三個協定，做為 WoT 的入門主題。本章先分別說明 HTTP、Websocket 與 CoAP 建立 WoT 架構的方式，並從 Use Case 的角度，討論架構的差異之處。後續章節，再針對 HTTP、Websocket 與 CoAP 的 WoT 架構，進行實作說明。

經由接下來的說明，可大致了解不同通訊協定對 WoT 架構的影響，不但可了解什麼 WoT 現在呈現「通訊協定大戰」的格局，更能活用這些通訊協定，來打造自已專用的 IoT Cloud 架構。

### HTTP

如圖 15.5 所示，HTTP 協定應用在 IoT 系統裡時，採取的是典型的 Client/Server 架構。首先，我們將 IoT 裝置的角色設定為 Server，這表示 mbed 裝置必須實作一個「輕量化（Light-weight）的 Web Server」，才能以 Web Server 的角色，讓 Client 端「瀏覽」。

![圖 15.5：WoT 與 HTTP](images/15.5.png)

圖 15.5：WoT 與 HTTP

接下來，我們將分別採用 HTTP、Websocket 與 CoAP 技術，來實作不同的「溫度感測」裝置。根據圖 15.5 的概念，IoT + HTTP 的 Use Case 大致如下：

1. ARM mbed 裝置內建一個輕量化的 Web Server
2. Mobile & Client 使用瀏覽器瀏覽 ARM mbed 裝置
3. ARM mbed 裝置接收到瀏覽請求（HTTP Request）後，讀取溫度感測器的數值
4. 如上，Web Server 回應（HTTP Reponse）溫度數值
5. Mobile & Client 收到回應、並顯示溫度數值

從上述 Use Case 可以知道，Mobile & Client 要搭配一套以 HTML5 製作的 Frontend。通常會以 SPA（Single-Page Application）的設計原則（Design Principles）來實作這類型的 Frontnend，以提供使用者（User）更佳的使用體驗（User Experience）。

### Websocket

WebSocket 是 HTML5 裡的一個標準，它是一種 TCP 的連線技術。在協定部份，則是基於 HTTP（Over HTTP）協定。因此，WebSocket 標準定義了一些 HTTP Headers 來進行 Client/Server 的通訊。

Websocket 能讓 client 與 server 能建立永續性的 TCP 連線。簡單來說，有了 Websocket，就能實作出 real-time data streaming 機制。

從 WoT 的設計哲學來看，有一個很重要的一個觀念：使用 Websocket broker 來封裝 ARM mbed 成為一個 IoT object。此時，可以將 IoT 裝置視為抽象的 Websocket server [1]。

[1]: http://www.jollen.org/blog/2015/01/arm-mbed-iot-objects-websocket.html

一般來說，Websocket 的使用案例（use case）是 server push（data push）機制，也就是說，ARM mbed 物件本身，應該是扮演 Websocket server 的角色。但現實層面，讓 IoT 扮演 Websocket server 的話，會有幾個技術問題：

* ARM mbed 要管理 client 端的 connections
* 需要更多的內存來維護 client connections
* 需要實作 Data push 的演算法，例如：round-roubin
* 要考量 error handling 與 exception handling

因此，最簡單的 scenario 設計如下：

1. 佈署專用的 Websocket channel server
2. ARM mbed 將 data 即時推送（push）到 Websocket channel server
3. 用戶（user）與 Websocket channel server 建立 Websocket connection
4. 用戶接收 Websocket channel server 的即時資料（經由 server push）

抽像上來看，ARM mbed 是一個 server 端，因為它是資料的供應者，而真正的 client 端則是用戶。但從技術上來看，ARM mbed 與 client 端同樣都是 Websocket client，詳細說明如下。

![圖 15.6：WoT 與 Websocket](images/15.6.png)

圖 15.6：WoT 與 Websocket

如圖 15.6 所示，Websocket 協定應用在 IoT 系統裡時，同樣也是採取 Client/Server 架構。但是，數據的傳送方式，正好與 HTTP 的 Use Case 相反：

* HTTP 採取的是 Client Pull 模式
* Websocket 採取的是 Client Push 模式

請特別注意，在 IoT + Websocket 的 Use Case 中，IoT 裝置扮演的是 Websocket client 的角色。然而，Mobile & Client 同樣也是扮演 Websocket client 的角色。這二者的差異如下：

* IoT 裝置扮演的是 Websocket client 傳送方、即數據的寫入者（sender）
* IoT 裝置扮演的是 Websocket client 接收方、即數據的讀取者（receipt 或稱為 viewer）

因此，Websocket client 的 sender 與 viewer 之間，需要一個橋樑（即媒介、仲介）的角色，這個橋樑就是 Websocket server。在這樣的 Use Case 中，也把這個 Websocket server 的角色，稱為 Websocket channel server，或是 Websocket broker。

Websocket broker 扮演封裝 IoT 物件的角色，對 Websocket server 來說，只要能定義好「channel」的結構，就能封裝數以萬計、千萬計的 IoT 物件。「抽像上來看，ARM mbed 仍然是 server 端」，就是這樣的觀念。

Websocket broker 必須給予 IoT 物件一個獨一無二（unique）的名稱，這樣才能視別這些數以萬計（未來視必是百億計）的 IoT 物件。這個給予名稱的程序，就叫做 device registration。

### CoAP

![圖 15.7：WoT 與 CoAP](images/15.7.png)

圖 15.7：WoT 與 CoAP

