<template>
    <!--主視覺影片-->
    <v-container class="video-container">
      <v-slide-item v-for="(video, index) in videos" :key="index">
        <div>
          <iframe
            :src="video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="responsive-video"
            :style="[ { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }, Video ]"
          ></iframe>
        </div>
      </v-slide-item>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { computed } from 'vue';
import { useDisplay } from 'vuetify';


// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();

//各組介紹title
const Video = computed(() => ({
  width: mdAndDown.value ? '100%' : '80%',
  height: mdAndDown.value ? '100%' : '80%',
}));
const videos = ref([
  "https://www.youtube.com/embed/eoyfCs8BNZE",
]);
</script>

<style scoped>
.video-container {
  background-color: transparent !important;/*容器透明背景*/
  /*margin-top: 30px;    /* 設定頂部外邊距 */
  /*margin-bottom: 30px; /* 設定底部外邊距 */
  position: relative; /* 確保內容定位依賴容器 */
  width: 100%;        /* 設置容器寬度為 100% */
  padding-top: 56.25%; /* 16:9比例 (9/16 = 0.5625) */
  overflow: hidden;   /* 確保內容不會溢出容器 */
  border-radius: 10px; /* 圓角效果 (可選) */
}

.responsive-video {
  position: absolute; /* 絕對定位，使其在父容器內對齊 */
  top: 50%;           /* 容器內垂直居中 */
  left: 50%;          /* 容器內水平居中 */
  transform: translate(-50%, -50%); /* 偏移，讓元素中心對齊父容器中心 */
  border-radius: 10px; /* 圓角效果 (可選) */
}
</style>