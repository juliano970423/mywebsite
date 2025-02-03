# 如何在網頁裡放上live2d
## 前言
live2d是一種動態角色模型，它可以讓網頁中的人物動態的跟隨使用者的動作，讓網頁中的人物更具互動性。
以下步驟全部都是使用Vue.js，如果你使用其他框架，請參考相關文件。
## 如何在網頁裡放上live2d
### 步驟一：下載live2d模型
首先，你需要找到想要使用的live2d模型，我使用的模型來自於
1. 【Live2D桌寵】愛莉希雅桌寵來啦，人人都能帶小愛回家！ UP主: 全麦煎餅 https://www.bilibili.com/video/BV1rk4y187ZK
2. https://github.com/oh-my-live2d/live2d-models
3. https://github.com/Eikanya/Live2d-model
### 步驟二：安裝live2d插件
我使用的是 [oh-my-live2d](https://github.com/oh-my-live2d/oh-my-live2d) 插件，你可以用以下指令安裝：
```bash
npm install oh-my-live2d
```
### 步驟三：設定live2d模型
在main.js中，引入oh-my-live2d插件，並設定模型，在我的例子中，我把模型放在/public/l2d/資料夾中：
```javascript
import { loadOml2d } from 'oh-my-live2d';
loadOml2d({
    models: [
        // 在這裡配置
        {
            path: "/l2d/爱莉希雅-桌宠/爱莉希雅-桌宠.model3.json",
            showHitAreaFrames: true,
            position: [0, 100],
            scale: 0.1,
            mobileScale: 0.05,
        },
        //可以在這個逗號後面再放幾個模型
    ]
});
```
### 步驟四：查看網頁
```bash
npm run dev
```
在瀏覽器中打開http://localhost:5173，你應該會看到live2d模型跟你設定的模型一樣。
## 結語
在網頁中使用Live2D模型，可以讓你的網頁變得更活潑，不再死板。
## 參考資料
https://oml2d.com/