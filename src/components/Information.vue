<template>
    <v-container class="image-container" :style="container">
      <div class="image-overlay">
        <v-img src="@/assets/time.png" />
      </div>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useDisplay } from 'vuetify';
  
  
  // 解構 mdAndDown，偵測螢幕尺寸
  const { mdAndDown } = useDisplay();
  

  const container = computed(() => ({
    height: mdAndDown.value ? '50px' : '125px',
    width:"100%",
    marginTop:  mdAndDown.value ? '0px' : '40px',
    marginBottom:  mdAndDown.value ? '0px' : '0px',
}));

  </script>
  
  <style scoped>
/* 父容器設置相對定位 */
.image-container {
  position: relative; /* 使圖片疊加於容器內 */
  width: 100%;
  overflow: hidden; /* 隱藏超出容器的圖片部分 */
  margin-top: 20px;
}

/* 透明 PNG 圖片疊加 */
.image-overlay {
  position: absolute;
  bottom: 0; /* 放置在底部 */
  left: 50%;
  transform: translateX(-50%); /* 居中顯示 */
  width: 100%;  /* 填滿容器寬度 */
  height: 100%; /* 讓圖片填滿容器高度 */
  background-repeat: no-repeat;
  background-size: cover; /* 讓圖片覆蓋容器 */
  background-position: center; /* 圖片置中 */
  z-index: 1;  /* 確保圖片位於內容的上層 */
}
  </style>