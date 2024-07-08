<template>
  <Crud :config="config" />
</template>

<script setup lang="ts">
import Crud from "@/components/Crud/index.vue";
import config from "./config.json";

defineOptions({
  // 命名当前组件
  name: "UserJson"
});

</script>

<style scoped lang="scss">

</style>
