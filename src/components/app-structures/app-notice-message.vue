<template>
  <div class="app-notice-message-wrapper">
    <div class="center-box">
      <div class="page-content-message-wrapper">
        <i :class="icon"></i>
        <span>
          {{ message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-notice-message",
  props: {
    icon: String,
    message: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.app-notice-message-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ccc;
  .center-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .toolbar-button {
      width: fit-content;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 0 2px;
      border-radius: 6px;
      background-color: #f6f6f6;
      padding: 5px 0;
      text-align: right;

      i,
      span {
        font-size: 18px;
        color: $web-font-color-blue;
      }

      span {
        font-size: 12px;
        padding-right: 10px;
        font-weight: 500;
        max-width: 300px;
        line-height: 20px;
      }
    }

    .toolbar-button:hover,
    .toolbar-button:active {
      background-color: #140a4b;

      i,
      span {
        color: #fff;
      }
    }
  }
}
</style>