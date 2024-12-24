<template v-slot:append>
  <div class="toolbar-div">
    <v-app-bar class="custom-toolbar" :density="computedDensity" :style="dynamicStyles" app fixed>
        <div class="custom-title">
          DEPARTMENT<br>
          OF<br>
          MULTIMEDIA DESIGN<br>
          OF<br>
          NUTC 114TH
        </div>
  
        <div class="image-container">
          <v-img src="@/assets/click_title.png" height="80%"/>
        </div>
  
        <template v-slot:append style="background: yellow; width: 100%;">
          <v-row class="button-row" no-wrap justify="start">
            <!-- 角色履歷選單 -->
            <v-menu transition="scroll-y-transition" open-on-hover>
              <template v-slot:activator="{ props }">
                <v-col :cols="computedCols">
                  <v-btn v-bind="props" class="custom-button" :style="appbarButton">角色履歷</v-btn>
                </v-col>
              </template>
            </v-menu>

            <!-- 各組介紹選單 -->
            <v-menu transition="scroll-y-transition" open-on-hover>
              <template v-slot:activator="{ props }">
                <v-col :cols="computedCols">
                  <v-btn v-bind="props" class="custom-button" :style="appbarButton">各組介紹</v-btn>
                </v-col>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in groupItems" :key="index"
                 @click="navigateToCategory(item.category, item.id)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>


            <!-- 關於我們選單 -->
            <v-menu transition="scroll-y-reverse-transition" open-on-hover>
              <template v-slot:activator="{ props }">
                <v-col :cols="computedCols">
                  <v-btn v-bind="props" class="custom-button" :style="appbarButton">關於我們</v-btn>
                </v-col>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in aboutItems" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
      </template>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();
// appbar高度
const computedDensity = computed<'default' | 'prominent' | 'comfortable' | 'compact'>(() => {
  return mdAndDown.value ? 'default' : 'prominent';
});

// AppBar按鈕間距
const computedCols = computed(() => (mdAndDown.value ? 5 : 12));

// AppBar按鈕文字
const buttonFontSize = computed(() => (mdAndDown.value ? '8px' : '18px'));
const computedPaddingBottom = computed(() => (mdAndDown.value ? '5px' : '10px'));

// AppBar按鈕組合
const appbarButton = computed(() => ({
  fontSize: buttonFontSize.value,
  paddingBottom: computedPaddingBottom.value,
  width: mdAndDown.value ? '80px' : '100%',
  height: mdAndDown.value ? '20px' : '100%',
}));

// 組合動態樣式toolbar左側校名
const computedFontSize = computed<string>(() => (mdAndDown.value ? '6px' : '18px'));
const computedLineHeight = computed<string>(() => (mdAndDown.value ? '2.2' : '1.4'));

const dynamicStyles = computed(() => ({
  fontSize: computedFontSize.value,
  lineHeight: computedLineHeight.value,
}));

// 群組項目
const groupItems = [
{ title: "GAMES", id: "games", category: "game" },
  { title: "ANIMATIONS", id: "animations", category: "animation" },
  { title: "SHORT FILM", id: "short-film", category: "short film" },
];

const aboutItems = [
  { title: "作品理念", id: "click", category: "click" },
  { title: "聯絡我們" },
];

// 接收父組件的 props
const props = defineProps({
  filterCategory: Function
});

// 使用父組件傳遞過來的 `filterCategory` 方法
function navigateToCategory(category: string, id: string) {
  props.filterCategory(category); // 切換分類
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" }); // 滾動到目標
  }
}

</script>

<style scoped>
.toolbar-div {
  position: fixed;
  z-index: 2;
  width: 100%;
}
    
.custom-toolbar {
  background-color: #001ded !important; /* 確保使用指定顏色 */
}
    
.custom-title {
  font-size: normal;
  font-weight: normal;
  text-align: left;
  color: white;
  height: 100%; /* 保持高度自適應 */
  min-width: 33%;
  max-width: 33%;
}
    
.image-container {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center;     /* 垂直置中 */
  height: 100%;
  min-width: 33%;
  max-width: 33%;
}
    
.button-row {
  display: flex;
  justify-content: space-between; /* 水平排列 */
  align-items: center; /* 垂直置中 */
  flex-wrap: nowrap; /* 禁止換行 */
  min-width: 33%;
   max-width: 33%;
}
    
.custom-button {
  background-image: url('@/assets/button.png'); /* 替換為你的圖片路徑 */
  background-size: contain; /* 圖片完整顯示在按鈕範圍內 */
  background-repeat: no-repeat; /* 防止圖片重複 */  
  background-position: center; /* 圖片置中 */
  border-radius: 5%; /* 圓角按鈕 */
  display: flex; /* 使用 Flex 排列內容 */
  justify-content: center; /* 文字水平居中 */
  align-items: center; /* 文字垂直居中 */
  color: white; /* 文字顏色 */
  font-weight: normal; /* 文字400 */
}
</style>