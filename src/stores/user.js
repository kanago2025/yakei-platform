// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    isPremium: false
  }),
  
  actions: {
    login(userData) {
      this.user = userData
      this.isLoggedIn = true
      this.isPremium = userData.subscription_tier === 'premium'
    },
    
    logout() {
      this.user = null
      this.isLoggedIn = false
      this.isPremium = false
    }
  }
})