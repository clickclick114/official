<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const getModelPath = (path: string) =>
  new URL(`../../assets/models/${path}`, import.meta.url).href;
const { scene: model } = await useGLTF(getModelPath("empty keycap.glb"));
</script>

<template>
  <primitive :object="model" />
</template>