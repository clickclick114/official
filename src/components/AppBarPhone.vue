<template>
    <div class="toolbar-div">
      <v-app-bar class="custom-toolbar" :density="computedDensity" :style="dynamicStyles" app fixed>
        <div class="custom-title">
          DEPARTMENT<br />
          OF<br />
          MULTIMEDIA DESIGN<br />
          OF<br />
          NUTC 114TH
        </div>
  
        <div class="image-container">
          <v-img src="@/assets/click_title.png" height="80%" />
        </div>
  
        <template v-slot:append>
          <div class="button-row">
            <!-- 主選單 -->
            <v-menu transition="scroll-y-reverse-transition" offset-y>
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" style="cursor: pointer;">mdi-menu</v-icon>
              </template>
  
              <v-list>
                <!-- 第一層選單項目 -->
                <v-list-item
                  v-for="(item, index) in mainMenuItems"
                  :key="index"
                  @mouseenter="handleMouseEnter(item.type)"
                >
                  <v-list-item-title class="d-flex align-center">
                    {{ item.title }}
                    <!-- 第二層選單的箭頭圖標 -->
                    <v-icon v-if="item.type === 'group' || item.type === 'about'" class="ml-2">mdi-chevron-right</v-icon>
                  </v-list-item-title>
  
                  <!-- 第二層選單 -->
                  <v-menu v-if="item.type === 'group' || item.type === 'about'" offset-x transition="scroll-y-reverse-transition">
                    <template v-slot:activator="{ props }">
                      <!-- 第二層選單的箭頭圖標 -->
                      <v-icon v-bind="props" style="cursor: pointer; margin-left: auto;">mdi-chevron-right</v-icon>
                    </template>
  
                    <v-list>
                      <v-list-item v-for="(subItem, subIndex) in getSubmenuItems(item.type)" :key="subIndex">
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
  import { useDisplay } from 'vuetify';
  
  // 定義主選單類型
  type MenuType = 'group' | 'none' | 'about';
  
  interface MainMenuItem {
    title: string;
    type: MenuType;
  }
  
  // 解構 mdAndDown，偵測螢幕尺寸
  const { mdAndDown } = useDisplay();
  
  // AppBar 高度計算
  const computedDensity = computed<'default' | 'prominent'>(() => {
    return mdAndDown.value ? 'default' : 'prominent';
  });
  
  const computedFontSize = computed<string>(() => (mdAndDown.value ? '6px' : '18px'));
  const computedLineHeight = computed<string>(() => (mdAndDown.value ? '2.2' : '1.4'));
  
  const dynamicStyles = computed(() => ({
    fontSize: computedFontSize.value,
    lineHeight: computedLineHeight.value,
  }));
  
  // 主選單項目
  const mainMenuItems: MainMenuItem[] = [
    { title: '角色履歷', type: 'none' },
    { title: '各組介紹', type: 'group' },
    { title: '關於我們', type: 'about' },
  ];
  
  // 群組與關於我們的子選單
  const groupItems = [
    { title: 'GAMES', id: 'games', category: 'game' },
    { title: 'ANIMATIONS', id: 'animations', category: 'animation' },
    { title: 'SHORT FILM', id: 'short-film', category: 'short film' },
  ];
  
  const aboutItems = [
    { title: '作品理念', id: 'click', category: 'click' },
    { title: '聯絡我們' },
  ];
  
  // 根據主選單類型動態取得子選單
  const getSubmenuItems = (type: MenuType) => {
    if (type === 'group') return groupItems;
    if (type === 'about') return aboutItems;
    return [];
  };
  
  // 處理滑鼠進入事件
  const handleMouseEnter = (type: MenuType) => {
    if (type === 'none') {
      // 不顯示子選單
      return;
    }
  };
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
    font-size: normal;
    font-weight: normal;
    text-align: left;
    color: white;
    height: 100%;
    min-width: 33%;
    max-width: 33%;
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
  }
</style>

   
  