<template>
    <v-container class="center-container">
      <p class="schoolname" :style="schoolName">
        【國立臺中科技大學 多媒體設計系 114級畢業製作】
      </p>
    </v-container>
  </template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';


// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();


const schoolName = computed(() => ({
    fontSize: mdAndDown.value ? '14px' : '40px',
}));
</script>

<style scoped>
/* 父容器設置絕對置中 */
.center-container {
  display: flex;           /* 啟用 Flex 排版 */
  justify-content: center; /* 水平置中 */
  align-items: center;     /* 垂直置中 */
  padding-top: 3%;
  height: 100%;
  width: 100%;
}

.schoolname {
  color: #4f4f4f;          /* 字體顏色 */
  text-align: center;      /* 文字置中對齊 */
}
</style>