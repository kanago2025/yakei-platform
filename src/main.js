import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


import './assets/main.css'

// 调试信息
console.log('🚀 Vue应用开始初始化...')

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 确保挂载点存在
const appElement = document.getElementById('app')
if (appElement) {
  app.mount('#app')
  console.log('✅ Vue应用挂载成功')
} else {
  console.error('❌ 错误：未找到 #app 元素')
}