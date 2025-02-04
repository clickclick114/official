<template>
  <!-- 2秒 Loading 畫面 -->
  <LoadingScreen v-if="isLoading" />

  <!-- 主畫面 -->
  <v-app v-show="!isLoading">
    <v-main>
      <router-view />
    </v-main>
    <AppFooter v-if="showFooter" />
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import AppFooter from '@/components/AppFooter.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    nextTick(() => {
      isLoading.value = false;
    });
  }, 2000);
});

const showFooter = ref(true);
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
