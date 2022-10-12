<template>
  <div class="layout">
    <sidebar class="sidebar-panel" />
    <slot />
  </div>
</template>

<script>
import sidebar from "@/components/app-structures/app-sidebar.vue";

export default {
  name: "LayoutMain",
  components: {
    sidebar,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-columns: 240px calc(100% - 240px);
}
@media screen and (max-width: 1024px) {
  .layout {
    grid-template-columns: 100%;
  }
  .sidebar-panel {
    display: none;
  }
}
</style>