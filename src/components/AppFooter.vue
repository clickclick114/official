<template>
  <v-footer
    class="custom-footer"
    app
    fixed
    :style="footerStyle"
  >
    <div class="footer-content">
      <!-- 國立臺中科技大學文字 -->
      <img src="@/assets/logo.png" alt="School Logo" class="school-logo" />
      <p class="footer-text" :style="footerText">
        國立臺中科技大學 多媒體設計系 114級
      </p>

      <!-- 社群圖示 -->
      <v-btn
        icon
        class="footer-btn"
            elevation="0"
        @click="openLink('https://www.facebook.com/profile.php?id=61560214634108&locale=zh_TW')"
      >
        <v-icon color="white">mdi-facebook</v-icon>
      </v-btn>
      <v-btn
        icon
        class="footer-btn"
            elevation="0"
        @click="openLink('https://www.instagram.com/click_114nutcmd/')"
      >
        <v-icon color="white">mdi-instagram</v-icon>
      </v-btn>
      <v-btn
  icon
  class="footer-btn"
  elevation="0"
  @click="openLink('https://www.youtube.com/@CLICK_nutcmd114')"
>
  <v-icon color="white">mdi-youtube</v-icon>
</v-btn>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useDisplay } from 'vuetify';

const { mdAndDown } = useDisplay();
const footerText = computed(() => ({
  fontSize: mdAndDown.value ? '12px' : '16px',
}));

const openLink = (url: string) => {
  window.open(url, '_blank');
};

const showFooter = ref(false);  // 頁腳是否顯示的狀態
const footerHeight = 64; // 頁腳高度
let lastScrollTop = 0; // 上次滾動位置


// 滾動事件處理函數
const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  // 如果滾動到最底部，顯示頁腳
  if (currentScroll + windowHeight >= documentHeight - footerHeight) {
    showFooter.value = true;
  } else if (currentScroll > lastScrollTop) {
    // 向下滾動，隱藏頁腳
    showFooter.value = false;
  } else {
    // 向上滾動，顯示頁腳
    showFooter.value = true;
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 防止滾動值為負
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 動態設定頁腳樣式
const footerStyle = computed(() => ({
  transform: showFooter.value ? 'translateY(0)' : `translateY(${footerHeight}px)`,
  opacity: showFooter.value ? '1' : '0',
  visibility: showFooter.value ? 'visible' : 'hidden' as 'visible' | 'hidden',  // 強制類型為 'visible' | 'hidden'
  transition: 'transform 0.3s ease, opacity 0.3s ease, visibility 0.1ms ease',
}));

</script>

<style scoped>
.custom-footer {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: #001ded !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.school-logo {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.footer-text {
  color: #ffffff;
  font-size: 16px;
  margin-right: 10px;
}

.v-btn {
  margin-left: 10px;
}

.footer-btn {
  background-color: #001ded !important;
}
</style>
