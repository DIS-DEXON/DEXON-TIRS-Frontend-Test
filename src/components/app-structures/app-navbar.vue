<template>
  <div class="page-container">
    <div id="navigation-panel">
      <div class="left-col">
        <v-ons-toolbar-button
          v-if="isBack == true"
          class="btn"
          v-on:click="goTo('/')"
        >
          <i class="las la-angle-left"></i>
          <!-- <img src="/img/icons-btn/chevron-left.svg" /> -->
          <span>Back</span>
        </v-ons-toolbar-button>
        <h1 class="page-name-label">{{ pageName }}</h1>
      </div>
      <div class="right-col"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation-bar",
  props: {
    backUrl: String,
    pageName: String,
    isBack: Boolean,
  },
  methods: {
    goTo(path) {
      this.$ons.notification
        .confirm(
          "You are exiting '" + this.$store.state.currentInApp.name + "'."
        )
        .then((res) => {
          if (res == 1) {
            this.$store.commit("CLEAR_CURRENT_INAPP");
            var currentPath = this.$route.path;
            if (currentPath != path) {
              this.$router.push({ path: path, replace: true });
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
#navigation-panel {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  // padding: 40px 0;
  height: 80px;
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0;

  .left-col {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .btn {
      margin-right: 20px;
    }

    .page-name-label {
      margin: 0;
      padding: 0;
      font-size: 2.5em;
      color: $web-font-color-black;
      user-select: text;
    }
  }
  .right-col {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .toolbar-button {
    padding: 0 10px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background-color: #f0f0f0;
    span {
      font-size: 16px;
    }
    i {
      margin-right: 6px;
      margin-left: 0;
    }
  }
  .toolbar-button:hover {
    color: #fff;
    background-color: #0076ff;
  }
  .toolbar-button:active {
    color: #fff;
    background-color: #0076ff;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 0;
    display: block;
    .toolbar-button {
      height: 20px;
      padding: 6px;
      span,
      i {
        font-size: 14px;
      }
    }
    h1 {
      padding: 20px 0 0 0 !important;
      font-size: 3em !important;
    }
  }
}
</style>