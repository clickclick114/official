<template v-slot:append>
  <div class="toolbar-div">
    <v-app-bar class="custom-toolbar" :density="computedDensity" app fixed>
      <div 
        class="custom-title" 
        :style="{ paddingTop: titlePadding, paddingLeft: titlePaddingLeft }"
      >
        <!-- 英文標題 -->
        <div class="title-english" :style="englishStyles">
          DEPARTMENT OF MULTIMEDIA DESIGN<br>
          OF NUTC 114TH
        </div>

        <!-- 英中段落間距 -->
        <div class="title-gap" :style="{ height: gapHeight }"></div>

        <!-- 中文標題 -->
        <div class="title-chinese" :style="chineseStyles">
          國立臺中科技大學 多媒體設計系<br>
          114級畢業製作
        </div>
      </div>

      <!-- 圖片容器 -->
      <div class="image-container">
        <v-img src="@/assets/click_title.png" height="80%"/>
      </div>

      <!-- 空白按鈕列 -->
      <v-row class="button-row" no-wrap justify="start">
      </v-row>
    </v-app-bar>
  </div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();

// 定義並計算 appbar 的高度
const computedDensity = computed<'default' | 'prominent' | 'comfortable' | 'compact'>(() => {
  return mdAndDown.value ? 'default' : 'prominent';
});

// 動態計算英文字體樣式
const englishStyles = computed(() => ({
  fontSize: mdAndDown.value ? '0.4rem' : '1rem',
  lineHeight: mdAndDown.value ? '1.5' : '1.2',
}));

// 動態計算中文字體樣式
const chineseStyles = computed(() => ({
  fontSize: mdAndDown.value ? '0.4rem' : '1rem',
  lineHeight: mdAndDown.value ? '1.6' : '1.3',
}));

// 英文與中文段落之間的間距
const gapHeight = computed(() => (mdAndDown.value ? '5px' : '16px'));

// Title Padding (上方間距)
const titlePadding = computed(() => (mdAndDown.value ? '1%' : '0'));

// Title Padding (左側間距)
const titlePaddingLeft = computed(() => (mdAndDown.value ? '1%' : '1%'));
</script>


<style scoped>
.toolbar-div {
  position: fixed;
  z-index: 2;
  width: 100%;
}

.custom-toolbar {
  background-color: #001ded !important;
}

.custom-title {
  font-weight: normal;
  text-align: left;
  color: white;
  height: 100%;
  min-width: 33%;
  max-width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 英文標題樣式 */
.title-english {
  font-weight: normal;
}

/* 中文標題樣式 */
.title-chinese {
  font-weight: normal;
}

/* 英文與中文段落間距 */
.title-gap {
  width: 100%;
}

/* 圖片容器樣式 */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 33%;
  max-width: 33%;
}

/* 按鈕列樣式 */
.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  min-width: 33%;
  max-width: 33%;
}
</style>
