// scripts/generate-topic.js
const fs = require('fs');
const path = require('path');

class TopicGenerator {
  constructor() {
    this.templatesPath = path.join(__dirname, 'templates');
    this.viewsPath = path.join(__dirname, '../src/views/notes');
  }

  // 生成单个知识点
  generateTopic(topicData) {
    const { id, title, domain, domainFolder } = topicData;
    
    console.log(`开始生成知识点: ${title} (${id})`);
    
    // 1. 生成Vue组件
    this.generateVueComponent(topicData);
    
    // 2. 更新路由配置
    this.updateRouterConfig(topicData);
    
    // 3. 更新知识点配置
    this.updateTopicConfig(topicData);
    
    console.log(`✅ 知识点 "${title}" 生成完成`);
  }

  // 生成Vue组件
  generateVueComponent(topicData) {
    const templatePath = path.join(this.templatesPath, 'knowledge-topic.vue');
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // 替换模板变量
    let content = template
      .replace(/{{TOPIC_TITLE}}/g, topicData.title)
      .replace(/{{TOPIC_ID}}/g, topicData.id)
      .replace(/{{DOMAIN_NAME}}/g, topicData.domain)
      .replace(/{{DOMAIN_FOLDER}}/g, topicData.domainFolder)
      .replace(/{{COMPONENT_NAME}}/g, this.toPascalCase(topicData.id));

    // 确保目录存在
    const domainDir = path.join(this.viewsPath, topicData.domainFolder);
    if (!fs.existsSync(domainDir)) {
      fs.mkdirSync(domainDir, { recursive: true });
    }

    // 写入文件
    const filePath = path.join(domainDir, `${this.toPascalCase(topicData.id)}.vue`);
    fs.writeFileSync(filePath, content);
    console.log(`📄 创建组件: ${filePath}`);
  }

  // 更新路由配置
  updateRouterConfig(topicData) {
    const routerPath = path.join(__dirname, '../src/router/index.js');
    let routerContent = fs.readFileSync(routerPath, 'utf8');
    
    const routeConfig = `
  {
    path: '/notes/${topicData.domainFolder}/${topicData.id}',
    name: '${this.toPascalCase(topicData.id)}',
    component: () => import('@/views/notes/${topicData.domainFolder}/${this.toPascalCase(topicData.id)}.vue'),
    meta: {
      title: '${topicData.title} - 宅学苑',
      requiresAuth: false,
      breadcrumb: ['首页', '笔记', '${topicData.domain}', '${topicData.title}']
    }
  },`;
    
    // 在routes数组的适当位置插入新路由
    const insertPoint = routerContent.indexOf('// 404 页面处理');
    if (insertPoint !== -1) {
      routerContent = routerContent.slice(0, insertPoint) + routeConfig + '\n  ' + routerContent.slice(insertPoint);
      fs.writeFileSync(routerPath, routerContent);
      console.log(`🔄 更新路由配置`);
    }
  }

  // 更新知识点配置（用于Notes.vue）
  updateTopicConfig(topicData) {
    // 这里可以生成配置代码片段，手动复制到Notes.vue中
    const topicConfig = `
  {
    id: '${topicData.id}',
    title: '${topicData.title}',
    description: '${topicData.description || topicData.title}相关知识点',
    icon: '${topicData.icon || '📚'}',
    points: ${topicData.points || 15},
    duration: '${topicData.duration || '30分钟'}',
    difficulty: '${topicData.difficulty || 'basic'}',
    badgeText: '${topicData.badgeText || '基础'}',
    videoId: '${topicData.id}',
    isNew: true,
    bookmarked: false,
    domain: '${topicData.domain}'
  },`;
    
    console.log('📋 知识点配置代码:');
    console.log(topicConfig);
    console.log('请将上述代码复制到 Notes.vue 的对应领域数组中');
  }

  // 批量生成所有知识点
  generateAllTopics() {
    const allTopics = this.getAllTopicsFromDoc();
    allTopics.forEach(topic => this.generateTopic(topic));
    console.log(`🎉 全部 ${allTopics.length} 个知识点生成完成`);
  }

  // 从文档中获取所有知识点（基于您提供的5个分野文档）
  getAllTopicsFromDoc() {
    return [
      // 宅建业法 (16个)
      { id: 'business_meaning', title: '宅建业的含义', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'business_office', title: '事务所', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'business_license', title: '免许', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'business_outside_office', title: '事务所以外场所的规制', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'takuchi_tatemono_torihikishi', title: '宅地建物取引士', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'business_deposit', title: '营业保证金', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'compensation_deposit', title: '弁済业务保证金', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'mediation_agency', title: '媒介・代理', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'advertisement_regulation', title: '広告等规制', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'important_matters', title: '重要事项说明', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'article_37_document', title: '37条书面', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'other_business_regulations', title: '其他业务上规制', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'self_seller_restrictions', title: '自ら売主制限', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'housing_defect_warranty', title: '住宅瑕疵担保履行法', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'compensation_limit', title: '报酬额制限', domain: '宅建业法', domainFolder: 'yefa' },
      { id: 'supervision_penalties', title: '监督・罚则', domain: '宅建业法', domainFolder: 'yefa' },

      // 权利关系 (17个) - 可以继续添加...
      { id: 'intent_expression', title: '意思表示', domain: '权利关系', domainFolder: 'quanli' },
      { id: 'limited_capacity', title: '制限行为能力者', domain: '权利关系', domainFolder: 'quanli' },
      // ... 其他知识点
    ];
  }

  // 工具函数：转换为帕斯卡命名
  toPascalCase(str) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

// 使用示例
const generator = new TopicGenerator();

// 生成单个知识点
// generator.generateTopic({
//   id: 'business_office',
//   title: '事务所',
//   domain: '宅建业法',
//   domainFolder: 'yefa',
//   points: 18,
//   duration: '35分钟'
// });

// 批量生成所有知识点
generator.generateAllTopics();

module.exports = TopicGenerator;