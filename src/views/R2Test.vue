<template>
  <div class="r2-test">
    <h1>R2 存储测试</h1>
    <p>Bucket 状态: <span class="status-success">✅ 已连接</span></p>
    <p>Bucket 名称: yakei-videos</p>
    <p>创建时间: 2025-10-28</p>
    
    <VideoUploader />
  </div>
</template>

<script>
import VideoUploader from '@/components/VideoUploader.vue';

export default {
  name: 'R2Test',
  components: {
    VideoUploader
  }
};
</script>

<style scoped>
.r2-test {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.status-success {
  color: #28a745;
  font-weight: bold;
}
</style>