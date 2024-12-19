<template>
  <v-app>
<!--toolbar-->
    <div class="toolbar-div">
      <v-app-bar color="#001ded" class="custom-toolbar"     :density="computedDensity" :style="dynamicStyles"  app fixed> 
      <div class="custom-title">
        DEPARTMENT<br>
        OF<br>
        MULTIMEDIA DESIGN<br>
        OF<br>
        NUTC 114TH
      </div>

      <div class="image-container">
        <v-img src="@/assets/click_title.png" height="80%"/>
      </div>

      <template v-slot:append width="100%">
        <v-row :gap="computedGap" class="button-row" no-wrap>
        <!-- 各組介紹選單 -->
        <v-menu transition="scroll-y-transition" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-col cols="auto">
              <v-btn :size="computedSize" v-bind="props" class="custom-button">各組介紹</v-btn>
            </v-col>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in groupItems" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- 角色履歷選單 -->
        <v-menu transition="scroll-y-transition" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-col cols="auto">
              <v-btn :size="computedSize" v-bind="props" class="custom-button">角色履歷</v-btn>
            </v-col>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in roleItems" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- 關於我們選單 -->
        <v-menu transition="scroll-y-reverse-transition" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-col cols="auto">
              <v-btn :size="computedSize" v-bind="props" class="custom-button">關於我們</v-btn>
            </v-col>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in aboutItems" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      </template>
    </v-app-bar>
    </div>

<!--頁面內容-->
    <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: 200vh;">
  <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
    <v-sheet :height="'95%'" :width="'90%'" color="transparent">
<!--主視覺影片-->
    <v-container class="video-container">
        <v-slide-item v-for="(video, index) in videos" :key="index">
          <div >
            <iframe
              :src="video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="responsive-video"
              style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);"
            ></iframe>
          </div>
        </v-slide-item>
    </v-container>


<!-- 組別輪播項目 -->
    <v-container class="group">
      <v-carousel
      :style="carouselStyles"
      :height="carouselHeight"
      :show-arrows="showArrows"
      cycle
     hide-delimiter-background
      :interval="5000"
      :delimiter-icon="delimiterIcon"
      :delimiter-icon-size="delimiterIconSize"
      >
        <v-carousel-item v-for="(item, index) in pages" :key="index">
          <v-card class="mx-auto" :style="[cardStyles, { padding: '2px', border: '2px solid white' }]">
            <v-row no-gutters class="d-flex align-center">
            <!-- 左側圖片 -->
            <v-col :cols="4" :xs="4" class="d-flex justify-center">
              <v-img :src="item.image" :aspect-ratio="1" max-height="200px" contain></v-img>
            </v-col>

            <!-- 右側文字 -->
            <v-col :cols="8" :xs="8" class="text-left">
             <v-card-text :style="cardTextStyles">
             <h2 :style="headerStyles">{{ item.title }}</h2>
             <p>{{ item.description }}</p>
             </v-card-text>
            </v-col>
            </v-row>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>
</v-sheet>
</v-container>
  </v-main>

  <!-- 頁腳 -->
  <v-footer class="page-footer">
  <div class="footer-content">
    <p class="footer-text">CLICK</p>
  </div>
</v-footer>

  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { computed } from 'vue';
import { useDisplay } from 'vuetify';


// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();


// 為每個屬性創建 computed 變數
const computedDensity = computed<'default' | 'prominent' | 'comfortable' | 'compact'>(() => {
  // 你可以根據需要設置不同的值，這裡我假設 mdAndDown 顯示較小的 density
  return mdAndDown.value ? 'default' : 'prominent';
});

// 根據螢幕尺寸動態設置 v-btn size
const computedSize = computed<'x-small' | 'small' | 'default' | 'large' | 'x-large'>(() => {
  // 當螢幕為 mdAndDown 時設置較小的 size，否則設置預設或較大的 size
  return mdAndDown.value ? 'small' : 'x-large';
});
const computedGap = computed(() => (mdAndDown.value ? "8px" : "24px")); // 手機按鈕間距 8px，桌面 24px

const computedFontSize = computed<string>(() => (mdAndDown.value ? '8px' : '18px'));
const computedLineHeight = computed<string>(() => (mdAndDown.value ? '1.6' : '1.4'));


// 計算響應式的 carousel 高度(輪播模組)
const carouselHeight = computed(() => {
  return mdAndDown.value ? '250px' : '350px';  // 小螢幕設定 300px，高螢幕設定 400px
});

