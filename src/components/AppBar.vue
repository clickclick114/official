<template>
  <v-app-bar
    class="custom-toolbar"
    density="prominent"
    app
    fixed
  >
    <div class="custom-title">
      <!-- 英文標題 -->
      <div class="title-english">
        DEPARTMENT OF MULTIMEDIA DESIGN<br>
        THE 114TH OF NUTC
      </div>

      <!-- 中文標題 -->
      <div class="title-chinese">
        國立臺中科技大學 多媒體設計系<br>
        114級畢業製作
      </div>
    </div>

    <div class="image-container">
      <a href="https://clickclick114.github.io/official/" target="_blank" class="image-link">
        <v-img
          src="@/assets/click_title.png"
          height="80%"
          contain
        />
      </a>
    </div>


    <template v-slot:append>
      <v-row class="button-row" no-wrap justify="start">
        <!-- 心理測驗按鈕，點擊後跳轉 -->
        <v-btn
          class="custom-button"
          size="x-large"
          @click="redirectToTest"
        >
          心理測驗
        </v-btn>

        <!-- 展場問卷按鈕 -->
        <v-menu
          transition="scroll-y-transition"
          open-on-hover
        >
          <template v-slot:activator="{ props }">
            <v-col cols="12">
              <v-btn
                v-bind="props"
                class="custom-button"
                size="x-large"
                @click= "group"
              >
                各組介紹
              </v-btn>
            </v-col>
          </template>
        </v-menu>

        <!-- 關於我們選單 -->
        <v-menu
          transition="scroll-y-reverse-transition"
          open-on-hover
        >
          <template v-slot:activator="{ props }">
            <v-col cols="12">
              <v-btn
                v-bind="props"
                class="custom-button"
                size="x-large"
              >
                關於我們
              </v-btn>
            </v-col>
          </template>
          <v-list>
            <v-list-item v-for="item in aboutItems" :key="item.title" @click="handleItemClick(item)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">

// 定義關於我們選單項目
interface AboutItem {
  title: string;
  url: string;
}

const aboutItems: AboutItem[] = [
  { title: "作品理念", url: "https://clickclick114.github.io/official/#click" },
  { title: "回饋問卷", url: "https://clickclick114.github.io/official/form/" },
  { title: "展場問卷", url: "" }
];

// 處理點擊事件，跳轉到指定網址
const handleItemClick = (item: AboutItem) => {
  window.location.href = item.url;
};

// 跳轉到心理測驗頁面
const redirectToTest = () => {
  window.open("https://clickclick114.github.io/official/test");
};

// 跳轉到各組介紹頁面
const group = () => {
  window.open("https://clickclick114.github.io/official/#group");
};
</script>


<style scoped>
.v-app-bar {
  position: fixed !important; /* 確保固定在頂部 */
  top: 0;
  z-index: 10; /* 避免被其他組件覆蓋 */
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
  gap: 8px; /* 調整中英間距 */
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

.image-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.image-link v-img {
  cursor: pointer;
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
  background-image: url("@/assets/button.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: normal;
  font-size: 1.15rem;
  padding-bottom: 12%;
}
</style>