<template>
  <div class="image-preview-wrapper">
    <div class="preview-popup">
      <v-ons-toolbar-button class="btn-close" v-on:click="CLOSE_PREVIEW()">
        <i class="las la-times"></i>
      </v-ons-toolbar-button>
      <v-ons-toolbar-button class="btn-close download">
        <a target="_blank" :href="baseURL + imageURL" download>
          <i class="las la-download"></i>
        </a>
      </v-ons-toolbar-button>
      <img :src="baseURL + imageURL" />
    </div>
  </div>
</template>

<script>
export default {
  name: "image-preview",
  props: {
    imageURL: String,
  },
  computed: {
    baseURL() {
      var mode = this.$store.state.mode;
      if (mode == "dev") return this.$store.state.modeURL.dev;
      else if (mode == "prod") return this.$store.state.modeURL.prod;
      else return console.log("develpment mode set up incorrect.");
    },
  },
  methods: {
    DOWNLOAD_IMG(url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    CLOSE_PREVIEW() {
      this.$emit("close-preview");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.image-preview-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  .preview-popup {
    background-color: #fff;
    padding: 10px;
    width: fit-content;
    min-width: 200px;
    max-width: calc(100vw - 140px);
    height: fit-content;
    max-height: calc(100vh - 140px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    // overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      max-width: calc(100vw - 140px);
      max-height: calc(100vh - 140px);
      object-fit: contain;
    }
    .btn-close {
      width: 42px;
      height: 30px;
      position: absolute;
      top: 0;
      right: -54px;
      border: 1px solid rgb(218, 218, 218);
      background-color: #fff;
      padding: 0px !important;

      i {
        color: $web-font-color-blue;
      }
    }

    .download {
      top: 42px;
    }
  }
}
</style>