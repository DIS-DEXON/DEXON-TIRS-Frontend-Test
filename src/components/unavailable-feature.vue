<template>
  <div class="wrapper">
    <div class="item">
      <i class="las la-plug"></i>
      <h2>Coming Soon</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "unavailable-feature-div",
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    // flex-direction: column;
    h2,
    i {
      text-align: center;
      color: $web-theme-color-secondary;
    }
    i {
      font-size: 24px;
      margin-right: 6px;
    }
    h2 {
      font-size: 14px;
      font-weight: 600;

      user-select: text;
      padding: 0;
      margin-bottom: 10px;
    }
  }
}
</style>