// 知识点配置中心
export const knowledgeTopics = {
  business: [
    {
      id: 'business_meaning',
      title: '宅建业的含义',
      route: '/notes/yefa/business-meaning',
      component: 'BusinessMeaning',
      // ... 其他配置
    },
    {
      id: 'important_matters', 
      title: '重要事项说明',
      route: '/notes/yefa/important-matters',
      component: 'ImportantMatters',
      // ... 其他配置
    }
    // 继续添加...
  ],
  rights: [
    // 权利关系知识点...
  ]
  // 其他领域...
}

// 自动生成路由配置
export const generateRoutes = () => {
  const routes = []
  Object.values(knowledgeTopics).forEach(domain => {
    domain.forEach(topic => {
      routes.push({
        path: topic.route,
        name: topic.component,
        component: () => import(`@/views/notes/${getDomainFolder(topic.id)}/${topic.component}.vue`)
      })
    })
  })
  return routes
}