// 設定 carousel 的寬度
const carouselStyles = computed(() => ({
  margin: '0 auto', // 置中顯示
}));


// 設定是否顯示左右箭頭
const showArrows = computed(() => !mdAndDown.value); // 當螢幕小於 md 時，隱藏箭頭

// 設定 delimiter 圖標
const delimiterIcon = computed(() => {
  return mdAndDown.value ? 'mdi-circle' : 'mdi-circle';  // 可以自定義圖標
});

//待修改
// 計算響應式的 delimiter 圖標大小
/*
const delimiterIconSize = computed<'x-small' | 'small' | 'default' | 'large' | 'x-large'>(() => {
  // 根據螢幕大小調整圖標大小
  return mdAndDown.value ? 'x-small' : 'x-large';
});
*/

// 設定 delimiter 圖標大小
const delimiterIconSize = computed(() => (mdAndDown.value ? '5px' : '30px'));

// 設定卡片的樣式
const cardStyles = computed(() => ({
  maxWidth: mdAndDown.value ? '100%' : '80%', // 手機版顯示 100% 寬度，桌面顯示 800px
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 設定背景色
}));

// 設定卡片文字樣式
const cardTextStyles = computed(() => ({
  fontSize: mdAndDown.value ? '0.8rem' : '1.1rem', // 根據螢幕調整字型大小
  lineHeight: mdAndDown.value ? '1.5' : '1.8', // 行高設定
  color: 'white', // 設定文字顏色
}));

// 設定標題樣式
const headerStyles = computed(() => ({
  fontSize: mdAndDown.value ? '1rem' : '1.5rem', // 標題字型大小
  marginBottom: mdAndDown.value ? '10px' : '20px', // 標題底部邊距
}));


// 組合動態樣式
const dynamicStyles = computed(() => ({
  fontSize: computedFontSize.value,
  lineHeight: computedLineHeight.value,
}));

// 群組項目
const groupItems = [
  { title: "GAMES" },
  { title: "ANIMATIONS" },
  { title: "SHORT FILM" },
];

const roleItems = [
  { title: "角色一" },
  { title: "角色二" },
  { title: "角色三" },
];

const aboutItems = [
  { title: "團隊介紹" },
  { title: "作品理念" },
  { title: "聯絡我們" },
];

// YouTube 嵌入連結列表
const videos = ref([
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
]);

