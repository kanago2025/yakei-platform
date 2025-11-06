// src/main.js (完整版)
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'

// 导入样式
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

// 注册 Element Plus
app.use(ElementPlus)
app.use(pinia)
app.use(router)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 初始化stores
const initializeStores = async () => {
  try {
    const { useUserStore } = await import('@/stores/user')
    const userStore = useUserStore()
    await userStore.Initialize()
    console.log('用户store初始化完成')
  } catch (error) {
    console.warn('Store初始化失败，但应用继续运行:', error)
  }
}

// 不阻塞应用启动
initializeStores()

app.mount('#app')