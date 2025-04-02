<template>
<v-container class="center-container">
  <p class="schoolname" :style="schoolName">
    <span class="exhibition-title">展覽資訊</span><br>
    <br>
    校內展𓂃中科大中商大樓𝟮𝟬𝟮𝟱.𝟬𝟰.𝟭5 ⇢ 𝟭𝟴<br>
    新一代設計展𓂃南港展覽館4樓 𝟮𝟬𝟮𝟱.𝟬𝟱.𝟬𝟵 ⇢ 𝟭𝟮<br>
    放視大賞𓂃高雄展覽館𝟮𝟬𝟮𝟱.𝟬𝟱.𝟭𝟱 ⇢ 𝟭𝟳
  </p>
</v-container>
  </template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';


// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();


const schoolName = computed(() => ({
    fontSize: mdAndDown.value ? '14px' : '25px',
}));
</script>

<style scoped>
/* 父容器設置絕對置中 */
.center-container {
  display: flex;           /* 啟用 Flex 排版 */
  justify-content: center; /* 水平置中 */
  align-items: center;     /* 垂直置中 */
  padding-top: 3%;
  padding-bottom: 5%;
  height: 100%;
  width: 100%;
}

.schoolname {
  color: #4f4f4f;          /* 字體顏色 */
  text-align: center;      /* 文字置中對齊 */
  font-weight: 750;
}

.exhibition-title {
  font-size: 1.4em; /* 調整標題字體大小 */
  font-weight: 750; /* 加粗 */
}
</style>