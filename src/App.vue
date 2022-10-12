<template>
  <div id="app">
    <topBar :key="$route.fullPath" />
    <component
      :is="layout"
      class="app-page"
      :class="{ 'app-page-fullpage': isLoginPage }"
    >
      <router-view :layout.sync="layout" />
    </component>
    <footerLabel />
    <FullscreenAlertView
      v-if="this.$store.state.status.fullscreenAlert == true"
    />
  </div>
</template>

<script>
import topBar from "@/components/app-structures/app-topbar";
import footerLabel from "@/components/app-structures/app-bottombar";
import "devextreme/dist/css/dx.light.css";
import FullscreenAlertView from "@/views/FullscreenAlertView.vue";
export default {
  components: {
    topBar,
    footerLabel,
    FullscreenAlertView,
  },
  created() {
    if (this.$store.state.status.server == true) {
      if (JSON.parse(localStorage.getItem("token")))
        this.$store.commit("VALIDATE_TOKEN");
      // if (
      //   this.$store.state.status.token == true &&
      //   this.$store.state.user == ""
      // ) {
      //   this.$store.commit("FETCH_USER_INFO");
      // }
    }
  },
  data() {
    return {
      layout: "div",
    };
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

<style lang="scss">
@import "@/style/main.scss";
@import "@/style/form.scss";
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.app-page {
  width: 100%;
  height: calc(100vh - 78px);
  padding-top: 54px;
  overflow: hidden;
}

.app-page-fullpage {
  padding-top: 0;
  height: 100%;
}
</style>