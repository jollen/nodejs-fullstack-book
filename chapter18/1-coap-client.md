# 18.1 第一個 CoAP 請求

本節透過 CoAP Client 的實作，來認識 CoAP 通訊協定的基本觀念。對於 Node.js 與 CoAP 通訊協定的初學者來說，建議可從以下 3 個主題開始學習：

1. 如何使用 Node.js 撰寫 CoAP request 的 Client 端程式
2. 了解並使用 2 種基本的 CoAP 訊息：Confirmable 與 Non-confirmable
3. 了解並使用 CoAP Block 傳輸

## Step 1: 實作 CoAP Client

使用 [coap](https://www.npmjs.com/package/coap) 來實作 CoAP Client。

```
// 引入 coap 模組
var coap = require('coap');

// 指定 server URI
var uri = 'coap://172.20.10.4:8000/object/5530900/send';

// 傳送 CoAP 訊息
var sendPath = function() {
    var clientWriable = coap.request(uri);

    clientWriable.end(new Buffer('i am tester'));
};

sendPath();
```

## Step 2: 觀察 CoAP Packet

在 CoAP Server 裡，將 CoAP 請求列印出來觀察，可以看到 CoAP 封包的資訊。

```
  _packet: 
   { code: '0.01',
     confirmable: true,
     reset: false,
     ack: false,
     messageId: 55906,
     token: <Buffer 14 46 fc 09>,
     options: [ [Object], [Object], [Object] ],
     payload: <Buffer 7b 22 74 65 6d 70 65 72 61 74 75 72 65 22 3a 31 35 36 2c 22 74 65 6d 70 22 3a 31 35 36 7d> },
```

```confirmable``` 代表這是一個 **Confirmable** 類型的 CoAP 封包。coap 模組預設發出 Confirmable 類型的 CoAP 封包請求。

## Step 3: 改用 Non-confirmable 請求

coap 模組支援 Non-confirmable 的封包類型，寫法如下：

```
var clientWriable = coap.request({
    method: 'GET',
    hostname: '172.20.10.4',
    port: 8000,
    pathname: '/object/5530900/send',
    confirmable: false
});
 ```


