<template>
  <!-- 2秒 Loading 畫面 -->
  <LoadingScreen v-if="isLoading" />

  <!-- 主畫面 -->
  <v-app v-show="!isLoading" :data-loaded="!isLoading" style="background-color: #b1dcf9; color: #FFFFFF;">

    <!-- 響應式導航列 -->
    <AppBar v-if="!mdAndDown" />
    <AppBarPhone v-if="mdAndDown" />

    <v-main>
      <router-view />
    </v-main>

    <!-- 響應式頁腳 -->
    <AppFooter v-if="showFooter && !mdAndDown" />
    <AppFooterPhone v-if="showFooter && mdAndDown" />
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useDisplay } from 'vuetify';
import AppBar from '@/components/AppBar.vue';
import AppBarPhone from '@/components/AppBarPhone.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppFooterPhone from '@/components/AppFooterPhone.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

// 取得螢幕尺寸資訊
const { mdAndDown } = useDisplay();

// 控制 Loading 畫面
const isLoading = ref(true);
const showFooter = ref(true);

onMounted(() => {
  setTimeout(() => {
    nextTick(() => {
      isLoading.value = false;
    });
  }, 2000);
});
</script>

<style>
/* 字體全域設定 */
@font-face {
  font-family: 'jf-openhuninn';
  src:url('@/assets/fonts/jf-openhuninn-2.1.ttf') format('truetype');
}

body {
  font-family: 'jf-openhuninn', sans-serif;
}
</style>