<template>
  <div class="tabbar-wrapper"></div>
</template>

<script>
export default {
  name: "app-tabbar",
  props: {
    tab_list: Array,
  },
  data() {
    return {
      tab_current: 1,
    };
  },
};
</script>

<style scoped lang="scss">
.tabbar-wrapper {
}
</style>