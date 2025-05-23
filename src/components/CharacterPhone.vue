<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
      no-gutters
      class="character-row"
    >
      <!-- Character Display Section -->
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="4"
        class="text-center"
      >
        <div class="model-container-phone mx-auto">
          <component :is="currentCharacter" />
        </div>
        <v-row
          align="center"
          justify="space-between"
          style="position: relative; top: -50px; max-width: 300px; margin: 0 auto;"
        >
          <v-col cols="auto">
            <v-btn
              icon
              @click="switchCharacter('prev')"
              class="switch-btn"
              size="medium"
              variant="outlined"
              color="black"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="auto"
            class="character-name-col"
          >
            <v-card-text class="text-h6 text-center font-weight-bold text-primary">
              {{ currentCharacterStats.datasets[0].label }}
            </v-card-text>
          </v-col>

          <v-col cols="auto">
            <v-btn
              icon
              @click="switchCharacter('next')"
              class="switch-btn"
              size="medium"
              variant="outlined"
              color="black"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <!-- Radar Chart Section -->
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="4"
        class="text-center"
      >
        <v-card
          color="transparent"
          elevation="0"
          class="mx-auto"
        >
          <RadarChart :chartData="currentCharacterStats" />
        </v-card>
        <v-card-text class="text-body-1 mt-4 text-grey-darken-1 text-left">
          {{ currentCharacterStats.datasets[0].description }}
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import Stingray from "./Characters/Stingray.vue";
import JellyFish from "./Characters/JellyFish.vue";
import JoystickJellyfishKeycap from "./Characters/JoystickJellyfishKeycap.vue";
import FilmCrab from "./Characters/FilmCrab.vue";
import FountainPenSquid from "./Characters/FountainPenSquid.vue";
import CodeGardenEel from "./Characters/CodeGardenEel.vue";
import CircuitCoral from "./Characters/CircuitCoral.vue";
import Stingraycap from "./Characters/Stingraycap.vue";
import LensCrab from "./Characters/LensCrab.vue";
import Bugoctopus from "./Characters/Bugoctopus.vue";
import RadarChart from "./Charts/RadarChart.vue";

const characters = [
JellyFish,
  Stingray,
  FilmCrab,
  LensCrab,
  CodeGardenEel,
  JoystickJellyfishKeycap,
  Stingraycap,
  FountainPenSquid,
  CircuitCoral,
  Bugoctopus,
];
const currentIndex = ref(0);
const currentCharacter = computed(() => characters[currentIndex.value]);

// Shared labels for all characters
const statsLabels = ["創造力", "理性", "情感", "社交", "穩定", "執行"];

