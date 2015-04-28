# WoT 架構實作 - 使用 Websocket

與 HTTP 相異的是，client 端是經由網路直接「瀏覽」裝置，但 Websocket 則是由「broker」，協助 IoT 裝置將數據推送給 client 端。為什麼 IoT 裝置不適合做為 Websocket server 的原因，在第 15 章有簡單的說明。

##

整個 WoT + Websocket 的架構，包含三大部份：

* Websocket broker 的實作
* ARM mbed 的 Websocket client 實作（sender）
* Web frontend 的實作（viewer）

從圖 15.6 來看，Websocket broker 可以採取 PaaS 的商業模式，像是 *sockets.mbed.org* 與 IBM IoT Foundation 都有提供這樣的服務。但是，從創業與社會文化的角度來看，協助開發者，甚致終端用戶，架設自已的 Websocket broker 服務，其實是很重要的一環。這部份與技術沒有直接關係，有興趣的朋友，可參考筆者在 2015 年 4 月 11 日於深圳南山智園的一個演講，簡報下載：

https://www.mokoversity.com/wotcity

WoT.City 是由 Mokoversity 與 Openmbed 支持的一個 Websocket broker 計畫，它除了提供 PaaS 服務外，也開放源碼。有需要的讀者，可以下載 WoT.City 並自行「架站」。此部份於第 19 章進行說明。

### Step 1：
### Step 1：
### Step 1：


## Websocket Broker 實作

底下將以第 5 章的 Websocket server 範例為核心，進行少量的程式碼修改。

### Step 1：

## 小結

本章