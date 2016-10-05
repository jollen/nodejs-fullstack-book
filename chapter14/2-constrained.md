## 14.2 Constrained Device

WoT 裝置的硬體範圍很廣，小至 Sensors 類型的硬體，大到伺服器等級的硬體。從運算能力的角度來區分，WoT 裝置的硬體範圍（scale）如下：

* 8-bit MCU 與 Wi-Fi Module
* 32-bit MCU（Cortex-M）
* Application Processors（Cortex-A）與 Network Processor（Atheros）
* Server Farms

8-bit MCU、Wi-Fi Module 與 32-bit MCU 都是硬體資源（處理器頻率、記憶體與、電力與儲存裝置）較受限的環境，這樣的物聯網裝置稱為 Constrained Device。因為硬體資源有限，一些針對 Constrained Device 的技術，就陸續被發展出來。例如，CoAP 協定就是專為 Constrained Device 所定義的標準。

目前流通性（使用程度）較高的幾個 Constrained Device 技術如下：

* CoAP
* MQTT
* 6LoWPAN
* LWM2M

在技術的選用上，會以是否為 Constrained Device 做為依據。例如，使用 Raspberry Pi 實作溫度感測器時，可以使用 WebSocket 與 HTTP 來傳送數據到 IoT Cloud。使用 ARM mbed 實作溫度感測器時，會考慮以 CoAP 為主。

另外，因為 MCU 技術的進度，有些 MCU 裝置的硬體資源並非如此受限，例如 Arch Pro（LPC1768）開發板，這是一款 ARM mbed 的開發板。Arch Pro 所採用的 NXP LPC1768 MCU（Cortex-M3）晶片，運算能力可達 100MHz。因此，如果處理的 TCP 連線處理不多，在 Arch Pro 上使用 WebSocket 協定時，並不會造成太多的硬體負擔。

因為 Cortext-M 技術上的進步，或許應該再將 MCU 裝置區分為 Constrained Devices 與 Less Constrained Devices 二類。有些不是專供 Constrained Devices 使用的技術，也可以運用在 Constrained Devices 上。