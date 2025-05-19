# 7.2 非同步式讀取多個檔案：從混亂到掌控的歷程

## 問題背景：不只是讀一個檔案

在上一節，我們學會了如何非同步讀取單一檔案。但如果任務升級成：「先讀取一個檔案清單，再逐一讀取清單中列出的每個檔案內容」，你會怎麼做？

這正是本節要處理的問題：

### 目標：
- 先讀取 `index.txt` 檔案，其內容為：

```
chapter1.txt
chapter2.txt
chapter3.txt
chapter4.txt
chapter5.txt
```

- 接著，逐一讀取這些章節檔案的內容，並印出結果

我們將依照下列步驟完成這項任務，並在每個階段揭露背後潛藏的非同步挑戰，並逐步演化出更好的控制策略。

---

## Step 1：使用 Callback 組裝非同步讀取

我們先用傳統方式：先讀取清單，再逐行處理。這裡我們用 `buffered-reader` 套件讀取 `index.txt`，並儲存每一行（每個檔案名稱）。

### 安裝模組：
```bash
npm install buffered-reader
```

### 程式碼片段：讀取檔名清單
```javascript
import { DataReader } from 'buffered-reader';
import fs from 'fs';

const files = [];

const getFileList = (filepath, callback) => {
  new DataReader(filepath, { encoding: 'utf8' })
    .on('line', (line) => {
      files.push(line);
    })
    .on('end', () => {
      callback(files);
    })
    .read();
};
```

### 接著，讀取每個檔案：
```javascript
getFileList('index.txt', (fileList) => {
  for (let i = 0; i < fileList.length; i++) {
    fs.readFile(fileList[i], 'utf8', (err, data) => {
      if (err) throw err;
      console.log(`[DATA ${i}]`, data);
    });
  }
});
```

## 問題：非同步順序不可預測

執行時你會發現：

```text
[DATA 4] This is chapter 5.
[DATA 0] This is chapter 1.
[DATA 3] This is chapter 4.
[DATA 2] This is chapter 3.
[DATA 1] This is chapter 2.
```

問題來了：**你無法保證讀取結果的順序**。

為什麼？因為 `fs.readFile()` 是非同步操作，它會同時啟動所有讀檔任務，誰先完成就誰先輸出。

> ✅ 這正是 callback 無法處理「非同步流程順序控制」的最大弱點。

---

## Step 2：引入 Promise，讓流程可控

我們將每次 `fs.readFile()` 的動作包裝成 Promise 物件，讓每個讀檔變成一個「可以等待」的操作。

### 封裝成 Promise：
```javascript
const readFileAsync = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
```

### 使用 Promise.all 同步非同步：
```javascript
getFileList('index.txt', async (fileList) => {
  const promises = fileList.map((file) => readFileAsync(file));

  try {
    const contents = await Promise.all(promises);
    contents.forEach((content, index) => {
      console.log(`[DATA ${index}]`, content);
    });
  } catch (err) {
    console.error('Error reading files:', err);
  }
});
```

### 好處：
- 順序一致（Promise.all 回傳的陣列順序對應原始檔案清單）
- 錯誤集中處理（用 try/catch）
- 程式碼層次平坦，不再巢狀

---

## Step 3：進一步優化 async/await 結構

你也可以將整體流程寫成一個 async 函式，讓語法更接近同步邏輯：

```javascript
const run = async () => {
  const fileList = await new Promise((resolve) => {
    const list = [];
    new DataReader('index.txt', { encoding: 'utf8' })
      .on('line', (line) => list.push(line))
      .on('end', () => resolve(list))
      .read();
  });

  for (const filename of fileList) {
    try {
      const data = await readFileAsync(filename);
      console.log(`[DATA] ${data}`);
    } catch (err) {
      console.error('Error reading file:', filename, err);
    }
  }
};

run();
```

這就是 async/await 的力量：用同步邏輯書寫非同步流程。

---

## 小結：非同步程式的三種寫法比較

| 寫法         | 結構        | 可讀性 | 控制性 | 錯誤處理 | 適合場景         |
|--------------|-------------|--------|--------|----------|------------------|
| callback     | 巢狀        | 差     | 差     | 分散     | 簡單非同步任務   |
| Promise      | 線性        | 中     | 好     | 集中     | 多任務併發       |
| async/await | 最線性結構 | 最佳   | 最佳   | try/catch | 複雜流程與錯誤控制 |

從這裡開始，我們將逐步搭建起一個能處理多重請求、回應與錯誤的非同步伺服器。

下一節，我們將回到 Web context：如何用非同步方式設計一個 JSON API 回應？
