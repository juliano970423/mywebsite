import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadOml2d } from 'oh-my-live2d';

import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import Router from './router.js'
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)
// 设置为暗黑主题
document.body.setAttribute('arco-theme', 'light')

loadOml2d({
    dockedPosition: "right",
  primaryColor: "#ff0000",
  mobileDisplay: true,
  models: [ 
    // 在这里进行配置
    {
      path: "/l2d/爱莉希雅-桌宠/爱莉希雅-桌宠.model3.json",
      showHitAreaFrames: true,
      position: [0, 100],
      scale: 0.1,
      mobileScale: 0.05,
      style: {
      }
    },

    {
      path: "/l2d/chicheng_5/chicheng_5.model3.json",
      position: [0, 100],
      scale: 0.03,
      mobileScale: 0.02,
    },

    {
      path: "/l2d/bilibili-22/index.json",
      position: [0, 0],
      scale: 0.3,
      mobileScale: 0.02,
      showHitAreaFrames: true,
    }
  ],
  tips: {
    enable: true,
    style: {
    }
  },
  stageStyle: {
    height:"60%",
  }
});
app.use(createPinia())
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(Router)
app.mount('#app')
