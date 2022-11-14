<template>
  <div class="inner-pagename">
    <div class="name-box">
      <h1>{{ pageName }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppInnerPageName",
  props: {
    pageName: Object,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.inner-pagename {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0px;
  .name-box {
    h1 {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      color: $web-font-color-black;
    }
  }
}
</style>