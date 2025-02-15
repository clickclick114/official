<template>
  <v-app>
    <div>
      <!-- 桌機版 -->
      <AppBar v-if="!mdAndDown" />
      <!-- 手機版 -->
      <AppBarPhone v-if="mdAndDown" />

      <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: auto; position: relative;">
        <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
          <v-sheet :height="'95%'" :width="'95%'" color="transparent">
            <VideoContainer />
            <Section1 />
            <Character v-if="!mdAndDown" />
            <CharacterPhone v-if="mdAndDown" />
            <Coral />
          </v-sheet>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

// 從 Vuetify 的 useDisplay 中取得 mdAndDown
const { mdAndDown } = useDisplay();
</script>