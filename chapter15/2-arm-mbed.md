## 15.2 ARM mbed 作業系統

本書將以 ARM mbed 作業系統，以及 Arch Pro 開發板，來介紹 WoT 裝置的實作。

mbed 是 ARM Ltd 所推出的物聯網作業系統。ARM mbed 並不只是一個作業系統核心（OS kernel），從 ARM mbed 的生態來看，它包含三個部份：

1. mbed OS
2. mbed Device Server
3. mbed Tools

分別說明如下。

### mbed OS

ARM mbed 的定位是 Full Stack 的物聯網作業系統，它的底層是一個 RTOS （real-time operating system）作業系統核心。mbed RTOS 本身提供以下機制：

* Thread
* Mutex
* Semaphore
* Message Queue
* Mail
* Memory Poll

ARM mbed 是專門針對物聯網所設計的作業系統，它是「另一個作業系統」，還是真正的 IoT 作業系統。可以從以下幾個 mbed 特色來觀察：

1. ARM mbed 是特別為 ARM Cortext-M MCU 重新設計的作業系統，這點幾乎可以完全說明 ARM mbed 與其它作業系統的不同

2. 未來的物聯網裝置硬體架構，會有很大的比率會以 MCU 做為主要架構，而不是以 AP（Application Processor）做為主要架構，ARM mbed 作業系統的設計正能符合這個趨勢

3. WoT 裝置需要 HTTP、Websocket 與 CoAP 等基本的 Web 協定，甚致需要更多不同的通訊協定技術，因此 ARM mbed 也提供官方與第三方（Community）的程式庫，這讓 ARM mbed 裝置可以很容易實作 WoT 與 Physical Web 的觀念

4. ARM mbed 作業系統d核心，上面堆疊這些豐富的程式庫後，就成為一個不折不扣，有完整軟體程式庫堆疊（Full Stack）的作業系統

從上述的分析，也可以說明 Arduino 與 ARM mbed 的差異。Arduino-style 的硬體，沒有專用的作業系統，應用上（Use Case）比較偏向 GPIO 控制。ARM mbed style 的硬體，有專用的 Full Stack 作業系統，有完整的 Web 相關通訊程式庫。

當然，我們也可以在 Arduino 裝置裡實作 HTTP；同理，也可以將 ARM mbed 使用在 GPIO 控制的案例裡。但以軟體計哲學的角度來看，二者的差異還是很清楚的。

這就是本書選擇 ARM mbed 來實作 WoT 的原因，也因為 ARM mbed 是走向 Web of Things 的設計哲學，因此書上並不會介紹 ARM mbed 的 Arduino-style 實作（GPIO 控制）。對這部份有興趣的讀者，可以參考 mbed Taiwan 所編寫的一份教材：

```
https://www.mokoversity.com/workshop/mbed-school
```

另外，因為節省時間，本書將使用由深圳 Seeed Studio 所設計與生產的 Arch Pro 開發板。Arch Pro 是 ARM mbed 專用的開發板，內建 Ethernet、USB Host/Device 與 Grove connectors，還有與 Arduino 相容的 form factor。Arch Pro 會比 LPC1768 開發板更為方便，因為搭配 Grove Starter Kit for mbed 感測器模組套件，就可以 DIY 出各種 IoT 硬體裝置。可以節省接杜邦線與插電路板的時間。

本章將以 ARM mbed 來實作 REST Device（Representational State Transfer device）的觀念。這部份可以參考筆者的文章：

[1]: http://www.jollen.org/blog/2015/01/arm-mbed-1-physical-web.html

總結來說，ARM mbed 的開發板並不是「另一個 Arduino」硬體，而是更能符合 WoT 理念的 RESTful Device 作業系統。同樣的硬體，不同的觀念、技術框架與商業思維，能帶來不同的產品思維與商業模式。所以，或許 ARM mbed 與 WoT 帶來的是一場新的革命與機會。

### mbed Device Server

Analogous to a Web Server that accepts connections from mobile phones or web browsers, a Device Server handles the connections from IoT devices.

### ARM mbed Tools

ARM mbed 使用 online compiler 開發環境，原則上只要使用瀏覽器即可立即開發。不過 mbed 也能支援 GCC 或 Eclipse 的離線開發環境，這部份可參考 mbed 官方網站上的說明：