// Character stats data
const characterStats = {
  JellyFish: {
    labels: statsLabels,
    datasets: [
      {
        label: "搖桿水母",
        data: [75, 65, 90, 80, 85, 60],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        description:
          "公認的遊戲高手，身上的手把按鍵就是他的秘密武器。無論是經典遊戲還是創意新作，她都能用精湛的操作和絕妙的策略輕鬆通關。更厲害的是，不僅會玩，還懂得設計，每次按下按鍵，彷彿就能讓遊戲世界活過來。",
      },
    ],
  },
  Stingray: {
    labels: statsLabels,
    datasets: [
      {
        label: "電繪魟",
        data: [80, 60, 95, 90, 75, 70],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        description:
          "性格外向、平易近人，廣受歡迎。她的寬大繪圖板如同多功能的創作平台，不僅能進行設計、動畫製作，還能用於程式測試和遊戲開發。無論是鋼筆烏賊的動畫分鏡、程式花園鰻的程式預覽，或搖桿水母的遊戲測試，電繪魟都是連結創意與靈感的橋樑，深受數位海洋居民的喜愛。",
      },
    ],
  },
  JoystickJellyfishKeycap: {
    labels: statsLabels,
    datasets: [
      {
        label: "搖桿水母(鍵帽)",
        data: [80, 60, 95, 90, 75, 70],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        description: "鍵帽版本搖桿水母",
      },
    ],
  },
  FilmCrab: {
    labels: statsLabels,
    datasets: [
      {
        label: "底片蟹",
        data: [95, 50, 85, 55, 60, 70],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
        pointBorderColor: "#fff",
        description:
          "一隻熱愛復古攝影的海底記錄者，他的「相機殼」內藏滿了記憶的底片，每張都記錄著其他生物燦爛的笑容。他希望透過底片傳遞復古之美，並鼓勵更多生物欣賞這份情感。即使深海光線不足，牠仍會想盡辦法捕捉屬於每個生物最美好的瞬間。",
      },
    ],
  },
  FountainPenSquid: {
    labels: statsLabels,
    datasets: [
      {
        label: "鋼筆烏賊",
        data: [85, 90, 65, 55, 80, 95],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        pointBackgroundColor: "rgba(255, 159, 64, 1)",
        pointBorderColor: "#fff",
        description:
          "被深海居民戲稱為「曲線狂熱者」，她的觸手就像是靈巧的筆刷，能夠在水中快速地畫出優雅的線條，每次創作都像是在編織一首詩。雖然偶爾會因為���美主義與朋友產生小爭執，但她總能用幽默和創意化解尷尬，並且激勵其他生物勇敢追求自己的創作夢想。",
      },
    ],
  },
  CodeGardenEel: {
    labels: statsLabels,
    datasets: [
      {
        label: "程式花園鰻",
        data: [95, 65, 70, 90, 50, 85],
        backgroundColor: "rgba(54, 235, 162, 0.2)",
        borderColor: "rgba(54, 235, 162, 1)",
        pointBackgroundColor: "rgba(54, 235, 162, 1)",
        pointBorderColor: "#fff",
        description:
          "熱愛探索的群體導向編碼高手，喜歡和同伴們一起構築複雜的程式世界。分工合作、密切聯繫，透過迴圈般的默契完成龐大的項目。對牠來說，每一段完美執行的程式都是群體智慧的結晶，也是一種藝術創作。牠特別熱衷於解決棘手的錯誤，認為每個Bug都是提升技能的契機。",
      },
    ],
  },
  CircuitCoral: {
    labels: statsLabels,
    datasets: [
      {
        label: "電路珊瑚",
        data: [80, 85, 65, 75, 70, 95],
        backgroundColor: "rgba(255, 99, 255, 0.2)",
        borderColor: "rgba(255, 99, 255, 1)",
        pointBackgroundColor: "rgba(255, 99, 255, 1)",
        pointBorderColor: "#fff",
        description:
          "電路珊瑚以其複雜的網絡結構聞名，充滿科技感，且能連接深海生物間的能量流。",
      },
    ],
  },
  LensCrab: {
    labels: statsLabels,
    datasets: [
      {
        label: "鏡頭蟹",
        data: [70, 95, 55, 50, 80, 75],
        backgroundColor: "rgba(255, 102, 102, 0.2)",
        borderColor: "rgba(255, 102, 102, 1)",
        pointBackgroundColor: "rgba(255, 102, 102, 1)",
        pointBorderColor: "#fff",
        description: "底片蟹的「雙胞胎」兄弟，但性格截然不同。熱衷於捕捉最鮮活的影像，尤其喜歡拍攝可立可生物。他的「鏡頭軀幹」擁有超高畫質拍攝能力，能記錄每個動作的細節。他與底片蟹雖然經常爭論傳統與現代的優劣，但兩人深知彼此的作品缺一不可，正因如此，他們形成了一種微妙而有趣的合作關係。",
      },
    ],
  },
  Stingraycap: {
    labels: statsLabels,
    datasets: [
      {
        label: "電繪魟魚(鍵帽)",
        data: [80, 60, 95, 90, 75, 70],
        backgroundColor: "rgba(255, 102, 102, 0.2)",
        borderColor: "rgba(255, 102, 102, 1)",
        pointBackgroundColor: "rgba(255, 102, 102, 1)",
        pointBorderColor: "#fff",
        description: "鍵帽版本電繪魟魚",
      },
    ],
  },
  Bugoctopus: {
    labels: statsLabels,
    datasets: [
      {
        label: "BUG章魚",
        data: [75, 60, 60, 85, 50, 90],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        description:
          "他並非純粹的破壞者，而是測試系統極限的專家。他和搖桿水母是死對頭，總是想辦法找出遊戲裡的漏洞來作弊，但也會因為太過放肆而被程式花園鰻們修補。儘管他經常讓電路珊瑚頭痛，但兩人其實是一種微妙的「競爭夥伴」關係。",
      },
    ],
  },
};

// Modified to use component display name instead of name property
const currentCharacterStats = computed(() => {
  // Get the component's name from its options or display name
  const characterName =
    currentCharacter.value.__name || currentCharacter.value.name;
  return characterStats[characterName];
});

const switchCharacter = (direction) => {
  if (direction === "next") {
    currentIndex.value = (currentIndex.value + 1) % characters.length;
  } else {
    currentIndex.value =
      currentIndex.value === 0 ? characters.length - 1 : currentIndex.value - 1;
  }
};

// Add new method for direct character selection
const selectCharacter = (index) => {
  currentIndex.value = index;
};
</script>

<style scoped>
.character-section {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.model-container-phone {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .model-container-phone {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    margin-top: -40px;
  }

  .character-row {
    padding-top: 20px;
  }
}

.navigation-row {
  position: absolute;
  bottom: 32px;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(177, 220, 249, 0.7);
  padding: 10px 0;
}

.switch-btn {
  transition: transform 0.2s ease;
}

.switch-btn:hover {
  transform: scale(1.1);
}

.character-thumb-btn {
  width: 50px;
  height: 50px;
  padding: 3px;
  transition: all 0.2s ease;
  background: none !important;
  box-shadow: none !important;
}

.character-thumb-btn:hover {
  transform: scale(1.1);
}

.character-thumb-btn.active {
  transform: scale(1.1);
  position: relative;
}

.character-thumb-btn.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #1976d2;
}

.character-name {
  margin-top: 16px;
  color: #1976d2;
  text-align: center;
}

@media (max-width: 960px) {
  .character-section {
    min-height: 100vh;
    height: auto;
    padding-bottom: 80px;
  }

  .navigation-row {
    position: fixed;
    bottom: 0;
    background-color: rgba(177, 220, 249, 0.9);
    backdrop-filter: blur(5px);
    padding: 15px 0;
  }
}

.character-name-col {
  min-width: 120px; /* Adjust this value based on your longest text */
  text-align: center;
}
</style>

