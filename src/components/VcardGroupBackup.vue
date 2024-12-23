<template>
    <!--組別介紹-->
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in pages" :key="index" cols="12">
        <v-card class="mx-auto group-vcard" :style="[cardStyles, { padding: '2px',paddingTop:'10px',paddingBottom:'10px', border: '2px solid white' }]">
          <!-- 上方區域 -->
          <v-row no-gutters class="d-flex align-center" >
            <!-- 右上角內容 -->
            <v-col cols="2">
              <!-- 左側空著，可以將空白部分放在這 -->
            </v-col>
            <v-col cols="10">
              <div style="position: absolute; top: 0; right: 0; padding-top: 12px; padding-right: 8px; display: flex; align-items: flex-end; gap: 10px;">
                <!-- 組別名稱 -->
                <span :style="{ fontSize: '26px', color: '#001ded' }">{{ item.groupName }}</span>

                <!-- 作品分類 -->
                <div style="display: flex; flex-direction: column; text-align: right;">
                  <span :style="{ fontSize: '12px', color: '#001ded' }">{{ item.category }}</span>
                  <span :style="{ fontSize: '10px', color: '#001ded' }">{{ item.categoryEnglish }}</span>
                </div>

                <!-- 藍色方塊 -->
                <div :style="{ backgroundColor: '#001ded', width: '15px', height: '40px' }"></div>
              </div>
            </v-col>
          </v-row>

          <!-- 下方區域 -->
          <v-row no-gutters>
            <!-- 左側圖片，讓圖片垂直置中 -->
            <v-col cols="4" class="d-flex justify-center align-start" :style="cardImgStyles">
              <v-container>
                <v-row justify="center" align="center" style="height: 100%;">
                  <v-img :src="item.image" :aspect-ratio="1" max-height="200px" contain></v-img>
                </v-row>
              </v-container>
            </v-col>

            <!-- 右側描述文字 -->
            <v-col cols="8" class="text-left" :style="cardTextStyles">
              <p>{{ item.description }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
  </v-row>
</v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { computed } from 'vue';
import { useDisplay } from 'vuetify';


// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();

//v-card
// 設定卡片的樣式
const cardStyles = computed(() => ({
  maxWidth: mdAndDown.value ? '100%' : '80%', // 手機版顯示 100% 寬度，桌面顯示 800px
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 設定背景色
}));

// 設定卡片文字樣式
const cardTextStyles = computed(() => ({
      marginTop: mdAndDown.value ? '50px' : '70px', // 
      fontSize: mdAndDown.value ? '0.8rem' : '1.1rem',
      lineHeight: mdAndDown.value ? '1.8' : '2.2',
      paddingRight: mdAndDown.value ? '5px' : '20px',
      paddingLeft: mdAndDown.value ? '10px' : '0px',
      color: '#000000',
    }));

    const cardImgStyles = computed(() => ({
  marginTop: mdAndDown.value ? '80px' : '60px',

}));
// 每一頁的資料，包括圖片、標題和描述 //2024/12/23update
const pages = ref([
  {
    majorCategory: "animation",  // 更新類別
    image: new URL('@/assets/img/2.jpg', import.meta.url).href,
    groupName: "沼",
    category: "2D｜動畫影片",
    categoryEnglish: "2D｜Animation Film",
    description: "本作品以「長照監獄」為發想，針對照顧者的視角去探討這個議題。\n主角小時候與父親有個約定，隨著父親年老患病後，約定似乎也被遺忘。內心的不滿和責任的壓力讓主角疲憊不堪，陷入泥沼幾近迷失。\n某天夜晚父親再次走失後，主角找回記憶中的約定，重新理解了這段陪伴的意義。"
  },
  {
    majorCategory: "animation",
    image: new URL('@/assets/img/3.png', import.meta.url).href,
    groupName: "靜默",
    category: "2D｜動畫影片",
    categoryEnglish: "2D｜Animation Film",
    description: "此動畫用主角的第一人稱來敘說故事。小時的無畏付出，到成年後因現實因素而畏懼退縮，造成了不可挽回的結果，留下無限的後悔及傷害。\n如果是你，在遇到相同問題時會如何抉擇，你會挺身而出，抑或是，當個旁觀者?"
  },
  {
    majorCategory: "animation",
    image: new URL('@/assets/img/4.JPG', import.meta.url).href,
    groupName: "與海",
    category: "定格動畫",
    categoryEnglish: "Stop Motion Animation",
    description: "講述海龜生活的環境，聚焦於人類對自然環境的破壞，並以一隻由垃圾變異而成的巨大海龜作為核心象徵。\n人們時常因為一些無心的舉動破壞海洋，這次，小小的行為竟讓海龜發生巨大的變化…。故事充滿了壓抑、緊張的氣氛，反思對自然造成的傷害和環境問題的嚴重性。"
  },
  {
    majorCategory: "short film",
    image: new URL('@/assets/img/5.png', import.meta.url).href,
    groupName: "那個留學生",
    category: "微電影動畫",
    categoryEnglish: "Short Film Animation",
    description: "故事講述一位馬來西亞男生-“阿布”在台留學的故事。從小喜歡攝影的他，因爲馬來西亞攝影行業風氣不景氣，加上媽媽的建議，因此念多媒體設計想成爲遊戲程式設計師。\n縱然剛開始的留學生活充滿驚喜，面對學業的期待落差，背負著家庭期望，遇到了前所未有的困境。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/14.PNG', import.meta.url).href,
    groupName: "元素：面與避",
    category: "2D｜遊戲",
    categoryEnglish: "2D｜Game",
    description: "是一款緊張刺激的2D橫向動作遊戲，玩家需透過靈活操作和快速反應來躲避不斷來襲的怪物與陷阱。遊戲設計強調快節奏和挑戰性，隨著關卡的進展，玩家需運用策略和敏捷來克服各種困境。這款遊戲讓玩家在每次驚險的閃避中體驗腎上腺素飆升的快感，挑戰自我極限，沉浸於無盡的冒險之中。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/11.jpg', import.meta.url).href,
    groupName: "裘斯choose",
    category: "2D｜遊戲",
    categoryEnglish: "2D｜Game",
    description: "「艾勒柏斯」是一座生機盎然的植物城邦，曾經美麗而讓人嚮往，但現今卻是一片腐敗不堪的景象，主角裘斯身為光輝族的一員，收到了一封求救信，提到只有他能夠拯救這座城市。\n如今抵達「艾勒柏斯」的裘斯，該如何拯救這座已經腐敗的城市呢? 而在旅途的過程中，他又會發現哪些秘密，為什麼只有他，才能拯救這座城市呢?"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/7.png', import.meta.url).href,
    groupName: "Sweet Dreams",
    category: "2.5D｜遊戲",
    categoryEnglish: "2.5D｜Game",
    description: "一款 Rougelike 遊戲。主角田曦然想找回被丟掉的日記與書籍，意外掉入奇幻世界中魔法師的坩堝裡。\n為了找尋日記和回家辦法，她開始擊敗怪物蒐集日記碎片，修復並拼出不同日記以獲得效果，建構出專屬戰鬥風格。隨著旅程進展，她將正視壓抑的情緒，學著接受與放下。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/8.png', import.meta.url).href,
    groupName: "觀光課",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "主角淑芬與家豪是一組愛翹課的小拍檔，某天卻意外進入一個充滿光影奇幻世界裡。在這裡怪物會四處遊蕩，謎題會隱藏在每個角落。淑芬力氣大能推重物，家豪身手靈活，兩人必須合力破解光影謎題、躲避怪物的追擊，才能找到回家的路。每個場景都有神奇的光影機關等著他們來挑戰—你能幫他們闖過難關，揭開這個奇幻世界的秘密嗎？"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/10.png', import.meta.url).href,
    groupName: "孩玩仔",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "主角在回憶小時候最愛的節目 - 閃電跳跳糖超人，莫名地從老舊箱型電視機裡出來並化身為節目主人翁跳跳糖超人。\n彈珠汽水、梅子棒糖、沙畫、風車……，逐漸淡忘的事物層層映入眼簾。主角也將和跳跳糖超人一樣幫助被反派刁難的懷舊世界居民。\n電話似乎是連結現實世界的唯一通道，隨著電話中的訊息,主角的過往回憶漸漸被揭開，那也是你曾經歷過的嗎 ？"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/9.png', import.meta.url).href,
    groupName: "變異武裝",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "這是一款3D動作冒險遊戲。背景故事發生在一個研究武器的機構，因為私底下研究了生物與武器的結合導致了大型的災害，其中產生的武器怪物使這個機構徹底失控。而玩家則是一名剛來不久的實習生，為了釐清事情的原因和離開這裡，展開了戰鬥與解謎的冒險。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/12.jpg', import.meta.url).href,
    groupName: "苜隆車站",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "苜隆車站在幾年前曾經發生過一起嚴重的火災事故，造成多名人員傷亡，而在重建後，有關靈異事件的傳聞，卻從未停下。\n玩家將扮演一名道士，在接收到站長委託後，前來處理發生的靈異事件，而在此期間，發現了許多與當年火災相關的線索，似乎在暗示著，當年的事件還隱藏了些什麼。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/13.png', import.meta.url).href,
    groupName: "翠翠島嶼",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "未來發生了一場災難，調查發現跟500年前動物滅絕似乎有關係。主角阿波前往調查後不小心掉到了沒有見過的地方……相機也發生了一些異變，有著特殊的功能。\n這裡有以前已經滅絕的動物們，了解牠們與未來的關聯幫助他們解決他們的問題。阿波決定利用手上的相機解決問題，但如果解決的方式不同，或許會造成未來有不同的變化?"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/6.png', import.meta.url).href,
    groupName: "亂巷",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "台灣的街道展現著獨特的混亂與雜亂，從路、街、巷到弄，處處可見。在這款遊戲中，玩家將化身為機車騎士，穿梭在繁忙城市的巷弄間。面對道路上的各種障礙，讓玩家當自以為的正義使者。遊戲中的道路環境不僅模擬了台灣的交通情況與各種危險路況，更讓玩家在體驗本土交通文化時，學習如何成為一位懂得防衛的騎士。"
  },
]);
</script>

<style scoped>
.group {
  background-color: transparent !important;/*容器透明背景*/
  margin-top: 80px;    /* 設定頂部外邊距 */
  margin-bottom: 300px; /* 設定底部外邊距 */
}

.group-vcard {
  background-color: transparent !important;/*容器透明背景*/
  width: 100%;  /* 確保卡片佔滿全寬 */
  height: 100%;
}
</style>