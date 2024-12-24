<template>
    <v-container class="image-container">
      <div class="image-overlay"></div>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  // 這裡沒有修改，保持原來的結構
  </script>
  
  <style scoped>
  /* 父容器設置相對定位 */
  .image-container {
    position: relative; /* 使圖片疊加於容器內 */
    width: 100%;
    height: 100%; /* 可以設置具體高度 */
  }
  
  /* 透明 PNG 圖片疊加 */
  .image-overlay {
    position: absolute;
    bottom: 0; /* 放置在底部 */
    left: 50%;
    transform: translateX(-50%); /* 居中顯示 */
    width: 100%;  /* 填滿容器寬度 */
    height: auto;  /* 保持圖片高度自適應 */
    background-image: url('@/assets/coral.png'); /* 使用 PNG 圖片 */
    background-repeat: no-repeat;
    background-size: contain; /* 保持圖片比例 */
    background-position: center; /* 圖片置中 */
    z-index: 1;  /* 確保圖片位於內容的上層 */
  }
  </style>