// 每一頁的資料，包括圖片、標題和描述
const pages = ref([
  {
    image: new URL('@/assets/img/2.jpg', import.meta.url).href,
    title: "◆ 沼（2D動畫）",
    description: "本作品以「長照監獄」為發想，針對照顧者的視角去探討這個議題。\n主角小時候與父親有個約定，隨著父親年老患病後，約定似乎也被遺忘。內心的不滿和責任的壓力讓主角疲憊不堪，陷入泥沼幾近迷失。\n某天夜晚父親再次走失後，主角找回記憶中的約定，重新理解了這段陪伴的意義。"
  },
  {
    image: new URL('@/assets/img/3.png', import.meta.url).href,
    title: "◆靜默（2D動畫）",
    description: "此動畫用主角的第一人稱來敘說故事。小時的無畏付出，到成年後因現實因素而畏懼退縮，造成了不可挽回的結果，留下無限的後悔及傷害。\n如果是你，在遇到相同問題時會如何抉擇，你會挺身而出，抑或是，當個旁觀者?"
  },
  {
    image: new URL('@/assets/img/4.JPG', import.meta.url).href,
    title: "◆與海（定格動畫）",
    description: "講述海龜生活的環境，聚焦於人類對自然環境的破壞，並以一隻由垃圾變異而成的巨大海龜作為核心象徵。\n人們時常因為一些無心的舉動破壞海洋，這次，小小的行為竟讓海龜發生巨大的變化…。故事充滿了壓抑、緊張的氣氛，反思對自然造成的傷害和環境問題的嚴重性。"
  },
  {
    image: new URL('@/assets/img/5.png', import.meta.url).href,
    title: "◆ 那個留學生（微電影動畫）",
    description: "故事講述一位馬來西亞男生-“阿布”在台留學的故事。從小喜歡攝影的他，因爲馬來西亞攝影行業風氣不景氣，加上媽媽的建議，因此念多媒體設計想成爲遊戲程式設計師。\n縱然剛開始的留學生活充滿驚喜，面對學業的期待落差，背負著家庭期望，遇到了前所未有的困境。"
  },
  {
    image: new URL('@/assets/img/14.PNG', import.meta.url).href,
    title: "◆元素：面與避（2D遊戲）",
    description: "是一款緊張刺激的2D橫向動作遊戲，玩家需透過靈活操作和快速反應來躲避不斷來襲的怪物與陷阱。遊戲設計強調快節奏和挑戰性，隨著關卡的進展，玩家需運用策略和敏捷來克服各種困境。這款遊戲讓玩家在每次驚險的閃避中體驗腎上腺素飆升的快感，挑戰自我極限，沉浸於無盡的冒險之中。"
  },
  {
    image: new URL('@/assets/img/11.jpg', import.meta.url).href,
    title: "◆裘斯（choose）（2D遊戲）",
    description: "「艾勒柏斯」是一座生機盎然的植物城邦，曾經美麗而讓人嚮往，但現今卻是一片腐敗不堪的景象，主角裘斯身為光輝族的一員，收到了一封求救信，提到只有他能夠拯救這座城市。\n如今抵達「艾勒柏斯」的裘斯，該如何拯救這座已經腐敗的城市呢? 而在旅途的過程中，他又會發現哪些秘密，為什麼只有他，才能拯救這座城市呢?"
  },
  {
    image: new URL('@/assets/img/7.png', import.meta.url).href,
    title: "Sweet Dreams （2.5D遊戲）",
    description: "一款 Rougelike 遊戲。主角田曦然想找回被丟掉的日記與書籍，意外掉入奇幻世界中魔法師的坩堝裡。\n為了找尋日記和回家辦法，她開始擊敗怪物蒐集日記碎片，修復並拼出不同日記以獲得效果，建構出專屬戰鬥風格。隨著旅程進展，她將正視壓抑的情緒，學著接受與放下。"
  },
  {
    image: new URL('@/assets/img/8.png', import.meta.url).href,
    title: "◆觀光課（3D遊戲）",
    description: "主角淑芬與家豪是一組愛翹課的小拍檔，某天卻意外進入一個充滿光影奇幻世界裡。在這裡怪物會四處遊蕩，謎題會隱藏在每個角落。淑芬力氣大能推重物，家豪身手靈活，兩人必須合力破解光影謎題、躲避怪物的追擊，才能找到回家的路。每個場景都有神奇的光影機關等著他們來挑戰—你能幫他們闖過難關，揭開這個奇幻世界的秘密嗎？"  },
  {
    image: new URL('@/assets/img/10.png', import.meta.url).href,
    title: "◆孩玩仔（3D遊戲）",
    description: "主角在回憶小時候最愛的節目 - 閃電跳跳糖超人，莫名地從老舊箱型電視機裡出來並化身為節目主人翁跳跳糖超人。\n彈珠汽水、梅子棒糖、沙畫、風車……，逐漸淡忘的事物層層映入眼簾。主角也將和跳跳糖超人一樣幫助被反派刁難的懷舊世界居民。\n電話似乎是連結現實世界的唯一通道，隨著電話中的訊息,主角的過往回憶漸漸被揭開，那也是你曾經歷過的嗎 ？"
  },
  {
    image: new URL('@/assets/img/9.png', import.meta.url).href,
    title: "◆變異武裝（3D遊戲）",
    description: "這是一款3D動作冒險遊戲。背景故事發生在一個研究武器的機構，因為私底下研究了生物與武器的結合導致了大型的災害，其中產生的武器怪物使這個機構徹底失控。而玩家則是一名剛來不久的實習生，為了釐清事情的原因和離開這裡，展開了戰鬥與解謎的冒險。"
  },
  {
    image: new URL('@/assets/img/12.jpg', import.meta.url).href,
    title: "◆苜隆車站（3D遊戲）",
    description: "苜隆車站在幾年前曾經發生過一起嚴重的火災事故，造成多名人員傷亡，而在重建後，有關靈異事件的傳聞，卻從未停下。\n玩家將扮演一名道士，在接收到站長委託後，前來處理發生的靈異事件，而在此期間，發現了許多與當年火災相關的線索，似乎在暗示著，當年的事件還隱藏了些什麼。"
  },
  {
    image: new URL('@/assets/img/13.png', import.meta.url).href,
    title: "◆翠翠島嶼（3D遊戲）",
    description: "未來發生了一場災難，調查發現跟500年前動物滅絕似乎有關係。主角阿波前往調查後不小心掉到了沒有見過的地方……相機也發生了一些異變，有著特殊的功能。\n這裡有以前已經滅絕的動物們，了解牠們與未來的關聯幫助他們解決他們的問題。阿波決定利用手上的相機解決問題，但如果解決的方式不同，或許會造成未來有不同的變化?"
  },
  {
    image: new URL('@/assets/img/6.png', import.meta.url).href,
    title: "◆亂巷（3D遊戲）",
    description: "台灣的街道展現著獨特的混亂與雜亂，從路、街、巷到弄，處處可見。在這款遊戲中，玩家將化身為機車騎士，穿梭在繁忙城市的巷弄間。面對道路上的各種障礙，讓玩家當自以為的正義使者。遊戲中的道路環境不僅模擬了台灣的交通情況與各種危險路況，更讓玩家在體驗本土交通文化時，學習如何成為一位懂得防衛的騎士。"
  },
]);
</script>

