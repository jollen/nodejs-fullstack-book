## 2.7 重要的資訊交換格式：JSON

筆者借用了 PaaS 行銷名詞，來介紹一個技術：JSON。PaaS 是一個很棒的概念，這就是一種雲端技術。然而，傳統做法，Client 端得到的是一個 HTML5 文件，而不是格式化後的資料（Formatted），這是一個缺點。

如果 Server 回傳的是格式化後的資料，Client 端就可以更有效率地利用這些資料。試想，如果 Google 傳回的搜尋結果是一堆 HTML5，那我們不就還要再去 Parse 這份文件，才能取出真正的結果，然後才能再次利用這些資料（例如：再儲存為 CVS 格式）。

為了解決這個問題，必須要有一個標準，不能大家都用自已的 HTML5 文件，或是自定的格式。軟體工程師設計了一些標準。一開始提出的做法，是制定標準的XML標籤，這樣大家就可以統一文件格式了。但是還有一個問題，就是「資料量太大」。

試想，Server 要回傳二筆資料，這二筆資料都是電話號碼：

- 0911-111-111
- 0900-000-000

然後用XML來表示，就變成：

~~~~~~~~
<Telephone>
   <Item>0911-111-111</Item>
   <Item>0900-000-000</Item>
</Telephone>
~~~~~~~~

這種把資料打腫了才回傳的做法，大大浪費網路頻寬。上面只是一個簡單的例子，現實環境，要回傳的資料可能是一個 10MB 的 XML 文件，結果原始資料可能只有 1MB。這就像，一個好端端的人，硬是被塞進了 9 公斤的肥肉。

要解決這個問題，就要有一個輕量級（Light-weight）的資料交換格式，這項技術就是 JSON。所以，JSON 是 Client/Server 交換資料的一種格式，一種Light-weight data exchange 技術。

還有一些不可不知的 HTML5 技術：

- PhoneGap：Device API 的標準，使用 JavaScript 呼叫 Device API 的好技術，Nitobi 公司是 PhoneGap 的開發商，這家公司現已被 Adobe Systems收購

- WebSocket：HTML5 標準裡的一個技術

- NodeJS：開發專用 Web Service 的技術，採用 JavaScript 語言。專用 Web 服務器是 Cloud 的重要領域。Apache Web Server 是普用型 Web Server，Cloud 需要專用的 Web Service

現在開發專用的 Web Service 非常重要，這是 PaaS 的靈魂。例如，開發股票報價專用 Web Server。過去常聽到的 Web Server，例如：Apache，都是一般用途的 Web Server，用來「host webpages」。

現在 Client 端的網頁是用 JavaScript，Server 端的開發也可以用 JavaScript，Client/Server 通通都用 JavaScript，這是一個「All in JavaScript」的時代。