http://developer.mbed.org/cookbook/Using-mbed-with-gcc-and-eclipse

ARM mbed 的 online compiler 具備 Git 版本管理的功能，還能線上匯入外部程式庫（Class Libraries），還可以分享自己的程式碼。首次接觸 ARM mbed 的開發者，仍建議先以 online compiler 為主。以下說明 ARM mbed 的 online compiler 使用方式。

將 Arch Pro 與電腦連接後，至 mbed.org 申請一個開發者帳號後，進入 online compiler 的 Workspace 環境，如圖 15.1。

![圖 15.1：mbed 的 Workspace](images/15.1_workspace.png)

圖 15.1：mbed 的 Workspace

依照以下步驟建立第一個 "Hello, World"：

1. 在 workspace 裡點選 *New -> New Program*
2. *Platform* 選取 mbed LPC1786
3. *Template* 選取 Blinky LED Hello World
4. *Program Name* 填寫自訂名稱
5. 按 *OK*

Arch Pro 與 LPC1768 開發板相容，因此步驟 2 請選取 mbed LPC1786。

![圖 15.2：New Program](images/15.2_new-program.png)

圖 15.2：New Program

mbed 提供許多 Program 與 Library 範本，這裡使用的是一個 LED（發光二極體，Light-Emitting Diode）閃爍的程式碼範本。接著進行編譯與 firmware 更新：

1. 在 workspace 裡點選 *Compile -> Compile All*
2. 編譯成功後，會自動下載一個副檔名為 *.bin* 的 firmware
3. 將下載回來的 firmware 拷貝到 Arch Pro 開發板

使用 Mac 環境的開發者，使用 USB 線將 Arch Pro 連接到電腦後，會看到 *MBED/* 資料夾，再將下載回來 firmware 檔案拉到此資料夾裡即可，如圖 15.3。

4. 拔除並重接 USB 線，讓 Arch Pro 重新關機。
5. 完成。可以看到 Arch Pro 的 LED1 開始閃爍。

![圖 15.3：Drag and Drop 更新 firmware](images/15.3_drag-drop.png)

圖 15.3：Drag and Drop 更新 firmware

Arch Pro 開發板有大量的 GPIO，可外接各種感測裝置，這部份請參考 mbed Taiwan 所編寫的教材。學會使用 mbed 的 online compiler 後，可以使用一個基本的 GPIO 控制程式當做「Hello World」。以下是一個控制 Arch Pro LED 燈號的範例：

```
#include "mbed.h"

DigitalOut myled1(LED1);
DigitalOut myled2(LED2);
DigitalOut myled3(LED3);
DigitalOut myled4(LED4);

unsigned int mask = 0x1;

int main() {
    wait(0.8);
    
    while(1) {    
        myled1 = mask & 0x1;
        myled2 = mask & 0x2;
        myled3 = mask & 0x4;
        myled4 = mask & 0x8;
        
        wait(0.2);
        
        mask = mask << 1;
        
        if (mask & 0x10) 
            mask = 0x1;
    }
}
```

本範例程式已發佈在 mbed.org 上：

```
http://developer.mbed.org/users/mbedschool/code/mbed_led_run/
```

請練習使用 online compiler 的匯入功能，將本範例直接匯入使用，並安裝至 Arch Pro 開發板進行測試。

### mbed Compile API

ARM mbed 有公開的 Compile API，如果不想使用 online compiler，也不打算安裝 Offline Toolchain 的話，使用 Compile API 是一個不錯的選擇。

使用 *curl* 來呼叫 mbed Compile API：

```
$ curl https://developer.mbed.org/api/v2/tasks/compiler/start/ -X POST -d "platform=mbed-lpc1768&program=mbed_blinky" --user jollen
```

請將 *platform=* 置換為正確的 mbed 開發板型號，將 *program=* 置換為想編譯的 mbed 程式。*program=* 的程式名稱，就是 online compiler 上的程式專案名稱。

下載編譯完成的檔案：

```
$ curl https://developer.mbed.org/api/v2/tasks/compiler/sbin -X POST -d "platform=mbed-lpc1768&program=mbed_blinky" --user jollen -o mbed_blinky.bin
```

再將 *.bin 檔安裝至 mbed 開發板即可。