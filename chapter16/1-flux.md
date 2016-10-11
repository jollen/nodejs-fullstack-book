## 16.1 前後端整合初體驗

實現 WebSocket React 元件的項目模板。你可以用這模板製作具 WebSocket 功能的元件，或是為現有的元件注入 WebSocket 功能。使用 Flux 模式。

> A React biolerplate that polyfill Websocket by Flux pattern.

## 安裝說明

```
$ git clone https://github.com/jollen/react-websocket-biolerplate.git
$ cd react-websocket-biolerplate
$ npm install
$ gulp compile
```

使用瀏覽器開啟 ```dist/index.html``` 文件即可，你會看到來自 ```wot.city``` 服務器的即時數據。

* 如果要修改服務器來源，請開啟 ```src/App.jsx```，並修改 ```server``` prop
* 修改完成後，必須運行 ```gulp compile``` 命令重新編譯文件

## 使用教學

編譯相關命令：

* ```gulp build```：將 ```src``` 目錄下的 *.jsx 文件編譯為 *.js
* ```gulp app```：將 ```src/App.js``` 文件 browserify 為 ```dist/App.js```
* ```gulp compile```：等於以上二個命令

開發相關命令：

* ```gulp watch```：監聽所有的 *.jsx 文件，文件修改時，會自動調用 ```gulp compile``` 命令
* ```gulp browser```：瀏覽器 Live Reload 功能，會自動開啟 ```dist/index.html``` 文件

## Quickstart

說明 React 元件加入 WebSocket 協定的做法：以接收來自 WebSocket 服務器的數據推送。幾個要先知道的觀念：

* 使用 ```react-websocket-flux``` 模組，這是一個簡單 Flux 實現
* 註冊事件函數到 ```react-websocket-flux``` 裡後，透過 ```onMessage``` 接收即時數據
* 建議了解 Flux 模式中 Store 的用途

只需要三分鐘就能學會 ```react-websocket-biolerplate``` 的使用：

* 引入 ```react-websocket-biolerplate``` 的 ```WebsocketStore``` 與 ```WebsocketActions```
* 在 React 元件的 constructor 裡調用 ```WebsocketActions.connect()``` 與 WebSocket 服務器建立連線
* 在 React 元件裡實現 ```onMessage``` 事件回調函數
* 在 React 元件的 ```componentDidMount``` lifecycle 裡調用 ```WebsocketStore.addMessageListener``` 註冊 ```onMessage``` callback
* 在 React 元件的 ```componentWillUnmount``` lifecycle 裡調用 ```WebsocketStore.removeMessageListener``` 解除註冊

完整範例代碼位於 ```src/Component.jsx```。

以下是完整的實現步驟說明。根據此，也能為現有的 React 元件注入 WebSocket 功能。

```
import React, { Component } from 'react';
import { render } from 'react-dom';

// 1. 引入 'react-websocket-flux'
import { WebsocketStore, WebsocketActions } from 'react-websocket-flux';

export class MyComponent extends Component {
    constructor(props, context) {
        super(props, context);

        // 2. 初始化 this.state
        this.state = {
            temperature: -1
        };

        // 3. WebSocket 的 'onMessage' callback
        this.onMessage = this.onMessage.bind(this);

        // 4. 連線到 WebSocket Server
        WebsocketActions.connect(this.props.server);
    }

    componentDidMount() {
        // 5. 將 'onMessage' 註冊到 react-websocket-flux
        WebsocketStore.addMessageListener(this.onMessage);
    }

    componentWillUnmount() {
        // 將 'onMessage' 從 react-websocket-flux 解除註冊       
        WebsocketStore.removeMessageListener(this.onMessage);      
    }

    onMessage(data) {
        // 6. Deserialize: 從 Server 推送過來的 JSON data 取出資料，並放入 this.state
        this.setState({
            temperature: data.temperature
        });
        console.log(data)
    }

    render() {
        return (    
            <div>
                <h1>{this.state.temperature}</h1>
            </div>
        );
    }
}
```

完成後編譯元件：

```
$ gulp compile
```

編譯好的文件位於 ```src/Component.js```：你可以開始在 React 應用程式裡使用此元件了。

### 使用元件

在 React 應用程式裡，引入你的元件使用：

* 加入 ```server``` prop 指定 WebSocket 服務器 URI
* 可以使用本專案提供的 ```wss://wot.city/object/testman/viewer``` 測試數據

範例片斷如下：

```
// 我的 React 元件
import { MyComponent } from './Component';

// 加入 server prop
render(
    <MyComponent server="wss://wot.city/object/testman/viewer">
    </MyComponent>,
    document.getElementById('content')
);
```

完整範例請參考 ```src/App.jsx```。

## License

The [MIT License](http://www.opensource.org/licenses/MIT) (MIT). See [LICENSE.md](LICENSE.md).
