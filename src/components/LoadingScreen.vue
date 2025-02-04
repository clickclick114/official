<template>
    <transition name="fade">
      <div v-if="show" class="loading-screen">
        <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
        <p class="loading-text">載入中...</p>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const show = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      show.value = false;
    }, 2000); // 2秒後隱藏
  });
  </script>
  
  <style scoped>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0A192F; /* 深藍色背景 */
    color: white;
    z-index: 9999; /* 確保覆蓋所有內容 */
  }
  
  /* 文字閃爍動畫 */
  .loading-text {
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  /* 進出場過渡動畫 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  