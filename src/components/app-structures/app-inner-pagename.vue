<template>
  <div class="inner-pagename">
    <div class="name-box">
      <h1>{{ pageName }}</h1>

      <div
        v-if="breadcrumb1"
        style="display: flex; justify-content: center; align-items: center"
      >
        <i class="las la-angle-right"></i>
        <h1>{{ breadcrumb1 }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppInnerPageName",
  props: {
    pageName: String,
    breadcrumb1: String,
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0px;
  background-color: #fff;

  .name-box {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      color: $web-font-color-black;
      user-select: text;
    }
    i {
      margin: 0 10px;
      font-size: 16px;
      color: $web-font-color-black;
      user-select: text;
    }
  }
  .tool-box {
  }
}
</style>