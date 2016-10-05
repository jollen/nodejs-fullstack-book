## 15.1 物聯網學習體系

本章是一個重要的里程碑，在學習 Node.js 與 Backbone.js 後，將開始進入 IoT 的學習階段。根據第 14 章所說明的 Web of Things 架構，在 WoT 觀念裡的物聯網系統，包含四大部份：

1. IoT Device
2. IoT Proxy
3. IoT Server
4. Mobile 與 Client

這是現代 WoT 系統的基礎建設，從實體（硬體）的角度來看，需要設計與製造這四類型的產品。如果從通訊協定的角度來看，WoT 入門要學習三種協定的實作：

1. HTTP 1.1 / 2.0
2. Websocket
3. CoAP

協定的學習，重點在它們的 Use Case 設計上，而不是「通訊協定程式庫」的實作。實際上，如果使用 ARM mbed 做為 IoT Device 的技術，mbed 作業系統本身，就提供這三種通訊協定的程式庫。同樣地，以 Node.js 做為開發環境的話，都能找到相關的 npm 模組。

IoT Device 部份，本書選擇以 ARM mbed 作業系統做為開發技術。