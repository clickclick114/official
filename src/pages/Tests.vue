<template>
  <v-main class="main-container">
    <v-container class="content-wrapper">
      <v-sheet class="quiz-container">
        <!-- 前導畫面 -->
        <div v-if="!quizStarted" class="intro-box">
          <p class="intro-text">
            緩緩睜開眼，發現自己正漂浮在一片遼闊而神秘的海域之中。<br><br>
            水流輕輕推動著你，一群獨特的生物悄悄聚攏，好奇地打量著這位新來的訪客。<br><br>
            光芒閃爍，像是在邀請你踏上一場未知的探索——<br>
            這座水族館不僅藏著無數奇妙的景色，你的選擇，將決定未來的方向。
          </p>
          <v-btn class="start-btn" @click="startQuiz">準備好了嗎？讓我們出發吧！ 🌟</v-btn>
        </div>

        <div v-if="quizStarted && !finished" class="question-box">
          <!-- 防止題目不見 -->
          <div class="question-text" v-if="questions[currentQuestion]">
            {{ questions[currentQuestion].text }}
          </div>

          <!-- 按鈕內容置中 -->
          <div class="options">
            <button 
              v-for="(option, key) in questions[currentQuestion]?.options || {}" 
              :key="key" 
              @click="selectAnswer(key)" 
              class="answer-btn">
              {{ option.text }}
            </button>
          </div>
        </div>

        <div v-if="quizStarted && finished" class="result">
          <div class="result-text">你的結果是：{{ resultType }}</div>
        </div>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 測驗開始狀態
const quizStarted = ref(false);
const startQuiz = () => {
  quizStarted.value = true;
};

