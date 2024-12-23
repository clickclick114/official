<template>
  <v-app>
  <div>
  <AppBar />
  <Section1 />
  <!-- Hide on mobile screens (xs and sm breakpoints) -->
  <Character class="d-none d-md-block" />
    <!-- Show only on mobile screens (xs and sm breakpoints) -->
    <CharacterPhone class="d-block d-md-none" />
  </div>
  </v-app>
</template>


<script lang="ts" setup>

</script>
