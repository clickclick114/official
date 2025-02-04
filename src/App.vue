<template>
  <!-- 2秒 Loading 畫面 -->
  <LoadingScreen v-if="isLoading" />

  <!-- 主畫面 -->
  <v-app v-show="!isLoading">
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

<style scoped>
/* 確保 Loading 畫面顯示時，主畫面不會干擾 */
.v-app {
  display: none;
}

/* 2秒後顯示主畫面 */
.v-app[data-loaded="true"] {
  display: block;
}
</style>
