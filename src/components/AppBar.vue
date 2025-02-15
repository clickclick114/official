<template v-slot:append>
  <div class="toolbar-div">
    <v-app-bar class="custom-toolbar" density="prominent" app fixed>
      <div class="custom-title">
        <!-- 英文標題 -->
        <div class="title-english">
          DEPARTMENT OF MULTIMEDIA DESIGN<br>
          OF NUTC 114TH
        </div>

        <!-- 中文標題 -->
        <div class="title-chinese">
          國立臺中科技大學 多媒體設計系<br>
          114級畢業製作
        </div>
      </div>

      <div class="image-container">
        <v-img src="@/assets/click_title.png" height="80%" />
      </div>
      <template v-slot:append style="background: yellow; width: 100%;">
        <v-row class="button-row" no-wrap justify="start">
          <!-- 心理測驗按鈕，點擊後跳轉 -->
          <v-btn class="custom-button" size="x-large" @click="redirectToTest">
            心理測驗
          </v-btn>

          <!-- 展場問卷按鈕 -->
          <v-menu transition="scroll-y-transition" open-on-hover>
            <template v-slot:activator="{ props }">
              <v-col cols="12">
                <v-btn v-bind="props" class="custom-button" size="x-large">
                  展場問卷
                </v-btn>
              </v-col>
            </template>
          </v-menu>

          <!-- 回饋問卷按鈕，點擊後跳轉 -->
          <v-btn class="custom-button" size="x-large" @click="redirectToFeedback">
            回饋問卷
          </v-btn>

          <!-- 關於我們選單 -->
          <v-menu transition="scroll-y-reverse-transition" open-on-hover>
            <template v-slot:activator="{ props }">
              <v-col cols="12">
                <v-btn v-bind="props" class="custom-button" size="x-large">
                  關於我們
                </v-btn>
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
// 群組項目
const aboutItems = [
  { title: "作品理念", id: "click", category: "click" },
  { title: "聯絡我們" },
  { title: "回饋問卷"}
];

// 跳轉到心理測驗頁面
const redirectToTest = () => {
  window.open('https://clickclick114.github.io/official/test/', '_blank');
};

// 跳轉到回饋問卷頁面
const redirectToFeedback = () => {
  window.open('https://clickclick114.github.io/official/form/', '_blank');
};
</script>

<style scoped>
.v-app-bar {
  position: fixed !important; /* 確保固定在頂部 */
  top: 0;
  z-index: 10; /* 避免被其他組件覆蓋 */
  width: 100%;
}

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
  padding-left: 1%;
  gap: 16px; /* 調整中英間距，gap它會提供容器中所有物件間距 */
}

.title-english {
  font-size: 1rem;
  line-height: 1.2;
}

.title-chinese {
  font-size: 1rem;
  line-height: 1.3;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 33%;
  max-width: 33%;
}

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  min-width: 33%;
  max-width: 33%;
}

.custom-button {
  background-image: url('@/assets/button.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: normal;
  padding-bottom: 10%;
}
</style>
