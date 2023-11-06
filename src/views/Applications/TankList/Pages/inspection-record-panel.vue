<template>
  <div
    class="inspection-record-panel"
    :class="[
      panelHiding == false
        ? 'inspection-record-panel'
        : 'inspection-record-panel-hide',
    ]"
  >
    <div class="insp-panel-header" v-if="panelHiding == true">
      <span>Inspection Record</span>
    </div>
    <v-ons-list v-if="panelHiding == false">
      <v-ons-list-header>Inspection Record</v-ons-list-header>
      <v-ons-list-item
        tappable
        v-for="item in inspectionList"
        :key="item.id_inspection_record"
        :id="[item.id_inspection_record]"
        v-on:click="VIEW_ITEM(item)"
        style="cursor: pointer"
      >
        <div class="center">
          <span class="date">{{ DATE_FORMAT(item.inspection_date) }}</span>
          <span class="campaign">{{ SET_CAMPAIGN(item.id_campaign) }}</span>
          <!-- <span
            style="
              position: absolute;
              bottom: 0;
              right: 14px;
              font-size: 12px;
              color: red;
            "
          >
            id_insp: {{ item.id_inspection_record }}
          </span> -->
        </div>
        <div class="right">
          <v-ons-toolbar-button>
            <i class="las la-search"></i>
          </v-ons-toolbar-button>
        </div>
      </v-ons-list-item>
    </v-ons-list>
    <div class="fixed-panel">
      <v-ons-toolbar-button
        class="item bottom-btn"
        v-on:click="SHOW_HIDE_PANEL()"
      >
        <i class="las la-caret-square-left" v-if="panelHiding == false"></i>
        <i class="las la-caret-square-right" v-if="panelHiding == true"></i>
        <span>Hide List</span>
      </v-ons-toolbar-button>
    </div>
  </div>
</template>

<script>
//API
import axios from "/axios.js";
import moment from "moment";

export default {
  name: "inspection-record-panel",
  data() {
    return {
      isLoading: false,
      inspectionList: [],
      campaignList: [],
      panelHiding: false,
      current_view: {},
    };
  },
  created() {
    if (this.$store.state.status.server == true) {
      this.FETCH_INSP_RECORD();
      this.FETCH_CAMPAIGN();
    }
  },
  watch: {
    $route() {
      if (this.current_view.id_inspection_record) {
        document
          .getElementById(this.current_view.id_inspection_record)
          .classList.remove("active");
      }
      this.current_view.id_inspection_record = "";
    },
  },
  methods: {
    FETCH_INSP_RECORD() {
      console.log("==> FETCH: Inspection Record");
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "post",
        url: "insp-record/insp-record-by-tank-id",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
        data: {
          id_tag: id_tag,
        },
      })
        .then((res) => {
          console.log("==> RES: Inspection Record");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log("==> SUCCESS: Inspection Record");
            this.inspectionList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    FETCH_CAMPAIGN() {
      this.isLoading = true;
      axios({
        method: "get",
        url: "/insp-record/campaign-list",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200 && res.data) {
            this.campaignList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_CAMPAIGN(id) {
      if (this.campaignList.length > 0) {
        var data = this.campaignList.filter(function (e) {
          return e.id_campaign == id;
        });
        // console.log(data);
        return data[0].campaign_desc;
      }
    },
    DATE_FORMAT(d) {
      return moment(d).format("DD MMM yyyy");
    },
    SHOW_HIDE_PANEL() {
      if (this.panelHiding == true) this.panelHiding = false;
      else this.panelHiding = true;
      this.$emit("showHidePanel");
    },
    VIEW_ITEM(item) {
      if (this.current_view.id_inspection_record) {
        document
          .getElementById(this.current_view.id_inspection_record)
          .classList.remove("active");
      }
      console.log("==> VIEW: Inspection Record Item");
      console.log(item);
      this.$emit("viewItem", item);
      document
        .getElementById(item.id_inspection_record)
        .classList.add("active");
      this.current_view.id_inspection_record = item.id_inspection_record;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.inspection-record-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 100%;
  border: 1px solid #e6e6e6;
  border-width: 0 1px 0 0;
  background-color: #fff;
  transition: all 0.3s;
  position: relative;

  .list {
    width: 100%;
    .list-header {
      font-weight: 600;
    }
  }

  .column-header {
    font-size: 12px;
    font-weight: 600;
    padding: 8px;
    background-color: #140a4b;
    color: #fff;
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .date {
      font-weight: 500;
      line-height: 16px;
    }
    .campaign {
      line-height: 16px;
      color: $web-font-color-grey;
    }
  }

  .list-item-wrapper {
    display: grid;
    grid-template-columns: calc(100% - 40px) 40px;
    padding: 8px;
    // border-bottom: 1px solid #000;
    font-size: 12px;

    div.contents:first-child {
      font-weight: 500;
    }
  }

  .toolbar-button {
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 2px;
    border-radius: 6px;
    background-color: #f6f6f6;
    padding: 0;
    text-align: right;
    transition: all 0.3s;

    i {
      font-size: 16px;
      color: $web-font-color-blue;
    }
  }

  .toolbar-button:hover,
  .toolbar-button:active {
    background-color: #140a4b;

    i {
      color: #fff;
    }
  }

  .dx-list .dx-empty-message,
  .dx-list-item-content {
    padding: 8px;
  }

  .dx-device-mobile .dx-list .dx-empty-message,
  .dx-device-mobile .dx-list-item-content {
    padding: 0;
  }

  .list-item__center {
    font-size: 12px;
  }

  .fixed-panel {
    width: 200px;
    position: fixed;
    bottom: 0;
    padding-top: 20px;
    .toolbar-button {
      width: 180px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin: 10px auto;
      border-radius: 6px;
      background-color: #fff;
      padding: 0;
      text-align: right;
      border: 0;
      i {
        font-size: 20px;
        margin-left: 0;
        color: $web-font-color-grey;
      }
      span {
        color: $web-font-color-grey;
        font-size: 12px;
      }
    }
    .toolbar-button:hover,
    .toolbar-button:active {
      background-color: #e6e6e6;
      i,
      span {
        color: $web-font-color-grey;
      }
    }
  }
}

.inspection-record-panel-hide {
  width: 40px;
  background-color: #f6f6f6;
  position: relative;

  .fixed-panel {
    width: 40px;
    .toolbar-button {
      background: none;
      width: 30px;
      margin: 10px auto;
      transition: all 0.3s;
      i {
        margin: 0;
      }

      span {
        display: none;
      }
    }
  }
  .insp-panel-header {
    position: absolute;
    top: 155px;
    left: 12px;
    background: none;
    transform-origin: 0 0;
    transform: rotate(270deg);
    width: 200px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: $web-font-color-black;
    letter-spacing: 1px;
  }
}

.active {
  background-color: #eb1851 !important;
  span {
    color: #fff !important;
  }
}
</style>