<template>
  <span>{{ title }}</span>
</template>

<script setup lang="ts">
defineOptions({ name: "Logo" });

import { computed } from "vue";

const props = defineProps<{ title: string, fontSize: number, isBlack: boolean }>();

const fontSizeCss = computed(() => {
  return props.fontSize + "px";
});

const backgroundImageCss = computed(() => {
  if (props.isBlack) {
    return "linear-gradient(109.6deg, rgb(0, 51, 102) 11.2%, rgb(187, 187, 187) 91.1%)";
  } else {
    return "linear-gradient(to right, #9fe1fa, #f4edc9)";
  }
});


</script>

<style scoped lang="scss">
span {
  font-size: v-bind(fontSizeCss);
  font-weight: bold;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: v-bind(backgroundImageCss);
}
</style>
