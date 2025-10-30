/**
 * 🛣️ 路由配置模板
 * 使用方法：
 * 1. 复制此配置到 router/index.js
 * 2. 修改 path, name, component 等属性
 */

{
  path: '/page-path',
  name: 'PageName',
  component: () => import('@/views/PageName.vue'),
  meta: {
    title: '页面标题',
    requiresAuth: true,      // 是否需要登录
    keepAlive: false,        // 是否缓存组件
    breadcrumb: ['首页', '页面标题'] // 面包屑
  }
}

// 📋 完整示例：
/*
{
  path: '/important-matters',
  name: 'ImportantMatters',
  component: () => import('@/views/notes/yefa/ImportantMatters.vue'),
  meta: {
    title: '重要事项',
    requiresAuth: true,
    keepAlive: true,
    breadcrumb: ['首页', '笔记', '业务', '重要事项']
  }
}
*/

// 🎯 嵌套路由示例：
/*
{
  path: '/parent',
  name: 'Parent',
  component: () => import('@/views/Parent.vue'),
  children: [
    {
      path: 'child',
      name: 'Child',
      component: () => import('@/views/Child.vue'),
      meta: {
        title: '子页面',
        requiresAuth: true
      }
    }
  ]
}
*/