<template>
  <div class="main-container">
    <!-- 背景圖 -->
    <img
      v-if="currentBackgroundImage"
      :src="currentBackgroundImage"
      alt="背景圖"
      class="question-background"
    />

    <!-- 開始畫面 -->
    <div v-if="showStartScreen" class="start-screen">
      <img
        src="@/assets/questions/startbutton.png"
        alt="開始按鈕"
        class="start-btn-image"
        @click="startQuiz"
      />
    </div>

    <!-- 題目畫面 -->
    <div
      v-if="questions[currentQuestionIndex] && !showResult"
      class="question-section"
    >
      <h2>{{ questions[currentQuestionIndex].question }}</h2>
            <div class="option-container">
      <div
        v-for="(option, index) in questions[currentQuestionIndex].options"
        :key="index"
        class="option-wrapper"
      >

        <button @click="selectOption(option.type)" class="option-button" v-if="isTestStarted">
          <img
            :src="chooseImage"
            alt="選項圖"
            class="option-image"
          />
          <span class="option-text">{{ option.text }}</span>
        </button>
        </div>
      </div>
    </div>

    <div v-if="showResult && resultImage" class="result-image-wrapper">
  <img :src="resultImage" alt="結果圖" class="result-image" />

  <!-- 新增提示文字 -->
  <p class="download-hint">→長按圖片下載</p>

  <!-- Instagram 分享按鈕 -->
  <div class="share-instagram">
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      🔗 分享到 Instagram
    </a>
  </div>
</div>

</div>
</template>



<script setup>
import { ref, computed } from 'vue'

// 控制狀態
const showStartScreen = ref(true)
const showResult = ref(false)
const currentQuestionIndex = ref(0)
const selectedTypes = ref([])
const resultImage = ref('')
const isTestStarted = ref(false)

