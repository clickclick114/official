<template>
    <v-container class="image-container" :style="container">
      <div class="image-overlay">
        Coming Soonヽ★
        <v-img
  src="@/assets/filmcrab.png"
  style="width: 80%; height: 80%; object-fit: cover;"
/>
      </div>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'
  
  const { mdAndDown } = useDisplay()
  
  const container = computed(() => ({
    height: mdAndDown.value ? '150px' : '350px',
  }))
  
  </script>
  
  <style scoped>
  .image-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: #4f4f4f;
  }
  </style>
  