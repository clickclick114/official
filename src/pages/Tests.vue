<template>
    <v-main class="main-container">
      <v-container class="content-wrapper">
        <v-sheet class="quiz-container">
          <div v-if="!finished" class="question-box">
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
  
          <div v-if="extraQuestion" class="question-box extra-question">
            <div class="question-text">{{ extraQuestion.text }}</div>
            <div class="options">
              <button 
                v-for="(option, key) in extraQuestion.options" 
                :key="key" 
                @click="selectAnswer(key)" 
                class="answer-btn">
                {{ option.text }}
              </button>
            </div>
          </div>
  
          <div v-if="finished" class="result">
            <div class="result-text">你的結果是：{{ resultType }}</div>
          </div>
        </v-sheet>
      </v-container>
    </v-main>
  </template>
  
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const questions = ref([
  { id: 1, text: '當面對挑戰時，你的直覺反應是？', options: { A: { text: '堅持自己的立場並勇敢面對', type: 8 }, B: { text: '嘗試與對方溝通，找到雙方都能接受的方式', type: 9 }, C: { text: '先冷靜分析，再做出理性決策', type: 5 }, D: { text: '保持彈性，尋找最有趣的解法', type: 7 } } },
  { id: 2, text: '你如何定義成功？', options: { A: { text: '達成目標，獲得他人認可', type: 3 }, B: { text: '能夠幫助他人，帶來正面影響', type: 2 }, C: { text: '保持內心的平靜與和諧', type: 9 }, D: { text: '有穩定可靠的關係和安全感', type: 6 } } },
  { id: 3, text: '當你獨處時，你通常在想什麼？', options: { A: { text: '反思自己是否可以做得更好', type: 1 }, B: { text: '想著如何讓別人開心', type: 2 }, C: { text: '規劃未來，考慮如何突破現狀', type: 7 }, D: { text: '構思自己獨特的想法與創意', type: 4 } } },
  { id: 4, text: '當你遇到困難時，你最可能的行動是？', options: { A: { text: '自己冷靜思考，找到最佳解法', type: 5 }, B: { text: '求助於信任的朋友或團隊', type: 6 }, C: { text: '依靠自己的直覺與情緒來應對', type: 4 }, D: { text: '持續努力，不輕易放棄', type: 1 } } },
  { id: 5, text: '在團隊合作中，你通常扮演什麼角色？', options: { A: { text: '帶領團隊向前衝，設定目標', type: 8 }, B: { text: '維護團隊氛圍，讓每個人都感到被重視', type: 2 }, C: { text: '分析局勢，找出最有效率的方式', type: 3 }, D: { text: '保持低調，確保大家和諧相處', type: 9 } } },
  { id: 6, text: '當你犯錯時，你最可能的反應是？', options: { A: { text: '懊悔並試圖找出改進方法', type: 1 }, B: { text: '自責並希望獲得他人的理解與支持', type: 6 }, C: { text: '把它當成經驗，繼續往前', type: 7 }, D: { text: '轉換角度，試圖從錯誤中找到創新的可能', type: 4 } } },
  { id: 7, text: '你對於變化的態度是？', options: { A: { text: '充滿期待，喜歡新挑戰', type: 7 }, B: { text: '謹慎評估風險，確保安全後再行動', type: 6 }, C: { text: '只要對大家有益，我願意配合', type: 9 }, D: { text: '堅持自己的原則，不輕易改變', type: 8 } } },
  { id: 8, text: '什麼最能驅動你持續前進？', options: { A: { text: '追求卓越與成就', type: 3 }, B: { text: '理解世界，掌握真相', type: 5 }, C: { text: '創造獨特的自我價值', type: 4 }, D: { text: '保持內在的平和與穩定', type: 9 } } },
  { id: 9, text: '你最希望別人怎麼形容你？', options: { A: { text: '負責任、有原則', type: 1 }, B: { text: '善解人意、樂於助人', type: 2 }, C: { text: '聰明、有遠見', type: 5 }, D: { text: '自信、充滿魅力', type: 8 } } }
]);

  
  const answers = ref(Object.fromEntries([...Array(9)].map((_, i) => [i + 1, 0])));
  const currentQuestion = ref(0);
  const extraQuestion = ref(null);
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
  
    if (topTypes.length > 1) {
      extraQuestion.value = {
        text: '額外決勝題目...',
        options: {
          A: { text: '...', type: Number(topTypes[0]) },
          B: { text: '...', type: Number(topTypes[1]) },
        },
      };
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
  align-items: center;
}

/* 讓 v-container 撐滿 */
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

/* 主要框架 */
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
}

/* 題目 & 選項部分，修正黑邊問題 */
.question-box {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 防止邊角問題 */
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
}
</style>
  