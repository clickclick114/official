<template>
    <v-container class="image-container" >
      <div class="image-overlay">
        <v-img src="@/assets/coral.png" />
      </div>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  // 這裡沒有修改，保持原來的結構
  </script>
  
  <style scoped>
/* 父容器設置相對定位 */
.image-container {
  position: relative; /* 使圖片疊加於容器內 */
  height: 300px; /* 設置容器高度為100% */
  width: 100%;
  overflow: hidden; /* 隱藏超出容器的圖片部分 */
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