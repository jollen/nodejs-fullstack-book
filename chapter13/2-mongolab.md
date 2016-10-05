## 13.2 安裝 MongoDB 資料庫伺服器

MongoDB 可安裝在 Linux/OS X/Windows 環境，請依 MongoDB 官網上的步驟說明進行安裝：

http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

除了自行安裝 MongoDB 外，也可以使用 MongoDB Lab 服務：

https://mongolab.com

這是由 MongoDB 官方所推出的 Database-as-a-Service 雲端服務。MongoLab 提供的免費版本，可以滿足學習階段的使用需求。建議讀者可以申請 MongoLab 的免費版本；在 MongoLab 管理後台建立資料庫與使用者帳號後，可以取得資料庫的 URI：

~~~~~~~~
mongodb://booklog3:123456@ds053130.mongolab.com:53130/booklog3
~~~~~~~~

接著依照以下步驟，使用 Mongoose 來操作 MongoDB 資料庫。