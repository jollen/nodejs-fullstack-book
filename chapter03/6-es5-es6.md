## 3.6 Node.js 語法標準

在本章所有範例中，我們採用的是 **ECMAScript 5（ES5）語法標準**。這是最早在 Node.js 環境廣泛採用的語法形式，也最容易讓初學者掌握基礎邏輯。

### 為什麼使用 ES5？

* 適合初學者：ES5 沒有太多語法糖（syntactic sugar），更容易聚焦在流程與模組設計。
* Node.js 傳統範例多數以 ES5 撰寫。
* 有助於理解「模組 × 函數 × 資料」三者的結構關係。

### 然而，Node.js 主流已轉向 ES6+

目前主流的 Node.js 專案、開源套件與教學範例，幾乎已全面轉向 **ES6（ES2015）以上語法標準**。這意味著：

* 多數開發者使用 `let` / `const` 而非 `var`
* 採用 Arrow Functions (`()=>{}`)
* 使用解構賦值（destructuring）、模板字串（template literals）
* 透過 `import/export` 管理模組
* 廣泛使用 `async/await` 來處理非同步邏輯

### ES5 vs ES6 語法比較表

| 特徵    | ES5 範例                       | ES6+ 範例                               |
| ----- | ---------------------------- | ------------------------------------- |
| 變數宣告  | `var name = "Jollen";`       | `let name = "Jollen";` / `const name` |
| 函數定義  | `function fn() {}`           | `const fn = () => {}`                 |
| 模組系統  | `require('mod')` / `exports` | `import mod from 'mod'` / `export`    |
| 字串拼接  | `'Hello ' + name`            | `Hello ${name}`                       |
| 非同步處理 | `callbacks`                  | `async/await`                         |

### 改寫本章程式碼：ES6 版（範例）

#### ES5：

```javascript
1 var querystring = require('querystring');
2 var parsedstring = querystring.parse("m=hello&u=jollen");
```

#### ES6：

```javascript
1 const querystring = require('querystring');
2 const parsedstring = querystring.parse("m=hello&u=jollen");
```

你也可以使用解構賦值：

```javascript
1 const { parse } = require('querystring');
2 const parsedstring = parse("m=hello&u=jollen");
```

本書的目標讀者為初學者，因此：

* 範例片段將同步展示 ES5 與 ES6 寫法，以利從觀念出發，建立語法演進的理解
* 完整實作與範例程式碼，則一律採用 ES6 寫法，符合當代 Node.js 主流實務

## 3.7 全章程式碼語法升級（ES6）

本節將對第 3 章的所有範例程式碼進行 **ECMAScript 6（ES6）語法升級**，並在每段標註與原範例的語法差異，方便學習者理解語法轉換原理與效益。

### 範例一：`hello.js`

#### ES5 原寫法：

```javascript
1 var http = require('http');
2 var httpServer = http.createServer(function (req, res) {
3   res.writeHead(200, {'Content-Type': 'text/html'});
4   res.end('<h1>Hello World</h1>\n');
5 });
6 httpServer.listen(8080);
7 console.log('Server running at http://127.0.0.1:8080/');
```

#### ES6 改寫：

```javascript
1 const http = require('http');
2 const httpServer = http.createServer((req, res) => {
3   res.writeHead(200, { 'Content-Type': 'text/html' });
4   res.end('<h1>Hello World</h1>\n');
5 });
6 httpServer.listen(8080);
7 console.log(`Server running at http://127.0.0.1:8080/`);
```

**差異說明：**

* `var` → `const`
* 匿名函數 → Arrow Function `()=>{}`
* 字串拼接 → Template Literal（`` `...` ``）

---

### 範例二：模組 `server.js`

#### ES5 原寫法（節錄）：

```javascript
1 var http = require("http");
2 var url = require("url");
...
4 function start(route) {
5   function onRequest(request, response) {
6     var pathname = url.parse(request.url).pathname;
```

#### ES6 改寫：

```javascript
1 const http = require("http");
2 const url = require("url");
...
4 const start = (route) => {
5   const onRequest = (request, response) => {
6     const pathname = url.parse(request.url).pathname;
```

**差異說明：**

* 所有 `var` 改為 `const`
* 所有函數改為 Arrow Function

### 附錄：「Node.js 語法遷移表」

| 語法主題    | ES5 範例                                          | ES6+ 對應語法                                                 |
| ------- | ----------------------------------------------- | --------------------------------------------------------- |
| 變數宣告    | `var count = 0;`                                | `let count = 0;` / `const count = 0;`                     |
| 函數定義    | `function greet(name) { return 'Hi ' + name; }` | `const greet = name => \`Hi \${name}\`;\`                 |
| 字串操作    | `'Hello, ' + name + '!'`                        | `` `Hello, ${name}!` ``                                   |
| 陣列迭代    | `for (var i=0; i<arr.length; i++) {}`           | `arr.forEach(item => {})`                                 |
| 匿名函式傳遞  | `.map(function(x) { return x*2; })`             | `.map(x => x * 2)`                                        |
| 模組導入與匯出 | `require('./mod')` / `module.exports = obj`     | `import obj from './mod'` / `export default obj`（需啟用 ESM） |
| 非同步處理   | `fs.readFile('file', cb)`                       | `await fs.promises.readFile('file')`                      |
