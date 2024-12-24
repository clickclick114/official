<template>
  <v-app>
    <div>
      <AppBar />
      <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: auto; position: relative;">
        <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
          <v-sheet :height="'95%'" :width="'95%'" color="transparent">
            <!-- VideoContainer 元件 -->
            <VideoContainer />

            <!-- Hide on mobile screens (xs and sm breakpoints) -->
            <Character class="d-none d-md-block" />

            <!-- Show only on mobile screens (xs and sm breakpoints) -->
            <CharacterPhone class="d-block d-md-none" />

            <!-- Section1 元件 -->
            <Section1 />
            <!-- Form 元件 -->
            <Form />
            <Coral />
          </v-sheet>
        </v-container>

        <!-- 在頁面最下方疊加透明圖片 -->
        <div class="image-overlay"></div>
      </v-main>
    </div>
  </v-app>
</template>


<script lang="ts" setup>

</script>


<style scoped>
/* 確保父容器具有相對定位 */
.v-main {
  position: relative;
}

/* 透明 PNG 圖片疊加 */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); /* 使圖片居中 */
  width: 100%;  /* 或自訂寬度 */
  max-width: 100%; /* 設置圖片最大寬度 */
  height: auto;
  background-image: url('@/assets/coral.png'); /* 這裡使用您的 PNG 圖片路徑 */
  background-repeat: no-repeat;
  background-size: contain; /* 確保圖片不會被拉伸 */
  z-index: 1;  /* 確保圖片位於內容的上層 */
}
</style>