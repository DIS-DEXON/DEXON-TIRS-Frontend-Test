<template>
  <div id="footer-label">
    <div class="wrapper">
      <p>Asset Integrity Management (BETA)</p>
      <p>Copyright 2022 © Dexon Technology PLC.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppBottomBar",
  props: {
    option: String,
  },
  computed: {
    isLoginPage() {
      var path = this.$route.path;
      if (path == "/login") return true;
      else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
#footer-label {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 4px 0;
  background-color: $web-font-color-black;
  z-index: 998;
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    p {
      padding: 0;
      margin: 0;
      font-family: $web-default-font;
      font-size: 1.5em;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      color: $web-font-color-white;
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 4px 0;
    width: 100%;
    .wrapper {
      flex-direction: column;
      align-items: center;

      p {
        font-size: 1.25em !important;
        line-height: unset;
      }
    }
    // #footer-label {
    //   position: unset;
    //   // padding-bottom: 150px;
    // }
  }
}

.transparent-bg {
  background-color: transparent !important;
  padding: 10px 0 !important;
}
</style>