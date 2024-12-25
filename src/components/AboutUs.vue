<template>
    <v-card class="about-us" outlined>
      <!-- 上方文字 -->
      <v-row>
        <v-col cols="12">
          <div class="title-text">
            國立臺中科技大學
          </div>
        </v-col>
      </v-row>
      
      <!-- 下方圖示 -->
      <v-row>
        <v-col cols="6" class="text-center">
          <v-btn icon @click="openLink('https://www.facebook.com/profile.php?id=61560214634108&locale=zh_TW')">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6" class="text-center">
          <v-btn icon @click="openLink('https://www.instagram.com/click_114nutcmd/')">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script>
  export default {
    methods: {
      openLink(url) {
        window.open(url, '_blank');
      }
    }
  }
  </script>
  
  <style scoped>
  .about-us {
    background-color: transparent;
    border: 2px solid white;
    padding: 16px;
  }
  
  .title-text {
    text-align: left;
    font-weight: bold;
    font-size: 18px;
    color: white;
  }
  
  .v-btn {
    background: transparent;
  }
  </style>
  