# 🎯 开发模板库

## 模板目录

### 📄 Vue 组件模板
- `vue-components/BasicPageTemplate.vue` - 基础页面模板

### 🛠️ 工具函数
- `utils/common-helpers.js` - 通用工具函数

### 🛣️ 路由配置
- `routes/route-template.js` - 路由配置模板

## 使用方法

### 创建新页面
1. 复制 `BasicPageTemplate.vue` 到 `src/views/` 目录
2. 重命名文件并修改组件名
3. 在插槽中填充具体内容
4. 按需取消注释功能代码

### 添加工具函数
从 `common-helpers.js` 复制需要的函数到 `src/utils/` 中的相应文件

### 配置路由
参考 `route-template.js` 的格式在 `src/router/index.js` 中添加新路由

## 注意事项
- 保持模板的简洁性和通用性
- 定期更新模板以适应项目需求
- 新开发页面建议基于模板创建以保持一致性