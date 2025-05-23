<template>
  <v-footer
    class="custom-footer"
    app
    fixed
    :style="footerStyle"
  >
    <v-container class="footer-container pa-0">
      <v-row
        dense
        justify="space-between"
        align="center"
        class="mx-0"
        no-gutters
      >
        <v-col
          v-for="(item, index) in menuItems"
          :key="index"
          cols="2"
          class="footer-item"
          @click="handleClick(item)"
        >
          <v-btn
            icon
            class="footer-btn"
            elevation="0"
          >
            <v-img
              v-if="item.image"
              :src="item.image"
              alt="icon"
              class="footer-icon"
            />
            <v-icon
              v-else
              size="32"
              color="white"
            >{{ item.icon }}</v-icon>
          </v-btn>
          <p class="footer-text">{{ item.text }}</p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>



<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import testIcon from "@/assets/icons/test.png";
import feedbackIcon from "@/assets/icons/feedback.png";
import aboutIcon from "@/assets/icons/CLICK.png";

const router = useRouter();

const menuItems = [
  {
    image: testIcon,
    text: "心理測驗",
    link: "https://clickclick114.github.io/official/test/",
  },
  {
    icon: "mdi-instagram",
    text: "Instagram",
    link: "https://www.instagram.com/click_114nutcmd/",
  },
  { icon: "mdi-file-document-edit", text: "展場測驗", link: "https://forms.gle/vSqitadHuPu1Kb3x9" },
  {
    image: feedbackIcon,
    text: "回饋問卷",
    link: "https://clickclick114.github.io/official/form/",
  },
  { image: aboutIcon, text: "可立可", expandable: true },
];

const showFooter = ref(false); // 控制頁腳顯示
const footerHeight = 64; // 頁腳高度
let lastScrollTop = 0;

// 處理點擊事件
const handleClick = (item: any) => {
  if (item.expandable) {
    router.push("/"); // 正確的 Vue Router 路由跳轉
  } else if (item.link) {
    if (item.link.startsWith("http")) {
      window.location.href = item.link; // 外部網址用 window.location.href
    } else {
      router.push(item.link); // 內部路由正常使用 Vue Router
    }
  }
};

// 監聽滾動事件，決定頁腳是否顯示
const handleScroll = () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  // 滾動到底部時顯示頁腳
  if (currentScroll + windowHeight >= documentHeight - footerHeight) {
    showFooter.value = true;
  } else if (currentScroll > lastScrollTop) {
    // 向下滾動隱藏頁腳
    showFooter.value = false;
  } else {
    // 向上滾動顯示頁腳
    showFooter.value = true;
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 防止滾動值為負
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 動態計算頁腳樣式
const footerStyle = computed(() => ({
  transform: showFooter.value
    ? "translateY(0)"
    : `translateY(${footerHeight}px)`,
  opacity: showFooter.value ? "1" : "0",
  visibility: showFooter.value ? "visible" : ("hidden" as "visible" | "hidden"),
  transition: "transform 0.3s ease, opacity 0.3s ease, visibility 0.1ms ease",
}));
</script>

<style scoped>
.custom-footer {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: #001ded !important;
  padding: 10px 0;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100% !important;
  padding: 0 16px !important; /* Add padding on both sides */
}

.footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  width: 15%; /* Slightly reduced to account for padding */
  padding: 0;
}

.footer-icon {
  width: 32px;
  height: 32px;
}

.footer-text {
  font-size: 12px;
  margin-top: 4px;
}

.footer-btn {
  background-color: #001ded !important;
}
</style>
