<template>
  <div id="app-toolbar">
    <div class="left-col">
      <v-ons-toolbar-button v-if="isBack" v-on:click="$router.go(-1)">
        <i class="las la-angle-left"></i>
        <span>Back</span>
      </v-ons-toolbar-button>
      <v-ons-toolbar-button v-if="isBackPath" v-on:click="GO_BACK_TO()">
        <i class="las la-angle-left"></i>
        <span>Back</span>
      </v-ons-toolbar-button>
      <h1>{{ pageName }}</h1>
      <h2>{{ pageSubName }}</h2>
      <div class="toolbar-info mobile-none" v-if="infoTank">
        <!-- <div class="info-item">
          <label class="desc">Tag No: </label>
          <label class="value">{{ infoTank.tag_no }}</label>
        </div> -->
        <div class="info-item">
          <label class="desc">Tank No: </label>
          <label class="value">{{ infoTank.tank_no }}</label>
        </div>
        <div class="info-item">
          <label class="desc">Product: </label>
          <label class="value">{{ infoTank.product_code }}</label>
        </div>

        <div class="info-item">
          <label class="desc">Location:</label>
          <label class="value"> {{ infoTank.site_name }}</label>
        </div>
        <div class="info-item">
          <label class="desc">Site: </label>
          <label class="value">{{ infoTank.site_desc }}</label>
        </div>
        <div class="info-item">
          <label class="desc">Client:</label>
          <label class="value"> {{ infoTank.company_name }}</label>
        </div>
        <div class="info-item">
          <label class="desc">In-service Date : </label>
          <label class="value">{{ tank_inservice_date }}</label>
        </div>
      </div>
    </div>
    <div class="right-col">
      <div class="search-box">
        <i class="las la-search search"></i>
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="search tag no."
          v-on:keyup.enter="GET_SEARCH()"
        />
        <i
          class="las la-times clear"
          v-if="searchKeyword != ''"
          v-on:click="CLEAR_SEARCH()"
        ></i>
      </div>
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

      <v-ons-toolbar-button v-if="isRefresh" v-on:click="$emit('refreshInfo')">
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
import moment from "moment";
export default {
  name: "app-toolbar",
  props: {
    pageName: String,
    pageSubName: String,
    isBack: Boolean,
    isBack_specificPath: String,
    isBackPath: Boolean,
    isEdit: Boolean,
    isSave: Boolean,
    isDelete: Boolean,
    isPrint: Boolean,
    isDownload: Boolean,
    isNewBtn: Boolean,
    isRefresh: Boolean,
    newBtnLabel: String,
    infoTank: Object,
  },
  data() {
    return {
      searchKeyword: "",
    };
  },
  methods: {
    GO_BACK_TO() {
      this.$router.push(this.isBack_specificPath);
    },
    GET_SEARCH() {
      // var keyword = this.searchKeyword;
      //axios GET result {id_client, id_tag}
      var result = {
        // id_client: 16,
        // id_tag: 5,
      };
      if (result.id_client && result.id_tag) {
        this.$router.push(
          "/tank/client/" + result.id_client + "/tag/" + result.id_tag + "/info"
        );
      } else {
        this.$ons.notification.alert("Tag number not found");
      }
    },
    CLEAR_SEARCH() {
      this.searchKeyword = "";
    },
  },
  computed: {
    tank_inservice_date() {
      if (this.infoTank.inservice_date) {
        return moment(this.infoTank.inservice_date).format("LL");
      } else return "N/A";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
#app-toolbar {
  width: 100%;
  height: 50px;
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
    width: fit-content;
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
      user-select: text;
    }
    h1 {
      font-size: 2.75em;
      color: $web-font-color-blue;
    }
    h2 {
      font-size: 2em;
      color: $web-font-color-black;
      width: auto;
      padding-right: 30px;
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
    font-size: 12px;
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

.toolbar-info {
  display: flex;
  .info-item {
    display: block;
    width: fit-content;
    padding-right: 40px;

    .desc,
    .value {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
      cursor: text;
    }
    .desc {
      color: $web-font-color-grey;
      font-size: 10px;
    }
    .value {
      color: $web-font-color-black;
      font-weight: 600;
      font-size: 12px;
    }
  }
}

.search-box {
  width: 250px;
  height: 34px;
  position: relative;
  margin-right: 10px;
  i {
    font-size: 14px;
    color: #5b5b5b;
  }
  input {
    width: 100%;
    height: 32px;
    padding: 0;
    margin: 0;
    border: 1px solid #e6e6e6;
    border-radius: 6px;
    cursor: text;
    font-size: 14px;
    text-indent: 30px;
    color: $web-font-color-black;
    font-weight: 500;
  }
  .search {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    cursor: text;
  }
  .clear {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 10px;
  }
}

.search-box:last-child {
  margin-right: 0px;
}
</style>