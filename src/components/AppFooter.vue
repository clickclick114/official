<template>
  <!-- 頁腳 -->
  <v-footer class="page-footer">
    <div class="footer-content">
      <!-- 國立臺中科技大學文字 -->
      <img src="@/assets/logo.png" alt="School Logo" class="school-logo" />
      <p class="footer-text" :style="footerText">國立臺中科技大學 多媒體設計系 114級</p>

      <!-- 社群圖示 -->
      <v-btn icon @click="openLink('https://www.facebook.com/profile.php?id=61560214634108&locale=zh_TW')">
        <v-icon color="white">mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon @click="openLink('https://www.instagram.com/click_114nutcmd/')">
        <v-icon color="white">mdi-instagram</v-icon>
      </v-btn>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();

const footerText = computed(() => ({
  fontSize: mdAndDown.value ? '12px' : '16px', // 設定不同尺寸的字體大小
}));

// 定義 openLink 方法，打開新網址
const openLink = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.page-footer {
  background-color: #001ded;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center; /* 內容水平置中 */
  align-items: center;     /* 內容垂直置中 */
}

.footer-content {
  display: flex;
  align-items: center;
}

.school-logo {
  width: 24px;  /* 設定圖示大小，與 v-icon 一致 */
  height: 24px; /* 設定圖示大小，與 v-icon 一致 */
  margin-right: 8px; /* 圖示與文字之間的間距 */
}

.footer-text {
  color: #ffffff;
  font-size: 16px;
  margin-right: 10px; /* 文字與圖示之間留一些間距 */
}

.v-btn {
  margin-left: 10px; /* 調整圖示之間的間距 */
}
</style>