<style scoped>

.toolbar-div {
position: fixed;
  z-index: 2;
  width: 100%;
}

.custom-toolbar {
  z-index: 2;
  width: 100%;
}

.custom-title {
  font-size: normal;
  font-weight: normal;
  text-align: left;
  color: white;
  height: 100%; /* 保持高度自適應 */
  min-width: 33%;
  max-width: 33%;
}

.image-container {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center;     /* 垂直置中 */
  height: 100%;
  min-width: 33%;
  max-width: 33%;
}

.button-row {
  justify-content: space-between; /* 按鈕均分橫向空間 */
  align-items: center;           /* 按鈕垂直置中 */
}

.custom-button {
  background-image: url('@/assets/button.png'); /* 替換為你的圖片路徑 */
  background-size: contain; /* 圖片完整顯示在按鈕範圍內 */
  background-repeat: no-repeat; /* 防止圖片重複 */  
  background-position: center; /* 圖片置中 */
  padding-bottom: 10px;
  height: 300px; /* 按鈕高度 */
  border-radius: 5%; /* 圓角按鈕 */
  display: flex; /* 使用 Flex 排列內容 */
  justify-content: center; /* 文字水平居中 */
  align-items: center; /* 文字垂直居中 */
  font-size: auto; /* 文字大小 */
  color: white; /* 文字顏色 */
  font-weight: normal; /* 文字400 */
}

.video-container {
  background-color: transparent !important;/*容器透明背景*/
  margin-top: 30px;    /* 設定頂部外邊距 */
  margin-bottom: 30px; /* 設定底部外邊距 */
  position: relative; /* 確保內容定位依賴容器 */
  width: 100%;        /* 設置容器寬度為 100% */
  padding-top: 56.25%; /* 16:9比例 (9/16 = 0.5625) */
  overflow: hidden;   /* 確保內容不會溢出容器 */
}

.responsive-video {
  position: absolute; /* 絕對定位，使其在父容器內對齊 */
  top: 50%;           /* 容器內垂直居中 */
  left: 50%;          /* 容器內水平居中 */
  transform: translate(-50%, -50%); /* 偏移，讓元素中心對齊父容器中心 */
  width: 80%;        /* 設定寬度 */
  height: 80%;       /* 設定高度 */
  border-radius: 10px; /* 圓角效果 (可選) */
}

.group {
  background-color: transparent !important;/*容器透明背景*/
  margin-top: 80px;    /* 設定頂部外邊距 */
  margin-bottom: 300px; /* 設定底部外邊距 */
}

.v-card {
  background-color: transparent !important;/*容器透明背景*/
  width: 100%;  /* 確保卡片佔滿全寬 */
  height: 100%;
}


.page-footer {
  background-color: #001ded;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-end; /* 讓內容靠右 */
  align-items: center;
  position: fixed;
}

.footer-text {
  color: #ffffff; /* 設定文字顏色為#001ded */
  font-size: 20px; /* 可以根據需要調整字體大小 */
  margin: 0;
}


/* 響應式調整箭頭圖標大小 */
.v-carousel .v-carousel-control__prev,
.v-carousel .v-carousel-control__next {
  font-size: 24px; /* 預設大小 */
}

@media (max-width: 960px) {
  .v-carousel .v-carousel-control__prev,
  .v-carousel .v-carousel-control__next {
    font-size: 2px; /* 小螢幕時圖標大小 */
  }
}
</style>
