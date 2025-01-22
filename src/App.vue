<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <!-- 根據路由條件渲染頁腳 -->
    <AppFooter v-if="showFooter" />
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from '@/components/AppFooter.vue';

// 控制頁腳的顯示狀態
const showFooter = ref(true); // 初始為顯示
const footerHeight = 64; // 頁腳高度（根據實際需求調整）
const threshold = 50; // 提前顯示的距離

const route = useRoute(); // 取得當前路由
const isFooterRoute = computed(() => !['no-footer-route1', 'no-footer-route2'].includes(route.name as string)); // 排除不需要頁腳的路由

// 滾動事件邏輯
let lastScrollTop = 0;
const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  if (currentScroll + windowHeight >= documentHeight - footerHeight - threshold) {
    showFooter.value = isFooterRoute.value; // 僅在特定路由顯示
  } else if (currentScroll > lastScrollTop) {
    showFooter.value = false; // 向下滾動隱藏
  } else {
    showFooter.value = isFooterRoute.value; // 向上滾動顯示
  }

  lastScrollTop = Math.max(0, currentScroll);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
