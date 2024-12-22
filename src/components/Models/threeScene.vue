<template>
  <div class="canvas-container">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[0, 0, 9]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls />
      <Suspense>
        <slot />
      </Suspense>
      <TresDirectionalLight
        color="#F78B3D"
        :position="[3, 3, 3]"
        :intensity="1"
      />
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>
</template>

<script setup>
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";

const gl = {
  clearColor: "#ffffff",
  shadows: true,
  alpha: false,
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