<template>
  <div class="toolbar-div" :style="{ top: showHeader ? '0' : '-64px' }">
    <v-app-bar class="custom-toolbar" density="default" app fixed>
      <div class="custom-title">
        <!-- 英文標題，位於左側 -->
        <div class="title-english">
          DEPARTMENT OF<br />
          MULTIMEDIA DESIGN<br />
          THE 114TH OF NUTC
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

      <div class="custom-title">
        <!-- 中文標題，位於右側 -->
        <div class="title-chinese">
          國立臺中科技大學<br />
          多媒體設計系<br />
          114級畢業製作
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// 控制 AppBar 顯示與隱藏
const showHeader = ref(true);
let lastScrollTop = 0;

const handleScroll = () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    showHeader.value = false; // 隱藏 AppBar
  } else {
    showHeader.value = true; // 顯示 AppBar
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 避免滾動值為負
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.toolbar-div {
  position: fixed;
  z-index: 2;
  width: 100%;
  transition: top 0.3s ease;
}

.custom-toolbar {
  background-color: #001ded !important;
}

.custom-title {
  font-weight: normal;
  text-align: center;
  color: white;
  height: 100%;
  min-width: 33%;
  max-width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0;
  padding-left: 3%;
  padding-right: 3%;
  gap: 5px;
}

.title-english {
  font-size: 0.5rem;
  line-height: 1.5;
  text-align: left;
}

.title-chinese {
  font-size: 0.5rem;
  line-height: 1.5;
  font-weight: 350;
  text-align: right;
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
</style>
