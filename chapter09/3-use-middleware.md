## 9.3 常用的 Express.js Middleware

以下介紹幾個經常使用的 Middleware。

### 使用 *compress()*

Express.js 內建 *express.compress()* Middleware，這個 Middleware 可以把 Response Data 壓縮，節省網路頻寬，當然也就縮短 Response Data 所需的時間。修改後的程式碼如下：

~~~~~~~~
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.basicAuth('jollen', '654321'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
~~~~~~~~

請注意，*express.compress()* 的順序要放在比較前面。

### 使用 *cookieParser()*

這是一個用來處理 HTTP Cookies 的 Middleware。它可以協助我們解析 Cookies，並將所有的 Cookies 放在 *req.cookies* 物件（Key-Value Pairs 格式）。寫法如下：

~~~~~~~~
app.use(express.cookieParser());
~~~~~~~~

比如說，有一個 Cookies 叫做 *purchase_id*，使用這個 Middleware 就可以透過 *req.cookies.purchase_id* 讀取該 Cookies 的值。

### 使用 *cookieSession()*

提供 Sessions 機制的 Middleware。為 *app.js* 加入 Sessions 功能：

~~~~~~~~
app.use(express.cookieSession());
~~~~~~~~

因為 Express.js 的 Sessions 是建構在 Cookies 的機制之上，所以為了防止 Sessions 被不當修改，可以傳入 *secret* 參數：

~~~~~~~~
app.use(express.session({
    secret: 'N1j2o3l4l5e6n7'
}));
~~~~~~~~

此外，也可以設定 Cookies 的屬性：

~~~~~~~~
app.use(express.session({
    secret: 'N1j2o3l4l5e6n7',
    cookie: { path: '/', httpOnly: true, maxAge: null }
}));
~~~~~~~~

上述設定是原本的預設值。