// 題目與邏輯
const questions = ref([
  { id: 1, text: "噗嚕噗嚕🫧 你環顧四周，發現水流悄然分成四個方向，每條通道的盡頭都閃爍著獨特的光芒……你會選擇哪一條？", options: {
    A: { text: "鋼鐵色的通道——隱約傳來低沉而穩定的震動聲，像是某種強大能量在深處蓄勢待發。", type: 8 },
    B: { text: "柔和藍色的通道——空氣中瀰漫著輕柔的旋律，彷彿每一步都與周圍的流動節奏相呼應。", type: 9 },
    C: { text: "深邃銀白的通道——牆面刻滿了古老的符號與結構，靜待有心人去發掘其中隱藏的秘密。", type: 5 },
    D: { text: "霓虹色的通道——跳躍的光點在水中閃爍，每一次變化都像是訴說著新的故事與可能。", type: 7 }
  }},
  { id: 2, text: "進到通道後，發現這片遼闊又錯綜複雜的海域原來是一座水族館，四周遍布著蜿蜒的水道與奇特的建築。你想先往哪個方向逛呢？", options: {
    A: { text: "朝向閃耀著鎂光燈的展演區，那裡總是充滿精彩的發表與掌聲。", type: 3 },
    B: { text: "走向熱鬧的交流廣場，許多夥伴正在分享彼此的創意與故事。", type: 2 },
    C: { text: "漫步至靜謐的觀景區，欣賞緩緩流動的水光與悠遊的生物們。", type: 9 },
    D: { text: "穩步前往資料館，那裡收藏著歷代水族館的結構設計與安全系統。", type: 6 }
  }},
  { id: 3, text: "在探索水族館的途中，你發現了一條隱秘的小徑，盡頭有一座神秘的光影裝置，似乎會根據你的內心想法變化出不同的景象。當你靠近時，你希望它展現出什麼？", options: {
    A: { text: "一個充滿秩序與細節的世界，每個元素都被完美地安排。", type: 1 },
    B: { text: "溫暖的回憶畫面，映照出你曾經幫助過的重要夥伴們。", type: 2 },
    C: { text: "千變萬化的奇幻景象，讓你能夠隨時找到新的靈感與樂趣。", type: 7 },
    D: { text: "一個獨特而充滿個人風格的場景，能讓你展現出與眾不同的存在。", type: 4 }
  }},
  { id: 4, text: "噼啪⚡️ 正當你沉浸在探索的樂趣中，水族箱深處突然傳來異響——某顆鍵帽出現破孔，水流開始洶湧湧出！眼看情況越來越緊急，你會怎麼做？", options: {
    A: { text: "冷靜觀察水流的方向與破損程度，迅速計算出最精確的補救方法。", type: 5 },
    B: { text: "立刻尋找值得信賴的夥伴，一起合作修補破口，確保安全。", type: 6 },
    C: { text: "相信自己的直覺，順勢而為，或許這場突如其來的變化會帶來意想不到的機會！", type: 4 },
    D: { text: "毫不猶豫地行動，不管多困難，都會拼盡全力阻止水族箱崩壞！", type: 1 }
  }},
  { id: 5, text: "突然，你身邊多了好多生物，原來是大家看到狀況都來幫忙了！水族館的未來取決於這場合作，你會選擇怎麼幫忙呢？", options: {
    A: { text: "迅速指揮隊伍，分配任務，確保大家有條不紊地行動！", type: 8 },
    B: { text: "關心每位夥伴的狀況，確保所有人都能安心投入合作。", type: 2 },
    C: { text: "分析問題的核心，提出最有效率的修復計畫，確保大家能在最短時間內完成修復。", type: 3 },
    D: { text: "保持冷靜，觀察整體局勢，適時調節人手與資源，讓團隊運作更加流暢。", type: 9 }
  }},
  { id: 6, text: "維修後意外觸發神秘開關，眼前突然出現了一道泛著微光的門，旁邊的鏡頭蟹興奮地說：『這是傳說中的神秘房間！』據說裡面藏著早已失傳的重要技術……你決定怎麼辦？", options: {
    A: { text: "仔細檢查門上的符號與機關，推理出最符合邏輯的開啟方式，以免破壞這項失傳的技術。", type: 5 },
    B: { text: "先與夥伴討論，確認安全無虞後再決定是否進入，畢竟傳說中的事物往往伴隨著風險。", type: 6 },
    C: { text: "帶著滿滿的好奇心，毫不猶豫地推開門，畢竟如果不親眼看看，怎麼知道傳說是真是假！", type: 7 },
    D: { text: "凝視門上的古老紋路，思索它與水族館歷史之間的聯繫，或許這正是揭開失傳技術奧秘的關鍵。", type: 4 }
  }},
{ id: 7, text: "門後的房間內，浮現出一道奇異的光影，似乎在等待你的回應。你會怎麼做？", options: {
    A: { text: "試著與它交流，看看是否能理解它的意圖。", type: 2 },
    B: { text: "仔細觀察它的形態與變化，分析它的結構與原理。", type: 5 },
    C: { text: "直接伸出手，感受光影的能量，看看會發生什麼。", type: 7 },
    D: { text: "向夥伴們請教，集合大家的智慧一起解讀這道光影的秘密。", type: 6 }
}},
{ id: 8, text: "夥伴們為了感謝你的努力，準備了各式各樣的禮物，每份禮物都蘊含著他們的心意。你最希望收到什麼呢？", options: {
    A: { text: "一件象徵努力與成果的精美紀念品，代表著這次旅程的收穫。", type: 3 },
    B: { text: "一本珍藏的筆記或資料，裡面記錄著水族館的歷史與智慧。", type: 5 },
    C: { text: "一幅溫暖的畫作，細膩描繪出這段旅程的點滴與回憶。", type: 4 },
    D: { text: "一顆閃耀的和諧之石，象徵著安定與陪伴，願這份連結長存。", type: 9 }
  }},
  { id: 9, text: "經歷了這段奇妙的旅程，你靜靜地望著眼前的水族館，心中浮現一個想法……", options: {
    A: { text: "這裡還有許多未解的奧秘，我想留下來繼續探索。", type: 1 },
    B: { text: "這片海域充滿著美好的夥伴，我願意再多停留一陣子。", type: 2 },
    C: { text: "我已經收穫滿滿，是時候帶著這段經驗，踏上新的旅程。", type: 5 },
    D: { text: "旅程雖然結束，但這段經歷將伴隨著我，未來還有更多可能等待著我。", type: 8 }
  }},
  {
  id: 10,
  text: "在未來當你回想起這段經歷，你會有什麼啟發呢？",
  options: {
    A: { text: "不斷精進自己，讓下一次旅程更加完美。", type: 1 },
    B: { text: "珍惜這份溫暖，未來也要幫助更多人，共創美好回憶。", type: 2 },
    C: { text: "總結學習，規劃未來，讓自己更高效、更成功。", type: 3 },
    D: { text: "珍藏這段經歷，讓它成為我的靈感與成長的養分。", type: 4 },
    E: { text: "持續探索未知，分析每個細節，讓自己更瞭解這個世界。", type: 5 },
    F: { text: "珍惜夥伴與團隊合作，與信賴的人一起迎接挑戰。", type: 6 },
    G: { text: "充滿期待，準備迎接下一場刺激的冒險！", type: 7 },
    H: { text: "堅定信念，勇敢迎接每個挑戰，不讓任何阻礙擋路！", type: 8 },
    I: { text: "學會順應變化，以平和心態面對未來的挑戰。", type: 9 }
  }
}

]);

