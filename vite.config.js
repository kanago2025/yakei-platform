import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 根据环境确定标题
  const getAppTitle = () => {
    const phase = env.VITE_APP_PHASE || mode
    const baseTitle = '宅学苑'
    
    if (phase === 'production') {
      return baseTitle
    } else if (phase === 'test') {
      return `${baseTitle}（测试版）`
    } else {
      return baseTitle
    }
  }

  return {
    base: '/',
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/_variables.scss";
            @import "@/styles/_mixins.scss";
            @import "@/styles/_base.scss";
          `
        }
      }
    },
    // 关键修改：确保环境变量在构建时被正确替换
    define: {
      'import.meta.env.VITE_APP_PHASE': JSON.stringify(env.VITE_APP_PHASE || mode),
      'import.meta.env.VITE_APP_TITLE': JSON.stringify(getAppTitle())
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia']
          }
        }
      }
    },
    // 可选：添加环境特定配置
    server: {
      port: 3000,
      open: true
    }
  }
})