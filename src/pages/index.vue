<template>
  <v-app>
    <div>
      <AppBar />
      <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: auto; position: relative;">
        <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
          <v-sheet :height="'95%'" :width="'95%'" color="transparent">
            <!-- VideoContainer 元件 -->
            <VideoContainer />

            <!-- Hide on mobile screens (xs and sm breakpoints) -->
            <Character class="d-none d-md-block" />

            <!-- Show only on mobile screens (xs and sm breakpoints) -->
            <CharacterPhone class="d-block d-md-none" />

            <!-- Section1 元件 -->
            <Section1 />
            <!-- Form 元件 -->
            <Form />
            <Coral />
          </v-sheet>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>


<script lang="ts" setup>

</script>

