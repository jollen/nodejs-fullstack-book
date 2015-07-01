# WoT 架構實作 - 使用 HTTP

## 通訊協定

物聯網的發展，進入到銜接 web（over HTTP）的階段後，典型的通訊協定堆疊（Protocol Stacks）開始產生變化。更進一步的話，物聯網在 2015 年開始，進入通訊協定技術變革的時代。過去使用的通訊協定技術，開始有了改良版本。幾個知名的例子：

* Google 提倡的 SPDY 協定
* 專為 constrained device 所設計的 CoAP
* QUIC 改良傳統的 UDP

上述所提的例子，最終都想針對 HTTP 協定進行改造。HTTP 是應用層通訊協定（Application Layer Protocol），現在的 IoT 架構，發展重心就是使用 HTTP（Web）來交連（interoperate），這個 IoT + Web 的架構，稱為 WoT（Web of Things）。不只是 WoT 架構，從通訊協定的角度來看，物聯網正進入應用層通訊協定技術變革的時代。

TCP/IP Stacks 是網路協定的基礎，其中有一層稱為傳輸層（Transport Layer），傳輸層包含 TCP 與 UDP 二個協定。UDP 協定比 TCP 更輕量化，但因為 TCP 的可靠性佳高，因此，知名的應用層協定「HTTP」，就基於 TCP 協定來發展。基於 TCP 的 HTTP（或稱為 HTTP over TCP）的特色就是 Client/Server 間會進行資料傳輸的確認（ACK），因此可靠度高。然而，這個確認的動作對物聯網裝置來說，可能會形成一個問題。這個問題在於，確認的動作需要花費較多的硬體資源（運算能力、記憶體等），對硬體資源較缺乏的裝置（稱為 Constrained Device），這個 TCP 的確認過程，就成為一個很大的負擔。

### HTTP 的特點

HTTP（Hypertext Transfer Protocol）是一種 request-response 形式的協定。就像我們所知道的，它已經完全融入我們的生活之中。HTTP 在 PC 時代，已經改變人們接收資訊的方式與習慣，到了 Mobile 的時代，HTTP 更再次影響與改變人類的社會文化。

到了物聯網時代，HTTP 將繼續影響與改變人類的生活習慣，物聯網已經開始受到 HTTP 的影響，這就是 Web of Things。HTTP 屬於 application-level 的協定，HTTP 的更底層就是 TCP。

一個開放式且符合 Web of Things 設計原則的 IoT Cloud 架構，應該以 application-level 的協定為主，因此 HTTP 成為自然當選人。但物聯網硬體本身，有它的侷限性，例如：低功耗、運算頻率較低、主記憶體較少等，當軟體在這樣受侷限的硬體環境上運作時，就需要一個比 HTTP 更適合的 application-level 協定。CoAP（Contrained Application Protocol）就因應而生。

CoAP 並不是要取代 HTTP，這部份在第 18 章會有詳細說。

### CoAP 的誕生

因此，針對 Constrained Device 的 HTTP 需求，一個稱為 CoAP 的協定就被發展出來了。CoAP（Constrained Application Protocol）是更簡單且輕量化的 HTTP 技術，簡單的意思是，CoAP 簡化了 HTTP 的內容，輕量化的意思是，CoAP 採用 UDP 進行傳輸。簡單來說，CoAP 可以看做是一個 HTTP over UDP 的技術。CoAP 是物聯網的重要技術，它讓 Constrained Device 都能具備 HTTP 的能力。大部份的 MCU 裝置都是 Constrained Device，因此，就也像是 MCU + HTTP。

從實作的角度來看，CoAP 並非直接採用 HTTP 標準，而是透過轉換（translate）的方式將訊息對應成標準的 HTTP。CoAP 採納了 REST 架構，並且也是採取 request/response 的模式。因此，要將 CoAP 轉換為 HTTP，或是將 HTTP 轉換為 CoAP，其實是非常容易的。實際上，CoAP 只對 request/response 的部份做轉換，也就是 CoAP 的 request 都能轉換為 HTTP request headers；response 的部份亦同。

### HTTP/2 的誕生

