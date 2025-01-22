<template>
  <v-app>
    <div>
      <!-- 桌機版 -->
      <AppBar v-if="!smAndDown" />
      <!-- 手機版 -->
      <AppBarPhone v-if="smAndDown" />

      <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: auto; position: relative;">
        <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
          <v-sheet :height="'95%'" :width="'95%'" color="transparent">
            <VideoContainer />
            <Character v-if="!smAndDown" />
            <CharacterPhone v-if="smAndDown" />
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
import { useDisplay } from "vuetify";

// 從 Vuetify 的 useDisplay 中取得 smAndDown
const { smAndDown } = useDisplay();
</script>
