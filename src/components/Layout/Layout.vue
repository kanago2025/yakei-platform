<!-- src/components/Layout/Layout.vue -->
<template>
  <div class="app-layout">
    <Navbar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>