const answers = ref(Object.fromEntries([...Array(9)].map((_, i) => [i + 1, 0])));
const currentQuestion = ref(0);
const finished = ref(false);
const resultType = ref(null);

const selectAnswer = (choice) => {
  const question = questions.value[currentQuestion.value];
  if (!question) return;

  const type = question.options[choice]?.type;
  if (type === undefined) return;

  answers.value[type] += 1;

  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value += 1;
  } else {
    checkResult();
  }
};

const checkResult = () => {
  const maxScore = Math.max(...Object.values(answers.value));
  const topTypes = Object.keys(answers.value).filter((key) => answers.value[key] === maxScore);

  // 如果有平分，過濾出與平分對應的選項
  if (topTypes.length > 1) {
    // 過濾第10題的選項，只顯示與平分結果相關的選項
    const filteredOptions = Object.keys(questions.value[9].options).filter((key) =>
      topTypes.includes(questions.value[9].options[key].type.toString())
    );

    // 只顯示與平分相關的選項
    const newOptions = {};
    filteredOptions.forEach((key) => {
      newOptions[key] = questions.value[9].options[key];
    });

    questions.value[9].options = newOptions;
    currentQuestion.value = 9; // 轉到第10題
  } else {
    resultType.value = topTypes[0];
    finished.value = true;
  }
};

onMounted(() => {
  console.log("questions:", questions.value);
  console.log("currentQuestion:", currentQuestion.value);
});
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
  background: linear-gradient(to bottom, #ffffff, #b1dcf9);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* 讓 v-container 撐滿 */
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

/* 主要框架 */
.quiz-container {
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  width: 90%;
  max-width: 600px;
}

/* 題目 & 選項部分，修正黑邊問題 */
.question-box {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 防止邊角問題 */
  margin-top: 20%;
}

.intro-box {
  text-align: center;
  padding: 20px;
  padding-top: 20%;
}

.intro-text {
  font-size: 18px;
  margin-bottom: 20px;
  color:#001ded;
  font-weight: bold;
}

.start-btn {
  font-size: 18px;
  background-color: #001ded;
  color: white;
}

/* 標題靠左 */
.question-text {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  color: #001ded;
}

/* 選項置中 */
.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* 按鈕樣式 */
.answer-btn {
  background-color: #001ded;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  text-align: center;
  transition: background-color 0.3s;
}

.answer-btn:hover {
  background-color: #0044cc;
}

/* 結果畫面 */
.result {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 50px;
  color: #001ded;
}
</style>
  