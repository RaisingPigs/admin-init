<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import Logo from "@/components/Logo/index.vue";

interface Props {
  collapse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true
});

const settingsStore = useSettingsStore();
const { layoutMode } = storeToRefs(settingsStore);
</script>

<template>
  <div
    class="layout-logo-container"
    :class="{
      collapse: props.collapse,
      'layout-mode-top': layoutMode === 'top'
    }"
  >
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <Logo title="Admin" :font-size="16" :is-black="false" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <Logo title="Admin" :font-size="38" :is-black="false" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.layout-mode-top {
  height: var(--v3-navigationbar-height);
  line-height: var(--v3-navigationbar-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
