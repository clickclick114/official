<template>
  <!-- 頁腳 -->
  <v-footer class="page-footer">
    <div class="footer-content">
      <p class="footer-text">CLICK</p>
    </div>
  </v-footer>
</template>

<style scoped>
.page-footer {
  background-color: #001ded;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-end; /* 讓內容靠右 */
  align-items: center;
}

.footer-text {
  color: #ffffff;
  font-size: 16px;
  margin: 0;
}
</style>