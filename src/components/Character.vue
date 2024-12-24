<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
      no-gutters
    >
      <!-- Character Display Section -->
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="4"
        class="text-center"
      >
        <div class="model-container">
          <component :is="currentCharacter" />
        </div>
        <v-sheet
          class="mt-n8 mx-auto"
          max-width="200"
          rounded="lg"
          elevation="0"
          color="transparent"
          style="position: relative; top: -50px;"
        >
          <v-card-text class="text-h6 text-center font-weight-bold text-primary">
            {{ currentCharacterStats.datasets[0].label }}
          </v-card-text>
        </v-sheet>
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

    <!-- Navigation Buttons -->
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <v-btn
          icon
          @click="switchCharacter('prev')"
          class="switch-btn mx-2"
          size="large"
          variant="elevated"
          color="white"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>

      <!-- New Character Thumbnails -->
      <v-col
        cols="auto"
        v-if="true"
        class="d-none d-md-flex"
      >
        <v-btn
          v-for="(character, index) in characters"
          :key="index"
          :class="['character-thumb-btn', { active: currentIndex === index }]"
          @click="selectCharacter(index)"
          variant="plain"
          density="comfortable"
        >
          <v-img
            :src="getCharacterThumbnail(character)"
            width="40"
            height="40"
            cover
            loading="lazy"
            :lazy-src="getCharacterThumbnail(character)"
          />
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          icon
          @click="switchCharacter('next')"
          class="switch-btn mx-2"
          size="large"
          variant="elevated"
          color="white"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
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
import RadarChart from "./Charts/RadarChart.vue";

// Import thumbnails
import jellyfishThumb from "@/assets/thumbnails/jellyfish.png";
import stingrayThumb from "@/assets/thumbnails/stingray.png";
import joystickKeycapThumb from "@/assets/thumbnails/joystickjellyfishkeycap.png";
import filmCrabThumb from "@/assets/thumbnails/filmcrab.png";
import fountainPenSquidThumb from "@/assets/thumbnails/fountainpensquid.png";
import codeGardenEelThumb from "@/assets/thumbnails/codegardeneel.png";
import circuitCoralThumb from "@/assets/thumbnails/circuitcoral.png";
import lensCrabThumb from "@/assets/thumbnails/lenscrab.png";
import stingraycapThumb from "@/assets/thumbnails/stingraycap.png";

// Thumbnail mapping
const thumbnailMap = {
  JellyFish: jellyfishThumb,
  Stingray: stingrayThumb,
  JoystickJellyfishKeycap: joystickKeycapThumb,
  FilmCrab: filmCrabThumb,
  FountainPenSquid: fountainPenSquidThumb,
  CodeGardenEel: codeGardenEelThumb,
  CircuitCoral: circuitCoralThumb,
  LensCrab: lensCrabThumb,
  Stingraycap: stingraycapThumb,
};

// Function to get thumbnail
const getCharacterThumbnail = (character) => {
  return thumbnailMap[character.__name] || "";
};

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
];
const currentIndex = ref(0);
const currentCharacter = computed(() => characters[currentIndex.value]);

// Shared labels for all characters
const statsLabels = ["適應性", "美感", "智慧", "速度", "防禦力", "獨特性"];

// Character stats data
const characterStats = {
  JellyFish: {
    labels: statsLabels,
    datasets: [
      {
        label: "搖桿水母",
        data: [80, 60, 70, 90, 85, 75],
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
        data: [90, 85, 75, 70, 80, 75],
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
        data: [85, 70, 75, 80, 90, 80],
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
        data: [70, 80, 85, 75, 80, 75],
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
        data: [85, 90, 70, 75, 80, 80],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        pointBackgroundColor: "rgba(255, 159, 64, 1)",
        pointBorderColor: "#fff",
        description:
          "被深海居民戲稱為「曲線狂熱者」，她的觸手就像是靈巧的筆刷，能夠在水中快速地畫出優雅的線條，每次創作都像是在編織一首詩。雖然偶爾會因為完美主義與朋友產生小爭執，但她總能用幽默和創意化解尷尬，並且激勵其他生物勇敢追求自己的創作夢想。",
      },
    ],
  },
  CodeGardenEel: {
    labels: statsLabels,
    datasets: [
      {
        label: "程式花園鰻",
        data: [80, 75, 90, 85, 75, 85],
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
        data: [75, 85, 80, 80, 85, 90],
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
        data: [90, 85, 75, 85, 80, 85],
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
        data: [90, 85, 75, 85, 80, 85],
        backgroundColor: "rgba(255, 102, 102, 0.2)",
        borderColor: "rgba(255, 102, 102, 1)",
        pointBackgroundColor: "rgba(255, 102, 102, 1)",
        pointBorderColor: "#fff",
        description: "鍵帽版本電繪魟魚",
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

.model-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>

