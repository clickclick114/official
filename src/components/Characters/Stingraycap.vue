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
</style>