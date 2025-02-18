<template>
  <v-main class="main-container">
    <v-container class="content-wrapper">
      <v-sheet class="quiz-container">
        <div class="page-container">
          <Form />
        </div>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<script>
import Form from "@/components/From/Form.vue";

export default {
  components: {
    Form,
  },
};
</script>

<style scoped>
/* 移除多餘的 padding/margin，確保畫面貼合 */
.v-main {
  padding: 0 !important;
  margin: 0 !important;
}

.v-container {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100%;
}

/* 移除 v-sheet 預設的背景與陰影 */
.v-sheet {
  background-color: transparent !important;
  box-shadow: none;
}

/* 讓主容器填滿整個畫面 */
.main-container {
  background: linear-gradient(to bottom, #ffffff, #b1dcf9);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
}

/* 主要框架 */
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
}

.page-container {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 防止邊角問題 */
  margin-top: 40px;
}
</style>
