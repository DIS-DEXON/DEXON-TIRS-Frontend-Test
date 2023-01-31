<template>
  <div class="app-content-loading">
    <div class="box">
      <hash-loader
        class="custom-class"
        color="#1e1450"
        :loading="true"
        :size="40"
        sizeUnit="px"
      ></hash-loader>
      <!-- <h6>{{ text }}</h6> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLoading",
  props: {
    text: String,
    icon: String,
    color: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.app-content-loading {
  height: 100%;
  width: 100%;
  background-color: #fdfdfd;
  position: absolute;
  /* top: 44px; */
  z-index: 999;
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    img {
      width: 100px;
      filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
    }
    h5 {
      color: $web-font-color-grey;
      font-weight: 600;
    }
    h6 {
      color: $web-font-color-grey;
      font-weight: 400;
      margin: 10px 0 20px 0;
    }
    .app-name {
      color: $web-font-color-black;
      font-weight: 500;
      margin-bottom: 0;
    }
  }
}

@media screen and (max-width: 1024px) {
  .app-content-loading {
    width: 100%;
  }
}
</style>