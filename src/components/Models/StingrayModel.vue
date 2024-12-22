<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene: model } = await useGLTF("./src/assets/models/jellyfish.glb");
</script>

<template>
  <primitive :object="model" />
</template>