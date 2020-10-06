# 10.4 Express.js 與 REST API

Express.js 實作 REST API 的方式相當簡單，請參考下表。

|CRUD       |HTTP Method      |Express.js 實作函數    
|-----------|----------|--------------
|Create     |POST      |app.post()
|Read       |GET 	   |app.get()
|Update     |PUT       |app.put()
|Delete     |DELETE    |app.delete()
表 10-1 REST API 定義

Express.js 能支援 CRUD 所需的所有 HTTP Methods。所以，我們只要知道，在實作 URL Routing 時，要如何指定特定的 HTTP Methods 即可。例如：

~~~~~~~~
app.get('/', routes.index);
~~~~~~~~

這是先前我們一直採用的寫法，*get()* 函數的另外一個涵義就是 GET HTTP Method。所以，當用戶端以 GET Method 請求 *'/'* 這個 URL 時，才會被 Routing 到 *routes.index* 函數。同理，以下的例子：

~~~~~~~~
app.post('/', routes.index_add);
~~~~~~~~

當用戶端以 POST Method 做請求時，就會被 Routing 到 *routes.index_add* 函數。同樣的 URL，可以依據不同的 HTTP Request Method，來做不同的處理（即 CRUD）。

此外，在定義 REST API 時，會需要這樣的 URI 格式：

~~~~~~~~
/user/{username}
~~~~~~~~

比如，要讀取 *jollen* 與 *ellaine* 二位使用者的資訊，就要分別呼叫以下的 API：

~~~~~~~~
/user/jollen
/user/ellaine
~~~~~~~~

這二個 URI 理論上應使用同一個 URL Routing Handler，而不是為這二位使用者，實作獨立的 Routing Handler。例如，以下的寫法並不正確：

~~~~~~~~
app.get('/user/jollen', user.jollen);
app.get('/user/ellaine', user.ellaine);
~~~~~~~~

以 REST API 的角度來說，這是相同的 Resource，同樣的 User Resource，使用同一個 Routing Handler 即可。要解決這個問題，只要將程式碼改寫如下即可：

~~~~~~~~
app.get('/user/:username', user.index);
~~~~~~~~

Express.js 支援以變數（Variable）的方式來定義 URI，因此，不管是 */user/jollen* 或 */user/ellaine* 使用者，只要符合 */user/:username* 的格式，都會被 Routing 到 *user.index* 函數。

### 讀取 URI 的參數

如何在 Routing Handler 裡讀取 URI 裡的變數呢？範例如下：

~~~~~~~~
exports.index = function(req, res){
  res.send("Welcome " + req.params.username);
};
~~~~~~~~

URI 的變數值，也視為「參數」的觀念，這些工作 Express.js 都幫我們做好了。如何讀取 *:username* 變數的值呢？只要直接使用 *req.params* 物件即可。以上述範例來說，如果在瀏覽器輸入以下 URI：

~~~~~~~~
http://localhost:3000/user/jollen
~~~~~~~~

就能看到以下的執行結果。從這個結果得知：*:username* = *jollen*。

![圖 10-2 範例的執行結果](../images/figure-10_2.png)

## RESTful 架構實務 - 即時聊天室

歸納 REST API 的觀念，得到以下 4 個 [RESTful 實作原則][1]：

1. 使用 HTTP Method 實作 CRUD（請參考 6.3 節與表 6-1）
2. Stateless（無狀態模式）
3. 以目錄結構形式定義 URI（請參考 6.1 與 6.2 節）
4. 使用 JSON 做為資料交換格式（請參考 2.12 節與第 4 章）

除了 Stateless 外，其餘所需要的背景知識，都已經做過介紹。關於 nodejs-chat 專案的功能，整理如下。

[1]: http://www.ibm.com/developerworks/webservices/library/ws-restful/ "RESTful Web services: The basics"

### Nodejs-Chat Server 

Server 的部份，應實作以下功能：

- 產生最新訊息的 JSON，並回應給 Client 端應用程式
- 接收 Client 端傳送的訊息，並儲存最新的 *n* 筆訊息

---

Next: [10.5 Node.js Chat Client](5-chat-client.md)
