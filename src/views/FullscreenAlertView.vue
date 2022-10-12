<template>
  <div class="server-down">
    <div class="alert">
      <i :class="alertIcon"></i>
      <h1>{{ titleText }}</h1>
      <h5>{{ desText1 }}</h5>
      <h5>{{ desText2 }}</h5>

      <v-ons-toolbar-button id="btn" v-on:click="BTN_ACTION()">
        <i :class="buttonIcon"></i>
        <span>{{ buttonText }}</span>
      </v-ons-toolbar-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullScreenAlert",
  created() {},
  data() {
    return {
      alertText: {
        serverDown: {
          alertIcon: "las la-wifi",
          titleText: "Cannot connect to a server",
          desText1: 'Check your connection and click "Retry".',
          desText2: "If problem still persists, please contact support.",
          buttonIcon: "las la-undo-alt",
          buttonText: "Retry",
        },
        tokenExpired: {
          alertIcon: "las la-plug",
          titleText: "Session is expired",
          desText1: "Your access token is expired. Please sign in again.",
          desText2: "",
          buttonIcon: "las la-sign-in-alt",
          buttonText: "Go to Sign In Page",
        },
      },
    };
  },
  methods: {
    BTN_ACTION() {
      if (this.$store.state.status.server == false) this.$router.go();
      else if (this.$store.state.status.token == false) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.$router.go();
      } else this.$router.go();
    },
  },
  computed: {
    alertIcon() {
      if (this.$store.state.status.server == false)
        return this.alertText.serverDown.alertIcon;
      else if (this.$store.state.status.token == false)
        return this.alertText.tokenExpired.alertIcon;
      else return "las la-exclamation-triangle";
    },
    titleText() {
      if (this.$store.state.status.server == false)
        return this.alertText.serverDown.titleText;
      else if (this.$store.state.status.token == false)
        return this.alertText.tokenExpired.titleText;
      else return "Unknown Error!";
    },
    desText1() {
      if (this.$store.state.status.server == false)
        return this.alertText.serverDown.desText1;
      else if (this.$store.state.status.token == false)
        return this.alertText.tokenExpired.desText1;
      else return "Please try refreshing the page.";
    },
    desText2() {
      if (this.$store.state.status.server == false)
        return this.alertText.serverDown.desText2;
      else if (this.$store.state.status.token == false)
        return this.alertText.tokenExpired.desText2;
      else return "If problem still persists, please contact support.";
    },
    buttonIcon() {
      if (this.$store.state.status.server == false)
        return this.alertText.serverDown.buttonIcon;
      else if (this.$store.state.status.token == false)
        return this.alertText.tokenExpired.buttonIcon;
      else return "las la-sync";
    },
    buttonText() {
      if (this.$store.state.status.server == false)
        return this.alertText.serverDown.buttonText;
      else if (this.$store.state.status.token == false)
        return this.alertText.tokenExpired.buttonText;
      else return "Refresh";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.server-down {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  z-index: 997;
  .alert {
    width: 500px;
    height: fit-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    i {
      font-size: 7em;
      color: $web-theme-color-secondary;
    }
    h1 {
      color: $web-theme-color-secondary;
      font-size: 2.5em;
      user-select: text;
    }
    h5 {
      color: $web-font-color-grey;
      font-weight: 400;
      font-size: 1.75em;
      margin: 0px;
      user-select: text;
    }
  }
  #btn {
    width: fit-content;
    margin: 0 auto;
    padding: 0;
    padding-right: 10px;
    height: 34px;
    justify-content: flex-start;
    border-radius: 7px;
    margin-bottom: 10px;
    border: 0px;
    background: #ececec;
    margin-top: 20px;
    i {
      font-size: 18px;
      margin-left: 15px;
    }
    span {
      color: $web-theme-color-secondary;
      font-weight: 400;
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
</style>