<template>
  <v-app>
    <div>
      <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: auto; position: relative;">
        <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
          <v-sheet :height="'95%'" :width="'95%'" color="transparent">
            <Information />
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

<script setup lang="ts">
import { useDisplay } from "vuetify";
import Information from "../components/Information.vue";

const { mdAndDown } = useDisplay();
</script>
