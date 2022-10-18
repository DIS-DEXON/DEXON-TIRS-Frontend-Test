<template>
  <router-view></router-view>
</template> 

<script>
import ViewLayout from "@/layouts/sidebar-layout.vue";
export default {
  name: "RouterTemplate",
  created() {
    this.$emit(`update:layout`, ViewLayout);
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>