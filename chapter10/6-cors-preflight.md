# 10.6 CORS 與 Preflight Request

## Step 1: 安裝 CORS Middleware

```
$ npm i cors --save
```

## Step 2: 回應 CORS 檔頭

```
var router = express.Router();
var cors = require('cors');

router.post('/', cors());
router.post('/', function(req, res, next) {
});
```

## Step 3: 視需要加入 Preflight 

```
router.options('/', cors());
router.post('/', cors());
router.post('/', function(req, res, next) {
});
```

可以在 Node.js 看到 preflight request 的請求過程。

```
OPTIONS /posts?m=ab 204 10.345 ms - -
POST /posts?m=ab 200 52.526 ms - 15
```