除了 CoAP 外，HTTP/2.0 未來也可能在物聯網應用上，扮演重要角色。HTTP over TCP 的 ACK 會造成的一些負擔，因此如果讓 HTTP over UDP 的話，就可以解決這個問題。Google 所提出的 QUIC（Quick UDP Internet Connection）就是這樣的技術。QUIC 可以讓 HTTP 基於 UDP 傳輸層，就是 HTTP + QUIC + UDP。

解決了傳輸層的問題，再回到應用層來看 HTTP。因為 HTTP request/response headers 設計上的一些缺點，讓 HTTP 的網路傳輸效能無法提昇。為解決這些問題，Google 便提出了 SPDY 協定。SPDY 協定後來成為 HTTP/2（HTTP 2.0）的基礎。IETF 在 2015 年 5 月正式發佈 HTTP/2 標準（RFC 7540）。HTTP/2 是基於 TCP 協定，因此要讓物聯網裝置使用 HTTP over UDP 的話，目前仍必須使用 HTTP + QUIC + UDP 的堆疊。

因為 HTTP/2 標準就是 SPDY 的內容，如果有意在物聯網裝置上使用 HTTP/2 的特性，就要採用 HTTP + SPDY + QUIC + UDP 的堆疊。不過，Google 未來有意將 HTTP/2 over QUIC 提交給 IETF，到時就能捨棄 HTTP + SPDY + QUIC + UDP 的做法，畢竟這只是過渡時期的解決方案。



## 

接下來，根據第 15 章的說明，以 HTTP 來實作一個 Web of Things 的應用：溫度感測裝置。

### Step 1：製作溫度感測裝置

### Step 2：定義 REST API

### Step 3：實作 HTTPD

以上述範例，可以歸納出以下觀念：

* IoT 裝置內建 REST API 來回應溫度資訊給 Client 端
* 將 RESTful 架構運用在 IoT 裝置的架構設計上時，這個 IoT 裝置就稱為 RESTful 裝置（RESTful device）
* RESTful 裝置是 Web of Things 的重要基礎

## Request/Response Model

如圖 16.1 所示，HTTP 基於 TCP 網路層，而 TCP 的特點就是 reliable data transfer，因此 HTTP 的 reqeust/response model 就會有許多 SYN/ACK 的過程。HTTP 本身是一種 message 導向的通訊技術，因此 request 與 response 是透過事先定義好的 message 進行溝通，HTTP 1.1 的標準，就是在製定這樣的 message。

![圖 16.1：Transferring HTTP Message](images/16.1.png)

圖 16.1：Transferring HTTP Message

HTTP 1.1 將這些訊息稱為 HTTP headers（檔頭）。HTTP request 時，會送出一系列的 HTTP headers 給 Web server，Web server 再根據 request headers 做出回應。Web server 在回應 client 時，同樣也會送出一系列的 response headers。要了解 HTTP request/reponse 時，倒底使用了哪些 HTTP headers，最簡單的方式是使用 *curl* 來進行實驗。

例如：

```
$ curl -I http://www.mokoversity.com/
```

上述指令使用 *curl* 對 *http://www.mokoversity.com/* 發出以下的 request headers：

```
HEAD / HTTP/1.1
User-Agent: curl/7.30.0
Host: www.mokoversity.com
Accept: */*
```

Web server 回應以下的 HTTP headers：

```
HTTP/1.1 200 OK
Server: nginx/1.7.10
Date: Sun, 19 Apr 2015 10:49:22 GMT
Connection: keep-alive
Set-Cookie: connect.sid=s%3A71EBBOGrIOeySsHgDpLprmvw.d44CLf2v07OyhiAow7Hv3PkwW9eUjtUwlbooht4xZxk; Path=/; HttpOnly
Expires: Mon, 20 Apr 2015 10:49:22 GMT
Cache-Control: max-age=86400
```

關於 HTTP headers 的說明，可參考 HTTP 1.1 標準文件。後面會針對幾個常見的 HTTP header 做說明。

