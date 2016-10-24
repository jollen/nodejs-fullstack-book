## 6.1 再探 HTTP API

延續第 5 章，在 Web Service 架構的部份，將會介紹 RESTful Architecture。要了解 RESTful Architecture 的精神，就要從 HTTP API 講起。

說明 Web Service 觀念的最快方式，就是透過 HTTP API。例如：

~~~~~~~~
http://www.moko365.com/api/query?t=users
~~~~~~~~

利用 HTTP 協定來呼叫這個 API（最簡單方式是用瀏覽器），Server 會以 JSON 格式回應這個請求。例如，上述 API 向 Server 請求「查詢上線人數」的服務，Server 將以這個 JSON 來回應「目前有 10 個人上線」：

~~~~~~~~
{
	"online": 10
}
~~~~~~~~

JSON 格式是由我們自定。這是截至目前為止，我們所學到的觀念。這樣的 API 形式，就是典型的 CGI 程式設計觀念，這部份在前面的章章已做過介紹。

上述的 HTTP API 例子，問號後的字串稱為 Query String。這個例子，瀏覽器要傳遞 *t=users* 的字串給 Server。傳遞 Query String 的方式有 2 種：

- 使用 HTTP 協定的 GET 方法
- 使用 HTTP 協定的 POST 方法

HTTP API 採用 URL 的形式，瀏覽器傳送 URL 請求的做法可分為二種：GET 或 POST。然而，這種 HTTP API 的格式，過於複雜，而且它是從「功能」的角度來描述 API。如果 Web Service 採用這種 API 的寫法，它的軟體架構就會較為複雜，而且也不易於描述「網路上的資源」。

例如，我想開發一個 Web Service 的 API，功能是：新增名為 James 的使用者。要如何定義這個 API 呢？寫法如下：

~~~~~~~~
http://www.moko365.com/api/add_user.php?username=james&type=admin&email=who@anywhere.com
~~~~~~~~

上述這個 API 必須以 HTTP 的 GET 方法來呼叫，所以整個 HTTP 請求會變成：

~~~~~~~~
GET http://www.moko365.com/api/add_user.php?username=james&type=admin&email=who@anywhere.com HTTP/1.1
~~~~~~~~

它的缺點：

- API 形式不夠精簡
- Web Service 軟體架構複雜且不夠嚴謹
- 功能導向的描述，不易於描述資源（使用者為一個資源）

這個例子，是實作 Web Service 的幾種方法之一，當然這種方式仍有存在的價值。因此，這裡並非要推翻這個做法，而是要尋找更多的實作技術。

後來出現一些更嚴謹的 Web Service 實作技術，例如：SOAP（Simple Object Access Protocol）。SOAP 的請求與回應，都採用 XML 的文件形式，這讓 API 形式較為精簡，而且 Web Service 軟體架構也更為嚴謹。

SOAP 的另一個貢獻是：標準化了交換格式。Client 與 Server 之門的資料交換，都採用 SOAP 的標準。這不像典型的 CGI 開發，交換格式沒有一定的標準。資料交換格式標準化後，就易於系統間的整合。例如，每家公司的 Web Service 資料格式都是自訂的，這種百家爭鳴的情況，會造成彼此間互換資料的困擾，當然整合與維護就會是個大問題。

---

Next: [6.2 REST](2-rest.md)
