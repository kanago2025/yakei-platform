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
    // 添加服务器配置，包括代理
    server: {
      port: 3000,
      strictPort: true, // 强制使用3000端口，如果被占用就报错
      open: true,
      proxy: {
        // 代理所有以 /api 开头的请求到后端服务器
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
          configure: (proxy, options) => {
            // 可选：添加代理事件监听用于调试
            proxy.on('error', (err, req, res) => {
              console.log('❌ 代理错误:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('🔄 代理请求:', req.method, req.url);
            });
          }
        }
      }
    },
    // 预览配置（用于生产构建预览）
    preview: {
      port: 3000,
      strictPort: true, // 预览模式也强制使用3000端口
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})