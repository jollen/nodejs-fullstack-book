## 15.3 ARM mbed Networking

ARM mbed 作業系統本身具備 networking feature（例如：3G、ethernet），因此不再只是扮演傳統 GPIO 控制，或是藍芽傳輸的角色；它可以透過 Websocket 連線，將 sensor data 推送（data push）給伺服器。ARM mbed 作業系統也提供 httpd library，能在 ARM mbed 裝置上發展 REST API，並透過 HTTP 讓 client 端呼叫。

基於 ARM mbed 作業系統的 Arch Pro 開發板，如果只當做 GPIO 控制器來使用，就太可惜了。將 Arch Pro 做為 Physical Object 的觀念，才能發揮 ARM mbed 作業系統的潛能。Physical Object 等價於 REST Device 的觀念。

mbed 官方提供二個 Ethernet 有關的 Class Library：

* EthernetInterface
* WiflyInterface

EthernetInterface 支援 Cable 乙太網路連線，WiflyInterface 則是支援 WiFi 乙太網路連線。以下分別說明其用法。

### Step 1：匯入 *EthernetInterface*

首先，建立一個新的 mbed 專案，再使用 Import Wizard 匯入 mbed 官方的 *EthernetInface* Library；如圖 15.4。

![圖 15.4：New Program](images/15.4.png)

圖 15.4：匯入 *EthernetInterface*

### Step 2：實例化 *EthernetInterface*

引入標頭檔：

```
#include "EthernetInterface.h"
```

然後實例化 *EthernetInterface*：

```
int main() 
{
 	...   
    // Ethernet Interface
    EthernetInterface eth;
    ...
}
```

### Step 3：設定網路組態

可以自行指定 IP 位址、Network 與 Gateway IP：

```
int main() 
{
 	...   
    // Ethernet Interface
    EthernetInterface eth;
    ...
    eth.init("192.168.2.1", "255.255.255.0", "192.168.2.254");
    eth.connect();
}
```

要改用 DHCP 的組態方式，也是非常簡單的：

```
int main() 
{
 	...   
    // Ethernet Interface
    EthernetInterface eth;
    ...
    eth.init("192.168.2.1", "255.255.255.0", "192.168.2.254");
    eth.connect();
}
```

### Step 4：測試網路連線－使用 Websocket Client

如何測試 Arch Pro 是否成功連上網路？一個最簡單的方式，就是透過 LED 燈號來指示：

```
// Ethernet Status
DigitalOut led1(LED1);

int main() 
{
    // init status
    led1 = 1;
 	...   
    // Ethernet Interface
    EthernetInterface eth;
    ...
    eth.init("192.168.2.1", "255.255.255.0", "192.168.2.254");
    eth.connect();
    led1 = 0;
}
```

如果 *eth.connect()* 成功，LED1 就會被燈亮。但是最有效且明確的方式，還是要讓 Arch Pro 試著呼叫 Web Service。在這裡使用 Mokoversity 發展的 WoT.City 進行測試。

WoT.City 提供 Websocket Broker（即 Server）服務。使用 WoT.City 的 Websocket 服務，只要透過以下的 URI 即可：


```
ws://wot.city/object/jollentemp1/send
```

請將 URI 的 *jollentemp1* 替換為自已的名稱，這個名稱代表 Arch Pro 的名字，請自行命名即可。接著以 Websocket Client 推送一段連續數據給 WoT.City。在 ARM mbed 裝置上實作 Websocket Client 的方式非常簡單，只要匯入 *Websocket* Library 即可。

完整程式碼如下：

```
#include "mbed.h"
#include "EthernetInterface.h"
#include "Websocket.h"

// Ethernet Status
DigitalOut led1(LED1);
DigitalOut led2(LED2);

int main() 
{
    char data[256];

    // Ethernet Interface
    EthernetInterface eth;

    // init status
    led1 = 1;
    led2 = 1;

    // 使用 DHCP
    eth.init();
    eth.connect();
    led1 = 0;

    // 與 WoT.City 建立 Websocket 連線
    Websocket ws("ws://wot.city/object/jollentemp1/send");

    // 不斷 Retry，直到連線成功
    while( !ws.connect() );
    led2 = 0;

    // 每隔 1 秒，推送一筆數據至 WoT.City
    while(1) {
        wait(1.0);
        
        sprintf(data , "{ \"temperature\": %f }", 25.0);
        ws.send(data);
    }
}
```

要知道 WoT.City 是否接收到資料，可使用 WoT.City 的測試頁面：

```
http://wot.mokoversity.com/container
```

在測試頁面下方，輸入 IoT 裝置的名稱即可。此上述範例為例，只要輸入 *jollentemp1* 即可在頁面上看到 mbed 推送的即時資料。

以上測試過程若沒有任何問題，表示 mbed 裝置已經成功連上 Internet；接下來，讓我們正式展開 Web of Things 的開發之路。
