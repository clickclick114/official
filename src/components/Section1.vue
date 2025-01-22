<template>
      <!--CLICK-->
      <v-container>
        <v-row no-gutters>
    <!--click -->
    <v-col id="click" v-for="(item, index) in click" :key="index" cols="12">
      <v-card class="mx-auto group-vcard" :style="[cardStyles, { padding: '2px', paddingTop: '10px', paddingBottom: '10px'}]">
        <!-- 上方區域 -->
        <v-row no-gutters class="d-flex align-center">
          <v-col cols="2">
            <!-- 左側空著，可以將空白部分放在這 -->
          </v-col>
          <v-col cols="10">
            <div style="position: absolute; top: 0; right: 0; padding-top: 12px; padding-right: 8px; display: flex; align-items: flex-end; gap: 10px;">
              <!-- 組別名稱 -->
              <span :style="{ fontSize: '26px', color: '#001ded',fontWeight: '500'}">{{ item.groupName }}</span>

              <!-- 藍色方塊 -->
              <div :style="{ backgroundColor: '#001ded', width: '15px', height: '40px' }"></div>
            </div>
          </v-col>
        </v-row>

        <!-- 下方區域 -->
        <v-row no-gutters>
          <!-- 左側圖片，讓圖片垂直置中 -->
          <v-col cols="12" sm="4" class="d-flex justify-center align-start" :style="cardImgStyles">
            <v-container>
              <v-row justify="center" align="center" style="height: 100%;">
                <v-img :src="item.image" :aspect-ratio="1" max-height="200px" contain></v-img>
              </v-row>
            </v-container>
          </v-col>

          <!-- 右側描述文字 -->
          <v-col cols="12" sm="8" class="text-left" :style="cardTextStyles">
            <p v-html="replaceNewlines(item.description)"></p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</v-container>
<!-- 組別輪播項目 -->
    <v-container class="group">
      <!--各組介紹title-->
      <v-row class="group-title" no-gutters align="center" :style="grouptitlebutton">
        <span>各組介紹</span>
      </v-row>
      <!--輪播項目-->
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
          <v-card class="mx-auto group-vcard" :style="[cardStyles, { padding: '2px',paddingTop:'10px',paddingBottom:'10px'}]">
          <!-- 上方區域 -->
          <v-row no-gutters class="d-flex align-center" >
            <!-- 右上角內容 -->
            <v-col cols="2">
              <!-- 左側空著，可以將空白部分放在這 -->
            </v-col>
            <v-col cols="10">
              <div style="position: absolute; top: 0; right: 0; padding-top: 12px; padding-right: 8px; display: flex; align-items: flex-end; gap: 10px;">
                <!-- 組別名稱 -->
                <span :style="{ fontSize: '26px', color: '#001ded',fontWeight: '500'}">{{ item.groupName }}</span>

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
            <v-col cols="12" sm="4" class="d-flex justify-center align-start" :style="cardImgStyles">
              <v-container>
                <v-row justify="center" align="center" style="height: 100%;">
                  <v-img :src="item.image" :aspect-ratio="1" max-height="200px" contain></v-img>
                </v-row>
              </v-container>
            </v-col>

            <!-- 右側描述文字 -->
            <v-col cols="12" sm="8" class="text-left" :style="cardTextStyles">
              <p v-html="replaceNewlines(item.description)"></p>
            </v-col>
          </v-row>
        </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>