這就是 HTTP 的特色：採取 request/reponse model，並且以 TCP 做為底層的網路層。相對的，第 15 章所介紹的 CoAP 技術，則是基於 UDP 網路層，如圖 16.2。CoAP 與 HTTP 的關係，簡單來說，CoAP 提供以 UDP 為網路層的 HTTP，讓 HTTP 能以 UDP 方式通訊。CoAP 是一個專為 Web of Things 架構與物聯網裝置，所特別設計的協定，它解決了 HTTP 的一些問題，並讓「受限環境」的硬體，能更有效率地使用 HTTP。

CoAP 與 HTTP 的差異，在第 18 章再做介紹。但是要了解 CoAP 解決哪些 HTTP 的技術問題，就要深入 HTTP 的技術細節。

![圖 16.2：Layering of Protocols](images/16.2.png)

圖 16.2：Layering of Protocols

就像大家所知道的，TCP 是一個可信賴（reliable）的網路協定，因此在傳送與接收的過程中，會有 SYN/ACK 的過程。如圖 16.3，應用程式 A 傳送資料給應用程式 B 的過程如下：

* SYN from A to B：應用程式 A 傳送 SYN 封包給 B，進行連線初始化。所謂的 SYN 封包，指的是將 IP packet 的 SYN 位元指定為 1 的一種封包
* SYN-ACK from B to A：將 SYN 封包傳送出去後，A 開始等待 B 的回應；應用程式 B 在收到 SYN 封包後，會建立 socket，並傳應 SYN-ACK 封包。所謂的 SYN 封包，指的是將 IP packet 的 SYN 與 ACK 位元指定為 1 的一種封包
* ACK from A to B：一但 SYN-ACK 封包抵達 A 後，A 與 B 之間就成功建立了 TCP 連線（connection），應用程式 A 就可以透過 socket，開始傳送資料給 B，或是接收來自 B 的資料

很明顯地，應用程式 A 是發出連線請求的一端，因此是 client 的角色；應用程式 B 則是 server。在完成資料傳輸後，如果應用程式 B 將 socket 關閉，B 就會發送 FIN 封包給 A。應用程式 A 收到 FIN 封包後，同樣也要以 ACK 封包做為回應；當應用程式 A 從 socket 完成讀取完資料後，也會將自已的本地端 socket 關係。同樣地，A 也會向 B 發出 FIN 封包，B 同樣也以 ACK 封包回應。

![圖 16.3：A TCP Connection](images/16.3.png)

圖 16.3：A TCP Connection

以 TCP 為「基底」的 HTTP 的關鍵就在上述的 TCP 連線過程，從 IoT 裝置的角度來看，在一個硬體很受限的環境裡，這個過程不但消耗硬體資源，也考驗硬體的運算能力。同時，這個過程因為 handshake 的過程繁複，也可能造成「response time」過長。CoAP 重新修改了 handshake 的過程，解決了包含 response time 在內的各種問題。

未來，當 IoT 裝置大量佈署後，HTTP 就會構成一個大問題。屆時，網路上將有十億，甚致百億計的 IoT 裝置，這個總數，絕對比純 Web 時代時的 Web server 還要更多。當這些 IoT 裝置彼此間，發出大量且頻繁的 HTTP request/response 時，這些 TCP 連線就會累積出非常可怕的「連線負載」。未來迎接 IoT 的時代，降低 ACK 封包，並設計更適合的通訊協定，就成了重要的基礎研究。

除了 CoAP 外，當然還有類似的通訊協定標準。有些晶片廠，正在改良相關通訊協定技術，並設計相關的 IoT 網路晶片，從根本解決這類型的問題。

## 小結

由於 IoT 裝置是扮演 Web server 的角色，因此又把 IoT 裝置稱為 physical web，也就是實體 web server 的概念。在這個使用情境中，是將 IoT 裝置當做 Web server 的角色，所以只需要有瀏覽器，即可瀏覽裝置資訊，例如：溫度數據。

使用這個情境時，有幾個要考慮的事情：

* 裝置的效能
* 對 HTTP 1.1/2.0 的實作完整度
* 裝置需要額外的 IP 位址，會有 IP 不夠的問題，要搭配 IPv6 來使用
* 消除 ACK 的重要性
* CoAP 等
* IoT 裝置本身是 Web server，不需要額外的「雲端」實作

