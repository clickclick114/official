<template>
  <primitive
    :object="scene"
    v-bind="$attrs"
  />
</template>

<script setup>
import { useGLTF } from "@tresjs/cientos";
import { watch } from "vue";
import { useRenderLoop } from "@tresjs/core";

const { scene, animations } = await useGLTF(
  "./src/assets/models/empty keycap.glb"
);
</script> 