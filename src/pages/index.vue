<template>
  <v-app>
    <div>
      <v-main style="background: linear-gradient(to bottom, #ffffff, #b1dcf9); height: auto; position: relative;">
        <canvas ref="canvas" class="bubble-canvas"></canvas>

        <v-container class="d-flex justify-center align-center" style="height: 100%; width: 100%;">
          <v-sheet :height="'95%'" :width="'95%'" color="transparent">
            <SchoolName />
            <VideoContainer />
            <Section1 />
            <Character v-if="!mdAndDown" />
            <CharacterPhone v-if="mdAndDown" />
            <Coral />
          </v-sheet>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import { onMounted, onBeforeUnmount, ref } from "vue";
import SchoolName from "../components/SchoolName.vue";

const { mdAndDown } = useDisplay();

// 泡泡相關的程式碼
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let bubbles: Bubble[] = [];
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let animationFrameId: number;

class Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;

  constructor() {
    this.radius = Math.random() * 8 + 2;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.closePath();
  }

  update() {
    this.y -= this.speed;
    if (this.y + this.radius < 0) {
      this.y = canvasHeight + this.radius;
      this.x = Math.random() * canvasWidth;
      this.speed = Math.random() * 1 + 0.5;
    }
  }
}

const initBubbles = () => {
  bubbles = [];
  for (let i = 0; i < 50; i++) {
    bubbles.push(new Bubble());
  }
};

const animate = () => {
  if (!ctx || !canvas.value) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  bubbles.forEach((bubble) => {
    bubble.update();
    bubble.draw(ctx!);
  });

  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  if (!canvas.value) return;

  canvas.value.width = canvasWidth;
  canvas.value.height = canvasHeight;
  ctx = canvas.value.getContext("2d");

  if (ctx) {
    initBubbles();
    animate();
  }

  const mainElement = document.querySelector("v-main");
  if (mainElement) {
    const resizeObserver = new ResizeObserver(() => {
      if (canvas.value) {
        // 更新 canvas 尺寸
        canvasWidth = mainElement.clientWidth;
        canvasHeight = mainElement.clientHeight;
        canvas.value.width = canvasWidth;
        canvas.value.height = canvasHeight;

        // 重新初始化泡泡，確保它們的位置正確
        initBubbles();
      }
    });
    resizeObserver.observe(mainElement);

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.bubble-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>