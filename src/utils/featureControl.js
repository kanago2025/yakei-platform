// src/utils/featureControl.js
import { features, currentPhase, isTopicVisible } from '@/router/index.js'

// 功能控制工具类
export class FeatureControl {
  // 检查路由是否可见
  static isRouteVisible(routeName) {
    if (currentPhase !== 'test') return true
    
    const routeConfig = {
      'home': features.home,
      'notes': features.notes,
      'video': features.video,
      'practice': features.practice,
      'exam': features.exam,
      'dashboard': features.dashboard,
      'community': features.community,
      'user-management': features.userManagement
    }
    
    return routeConfig[routeName] !== false
  }

  // 检查知识点是否可见
  static isTopicVisible(category, topicName) {
    return isTopicVisible(category, topicName)
  }

  // 获取当前环境
  static getCurrentPhase() {
    return currentPhase
  }

  // 获取可见的知识点列表
  static getVisibleTopics(category) {
    if (currentPhase !== 'test') return 'all'
    return features[category]?.visibleTopics || []
  }

  // 检查链接是否应该显示为"即将开放"
  static shouldShowComingSoon(routeName) {
    return currentPhase === 'test' && !this.isRouteVisible(routeName)
  }
}

export default FeatureControl