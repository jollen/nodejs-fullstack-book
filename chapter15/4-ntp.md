## 15.4 使用 NTP－Network Time Protocol

Mokoversity 在 2015 年 3 月 19 日舉辦一個免費課程：Ethernet IoT Kit 與 Virtual DOM 技術。這是台灣第一場 ARM mbed 課程。課堂上，筆者談到「IoT 裝置的時間問題」。這是一個未來可能會浮上臺面，但目前還未被提出討論的技術議題。要讓 IoT 裝置進行時間同步，若涉及整體的 IoT Cloud 架構，事情可能沒這麼簡單。

不過，目前可以使用 NTP 來暫時解決這個問題。NTP（Network Time Protocol）是一個非常古老的通訊協定，也是少數目前仍在運作中的元老級網路技術。ARM mbed 社群實作了 *NTPClient* 程式庫，可以很容易讓 IoT 裝置經由 NTP 進行時間同步。

### Step 1：匯入 *NTPClient*

利用 Import Wizard 將底下的 *NTPClient* 匯入專案：

```
http://developer.mbed.org/users/donatien/code/NTPClient/
```

並引入所需的標頭檔：


```
#include "NTPClient.h"
```

接著，取得 NTPClient 的實例化：

```
NTPClient ntp;
```

### Step 2：

使用 NTP Pool Project 的主機服務，任意選取一台主機名稱：

* 0.pool.ntp.org
* 1.pool.ntp.org
* 2.pool.ntp.org
* 3.pool.ntp.org

讓 mbed 裝置連上 NTP Pool 主機：

```
ntp.setTime("0.pool.ntp.org");
```

*NTPClient* 自動同步 mbed 裝置的時間。如果想取得目前的時間，可以使用 mbed 的標準函數－*time()*，用法與 libc 的 *time()* 相同：

```
if (ntp.setTime("0.pool.ntp.org") == 0)
// Set time successfully.
{
  time_t ctTime;

  // Get the current time.
  ctTime = time(NULL);

  // Print out the current time.
  printf("Time is now (UTC): %s\r\n", ctime(&ctTime));

  // Convert it to local time representation.
  struct tm *locTime;
  locTime = localtime(&ctTime);

  // Print out the date and time in the standard format.
  printf("%s\r\n", asctime(locTime));
}
```

如此一來，就能為推送出去的數據裡加上時間截記（timestamp）了。修改上述範例如下：

```
#include "mbed.h"
#include "EthernetInterface.h"
#include "Websocket.h"
#include "NTPClient.h"

// Ethernet Status
DigitalOut led1(LED1);
DigitalOut led2(LED2);

int main() 
{
    char data[256];
    time_t ctTime;

    // Ethernet Interface
    EthernetInterface eth;

    // Network Time Protocol
    NTPClient ntp;

    // init status
    led1 = 1;
    led2 = 1;

    // 使用 DHCP
    eth.init();
    eth.connect();
    led1 = 0;

    // 同步時間
    if (ntp.setTime("0.pool.ntp.org") == 0)
    {
		ctTime = time(NULL);
		printf("Time is now (UTC): %s\r\n", ctime(&ctTime));
    }

    // 與 WoT.City 建立 Websocket 連線
    Websocket ws("ws://wot.city/object/jollentemp1/send");

    // 不斷 Retry，直到連線成功
    while( !ws.connect() );
    led2 = 0;

    // 每隔 1 秒，推送一筆數據至 WoT.City
    while(1) {
        wait(1.0);
        
        ctTime = time(NULL);

        sprintf(data , "{ \"temperature\": %f, \"time\": \"%s\" }", 25.0, ctime(&ctTime));
        ws.send(data);
    }
}
```