// 題目資料
const questions = ref([
  {
    id: 1,
    image: 'q1.jpg',
    options: [
      { text: "銀色的通道，隱約傳來低沉的震動聲，深處似乎潛藏著某種力量。", type: 8 },
      { text: "藍色的通道，瀰漫著輕柔的旋律，讓人想與四周的空氣共舞。", type: 9 },
      { text: "白色的通道，牆面刻滿了古老的符號，靜待有人去發掘其中奧秘。", type: 5 },
      { text: "彩色的通道，跳躍的光點在水中閃爍，每顆光點都訴說著新的故事。", type: 7 },
    ],
  },
  {
    id: 2,
    image: 'q2.jpg',
    options: [
      { text: "充滿掌聲與燈光齊聚的展演區。", type: 3 },
      { text: "創意與靈感碰撞熱烈的交流廣場。", type: 2 },
      { text: "水光照耀並有生物陪伴的休息區。", type: 9 },
      { text: "悠久歷史與資料靜候翻閱的資料館。", type: 6 },
    ],
  },
  {
    id: 3,
    image: 'q3.jpg',
    options: [
      { text: "所有事物都非常完美，井然有序、細節滿滿的世界。", type: 1 },
      { text: "夥伴的笑容歷歷在目，充滿溫暖的回憶畫面。", type: 2 },
      { text: "靈感與樂趣不斷湧現，千變萬化的奇幻景象。", type: 7 },
      { text: "你從未看過，充滿個人風格的浩瀚宇宙。", type: 4 },
    ],
  },
  {
    id: 4,
    image: 'q4.jpg',
    options: [
      { text: "冷靜觀察並分析損壞狀況，迅速想出補救方法。", type: 5 },
      { text: "立刻尋找夥伴們，一起合作修補破損，確保安全。", type: 6 },
      { text: "觀察變化後，相信憑直覺能找到突破點。", type: 4 },
      { text: "毫不遲疑衝上前，立刻動手壓制水流！", type: 1 },
    ],
  },
  {
    id: 5,
    image: 'q5.jpg',
    options: [
      { text: "大聲指揮並迅速分配任務，用行動帶動全場。", type: 8 },
      { text: "關心每位夥伴的狀況，安撫情緒、穩定團隊氣氛。", type: 2 },
      { text: "分析問題核心，提出最有效率的修復計畫。", type: 3 },
      { text: "先在一旁觀察整體情況，適時補位、及時支援。", type: 9 },
    ],
  },
  {
    id: 6,
    image: 'q6.jpg',
    options: [
      { text: "仔細檢查鍵帽周圍的機關與提示，動手推理破解結構，找出符合邏輯的開啟方式。", type: 5 },
      { text: "先與夥伴討論，確認安全無虞後再決定是否按下。", type: 6 },
      { text: "毫不猶豫地按下鍵帽，相信直覺帶來解答。", type: 7 },
      { text: "凝視鍵帽上細緻的圖案與光紋，思索它背後的歷史與象徵意義，找出其中的謎題。", type: 4 },
    ],
  },
  {
    id: 7,
    image: 'q7.jpg',
    options: [
      { text: "旋律精準有序，每個音符都像被精心安排，非常完美的音樂。", type: 2 },
      { text: "音樂輕柔流動，喚起了你對他人情感的共鳴。", type: 5 },
      { text: "旋律跳躍激昂，每個音符都出乎意料但又安排得當，讓人想再聽好幾次。", type: 7 },
      { text: "音樂如潮水般包覆全身，你靜靜享受這份安穩與寧靜", type: 6 },
    ],
  },
  {
    id: 8,
    image: 'q8.jpg',
    options: [
      { text: "一件象徵成就的限量紀念品，值得珍藏一生。", type: 3 },
      { text: "一本珍藏的筆記或資料，記載著可立可的歷史與智慧。", type: 5 },
      { text: "一幅溫暖的畫作，描繪了這段旅程的點滴與回憶。", type: 4 },
      { text: "一顆閃耀的和諧之石，願這份連結長存。", type: 9 },
    ],
  },
  {
    id: 9,
    image: 'q9.jpg',
    options: [
      { text: "這裡還有許多未解的奧秘，我想留下來繼續探索每個細節的真相。", type: 1 },
      { text: "有這麼多令人安心與溫暖的夥伴，我想多停留一會兒。", type: 2 },
      { text: "我已獲得足夠的經驗與靈感，是時候帶著這段歷程，踏上新的旅程。", type: 5 },
      { text: "這段經歷會成為我心中的燈塔，引領我走向未知的未來。", type: 8 },
    ],
  },
]);

// 開始測驗
function startQuiz() {
  showStartScreen.value = false
  isTestStarted.value = true
}

// 選擇選項
function selectOption(type) {
  selectedTypes.value.push(type)

  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    calculateResult()
  }
}

// 靜態結果圖片對應表
const resultImageMap = {
  1: new URL('@/assets/ans/a1.jpg', import.meta.url).href,
  2: new URL('@/assets/ans/a2.jpg', import.meta.url).href,
  3: new URL('@/assets/ans/a3.jpg', import.meta.url).href,
  4: new URL('@/assets/ans/a4.jpg', import.meta.url).href,
  5: new URL('@/assets/ans/a5.jpg', import.meta.url).href,
  6: new URL('@/assets/ans/a6.jpg', import.meta.url).href,
  7: new URL('@/assets/ans/a7.jpg', import.meta.url).href,
  8: new URL('@/assets/ans/a8.jpg', import.meta.url).href,
  9: new URL('@/assets/ans/a9.jpg', import.meta.url).href,
}

// 靜態題目背景圖對應表（假設每題一張）
const questionImageMap = {
  1: new URL('@/assets/questions/q1.jpg', import.meta.url).href,
  2: new URL('@/assets/questions/q2.jpg', import.meta.url).href,
  3: new URL('@/assets/questions/q3.jpg', import.meta.url).href,
  4: new URL('@/assets/questions/q4.jpg', import.meta.url).href,
  5: new URL('@/assets/questions/q5.jpg', import.meta.url).href,
  6: new URL('@/assets/questions/q6.jpg', import.meta.url).href,
  7: new URL('@/assets/questions/q7.jpg', import.meta.url).href,
  8: new URL('@/assets/questions/q8.jpg', import.meta.url).href,
  9: new URL('@/assets/questions/q9.jpg', import.meta.url).href,
}

