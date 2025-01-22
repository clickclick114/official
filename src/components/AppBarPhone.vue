<template>
  <div class="toolbar-div" :style="{ top: showHeader ? '0' : '-64px' }">
    <v-app-bar class="custom-toolbar" density="default" app fixed>
      <div class="custom-title">
        <!-- 英文標題 -->
        <div class="title-english">
          DEPARTMENT OF MULTIMEDIA DESIGN<br />
          OF NUTC 114TH
        </div>

        <!-- 中文標題 -->
        <div class="title-chinese">
          國立臺中科技大學 多媒體設計系<br />
          114級畢業製作
        </div>
      </div>

      <div class="image-container">
        <v-img src="@/assets/click_title.png" height="80%" />
      </div>

      <template v-slot:append>
        <div class="button-row">
          <v-menu transition="scroll-y-reverse-transition" offset-y>
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" style="cursor: pointer;">mdi-menu</v-icon>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in mainMenuItems"
                :key="index"
                @mouseenter="handleMouseEnter(item.type)"
              >
                <v-list-item-title class="d-flex align-center">
                  {{ item.title }}
                  <v-icon
                    v-if="item.type === 'group' || item.type === 'about'"
                    class="ml-2"
                  >
                    mdi-chevron-right
                  </v-icon>
                </v-list-item-title>
                <v-menu
                  v-if="item.type === 'group' || item.type === 'about'"
                  offset-x
                  transition="scroll-y-reverse-transition"
                >
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" style="cursor: pointer;">mdi-chevron-right</v-icon>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(subItem, subIndex) in getSubmenuItems(item.type)"
                      :key="subIndex"
                    >
                      <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-app-bar>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// 定義主選單類型
type MenuType = "group" | "none" | "about";

interface MainMenuItem {
  title: string;
  type: MenuType;
}

// 主選單項目
const mainMenuItems: MainMenuItem[] = [
  { title: "角色履歷", type: "none" },
  { title: "各組介紹", type: "group" },
  { title: "關於我們", type: "about" },
];

// 子選單項目
const groupItems = [
  { title: "GAMES", id: "games", category: "game" },
  { title: "ANIMATIONS", id: "animations", category: "animation" },
  { title: "SHORT FILM", id: "short-film", category: "short film" },
];

const aboutItems = [
  { title: "作品理念", id: "click", category: "click" },
  { title: "聯絡我們" },
];

const getSubmenuItems = (type: MenuType) => {
  if (type === "group") return groupItems;
  if (type === "about") return aboutItems;
  return [];
};

const handleMouseEnter = (type: MenuType) => {
  if (type === "none") return;
};

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
  text-align: left;
  color: white;
  height: 100%;
  min-width: 33%;
  max-width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 1%;
  padding-left: 1%;
  gap: 5px;
}

.title-english {
  font-size: 0.4rem;
  line-height: 1.5;
}

.title-chinese {
  font-size: 0.4rem;
  line-height: 1.6;
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
</style>


