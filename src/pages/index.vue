<template>
  <v-app>
    <!-- 3 秒 Loading 畫面 -->
    <v-overlay v-if="loading" class="loading-overlay" persistent>
      <v-container class="fill-height d-flex justify-center align-center">
        <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
      </v-container>
    </v-overlay>

    <!-- 主內容 -->
    <div v-show="!loading">
      <!-- 桌機版 -->
      <AppBar v-if="!mdAndDown" />
      <!-- 手機版 -->
      <AppBarPhone v-if="mdAndDown" />

      <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: auto; position: relative;">
        <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
          <v-sheet :height="'95%'" :width="'95%'" color="transparent">
            <VideoContainer />
            <Character v-if="!mdAndDown" />
            <CharacterPhone v-if="mdAndDown" />
            <Section1 />
            <Form />
            <Coral />
          </v-sheet>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";

// 控制 Loading 畫面的變數
const loading = ref(true);
const { mdAndDown } = useDisplay();

onMounted(() => {
  // 3 秒後隱藏 Loading 畫面
  setTimeout(() => {
    loading.value = false;
  }, 3000);
});
</script>

<style scoped>
.loading-overlay {
  background-color: #001F3F !important; /* 深藍色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