<!--海報跑馬燈-->
<div class="marquee-container" :style="{ paddingBottom: paddingBottom }">
    <div class="marquee-images" :style="{ animationDuration: marqueeSpeed }">
      <img 
        v-for="(page, index) in pages" 
        :key="index" 
        :src="page.image" 
        alt="image" 
        class="marquee-image" 
        :style="{ width: imageWidth}" 
        @click="navigateToCard(page.groupName)"
      />
    </div>
  </div>


  <!-- 組別介紹 -->
  <v-container id="all" cols="12" style="width: 100%;">
    <v-container :style="containerStyle">
    <v-row no-gutters justify="center" dense>
      <v-col
        v-for="category in categories"
        :key="category"
        cols="3"
        class="d-flex justify-center align-center"
      >
        <v-btn
          :class="['button-row', { active: category === selectedCategory }]"
          :style="buttonRow"
          @click="filterCategory(category)"
        >
          {{ category }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- 顯示篩選後的v-card -->
  <v-row>
    <v-col v-for="(page, index) in filteredPages" :key="index" cols="12" class="d-flex justify-center">
      <v-card class="mx-auto group-vcard"
              :id="'card-' + page.groupName.replace(/\s+/g, '')"
              :style="[cardStyles, { padding: '2px', paddingTop: '10px', paddingBottom: '10px', width: '100%'}]"
      >
        <!-- 上方區域 -->
        <v-row no-gutters class="d-flex align-center">
          <!-- 右上角內容 -->
          <v-col cols="2">
            <!-- 左側空著，可以將空白部分放在這 -->
          </v-col>
          <v-col cols="10">
            <div style="position: absolute; top: 0; right: 0; padding-top: 12px; padding-right: 8px; display: flex; align-items: flex-end; gap: 10px;">
              <!-- 組別名稱 -->
              <span :style="{ fontSize: '26px', color: '#001ded', fontWeight: '500'}">{{ page.groupName }}</span>

              <!-- 作品分類 -->
              <div style="display: flex; flex-direction: column; text-align: right;">
                <span :style="{ fontSize: '12px', color: '#001ded' }">{{ page.category }}</span>
                <span :style="{ fontSize: '10px', color: '#001ded' }">{{ page.categoryEnglish }}</span>
              </div>

              <!-- 藍色方塊 -->
              <div :style="{ backgroundColor: '#001ded', width: '15px', height: '40px' }"></div>
            </div>
          </v-col>
        </v-row>

        <!-- 下方區域 -->
        <v-row no-gutters>
          <!-- 左側圖片，讓圖片垂直置中 -->
          <v-col cols="12" sm="4" class="d-flex justify-center align-start" :style="cardImgStyles">
            <v-container>
              <v-row justify="center" align="center" style="height: 100%;">
                <v-img :src="page.image" :aspect-ratio="1" max-height="200px" contain></v-img>
              </v-row>
            </v-container>
          </v-col>

          <!-- 右側描述文字 -->
          <v-col cols="12" sm="8" class="text-left" :style="cardTextStyles">
            <p v-html="replaceNewlines(page.description)"></p>
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
import { nextTick } from 'vue';
import { useDisplay } from 'vuetify';


// 解構 mdAndDown，偵測螢幕尺寸
const { mdAndDown } = useDisplay();

//各組介紹title
const grouptitlebutton = computed(() => ({
  fontSize: mdAndDown.value ? '12px' : '20px',
  paddingBottom: mdAndDown.value ? '4px' : '9px',
  width: mdAndDown.value ? '140px' : '245px',
  height: mdAndDown.value ? '40px' : '70px',
  margin: mdAndDown.value ? '1% 0' : '1% 10%',
}));

// 計算響應式的 carousel 高度(輪播模組)
const carouselHeight = computed(() => {
  return mdAndDown.value ? '600px' : '350px';  // 小螢幕設定 300px，高螢幕設定 400px
});

// 設定 carousel 的寬度(輪播模組)
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

//圖片跑馬燈
const imageWidth = computed(() => (mdAndDown.value ? '60%' : '20%'));
const paddingBottom = computed(() => (mdAndDown.value ? '40px' : '20px'));
const marqueeSpeed = computed(() => {
  return mdAndDown.value ? '20s' : '40s'; // 小螢幕 20s，大螢幕40s
});

// 監控 marqueeSpeed 並更新 CSS 變數
watch(marqueeSpeed, (newSpeed) => {
  document.documentElement.style.setProperty('--marquee-speed', newSpeed);
});

onMounted(() => {
  nextTick(() => {
    document.documentElement.style.setProperty('--marquee-speed', marqueeSpeed.value);
  });
});

//v-card
// 設定卡片的樣式
const cardStyles = computed(() => ({
  maxWidth: mdAndDown.value ? '100%' : '80%', // 手機版顯示 100% 寬度，桌面顯示 800px
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

// 設定容器的樣式
const containerStyle = computed(() => ({
  maxWidth: mdAndDown.value ? "100%" : "80%",
  width: "100%", // 確保容器寬度保持一致
}));

//分類按鈕
const buttonRow = computed(() => ({
  fontSize: mdAndDown.value ? '8px' : '18px',
  paddingBottom: mdAndDown.value ? '7px' : '10px',
  width: mdAndDown.value ? '70px' : '180px',
  height: mdAndDown.value ? '40px' : '80px',
  margin: mdAndDown.value ? '3px' : '20px', // 增加按鈕間距
}));

// 定義分類按鈕
const categories = ['all', 'game', 'animation', 'short film'];

// 設定當前選擇的分類
const selectedCategory = ref<string>('all'); // 設定頁面載入時的分類

// 根據選擇的分類來篩選圖片
const filteredPages = computed(() => {
  if (!pages.value) {
    console.error("Pages data is not available");
    return [];
  }
  if (selectedCategory.value === 'all') {
    return pages.value; // 顯示所有的 v-card
  }
  return pages.value.filter(page => page.majorCategory === selectedCategory.value);
});

// 用於切換分類的函數
const filterCategory = (category: string) => {
  selectedCategory.value = category;
};

// 用於滾動到特定卡片的函數
const navigateToCard = (groupName: string) => {
  // 切換到 "all" 類別
  selectedCategory.value = "all";

  // 使用 Vue 的 nextTick 確保畫面更新後再執行滾動
  nextTick(() => {
    const targetId = 'card-' + groupName.replace(/\s+/g, '');  // 移除空白以匹配 ID
    const targetCard = document.getElementById(targetId);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.error(`無法找到目標卡片: ${targetId}`);
    }
  });
};

//CLICK
const click= ref([
{
  image: new URL('@/assets/img/1.png', import.meta.url).href,
  groupName: "可立可CLICK",
  description: "多媒體的多樣性和創新性，源自於那一瞬間的「點擊」。從鍵盤上按下的瞬間開始了所有的創意旅程。\n可力可（CLICK）是一座由鍵盤構築而成的水族館，每個鍵帽中都住著各式各樣的生物。這些生物隨意穿梭於各個連通的鍵帽之間，也會不時化身成鍵帽本體。\n生物們的跨界合作激盪出無盡的靈感與創意◝★\n本次展覽中，「CLICK」象徵著每一個作品的誕生與演進，也提醒著我們在每一個設計的背後都源自於最初那一瞬間的靈感碰撞。"
},
]);

// 每一頁的資料，包括圖片、標題和描述
const pages = ref([
  {
    majorCategory: "animation",  // 更新類別
    image: new URL('@/assets/img/2.jpg', import.meta.url).href,
    groupName: "沼",
    category: "2D｜動畫影片",
    categoryEnglish: "2D｜Animation Film",
    description: "本作品以「長照監獄」為發想，針對照顧者的視角去探討這個議題。\n主角小時候與父親有個約定，隨著父親年老患病後，約定似乎也被遺忘。\n內心的不滿和責任的壓力讓主角疲憊不堪，陷入泥沼幾近迷失。\n某天夜晚父親再次走失後，主角找回記憶中的約定，重新理解了這段陪伴的意義。"
  },
  {
    majorCategory: "animation",
    image: new URL('@/assets/img/3.png', import.meta.url).href,
    groupName: "靜默",
    category: "2D｜動畫影片",
    categoryEnglish: "2D｜Animation Film",
    description: "本次展覽探討「不當旁觀者」，揭示社會霸凌的陰暗面及其影響，強調面對不正義時勇氣與同理心的重要性。\n此作品以第一視角呈現主角們從融洽相處到因退縮導致不可挽回的過程，促使觀眾反思旁觀者角色可能帶來的傷害。\n我們透過動畫激勵人們挺身對抗不正義，關懷弱者，共同促進包容社會，拒絕冷漠旁觀。"
  },
  {
    majorCategory: "animation",
    image: new URL('@/assets/img/4.png', import.meta.url).href,
    groupName: "與海",
    category: "定格動畫",
    categoryEnglish: "Stop Motion Animation",
    description: "講述海龜生活的環境，聚焦於人類對自然環境的破壞，並以一隻由垃圾變異而成的巨大海龜作為核心象徵。\n人們時常因為一些無心的舉動破壞海洋，這次，小小的行為竟讓海龜發生巨大的變化⋯\n故事充滿了壓抑、緊張的氣氛，反思對自然造成的傷害和環境問題的嚴重性。"
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
    description: "Sweet Dreams 是一款 2.5D 的 Rougelike 戰鬥動作遊戲。\n主角田曦然在森林中醒來，身上只有一本無名日記，魔法師救她回家休養的不久後，寧靜的日常被怪異的黑暗詛咒打破。\n為了重回和平的生活，一路擊退受詛咒的生物前往城堡，在路途中，田曦然逐步揭開日記與詛咒背後的秘密。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/8.png', import.meta.url).href,
    groupName: "觀光課",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "主角淑芬與家豪是一組愛翹課的小拍檔，某天卻意外進入一個充滿光影奇幻世界裡。在這裡怪物會四處遊蕩，謎題會隱藏在每個角落。淑芬力氣大能推重物，家豪嬌小靈活，兩人必須合力破解光影謎題、躲避怪物的追擊，才能找到回家的路。每個場景都有神奇的光影機關等著他們來挑戰—你能幫他們闖過難關，揭開這個奇幻世界的秘密嗎？ "
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/10.png', import.meta.url).href,
    groupName: "孩玩仔",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "主角在回憶小時候最愛的節目 - 閃電跳跳糖超人，莫名地從老舊箱型電視機裡出來並化身為節目主人翁跳跳糖超人。\n彈珠汽水、梅子棒糖、沙畫、風車……，逐漸淡忘的事物層層映入眼簾。\n主角將和跳跳糖超人一樣幫助被反派刁難的懷舊世界居民，而電話似乎是連結現實世界的唯一通道，隨者電話中的訊息，主角的過往回憶漸漸被揭開，那也是你曾經歷過的嗎 ？"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/9.png', import.meta.url).href,
    groupName: "變異武裝",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "變異武裝是一款3D第三人稱射擊遊戲。\n遊戲背景發生在一個研究武器科技與生物的特殊機構。玩家操控的是一位來這裡實習不久的實習生。\n而有一天，還在房間睡覺的主角，被突然的災害警報給吵醒，其他人也都不知道跑哪裡去了，為了釐清整件事情的真相和逃出去，玩家將配合電腦小助手的指示展開危機重重的冒險。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/12.png', import.meta.url).href,
    groupName: "苜隆車站",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "苜隆車站(3D遊戲)苜隆車站在幾年前曾經發生過一起嚴重的火災事故，造成多名人員傷亡，而在重建後，有關靈異事件的傳聞，卻從未停下。\n玩家將扮演一名道士，在接收到站長委託後，前來處理發生的靈異事件，而在此期間，發現了許多與當年火災相關的線索，似乎在暗示著，當年的事件還隱藏了些什麼。"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/13.png', import.meta.url).href,
    groupName: "翠翠島嶼",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "未來發生了一場災難，調查發現跟500年前動物滅絕似乎有關係。主角阿波前往調查後不小心掉到了沒有見過的地方.......相機也發生了一些異變，有著特殊的功能。這裡有以前已經滅絕的動物們，了解牠們與未來的關聯幫助他們解決他們的問題。阿波決定利用手上的相機解決問題，但如果解決的方式不同，或許會造成未來有不同的變化?"
  },
  {
    majorCategory: "game",
    image: new URL('@/assets/img/6.png', import.meta.url).href,
    groupName: "亂巷",
    category: "3D｜遊戲",
    categoryEnglish: "3D｜Game",
    description: "台灣的街道展現著獨特的混亂與雜亂，從路、街、巷到弄，處處可見。在這款遊戲中，玩家將化身為機車騎士，穿梭在繁忙城市的巷弄間。\n面對道路上的各種障礙，讓玩家當自以為的正義使者。\n遊戲中的道路環境不僅模擬了台灣的交通情況與各種危險路況，更讓玩家在體驗本土交通文化時，學習如何成為一位懂得防衛的騎士。"
  },
]);
function replaceNewlines(text: string) {
  // 將描述中的 \n 替換為 <br>，然後回傳
  return text.replace(/\n/g, '<br>')  
}
</script>


<style scoped>
.group {
  background-color: transparent; /*容器透明背景*/
  margin-top: 80px;    /* 設定頂部外邊距 */
  margin-bottom: 80px; /* 設定底部外邊距 */
}

.group-title {
  background-color: transparent;
  background-image: url('@/assets/button_blue.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
}

.group-vcard {
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  height: 100%;
  box-shadow: none; /* 移除陰影 */
}

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

.button-container {
  display: flex; /* 啟用彈性佈局 */
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  padding: 0; /* 移除不必要的空間 */
}

.button-row {
  background-color: transparent;
  background-image: url('@/assets/button_blue.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  width: 100%; /* 根據 v-col 自適應 */
  height: 60px; /* 設定按鈕的具體高度 */
  padding: 0;
  overflow: hidden;
  box-shadow: none; /* 移除陰影 */
  border: none; /* 可選，移除按鈕的預設邊框 */
}

.marquee-container {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.marquee-images {
  display: flex;
  animation: marquee var(--marquee-speed) linear infinite;
}

.marquee-image {
  width: 20%;
  object-fit: cover;
  margin-right: 1%;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* 動態設定 CSS 變數 */
:root {
  --marquee-speed: 30s; /* 預設播放速度 */
}
</style>