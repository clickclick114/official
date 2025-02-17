<template>
  <div class="canvas-container">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[5, 8, 5]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls
        :minDistance="8"
        :maxDistance="15"
        :enablePan="false"
      />
      <Suspense>
        <StingraycapModel
          :position="[0, 0, 0]"
          scale="2"
        />
      </Suspense>
      <TresDirectionalLight
        color="#FFFFFF"
        :position="[-8, 8, 10]"
        :intensity="3"
      />
      <DirectionalLight
        color="#FFFFFF"
        :position="[8, 8, -10]"
        :intensity="4"
      />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
    <div class="model-hint">
      <v-icon
        icon="mdi-gesture-tap-hold"
        class="me-0"
      />
      <!-- 拖曳以檢視模型 -->
    </div>
  </div>
</template>
  
  <script setup>
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";

const gl = {
  clearColor: undefined,
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>
  
  <style scoped>
.canvas-container {
  width: 400px;
  height: 400px;
  position: relative;
}

:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  border-radius: 8px;
}

.model-hint {
  position: absolute;
  top: 50px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  backdrop-filter: blur(4px);
  transition: opacity 0.3s ease;
  opacity: 0.8;
}

.model-hint:hover {
  opacity: 1;
}
</style>