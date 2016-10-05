## 14.1 淺談 Web of Things

在 Internet of Things（IoT）的技術發展藍圖裡，描述了 IoT 的 4 個發展階段，其中第 4 個階段就是 WoT。IoT 的第 4 個階段，聚焦在 Advanced Sensor Fusion 與 Physical-World Web 這二個技術層面上。

根據維基百科上的定義，WoT 是 IoT 的 Application Layer，並且是使用 Web 技術來打造 application。也就是說，IoT + Web-enabled technologies 就是 WoT。對 WoT 來說，最重要的觀念，就是以 URL 來表示 IoT 裝置；為 IoT 加入 URL 的觀念，就是 Google 提出的 Physical Web 計畫。

簡單來說，IoT 正在發生三件大事。

1. Going Web：物聯網正在與 Web 融合（IoT + the web）
2. Open IoT Cloud Architecture：如上，要與 Web 融合，就要發展一個使用相關開放標準的 IoT Cloud 架構
3. Physical Object：硬體裝置將與 REST 架構密切結合

這三件大事，其實是一個交互關係：要 Going Web 當然就要以 Web 標準來建立一個 Cloud 架構，要讓硬件與 Cloud 架構結合，就要讓硬件能以 URL 方式表示，或是能推送 Time-Series Data 到 Cloud。

這三件大事，其實說白了就是 HTTP。HTTP 並不是個新技術，也不是什麼困難的技術，與物聯網的交集，不過也就是舊瓶新裝。但難就難在舊瓶新裝，是個哲學思想提昇的過程：這需要一套整體的新思維。

從技術的角度來看，WoT 就是 IoT + the web 的架構，也就是讓物聯網透過 HTTP 來互連（interoperability）。而另一種物聯網的互連方式，就是 Machine-to-Machine（M2M）。這二種互連的做法，有不同的使用情境（Use Scenario），硬體的設計也有所不同。

如圖 14.1，這是 M2M 的使用情境。在這個情境中，裝置與裝置之間，透過 Bluetooth（BLE）與 Zeebig 
協定來溝通。例如，溫度感測裝置，透過 BLE 將數據傳送給手機。

![圖 14-1 M2M Scenario](images/figure-14_1.png)

圖 14.2 是 WoT 的使用情境。同樣是溫度感測裝置，在 WoT 情境中，裝置透過 HTTP、CoAP 或 WebSocket 協定，將數據傳送給伺服器（IoT Cloud），手機再經由伺服器取得數據。

![圖 14-2 WoT Scenario](images/figure-14_2.png)

WoT 延用現有的 Web 技術來建立整體架構，以下是 WoT 使用的 Web 相關技術：

* HTML5 與 CSS3－用來實作 WoT Appcalition（即 Web Frontend）
* JavaScript
* HTTP 1.1 與 HTTP 2.0 協定
* JSON 與 JSON-LD
* EXI 與 RDF
* CoAP 協定
* WebSocket 協定
* MQTT 協定
* OAuth
* REST 架構

目前，許多大廠與越來越多的新創公司，也開始提供 IoT over Web 的服務。廣義來說，這些服務都是屬於 Web of Things 的概念。