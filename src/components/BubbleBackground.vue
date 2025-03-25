<template>
  <canvas ref="canvas" class="bubble-canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let bubbles: Bubble[] = [];
let animationFrameId: number;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

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

  // 確保 canvas 依照其寬高比進行縮放
  const scaleX = canvas.value.width / canvasWidth;
  const scaleY = canvas.value.height / canvasHeight;
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

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

  window.addEventListener("resize", () => {
    if (canvas.value) {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.value.width = canvasWidth;
      canvas.value.height = canvasHeight;
      if(ctx){
        ctx.setTransform(1,0,0,1,0,0);//重置轉換矩陣
      }
    }
    initBubbles();
  });


const mainElement = document.querySelector("v-main");
  if (mainElement) {
    const resizeObserver = new ResizeObserver(() => {
      if (canvas.value) {
        canvasWidth = mainElement.clientWidth;
        canvasHeight = mainElement.clientHeight;
        canvas.value.width = canvasWidth;
        canvas.value.height = canvasHeight;
      }
      initBubbles();
    });
    resizeObserver.observe(mainElement);

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  }
});
</script>

<style scoped>
.bubble-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1; /* 保持 1:1 的寬高比 */
  pointer-events: none;
}
</style>