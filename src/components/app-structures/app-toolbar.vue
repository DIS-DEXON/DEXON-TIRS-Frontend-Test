<template>
  <div id="app-toolbar">
    <div class="left-col">
      <v-ons-toolbar-button v-if="isBack" v-on:click="$router.go(-1)">
        <i class="las la-angle-left"></i>
        <span>Back</span>
      </v-ons-toolbar-button>
      <h1>{{ pageName }}</h1>
      <h2>{{ pageSubName }}</h2>
    </div>
    <div class="right-col">
      <v-ons-toolbar-button
        v-if="isSave"
        class="highlight-btn"
        v-on:click="$emit('isSaveBtn')"
      >
        <i class="las la-save"></i>
        <span>Save</span>
      </v-ons-toolbar-button>
      <v-ons-toolbar-button v-if="isEdit" v-on:click="$emit('isEditBtn')">
        <i class="las la-edit"></i>
        <span>Edit</span>
      </v-ons-toolbar-button>
      <v-ons-toolbar-button v-if="isDelete" v-on:click="$emit('isDeleteBtn')">
        <i class="las la-trash"></i>
        <span>Delete</span>
      </v-ons-toolbar-button>

      <div class="btn-group-separater" v-if="isPrint || isDownload"></div>

      <v-ons-toolbar-button v-on:click="$emit('refreshInfo')">
        <i class="las la-sync"></i>
        <span>Refresh</span>
      </v-ons-toolbar-button>

      <v-ons-toolbar-button v-if="isPrint">
        <i class="las la-print"></i>
        <span>Print</span>
      </v-ons-toolbar-button>

      <v-ons-toolbar-button
        v-if="isDownload"
        v-on:click="$emit('isDownloadBtn')"
      >
        <i class="las la-download"></i>
        <span>Download</span>
      </v-ons-toolbar-button>

      <v-ons-toolbar-button v-if="isNewBtn" v-on:click="$emit('newBtnFn')">
        <i class="las la-plus"></i>
        <span>{{ newBtnLabel }}</span>
      </v-ons-toolbar-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-toolbar",
  props: {
    pageName: String,
    pageSubName: String,
    isBack: Boolean,
    isEdit: Boolean,
    isSave: Boolean,
    isDelete: Boolean,
    isPrint: Boolean,
    isDownload: Boolean,
    isNewBtn: Boolean,
    newBtnLabel: String,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
#app-toolbar {
  width: 100%;
  height: 60px;
  background: #fff;
  border: 1px solid #e6e6e6;
  border-width: 0 0 1px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-col,
  .right-col {
    display: flex;

    align-items: center;
  }
  .left-col {
    padding-left: 20px;
    justify-content: flex-start;
    h1,
    h2 {
      font-style: normal;
      font-weight: 600;
      line-height: 29px;
      letter-spacing: -0.08px;

      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    h1 {
      font-size: 2.75em;
      color: $web-font-color-blue;
    }
    h2 {
      font-size: 2em;
      color: $web-font-color-black;
    }
    .toolbar-button {
      margin-left: 0;
      margin-right: 20px;
    }
    @media screen and (max-width: 1024px) {
      h1 {
        font-size: 2.5em;
      }
      h2 {
        font-size: 2em;
      }
    }
  }
  .right-col {
    padding-right: 20px;
    justify-content: flex-end;
    .toolbar-button {
      margin-right: 10px;
      i {
        font-size: 20px;
      }
    }
    .toolbar-button:last-child {
      margin-right: 0;
    }
    .btn-group-separater {
      height: 28px;
      width: 1px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-width: 0 1px 0 0;
      margin-right: 10px;
    }
  }
}

.toolbar-button {
  background-color: $web-theme-color-background;
  padding: 0;
  padding-right: 15px;
  height: 34px;
  border: 0px;

  i {
    font-size: 20px;
    color: $dexon-primary-blue;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: $web-font-color-black;
  }
}
.toolbar-button:hover,
.toolbar-button:active {
  background-color: $dexon-primary-blue;

  i {
    color: $web-font-color-white;
  }
  span {
    color: $web-font-color-white;
  }
}

.highlight-btn {
  background-color: $dexon-primary-blue !important;
  width: 150px;
  span,
  i {
    color: #fff;
  }
}
.highlight-btn:hover {
  opacity: 0.8;
}

.highlight-btn:active {
  opacity: 1;
}
</style>