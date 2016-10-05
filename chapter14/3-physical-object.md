## 14.3 Physical Object

首先，先談談 Physical Object。將 IoT 裝置以 REST API 來表示，這個 IoT 裝置就稱為 REST Device。如果更進一步以「對象」來封裝此觀念的話，也可以稱做 REST Object。例如：

```
http://wot.city/1/jollenchen/dust/kitchen
```

REST API 是一種 URI 的形式。所以，也可以這樣說：將 IoT 裝置以 URL 形式來表示；這就是 Google 的 Physical Web 計畫，所提出的觀念。

現在，只需要以 GET 方法（HTTP 協定）來調用這個 REST API，就能得到 IoT 裝置的數據。REST API 是一種表示「資源」的觀念，以上述的 REST API 來說：

* /1：代表 API 的版本號碼
* /1/jollenchen：代表這個裝置的對象名稱（Object name）
* /1/jollenchen/dust/kitchen：代表對象裡的屬性（Attributes），*dust/kitchen* 可視為 *dust.kitchen* 

從 REST 的角度來看，*jollenchen* 就是一個對象，這個對象只能存在一個，意思是名稱不能重覆。用設計模式的方式來解釋，就是 Singleton。

最後，設計者會賦與 *dust.kitchen* 一個意義：廚房的空氣感測數據。

REST Device 是一個實物，也就是硬件設備，因此也稱為 Physical Object。有了 Physical Object 做為基礎，要搭建 IoT 的 Cloud Architecture 並不是一件難事。