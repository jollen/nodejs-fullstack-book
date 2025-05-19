# 6.3 REST + JSON 範例

延續第 4.2 節「學習 JSON 格式」，我們曾經說明：JSON 是 Web 應用最常見的資料交換格式。

在 REST 架構下，伺服器與用戶端的互動，除了定義清楚的 URI 與 HTTP 方法外，資料內容的交換也需要一種標準格式 —— 而這個角色，正是由 JSON 擔綱。

舉個例子：當用戶端透過 `POST /messages` 要新增一筆訊息時，它必須有一種語法結構，來清楚傳達「誰發送了什麼訊息給誰」。JSON 天然支援物件與陣列結構，非常適合描述這樣的資料：

```json
{
  "from": "Alice",
  "to": "Bob",
  "text": "Hello!"
}
```

這筆 JSON 資料會隨著 HTTP 請求送出，伺服器解析後，即可根據內容完成資源的新增、查詢或更新。

接下來，我們就用這樣一個 REST + JSON 的組合，完整示範資料的新增與接收流程。

## Step 1：定義資源與動作

假設我們要開發一個訊息服務，使用者可以新增一筆訊息。REST 的思考方式如下：

- 資源集合：`/messages`
- 動作：新增（Create）
- 方法：`POST`
- 資料格式：JSON

## Step 2：撰寫請求格式

以下是一個典型的 REST + JSON 請求範例：

```http
POST /messages HTTP/1.1
Content-Type: application/json

{
  "from": "Alice",
  "to": "Bob",
  "text": "Hello!"
}
```

- `Content-Type: application/json` 表示這是一筆 JSON 格式的資料
- 傳送的內容是一個訊息物件（message object）

## Step 3：伺服器端如何處理 JSON？

若使用原生 Node.js，伺服器需要自行解析 JSON：

```javascript
let body = '';
req.on('data', chunk => {
  body += chunk;
});
req.on('end', () => {
  const message = JSON.parse(body);
  // message.from, message.to, message.text
});
```

這段程式處理了資料接收、串接與解析，是 JSON 在伺服器端的標準處理流程。

## Step 4：回應 JSON 結果

伺服器處理完畢後，也應回傳 JSON 格式的結果給用戶端：

```javascript
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ status: 'ok' }));
```

這樣能確保整個請求／回應流程在語意上是一致的：都是以 JSON 為資料交換格式。

### 小結：REST 與 JSON 的搭配邏輯

- REST 描述的是「語意 × 動作 × 資源」
- JSON 承載的是「資料 × 結構 × 內容」

> REST 解決 API 的語意一致性，JSON 解決資料交換的結構標準。

我們將從第 8 章開始，正式建構一個支援 REST 架構、以 JSON 為資料格式的 Web 應用伺服器。
