import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('../views/Notes.vue')
  },
  {
    path: '/notes-agent',
    name: 'NotesAgent',
    component: () => import('../views/NotesAgent.vue')
  },
  {
    path: '/notes-important-matters',
    name: 'NotesImportantMatters',
    component: () => import('../views/NotesImportantMatters.vue')
  },
  {
    path: '/notes-mortgage',
    name: 'NotesMortgage',
    component: () => import('../views/NotesMortgage.vue')
  },
  {
    path: '/notes-viewport',
    name: 'NotesViewport',
    component: () => import('../views/Notes-viewport.vue')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video.vue')
  },
  {
    path: '/practice',
    name: 'Practice',
    component: () => import('../views/Practice.vue')
  },
  {
    path: '/exam',
    name: 'Exam',
    component: () => import('../views/Exam.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../views/Community.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  // 404页面处理
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进后退），则返回该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到顶部
    return { top: 0 }
  }
})

export default router