// 開始畫面圖
const startBackground = new URL('@/assets/questions/start.jpg', import.meta.url).href

const resultBackground = new URL('@/assets/questions/background.png', import.meta.url).href

const currentBackgroundImage = computed(() => {
  if (showStartScreen.value) {
    return startBackground
  }
  if (showResult.value) {
    return resultBackground
  }
  return questionImageMap[currentQuestionIndex.value + 1] || ''
})

const chooseImage = new URL('@/assets/questions/choose.png', import.meta.url).href

// 計算最多次出現的 type 對應結果圖
function calculateResult() {
  const typeCounts = {}
  selectedTypes.value.forEach(type => {
    typeCounts[type] = (typeCounts[type] || 0) + 1
  })

  const max = Math.max(...Object.values(typeCounts))
  const topTypes = Object.entries(typeCounts)
    .filter(([_, count]) => count === max)
    .map(([type]) => Number(type))

  const finalType = topTypes[Math.floor(Math.random() * topTypes.length)]
  resultImage.value = resultImageMap[finalType] || ''
  showResult.value = true
}
</script>

<style scoped>
.v-main {
  padding: 0 !important;
  margin: 0 !important;
}

.v-container {
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100%;
}

.v-sheet {
  background-color: transparent !important;
  box-shadow: none;
}

.main-container {
  background-image: url('@/assets/questions/background.png');
  background-size: cover;        /* 確保圖片填滿整個容器 */
  background-repeat: no-repeat;  /* 不要重複 */
  background-position: center;   /* 圖片置中 */
  height: 100vh;                 /* 改成 100vh 填滿整個視窗高度 */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  z-index: 0;
}

.question-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* 讓它在最底層 */
}

.start-screen,
.question-container,
.result-image-wrapper {
  position: relative; /* 🔸 確保內容不會被背景圖蓋住 */
  z-index: 1;
  padding: 2rem;
  color: white;
}

.start-screen {
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}

.start-button {
  padding: 1em 2em;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: #444;
  color: #fff;
  cursor: pointer;
}

.start-btn-image {
  width: 200px; /* 可自行調整按鈕圖的寬度 */
  height: auto;
}

/* 讓 v-container 撐滿 */
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.question-section {
  position: relative;
  z-index: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.option-wrapper {
  display: flex;
  justify-content: center;
  margin: 0.7rem 0;
  height: 100%;
}

.option-container{
  height: 100hv;
padding-top: 125%;
}

.option-button {
  position: relative;
  background-image: url('@/assets/questions/choose.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  width: 120%;               /* 再縮小一點 */
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
}

.option-text {
  position: absolute;
  color: white;
  font-size: 1rem;
  text-align: center;
  padding: 0 1rem;
  pointer-events: none;        /* 避免文字阻擋點擊 */
  line-height: 1.4;
}

.option-image {
  width: 100%;       /* 填滿容器寬度 */
  height: 100%;      /* 填滿容器高度 */
  object-fit: fill;  /* 強制圖片填滿，可能會變形 */
}


/* 主要框架 */
.quiz-container {
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  width: 90%;
  max-width: 600px;
}


/* 結果畫面 */
.result-image-wrapper {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.result-image {
  display: block;
  width: 100%;
  height: auto;
  margin: -5% auto 0; /* 使圖片初始大約在畫面中間 */
}

.share-instagram {
  text-align: center;
  margin-top: 1rem;
}

.share-instagram a {
  background-color: rgba(255, 255, 255, 0.6);
  color: #4F4F4F;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.3s, color 0.3s;
}

.share-instagram a:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

  