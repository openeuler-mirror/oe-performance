import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import elementZhCNLocale from 'element-plus/es/locale/lang/zh-cn'

import './mock'

// 组件工具
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/assets/fonts/font.css'
import '@/styles/index.scss'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router)
  // .use(i18n)
  .use(pinia)
  .use(ElementPlus, { locale: elementZhCNLocale })
  .mount('#app')
